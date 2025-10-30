import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CertificateAuth() {
    const [formData, setFormData] = useState({ email: '', roll: '' });
    const [errors, setErrors] = useState({});
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (!formData.roll || formData.roll.trim().length < 2) {
            newErrors.roll = 'Valid roll number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsVerifying(true);
        try {
            const res = await fetch('https://webml-be.vercel.app/api/certificate/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Store user data in sessionStorage and navigate to certificate page
                sessionStorage.setItem('certificateData', JSON.stringify(data.data));
                navigate('/certificate');
            } else {
                if (data.attended === false) {
                    alert('❌ ' + data.error);
                } else {
                    alert('❌ ' + (data.error || 'Verification failed. Please check your credentials.'));
                }
            }
        } catch (error) {
            console.error('Verification error:', error);
            alert('❌ Network error. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center min-h-screen">
                {/* Back Button */}
                <Link
                    to="/"
                    className="absolute top-8 left-8 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all font-mono hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm md:text-base">&lt; Back to Home /&gt;</span>
                </Link>

                {/* Auth Form */}
                <div className="max-w-md w-full backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-8 md:p-10 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] font-mono mb-2">
                            <span className="text-cyan-500/60">&lt;</span>
                            Certificate Verification
                            <span className="text-cyan-500/60">/&gt;</span>
                        </h1>
                        <p className="text-gray-400 text-xs md:text-sm font-mono">
                            <span className="text-cyan-500/60">// </span>
                            Enter your credentials to download certificate
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-2">
                                <span className="text-cyan-500/60">&lt;</span>Email Address<span className="text-cyan-500/60">/&gt;</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                        </div>

                        {/* Roll Number */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-2">
                                <span className="text-cyan-500/60">&lt;</span>Roll Number<span className="text-cyan-500/60">/&gt;</span>
                            </label>
                            <input
                                type="text"
                                name="roll"
                                value={formData.roll}
                                onChange={handleChange}
                                placeholder="2023001"
                                className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                            />
                            {errors.roll && <p className="text-red-400 text-xs mt-1 font-mono">{errors.roll}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isVerifying}
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold font-mono text-base md:text-lg py-3 rounded-lg border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isVerifying ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                <span>
                                    <span className="text-cyan-200/80">&lt;</span>
                                    Verify & Get Certificate
                                    <span className="text-cyan-200/80">/&gt;</span>
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Help Section */}
                    <div className="mt-6 p-4 bg-[rgb(15,18,25)]/80 border border-purple-400/30 rounded-lg">
                        <p className="text-purple-400 font-mono text-xs mb-2">
                            <span className="text-purple-500/60">// </span>
                            Need Help?
                        </p>
                        <p className="text-gray-300 text-xs font-mono">
                            If any issue persists in downloading certificate or details in certificate, contact organizers at:
                        </p>
                        <a 
                            href="tel:8144219523" 
                            className="text-cyan-400 font-mono text-sm hover:text-cyan-300 transition-colors inline-flex items-center gap-2 mt-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            📞 8144219523
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(50px); }
                }
            `}</style>
        </div>
    );
}
