import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { soundFx } from '../../audio/soundEffects';
import { 
  Send, Mail, Github, Linkedin, FileDown, CheckCircle, 
  AlertCircle, MessageSquare, Terminal, MapPin, Sparkles 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Ident identification required';
    if (!formData.email.trim()) {
      errs.email = 'Comms email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid communication frequency (email format)';
    }
    if (!formData.subject.trim()) errs.subject = 'Transmission subject required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Transmission packet must contain at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate futuristic transmission with real fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      soundFx.playSuccess();

      // Automatic mailto link composition fallback so user message can be sent directly
      const mailtoLink = `mailto:deepak.placeholder@sece.ac.in?subject=${encodeURIComponent(
        `[Lab Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Store in local storage queue for verification
      try {
        const stored = JSON.parse(localStorage.getItem('deepak_lab_messages') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('deepak_lab_messages', JSON.stringify(stored));
      } catch {
        // Ignore
      }

      // Allow user option to open mail client if desired
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
    }, 1200);
  };

  const handleDownloadResume = () => {
    soundFx.playSuccess();
    const resumeText = `DEEPAK S
B.Tech Information Technology | 2026–2030
Sri Eshwar College of Engineering
Aspiring Software Developer | Technology Enthusiast

CONTACT & LINKS:
- Location: Tamil Nadu, India
- College: Sri Eshwar College of Engineering (B.Tech Information Technology | 2026–2030)
- GitHub: [Editable: https://github.com/placeholder-deepak]
- LinkedIn: [Editable: https://linkedin.com/in/placeholder-deepak]
- Email: [Editable: deepak.placeholder@sece.ac.in]

SUMMARY:
Passionate first-year Information Technology student dedicated to building innovative software solutions, exploring AI integration, and bridging the physical-digital divide through embedded hardware and robotics.

TECHNICAL ARSENAL:
- Languages: C, C++, Python, JavaScript (ES6+)
- Frontend: HTML5, CSS3, React, Vite, Tailwind CSS, Responsive UI
- AI & ML: Generative AI, Prompt Engineering, API Integration, ML Concepts
- Tools: Git, GitHub, VS Code, Streamlit, Vercel, Antigravity IDE
- Hardware Interests: Arduino, ESP32, IoT Sensors, Embedded Systems, Robotics
`;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Deepak_S_Developer_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="COMMUNICATION TERMINAL"
          title="TRANSMIT A MESSAGE"
          subtitle="Open an encrypted transmission channel for project collaborations, student innovation, or technical inquiries."
          terminalCode="COMM_HUB // PORT_443"
          accentColor="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Terminal Contact Info & Verified Placeholders */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="cyber-glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30">
              <div className="flex items-center space-x-2 text-cyan-400 font-tech text-sm font-bold mb-6">
                <Terminal size={18} />
                <span>DIRECT COMMS DIRECTORY</span>
              </div>

              <div className="space-y-5 font-mono-tech text-xs text-slate-300">
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">CAMPUS LOCATION</span>
                    <span className="text-white font-tech">Sri Eshwar College of Engineering</span>
                    <p className="text-slate-400 text-[11px]">Coimbatore, Tamil Nadu, India</p>
                  </div>
                </div>

                {/* Email Placeholder */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">DIRECT EMAIL [PLACEHOLDER]</span>
                    <a
                      href="mailto:deepak.placeholder@sece.ac.in"
                      className="text-cyan-300 hover:text-cyan-200 transition underline underline-offset-4"
                    >
                      deepak.placeholder@sece.ac.in
                    </a>
                    <p className="text-[10px] text-slate-500 mt-0.5">Editable student contact address</p>
                  </div>
                </div>

                {/* GitHub Placeholder */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">GITHUB PROFILE [PLACEHOLDER]</span>
                    <a
                      href="https://github.com/placeholder-deepak"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 transition underline underline-offset-4"
                    >
                      github.com/placeholder-deepak
                    </a>
                    <p className="text-[10px] text-slate-500 mt-0.5">Will link to Deepak's public repository</p>
                  </div>
                </div>

                {/* LinkedIn Placeholder */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">LINKEDIN PROFILE [PLACEHOLDER]</span>
                    <a
                      href="https://linkedin.com/in/placeholder-deepak"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 transition underline underline-offset-4"
                    >
                      linkedin.com/in/placeholder-deepak
                    </a>
                    <p className="text-[10px] text-slate-500 mt-0.5">Editable professional profile placeholder</p>
                  </div>
                </div>
              </div>

              {/* Resume Download Action */}
              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <button
                  onClick={handleDownloadResume}
                  className="w-full py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/80 hover:border-cyan-400 font-tech font-bold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                >
                  <FileDown size={16} />
                  <span>DOWNLOAD VERIFIED PROFILE (.TXT)</span>
                </button>
              </div>

            </div>

            {/* Backend Integration Note */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono-tech text-slate-400">
              <strong className="text-cyan-400 block mb-1 font-tech">BACKEND ADAPTER CONFIG:</strong>
              <span>
                This terminal is pre-configured with client-side form validation, local message queueing, and mailto automated dispatch. To connect a serverless backend later (e.g. EmailJS, Resend, or AWS SES), simply hook your API key in <code className="text-cyan-300">src/components/sections/ContactSection.tsx</code>.
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Form Terminal */}
          <div className="lg:col-span-7">
            <div className="cyber-glass-card p-6 sm:p-10 rounded-3xl border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.15)] relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="text-cyan-400" size={18} />
                  <h3 className="font-tech text-base text-white font-bold uppercase">
                    INPUT TRANSMISSION PACKET
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tech text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>TRANSMITTER READY</span>
                </span>
              </div>

              {submitSuccess ? (
                <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-tech text-xl text-white font-bold">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm font-mono-tech max-w-md mx-auto leading-relaxed">
                    Your packet has been parsed, logged to local laboratory memory, and prepared for direct email client delivery.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-tech text-xs tracking-wider uppercase hover:bg-slate-800 transition"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-300 mb-1.5 uppercase">
                        SENDER IDENTIFICATION *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.name ? 'border-red-500' : 'border-cyan-500/30'
                        } text-white font-mono-tech text-xs focus:outline-none focus:border-cyan-400 transition`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[10px] font-mono-tech mt-1 flex items-center space-x-1">
                          <AlertCircle size={11} />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-mono-tech text-slate-300 mb-1.5 uppercase">
                        RETURN COMM FREQUENCY (EMAIL) *
                      </label>
                      <input
                        type="email"
                        placeholder="alex.vance@lab.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                          errors.email ? 'border-red-500' : 'border-cyan-500/30'
                        } text-white font-mono-tech text-xs focus:outline-none focus:border-cyan-400 transition`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[10px] font-mono-tech mt-1 flex items-center space-x-1">
                          <AlertCircle size={11} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-300 mb-1.5 uppercase">
                      TRANSMISSION SUBJECT *
                    </label>
                    <input
                      type="text"
                      placeholder="Project Collaboration / Hackathon Mentorship / Technical Query"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                        errors.subject ? 'border-red-500' : 'border-cyan-500/30'
                      } text-white font-mono-tech text-xs focus:outline-none focus:border-cyan-400 transition`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-[10px] font-mono-tech mt-1 flex items-center space-x-1">
                        <AlertCircle size={11} />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-300 mb-1.5 uppercase">
                      MESSAGE BODY DATA PACKET *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Enter your message details or project inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                        errors.message ? 'border-red-500' : 'border-cyan-500/30'
                      } text-white font-mono-tech text-xs focus:outline-none focus:border-cyan-400 transition resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-[10px] font-mono-tech mt-1 flex items-center space-x-1">
                        <AlertCircle size={11} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-tech font-bold text-xs tracking-wider uppercase transition shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles size={16} className="animate-spin" />
                        <span>ENCRYPTING & TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>DISPATCH PACKET TO DEEPAK S</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
