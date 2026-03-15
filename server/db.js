import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
  },
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  tls: true,
  tlsAllowInvalidCertificates: false,
  connectTimeoutMS: 30000,
});

// Database and collection names
const DB_NAME = "prakalpa26";
const COLLECTION_NAME = "registrations";

let isConnected = false;

// Connect to MongoDB
async function connectDB() {
  try {
    if (!isConnected) {
      await client.connect();
      // Verify connection
      await client.db(DB_NAME).command({ ping: 1 });
      isConnected = true;
      console.log("✓ Successfully connected to MongoDB!");
    }
    return client.db(DB_NAME);
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Insert registration data
async function insertRegistration(registrationData) {
  try {
    // Ensure connection is active
    if (!isConnected) {
      await connectDB();
    }

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Add timestamp
    const dataWithTimestamp = {
      ...registrationData,
      submittedAt: new Date(),
      status: 'pending' // allowed: pending, approved
    };

    const result = await collection.insertOne(dataWithTimestamp);
    console.log("Registration inserted with ID:", result.insertedId);
    return result;
  } catch (error) {
    console.error("Error inserting registration:", error);
    // Try to reconnect on next request
    isConnected = false;
    throw error;
  }
}

// Get all registrations
async function getAllRegistrations() {
  try {
    // Ensure connection is active
    if (!isConnected) {
      await connectDB();
    }
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const registrations = await collection.find({}).toArray();
    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    isConnected = false;
    throw error;
  }
}

// Get registration by ID
async function getRegistrationById(id) {
  try {
    if (!isConnected) await connectDB();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const _id = typeof id === 'string' ? new ObjectId(id) : id;
    const registration = await collection.findOne({ _id });
    return registration;
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
}

// Update registration status
async function updateRegistrationStatus(id, status) {
  try {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw new Error('Invalid status');
    }
    if (!isConnected) await connectDB();

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const _id = typeof id === 'string' ? new ObjectId(id) : id;
    const result = await collection.updateOne(
      { _id },
      { $set: { status, updatedAt: new Date() } }
    );
    return result;
  } catch (error) {
    console.error("Error updating registration:", error);
    throw error;
  }
}

// Close database connection
async function closeDB() {
  if (isConnected) {
    await client.close();
    isConnected = false;
    console.log("MongoDB connection closed");
  }
}

export {
  connectDB,
  insertRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  closeDB,
  client
};
