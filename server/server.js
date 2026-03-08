import express from "express";
import cors from "cors";
import { connectDB, insertRegistration, getAllRegistrations, closeDB } from "./db.js";

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies (increased limit for base64 images)
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Parse URL-encoded bodies

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Prakalpa 26 Registration API',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/register',
      registrations: 'GET /api/registrations'
    }
  });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    console.log('📝 Received registration request');

    const { participants, project, payment } = req.body;

    // Basic validation
    if (!participants || !Array.isArray(participants) || participants.length === 0 || participants.length > 4) {
      return res.status(400).json({
        success: false,
        error: 'Participants data must be an array of length 1 to 4'
      });
    }

    if (!project || !project.category || !project.domain || !project.title || !project.link) {
      return res.status(400).json({
        success: false,
        error: 'Complete project details are required, including project link'
      });
    }

    try {
      new URL(project.link);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid project link URL provided'
      });
    }

    if (!payment || !payment.screenshotBase64) {
      return res.status(400).json({
        success: false,
        error: 'Payment screenshot is required'
      });
    }

    // Validate participants fields
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;

    const normalizedParticipants = [];
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name || !p.email || !p.contact || !p.institute || !p.degree || !p.branch || !p.year) {
        return res.status(400).json({
          success: false,
          error: `Incomplete data for participant ${i + 1}`
        });
      }

      if (!emailRegex.test(p.email)) {
        return res.status(400).json({ success: false, error: `Invalid email for participant ${i + 1}` });
      }

      if (!phoneRegex.test(p.contact)) {
        return res.status(400).json({ success: false, error: `Invalid contact number for participant ${i + 1}` });
      }

      if (p.degree === 'Others' && !p.degreeOther) {
        return res.status(400).json({ success: false, error: `Degree specification required for participant ${i + 1}` });
      }

      if (p.branch === 'Other' && !p.branchOther) {
        return res.status(400).json({ success: false, error: `Branch specification required for participant ${i + 1}` });
      }

      normalizedParticipants.push({
        ...p,
        degree: p.degree === 'Others' ? p.degreeOther : p.degree,
        branch: p.branch === 'Other' ? p.branchOther : p.branch,
      });
    }

    // Prepare registration data
    const registrationData = {
      participants: normalizedParticipants,
      project: {
        category: project.category,
        domain: project.domain,
        title: project.title,
        link: project.link
      },
      payment: {
        amount: payment.amount,
        screenshotFileName: payment.screenshotFileName,
        screenshotFileType: payment.screenshotFileType,
        screenshotBase64: payment.screenshotBase64
      },
      numberOfParticipants: normalizedParticipants.length,
      primaryContact: normalizedParticipants.find(p => p.isPrimaryContact) || normalizedParticipants[0]
    };

    // Insert into database
    const result = await insertRegistration(registrationData);

    console.log('✅ Registration successful:', result.insertedId);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully!',
      registrationId: result.insertedId
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process registration. Please try again.'
    });
  }
});

// Get all registrations (for admin)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await getAllRegistrations();
    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch registrations'
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await closeDB();
  process.exit(0);
});

// Export the Express app for Vercel
export default app;

// Start the server if running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
