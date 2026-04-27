import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { X, Upload } from 'lucide-react';
import useFetch from "@/hooks/useFetch.jsx";
import { applyToJob } from "@/api/api-applications";
import { BarLoader } from "react-spinners";

export function ApplyJobModal({ user, token, job, fetchJob, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
    lastName: user?.user_metadata?.full_name?.split(' ')[1] || '',
    email: user?.email || '',
    resume: null
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files) {
      const file = files[0];
      
      // Validate file type - only allow PDF and Word documents
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        alert('Please upload only PDF or Word documents (.pdf, .doc, .docx)');
        e.target.value = ''; // Clear the input
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.resume) {
      alert('Please fill in all fields and upload your resume.');
      return;
    }

    // Double-check file type validation before submission
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = formData.resume.name.toLowerCase().substring(formData.resume.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(formData.resume.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload only PDF or Word documents (.pdf, .doc, .docx)');
      return;
    }

    try {
      console.log('🚀 Starting application submission...');
      console.log('📋 Form data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        resumeName: formData.resume?.name,
        resumeSize: formData.resume?.size,
        resumeType: formData.resume?.type
      });

      const result = await fnApply(token, {
        job_id: job.id,
        user_id: user.id,
        name: `${formData.firstName} ${formData.lastName}`,
        status: "pending",
        resume: formData.resume,
      });

      if (!result) {
        throw new Error('Application request completed without data.');
      }

      console.log('🎉 Application submission completed successfully!');
      console.log('📄 Application result:', result);

      alert('Application submitted successfully!');

      fetchJob();
      onClose();
      setFormData({
        firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
        lastName: user?.user_metadata?.full_name?.split(' ')[1] || '',
        email: user?.email || '',
        resume: null
      });
    } catch (error) {
      console.error('💥 Application submission failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      alert(`Error submitting application: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Apply for {job?.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resume/CV
            </label>
            <div className="relative">
              <Input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
                className="bg-slate-800 border-slate-600 text-white file:bg-cyan-600 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-3 file:hover:bg-cyan-500"
                required
              />
              <Upload className="absolute right-3 top-3 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          {errorApply?.message && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {errorApply.message}
            </div>
          )}

          {loadingApply && (
            <div className="flex justify-center py-4">
              <BarLoader width={200} color="#06b6d4" />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
              disabled={loadingApply}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
              disabled={loadingApply}
            >
              {loadingApply ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}