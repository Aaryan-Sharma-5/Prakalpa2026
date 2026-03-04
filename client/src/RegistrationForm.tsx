import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import qrCodeImage from './assets/PrakalpaPaymentImage.jpeg';

const bgImage = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920';

// ─── UPDATE THESE WHEN READY ───────────────────────────────────────
const REGISTRATION_FEE = 600; // in ₹
const UPI_ID = 'prakalpa26@upi';
// ───────────────────────────────────────────────────────────────────

interface InputProps {
  label: string;
  required?: boolean;
  error?: string;
  [key: string]: any;
}

interface SelectProps {
  label: string;
  required?: boolean;
  error?: string;
  options: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const Input = ({ label, required, error, ...props }: InputProps) => (
  <div className="space-y-2" data-error={error ? props.name : undefined}>
    <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {label} {required && <span className="text-pink-500">*</span>}
    </label>
    <input
      autoComplete="new-password"
      {...props}
      className={`w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded placeholder:text-gray-500 focus:border-pink-500 focus:outline-none transition-all ${props.value ? 'text-white' : 'text-gray-400'}`}
    />
    {error && <span className="text-red-400 text-sm">{error}</span>}
  </div>
);

const Select = ({ label, required, error, options, ...props }: SelectProps) => (
  <div className="space-y-2" data-error={error ? props.name : undefined}>
    <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {label} {required && <span className="text-pink-500">*</span>}
    </label>
    <select
      {...props}
      className={`w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded focus:border-pink-500 focus:outline-none transition-all ${props.value ? 'text-white' : 'text-gray-400'}`}
    >
      <option value="" className="text-gray-400 bg-black">Select...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-black text-white">
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-400 text-sm">{error}</span>}
  </div>
);

interface Participant {
  name?: string;
  email?: string;
  contact?: string;
  institute?: string;
  degree?: string;
  degreeOther?: string;
  branch?: string;
  branchOther?: string;
  year?: string;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const submitRegistration = async (payload: Record<string, any>) => {
  const API_URL = 'http://localhost:3000/api/register';

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  }

  return await response.json();
};

export default function RegistrationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [currentTab, setCurrentTab] = useState(1);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    numberOfParticipants: '',
    projectCategory: '',
    domain: '',
    domainOther: '',
    title: '',
    participants: [{}, {}, {}, {}] as Participant[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [paymentScreenshotBase64, setPaymentScreenshotBase64] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setShowButton(window.scrollY < 25); };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ formOpen: true }, '');
    }
  }, [isOpen]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isOpen) {
        setIsOpen(false);
        setCurrentTab(1);
        window.history.replaceState(null, '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen]);

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPaymentScreenshot(file);
    if (errors.paymentScreenshot) setErrors(prev => { const n = { ...prev }; delete n.paymentScreenshot; return n; });

    if (file) {
      try {
        const b64 = await toBase64(file);
        setPaymentScreenshotBase64(b64);
        console.log('Screenshot base64 ready. Length:', b64.length);
      } catch (err) {
        console.error('Failed to encode screenshot:', err);
        setPaymentScreenshotBase64('');
      }
    } else {
      setPaymentScreenshotBase64('');
    }
  };

  const domains = [
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'agrotech', label: 'Agrotech' },
    { value: 'game-dev', label: 'Game Development' },
    { value: 'cybersecurity', label: 'Cyber-Security' },
    { value: 'autonomous-vehicles', label: 'Autonomous Vehicles' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'iot', label: 'IoT' },
    { value: 'cloud-computing', label: 'Cloud Computing' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'other', label: 'Others' }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const handleParticipantChange = (index: number, field: string, value: string) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setFormData(prev => ({ ...prev, participants: newParticipants }));
  };

  const validateAllTabs = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.numberOfParticipants) newErrors.numberOfParticipants = 'This is a required question';

    const count = parseInt(formData.numberOfParticipants) || 1;
    for (let i = 0; i < count; i++) {
      const p = formData.participants[i];
      if (!p.name) newErrors[`name${i + 1}`] = 'This is a required question';
      if (!p.email) newErrors[`email${i + 1}`] = 'This is a required question';
      else if (!emailRegex.test(p.email)) newErrors[`email${i + 1}`] = 'Enter a valid email address';
      if (!p.contact) newErrors[`contact${i + 1}`] = 'This is a required question';
      else if (!phoneRegex.test(p.contact)) newErrors[`contact${i + 1}`] = 'Enter a valid 10-digit number';
      if (!p.institute) newErrors[`institute${i + 1}`] = 'This is a required question';
      if (!p.degree) newErrors[`degree${i + 1}`] = 'This is a required question';
      if (p.degree === 'Others' && !(p as any).degreeOther) newErrors[`degreeOther${i + 1}`] = 'This is a required question';
      if (!p.branch) newErrors[`branch${i + 1}`] = 'This is a required question';
      if (p.branch === 'Other' && !p.branchOther) newErrors[`branchOther${i + 1}`] = 'This is a required question';
      if (!p.year) newErrors[`year${i + 1}`] = 'This is a required question';
    }

    if (!formData.projectCategory) newErrors.projectCategory = 'This is a required question';
    if (!formData.domain) newErrors.domain = 'This is a required question';
    if (formData.domain === 'other' && !formData.domainOther) newErrors.domainOther = 'This is a required question';
    if (!formData.title) newErrors.title = 'This is a required question';
    if (!projectFile) newErrors.projectFile = 'This is a required question';
    if (!paymentScreenshot) newErrors.paymentScreenshot = 'This is a required question';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      let errorTab = 1;
      if (['projectCategory', 'domain', 'domainOther', 'title', 'projectFile'].includes(firstErrorKey)) errorTab = 2;
      if (['paymentScreenshot'].includes(firstErrorKey)) errorTab = 3;
      setCurrentTab(errorTab);
      setTimeout(() => {
        const el = document.querySelector(`[data-error="${firstErrorKey}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setCurrentTab(currentTab + 1);
    const container = document.getElementById('registration-scroll-container');
    if (container) container.scrollTop = 0;
  };

  const handlePrevious = () => {
    setCurrentTab(currentTab - 1);
    const container = document.getElementById('registration-scroll-container');
    if (container) container.scrollTop = 0;
  };

  const handleSubmit = async () => {
    if (!validateAllTabs()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        participants: formData.participants
          .slice(0, parseInt(formData.numberOfParticipants))
          .map((p, i) => ({ ...p, isPrimaryContact: i === 0 })),
        project: {
          category: formData.projectCategory,
          domain: formData.domain === 'other' ? formData.domainOther : formData.domain,
          title: formData.title,
        },
        payment: {
          amount: REGISTRATION_FEE,
          screenshotBase64: paymentScreenshotBase64,
          screenshotFileName: paymentScreenshot?.name,
          screenshotFileType: paymentScreenshot?.type,
        },
      };

      const result = await submitRegistration(payload);

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Registration submitted successfully!' });
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setIsOpen(false);
          setFormData({ numberOfParticipants: '', projectCategory: '', domain: '', domainOther: '', title: '', participants: [{}, {}, {}, {}] });
          setProjectFile(null);
          setPaymentScreenshot(null);
          setPaymentScreenshotBase64('');
          setErrors({});
          setCurrentTab(1);
          setShowQR(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to submit registration. Please try again.' 
      });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderParticipant = (index: number) => {
    const labels = ['Participant 1', 'Participant 2', 'Participant 3', 'Participant 4'];
    const participant = formData.participants[index];

    const getYearOptions = () => {
      if (!participant.degree) return [];
      switch (participant.degree) {
        case 'B.Tech': return [
          { value: '1st Year', label: '1st Year' },
          { value: '2nd Year', label: '2nd Year' },
          { value: '3rd Year', label: '3rd Year' },
          { value: '4th Year', label: '4th Year' }
        ];
        case 'Postgraduate': return [
          { value: '1st Year', label: '1st Year' },
          { value: '2nd Year', label: '2nd Year' }
        ];
        case 'Others': return [
          { value: '1st Year', label: '1st Year' },
          { value: '2nd Year', label: '2nd Year' },
          { value: '3rd Year', label: '3rd Year' },
          { value: '4th Year', label: '4th Year' }
        ];
        default: return [];
      }
    };

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 hover:border-pink-500/50 transition-all"
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {labels[index]}
          </h3>
          {index === 0 && (
            <span className="bg-pink-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
              Primary Contact
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" required name={`name${index + 1}`} value={participant.name || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'name', e.target.value)} placeholder="Enter full name" error={errors[`name${index + 1}`]} />
          <Input label="Email Address" required type="email" name={`email${index + 1}`} value={participant.email || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'email', e.target.value)} placeholder="@gmail.com" error={errors[`email${index + 1}`]} />
          <Input label="Contact Number" required name={`contact${index + 1}`} value={participant.contact || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'contact', e.target.value)} placeholder="10-digit number" error={errors[`contact${index + 1}`]} />
          <Input label="Institute/Organization" required name={`institute${index + 1}`} value={participant.institute || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'institute', e.target.value)} placeholder="Enter institute name" error={errors[`institute${index + 1}`]} />
          <Select
            label="Degree" required name={`degree${index + 1}`} value={participant.degree || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const newParticipants = [...formData.participants];
              newParticipants[index] = { ...newParticipants[index], degree: e.target.value, year: '', degreeOther: '' };
              setFormData(prev => ({ ...prev, participants: newParticipants }));
            }}
            options={[
              { value: 'B.Tech', label: 'B.Tech' },
              { value: 'Postgraduate', label: 'Postgraduate' },
              { value: 'Others', label: 'Others' }
            ]}
            error={errors[`degree${index + 1}`]}
          />
          {participant.degree === 'Others' && (
            <Input
              label="Specify Degree" required name={`degreeOther${index + 1}`}
              value={(participant as any).degreeOther || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'degreeOther', e.target.value)}
              placeholder="Enter your degree" error={errors[`degreeOther${index + 1}`]}
            />
          )}
          <Select
            label="Branch/Specialization" required name={`branch${index + 1}`} value={participant.branch || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParticipantChange(index, 'branch', e.target.value)}
            options={[
              { value: 'Computer Science Engineering', label: 'Computer Science Engineering' },
              { value: 'Information Technology', label: 'Information Technology' },
              { value: 'Electronics and Communication Engineering', label: 'Electronics and Communication Engineering' },
              { value: 'Electrical Engineering', label: 'Electrical Engineering' },
              { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
              { value: 'Civil Engineering', label: 'Civil Engineering' },
              { value: 'Chemical Engineering', label: 'Chemical Engineering' },
              { value: 'Aerospace Engineering', label: 'Aerospace Engineering' },
              { value: 'Biotechnology', label: 'Biotechnology' },
              { value: 'Artificial Intelligence and Machine Learning', label: 'Artificial Intelligence and Machine Learning' },
              { value: 'Data Science', label: 'Data Science' },
              { value: 'Cyber Security', label: 'Cyber Security' },
              { value: 'Robotics and Automation', label: 'Robotics and Automation' },
              { value: 'Other', label: 'Others' }
            ]}
            error={errors[`branch${index + 1}`]}
          />
          {participant.branch === 'Other' && (
            <Input label="Specify Branch/Specialization" required name={`branchOther${index + 1}`} value={participant.branchOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'branchOther', e.target.value)} placeholder="Enter your branch" error={errors[`branchOther${index + 1}`]} />
          )}
          <div className="space-y-2" data-error={errors[`year${index + 1}`] ? `year${index + 1}` : undefined}>
            <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Year of Study <span className="text-pink-500">*</span>
            </label>
            <select
              name={`year${index + 1}`} value={participant.year || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParticipantChange(index, 'year', e.target.value)}
              className={`w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded focus:border-pink-500 focus:outline-none transition-all ${participant.year ? 'text-white' : 'text-gray-400'}`}
              disabled={!participant.degree}
            >
              <option value="" className="bg-black text-gray-400">{participant.degree ? 'Select...' : 'Select degree first'}</option>
              {getYearOptions().map(opt => <option key={opt.value} value={opt.value} className="bg-black text-white">{opt.label}</option>)}
            </select>
            {!participant.degree && <p className="text-sm text-gray-400">Please select a degree first</p>}
            {errors[`year${index + 1}`] && <span className="text-red-400 text-sm">{errors[`year${index + 1}`]}</span>}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* REGISTER BUTTON - CENTERED */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-40 md:bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group pointer-events-auto relative overflow-hidden px-8 py-3 bg-transparent border border-white/35 rounded-3xl text-pink-500 font-black tracking-widest uppercase transition-all duration-300 hover:bg-white/5 hover:scale-105 flex items-center justify-center"
              style={{ fontFamily: 'Pricedown, sans-serif' }}
              aria-label="Open registration form"
            >
              <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-4 text-lg md:text-2xl w-full">
                <span
                  className="text-pink-500 text-2xl md:text-4xl font-black tracking-wider transform -skew-x-12"
                  style={{
                    fontFamily: 'Pricedown, sans-serif',
                    textShadow: '3px 3px 0px #7c3aed'
                  }}
                >
                  REGISTER NOW
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN SLIDING PAGE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="registration-scroll-container"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[99999] overflow-y-auto"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              background: `linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.92)), url('${bgImage}')`,
              backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'scroll'
            }}
          >
            <div className="fixed inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, purple 2px, purple 4px)' }} />

            <div className="fixed top-8 right-8 z-[10000]">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => { setIsOpen(false); setCurrentTab(1); setShowQR(false); }}
                className="bg-pink-500 hover:bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all duration-300 border-2 border-purple-400 shadow-lg"
              >
                <span className="text-3xl leading-none">×</span>
              </motion.button>
            </div>

            <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20 h-full">
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring" }} className="text-center mb-8">
                  <motion.h1
                    initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-pink-500 transform -skew-x-6"
                    style={{ fontFamily: 'Pricedown, sans-serif', textShadow: '4px 4px 0px rgba(168,85,247,0.7), -2px -2px 0px rgba(236,72,153,0.4), 5px 5px 15px rgba(0,0,0,0.9)' }}
                  >
                    PRAKALPA'26 REGISTRATION
                  </motion.h1>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-purple-300 text-base sm:text-lg md:text-xl">
                    Complete all fields to register for the event
                  </motion.p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex justify-center mb-8">
                  <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-2 inline-flex gap-2">
                    {[{ n: 1, label: '1. Participants' }, { n: 2, label: '2. Project/Paper' }, { n: 3, label: '3. Payment' }].map(({ n, label }) => (
                      <button key={n} onClick={() => setCurrentTab(n)}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${currentTab === n ? 'bg-pink-500 text-white' : 'text-purple-300 hover:text-white hover:bg-purple-500/20'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8">
                  <div className="bg-black/40 h-2 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-pink-500 to-purple-500" initial={{ width: '0%' }} animate={{ width: `${(currentTab / 3) * 100}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }} className="space-y-6"
                  >
                    {currentTab === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>PARTICIPANT INFORMATION</h2>
                        <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                          <Select label="Number of Participants" required name="numberOfParticipants" value={formData.numberOfParticipants}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('numberOfParticipants', e.target.value)}
                            options={[{ value: '1', label: '1 Participant' }, { value: '2', label: '2 Participants' }, { value: '3', label: '3 Participants' }, { value: '4', label: '4 Participants' }]}
                            error={errors.numberOfParticipants}
                          />
                        </div>
                        {formData.numberOfParticipants && (
                          <div className="space-y-6">
                            {Array.from({ length: parseInt(formData.numberOfParticipants) }, (_, i) => i).map(renderParticipant)}
                          </div>
                        )}
                      </div>
                    )}

                    {currentTab === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>PROJECT/PAPER DETAILS</h2>
                        <div className="bg-black/40 backdrop-blur-sm border-2 border-pink-500/30 rounded-lg p-6 space-y-6">
                          <Select label="Project Category" required name="projectCategory" value={formData.projectCategory} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('projectCategory', e.target.value)} options={[{ value: 'working-model', label: 'Working Model' }, { value: 'software-competition', label: 'Software Competition' }, { value: 'paper-presentation', label: 'Paper Presentation' }]} error={errors.projectCategory} />
                          <Select label="Domain" required name="domain" value={formData.domain} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('domain', e.target.value)} options={domains} error={errors.domain} />
                          {formData.domain === 'other' && <Input label="Specify Domain" required name="domainOther" value={formData.domainOther} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('domainOther', e.target.value)} placeholder="Enter your domain" error={errors.domainOther} />}
                          <Input label="Project/Paper Title" required name="title" value={formData.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)} placeholder="Enter project/paper title" error={errors.title} />
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-purple-400 mb-4" style={{ fontFamily: 'Pricedown, sans-serif' }}>DOCUMENT UPLOAD</h3>
                          <div className="space-y-2" data-error={errors.projectFile ? 'projectFile' : undefined}>
                            <label className="text-purple-300 font-semibold block">Project Presentation/Paper <span className="text-pink-500">*</span></label>
                            <input type="file" accept=".pdf" onChange={(e) => setProjectFile(e.target.files?.[0] || null)} className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:rounded cursor-pointer" />
                            <p className="text-sm text-gray-400">PDF format only</p>
                            {projectFile && <p className="text-sm text-purple-300">✓ Selected: {projectFile.name}</p>}
                            {errors.projectFile && <span className="text-red-400 text-sm">{errors.projectFile}</span>}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>PAYMENT</h2>

                        <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-purple-400 mb-4 text-center" style={{ fontFamily: 'Pricedown, sans-serif' }}>PAYMENT DETAILS</h3>

                          <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="text-center space-y-2">
                              <p className="text-purple-300 font-bold text-lg sm:text-xl">
                                Amount: <span className="text-pink-400">₹{REGISTRATION_FEE}</span>
                              </p>
                              <p className="text-gray-400 text-sm mt-2">
                                Click below to view QR code for payment
                              </p>
                            </div>

                            <button
                              onClick={() => setShowQR(!showQR)}
                              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold transition-all shadow-lg"
                              style={{ fontFamily: 'Pricedown, sans-serif' }}
                            >
                              {showQR ? 'HIDE QR CODE' : 'SHOW QR CODE'}
                            </button>

                            <AnimatePresence>
                              {showQR && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex flex-col items-center space-y-4"
                                >
                                  <div className="bg-white p-2 rounded-lg">
                                    <img
                                      src={qrCodeImage}
                                      alt="UPI Payment QR Code"
                                      className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto object-contain"
                                    />
                                  </div>
                                  <p className="text-gray-400 text-sm">
                                    Scan to pay with any UPI app
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 space-y-6">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-purple-400" style={{ fontFamily: 'Pricedown, sans-serif' }}>PAYMENT CONFIRMATION</h3>

                          <div className="space-y-2" data-error={errors.paymentScreenshot ? 'paymentScreenshot' : undefined}>
                            <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                              Payment Screenshot <span className="text-pink-500">*</span>
                            </label>
                            <input
                              type="file" accept="image/*"
                              onChange={handleScreenshotChange}
                              className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:rounded cursor-pointer"
                            />
                            <p className="text-xs text-gray-400">Upload screenshot from your UPI app (JPG, PNG)</p>

                            {paymentScreenshot && (
                              <div className="mt-3 space-y-2">
                                <p className="text-sm text-purple-300">✓ Selected: {paymentScreenshot.name}</p>
                                {paymentScreenshotBase64 ? (
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                    <p className="text-xs text-green-400">Encoded successfully ({Math.round(paymentScreenshotBase64.length / 1024)} KB)</p>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block animate-pulse"></span>
                                    <p className="text-xs text-yellow-400">Encoding...</p>
                                  </div>
                                )}
                                <img
                                  src={paymentScreenshotBase64 || ''}
                                  alt="Payment screenshot preview"
                                  className="mt-2 max-h-48 rounded-lg border-2 border-purple-500/40 object-contain"
                                />
                              </div>
                            )}
                            {errors.paymentScreenshot && <span className="text-red-400 text-sm">{errors.paymentScreenshot}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-between items-center mt-8 gap-4">
                  <button
                    onClick={handlePrevious} disabled={currentTab === 1}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${currentTab === 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                  >
                    Previous
                  </button>
                  {currentTab < 3 ? (
                    <button onClick={handleNext} className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold transition-all">
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit} disabled={isSubmitting}
                      className="px-12 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-black text-lg transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'Pricedown, sans-serif' }}
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'}
                    </button>
                  )}
                </motion.div>
              </div>
            </form>

            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    className="relative"
                  >
                    <motion.div className="relative w-[500px] h-[300px]">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          className="text-center px-8"
                        >
                          <div className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-wider mb-2 ${message.type === 'error' ? 'text-red-500' : ''}`}
                            style={{
                              fontFamily: 'Pricedown, sans-serif',
                              textShadow: '3px 3px 6px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,255,255,0.3)',
                              letterSpacing: '0.15em'
                            }}
                          >
                            {message.type === 'error' ? 'ERROR' : 'REGISTRATION'}
                          </div>
                          <div className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-wider ${message.type === 'error' ? 'text-red-500' : ''}`}
                            style={{
                              fontFamily: 'Pricedown, sans-serif',
                              textShadow: '3px 3px 6px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,255,255,0.3)',
                              letterSpacing: '0.15em'
                            }}
                          >
                            {message.type === 'error' ? 'OCCURRED' : 'COMPLETED'}
                          </div>
                          {message.type === 'error' && (
                            <div className="text-base sm:text-lg text-red-300 mt-6 font-normal"
                              style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                              {message.text}
                            </div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className={`w-3/4 h-1 mt-6 ${message.type === 'error' ? 'bg-red-500/40' : 'bg-white/40'}`}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
              @font-face {
                font-family: 'Pricedown';
                src: url('https://cdn.jsdelivr.net/gh/LuisFerOD/Fonts/fonts/pricedown.ttf') format('truetype');
              }
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus {
                -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,0.6) inset !important;
                -webkit-text-fill-color: #ffffff !important;
                caret-color: white;
                transition: background-color 5000s ease-in-out 0s;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}