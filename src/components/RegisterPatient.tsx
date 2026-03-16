import React, { useState } from 'react';
import { IdCard, Phone, Calendar, ChevronDown, BriefcaseMedical, Asterisk, ArrowLeft, ArrowRight } from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import TopBar from './dashboard/TopBar';

const steps = [
  { id: 1, name: 'Personal Info' },
  { id: 2, name: 'Medical History' },
  { id: 3, name: 'Allergies' },
  { id: 4, name: 'Chronic Diseases' },
];

const RegisterPatient: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [accountStatus, setAccountStatus] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden font-sans">
      <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onLogout={() => {}} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar 
            onMenuClick={() => setIsSidebarOpen(true)} 
            title="Add New User"
            breadcrumb="Patient"
        />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto w-full px-4 md:px-10 py-8">
          <div className="w-full">
            <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Register New Patient</h1>
            <p className="text-gray-500 font-medium">Complete the clinical profile to register a new patient in the system.</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center w-full mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 max-w-[180px]">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 z-10 
                      ${activeStep === step.id 
                        ? 'bg-[#0066cc] text-white border-4 border-[#e6f0fa]' 
                        : 'bg-white text-gray-400 border-2 border-gray-200'}`}
                  >
                    {step.id}
                  </div>
                  <span 
                    className={`text-sm font-medium whitespace-nowrap
                      ${activeStep === step.id ? 'text-[#0066cc]' : 'text-gray-400'}`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-auto border-t-2 border-gray-200 -mt-6 mx-2"></div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Identity Info Panel */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#f8faff] p-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0066cc] p-1.5 rounded-lg text-white">
                    <IdCard size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Identity Info</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium">Account Status</span>
                  <button 
                    onClick={() => setAccountStatus(!accountStatus)}
                    className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${accountStatus ? 'bg-[#0066cc]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${accountStatus ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5 flex items-center">
                      Full Name (English) <span className="text-gray-900 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5 flex justify-end items-center flex-row-reverse">
                       <span className="text-gray-900 mr-1">*</span> (بالعربي) الاسم كامل
                    </label>
                    <input 
                      dir="rtl"
                      type="text" 
                      placeholder="ادخل الاسم الكامل" 
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400 text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">National ID</label>
                    <input 
                      type="text" 
                      placeholder="Enter ID" 
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">Gender</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-500 appearance-none">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">Date of Birth</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="mm/ dd/ yyyy" 
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Panel */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#f8faff] p-4 flex items-center border-b border-gray-200 gap-3">
                <div className="bg-[#0066cc] p-1.5 rounded-full text-white">
                  <Phone size={18} fill="currentColor" className="stroke-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Contact Info</h2>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Phone Number</label>
                  <div className="flex">
                    <div className="px-4 py-2.5 bg-[#f5f8fa] border border-gray-300 border-r-0 rounded-l-lg flex items-center text-gray-600 font-medium">
                      +966
                    </div>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="email@ex.com" 
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">City</label>
                  <input 
                    type="text" 
                    placeholder="city" 
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Country</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-500 appearance-none">
                      <option value="Egypt">Egypt</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UAE">UAE</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Address</label>
                  <input 
                    type="text" 
                    placeholder="street, building, flat" 
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Basic Medical Information Panel */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#f8faff] p-4 flex items-center border-b border-gray-200 gap-3">
                <div className="bg-[#0066cc] p-1.5 rounded-lg text-white">
                  <BriefcaseMedical size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Basic Medical Information</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">Blood Type</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-500 appearance-none">
                        <option value="">select</option>
                        <option value="A+">A+</option>
                        <option value="O+">O+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">Insurance Type</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-500 appearance-none">
                        <option value="self pay">self pay</option>
                        <option value="insurance">Insurance</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Current Medications</label>
                  <textarea 
                    rows={3}
                    placeholder="List any medications currently being taken..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Emergency Contact Panel */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fff0f0] p-4 flex items-center border-b border-red-100 gap-3">
                <div className="text-[#e53e3e]">
                  <Asterisk size={24} strokeWidth={3} />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Emergency Contact (Next of Kin)</h2>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Next of Kin Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Relationship</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-500 appearance-none">
                      <option value="">Select</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="child">Child</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">Emergency Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter phone number" 
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <button 
                onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
                disabled={activeStep === 1}
                className={`flex items-center gap-2 px-6 py-2.5 text-white font-medium rounded-lg transition-colors ${
                  activeStep === 1 ? 'bg-[#d1d5db] cursor-not-allowed' : 'bg-[#6b7280] hover:bg-[#4b5563] shadow-sm'
                }`}
              >
                <ArrowLeft size={18} />
                Previous
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Step {activeStep} of {steps.length}</span>
                <div className="flex gap-1.5">
                  {steps.map((step) => (
                    <div 
                      key={step.id} 
                      className={`h-2 rounded-full ${activeStep === step.id ? 'w-8 bg-[#0066cc]' : 'w-4 bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev))}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0033cc] hover:bg-[#0022cc] text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                {activeStep === steps.length ? 'Submit' : `Next Step: ${steps[activeStep]?.name}`}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterPatient;
