import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [qrCodeData, setQrCodeData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        roll: '',
        email: '',
        mobile: '',
        branch: 'CSE',
        year: '',
        gender: '',
        domain: '',
        interests: [],
        experienceLevel: 'Beginner',
        website: '',
        github: '',
        linkedin: ''
    });

    const [errors, setErrors] = useState({});

    const interests = [
        'Web Development',
        'Machine Learning',
        'Data Science',
        'AI',
        'Full Stack',
        'Frontend',
        'Backend'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
        if (errors.interests) {
            setErrors(prev => ({ ...prev, interests: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        if (!formData.roll) {
            newErrors.roll = 'Roll number is required';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile must be 10 digits';
        }
        if (!formData.year) {
            newErrors.year = 'Year is required';
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }
        if (!formData.domain) {
            newErrors.domain = 'Domain is required';
        }
        if (formData.interests.length === 0) {
            newErrors.interests = 'Select at least one interest';
        }
        if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
            newErrors.website = 'Invalid URL';
        }
        if (formData.github && !/^https?:\/\/.+\..+/.test(formData.github)) {
            newErrors.github = 'Invalid GitHub URL';
        }
        if (formData.linkedin && !/^https?:\/\/.+\..+/.test(formData.linkedin)) {
            newErrors.linkedin = 'Invalid LinkedIn URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateQRCodeImage = (registrationId) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${registrationId}`;
    };

    const downloadPDF = async () => {
        if (!qrCodeData) return;

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Background gradient effect
        pdf.setFillColor(15, 18, 25);
        pdf.rect(0, 0, 210, 297, 'F');

        // Header section with neon effect
        pdf.setFillColor(21, 24, 33);
        pdf.roundedRect(15, 15, 180, 50, 5, 5, 'F');
        
        // Title
        pdf.setTextColor(6, 182, 212);
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BEHIND THE BROWSER', 105, 35, { align: 'center' });

        // Event details
        pdf.setFontSize(14);
        pdf.setTextColor(168, 85, 247);
        pdf.text('Workshop 2025', 105, 45, { align: 'center' });

        pdf.setFontSize(12);
        pdf.setTextColor(200, 200, 200);
        pdf.text('1st November, 2025', 105, 55, { align: 'center' });

        // Venue section
        pdf.setFillColor(21, 24, 33);
        pdf.roundedRect(15, 75, 180, 25, 5, 5, 'F');
        
        pdf.setFontSize(11);
        pdf.setTextColor(236, 72, 153);
        pdf.text('Venue:', 25, 85);
        
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(10);
        pdf.text('Seminar Hall, GITA Autonomous College', 25, 92);
        pdf.text('Bhubaneswar, Odisha', 25, 98);

        // Participant details
        pdf.setFillColor(21, 24, 33);
        pdf.roundedRect(15, 110, 180, 35, 5, 5, 'F');
        
        pdf.setFontSize(11);
        pdf.setTextColor(34, 197, 94);
        pdf.text('Participant Details:', 25, 120);
        
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(10);
        pdf.text(`Name: ${qrCodeData.name}`, 25, 128);
        pdf.text(`Roll No: ${qrCodeData.roll}`, 25, 135);
        pdf.text(`Registration ID: ${qrCodeData.registrationId}`, 25, 142);

        // QR Code section
        pdf.setFillColor(21, 24, 33);
        pdf.roundedRect(15, 155, 180, 100, 5, 5, 'F');
        
        pdf.setFontSize(14);
        pdf.setTextColor(6, 182, 212);
        pdf.text('Your Entry QR Code', 105, 168, { align: 'center' });

        // Add QR Code image
        const qrImage = generateQRCodeImage(qrCodeData.registrationId);
        try {
            // Create a temporary image to load the QR code
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = qrImage;
            
            await new Promise((resolve) => {
                img.onload = () => {
                    pdf.addImage(img, 'PNG', 70, 175, 70, 70);
                    resolve();
                };
            });
        } catch (error) {
            console.error('Error loading QR image:', error);
        }

        // Instructions
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text('Show this QR code at the entry gate', 105, 253, { align: 'center' });

        // Footer
        pdf.setDrawColor(6, 182, 212);
        pdf.setLineWidth(0.5);
        pdf.line(15, 265, 195, 265);
        
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('CSE Department @ GITA Autonomous College', 105, 272, { align: 'center' });
        pdf.text('Behind The Browser Team', 105, 278, { align: 'center' });

        // Save PDF
        pdf.save(`BTB-2025-${qrCodeData.registrationId}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            // const res = await fetch('https://webml-be.vercel.app/api/user/register', {
            const res = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                const registrationId = data.registration._id;
                
                setQrCodeData({
                    name: formData.name,
                    roll: formData.roll,
                    email: formData.email,
                    registrationId: registrationId
                });
                
                setRegistrationSuccess(true);
                
                // Scroll to QR code section
                setTimeout(() => {
                    document.getElementById('qr-section')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
                
                alert('✅ Registration Successful! Check your email for confirmation.');
            } else {
                alert(data.error || 'Registration Failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Network Error. Unable to connect to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewRegistration = () => {
        setRegistrationSuccess(false);
        setQrCodeData(null);
        setFormData({
            name: '',
            roll: '',
            email: '',
            mobile: '',
            branch: 'CSE',
            year: '',
            gender: '',
            domain: '',
            interests: [],
            experienceLevel: 'Beginner',
            website: '',
            github: '',
            linkedin: ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all mb-6 font-mono hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm md:text-base">&lt; Back to Home /&gt;</span>
                </Link>

                {/* Form Container */}
                {!registrationSuccess ? (
                    <div className="max-w-5xl mx-auto backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-6 md:p-10 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                <h1 className="text-2xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] font-mono">
                                    <span className="text-cyan-500/60">&lt;</span>
                                    Register for BTB Camp 2025
                                    <span className="text-cyan-500/60">/&gt;</span>
                                </h1>
                            </div>
                            <p className="text-gray-400 text-xs md:text-sm font-mono">
                                <span className="text-cyan-500/60">// </span>
                                Fill in your details to secure your spot
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Full Name<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.name}</p>}
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
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    />
                                    {errors.roll && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.roll}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Email<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.email}</p>}
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Mobile Number<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    />
                                    {errors.mobile && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.mobile}</p>}
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Branch<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    >
                                        <option value="CSE">CSE</option>
                                        <option value="CSE-AI">CSE-AI</option>
                                        <option value="CSE-AIML">CSE-AIML</option>
                                        <option value="CSE-IoT">CSE-IoT</option>
                                        <option value="CSE-CS">CSE-CS</option>
                                        <option value="CSE-DS">CSE-DS</option>
                                        <option value="CST">CST</option>
                                        <option value="CSIT">CSIT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EE">EE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Year<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    >
                                        <option value="">Select year</option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                        <option value="4th">4th Year</option>
                                    </select>
                                    {errors.year && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.year}</p>}
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Gender<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.gender}</p>}
                                </div>

                                {/* Domain */}
                                <div>
                                    <label className="block text-white font-mono text-sm md:text-base mb-2">
                                        <span className="text-cyan-500/60">&lt;</span>Preferred Domain<span className="text-cyan-500/60">/&gt;</span>
                                    </label>
                                    <select
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    >
                                        <option value="">Select domain</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Both">Both</option>
                                    </select>
                                    {errors.domain && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.domain}</p>}
                                </div>
                            </div>

                            {/* Interests */}
                            <div>
                                <label className="block text-white font-mono text-sm md:text-base mb-3">
                                    <span className="text-cyan-500/60">&lt;</span>Interests (Select multiple)<span className="text-cyan-500/60">/&gt;</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    {interests.map((interest) => (
                                        <label
                                            key={interest}
                                            className="flex items-center gap-2 cursor-pointer bg-[rgb(15,18,25)]/60 border border-purple-400/30 rounded px-3 py-2 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.interests.includes(interest)}
                                                onChange={() => handleInterestChange(interest)}
                                                className="accent-purple-500"
                                            />
                                            <span className="text-white font-mono text-xs md:text-sm">{interest}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.interests && <p className="text-red-400 text-xs md:text-sm mt-1 font-mono">{errors.interests}</p>}
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label className="block text-white font-mono text-sm md:text-base mb-2">
                                    <span className="text-cyan-500/60">&lt;</span>Experience Level<span className="text-cyan-500/60">/&gt;</span>
                                </label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Social Links */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {/* Website */}
                                <div>
                                    <label className="block text-white font-mono text-xs md:text-sm mb-2">
                                        <span className="text-green-500/60">&lt;</span>Website (Optional)<span className="text-green-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-green-400/30 rounded px-3 py-2 text-white font-mono text-xs md:text-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                                    />
                                    {errors.website && <p className="text-red-400 text-xs mt-1 font-mono">{errors.website}</p>}
                                </div>

                                {/* GitHub */}
                                <div>
                                    <label className="block text-white font-mono text-xs md:text-sm mb-2">
                                        <span className="text-green-500/60">&lt;</span>GitHub (Optional)<span className="text-green-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        placeholder="https://github.com/username"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-green-400/30 rounded px-3 py-2 text-white font-mono text-xs md:text-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                                    />
                                    {errors.github && <p className="text-red-400 text-xs mt-1 font-mono">{errors.github}</p>}
                                </div>

                                {/* LinkedIn */}
                                <div>
                                    <label className="block text-white font-mono text-xs md:text-sm mb-2">
                                        <span className="text-green-500/60">&lt;</span>LinkedIn (Optional)<span className="text-green-500/60">/&gt;</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/username"
                                        className="w-full bg-[rgb(15,18,25)]/80 border border-green-400/30 rounded px-3 py-2 text-white font-mono text-xs md:text-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                                    />
                                    {errors.linkedin && <p className="text-red-400 text-xs mt-1 font-mono">{errors.linkedin}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold font-mono text-base md:text-lg py-3 md:py-4 rounded-lg border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </span>
                                ) : (
                                    <span>
                                        <span className="text-cyan-200/80">&lt;</span>
                                        Register Now
                                        <span className="text-cyan-200/80">/&gt;</span>
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* QR Code Display Section */
                    <div id="qr-section" className="max-w-3xl mx-auto backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-6 md:p-10 shadow-[0_0_40px_rgba(6,182,212,0.2)] animate-fade-in">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-cyan-500/20 border-4 border-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] font-mono mb-2">
                                <span className="text-cyan-500/60">&lt;</span>
                                Registration Successful!
                                <span className="text-cyan-500/60">/&gt;</span>
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base font-mono">
                                <span className="text-purple-500/60">// </span>
                                Check your email for confirmation details
                            </p>
                        </div>

                        {/* Registration Details */}
                        <div className="bg-[rgb(15,18,25)]/80 border border-purple-400/30 rounded-lg p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base font-mono">
                                <div>
                                    <span className="text-purple-400">Name:</span>
                                    <span className="text-white ml-2">{qrCodeData?.name}</span>
                                </div>
                                <div>
                                    <span className="text-purple-400">Roll No:</span>
                                    <span className="text-white ml-2">{qrCodeData?.roll}</span>
                                </div>
                                <div className="md:col-span-2">
                                    <span className="text-purple-400">Registration ID:</span>
                                    <span className="text-cyan-400 ml-2 font-bold">{qrCodeData?.registrationId}</span>
                                </div>
                            </div>
                        </div>

                        {/* QR Code Display */}
                        <div className="bg-white rounded-lg p-6 mb-6 flex justify-center">
                            <img 
                                src={generateQRCodeImage(qrCodeData?.registrationId)} 
                                alt="Entry QR Code"
                                className="w-64 h-64 md:w-80 md:h-80"
                            />
                        </div>

                        {/* Instructions */}
                        <div className="bg-[rgb(15,18,25)]/80 border-l-4 border-pink-500 p-4 mb-6">
                            <p className="text-pink-400 font-mono font-bold mb-2 text-sm md:text-base">📱 Important Instructions:</p>
                            <ul className="text-gray-300 text-xs md:text-sm space-y-1 font-mono">
                                <li>✓ Download the PDF or take a screenshot</li>
                                <li>✓ Show this QR code at the venue entry</li>
                                <li>✓ Check your email for detailed information</li>
                                <li>✓ Keep your Registration ID safe</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={downloadPDF}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold font-mono text-sm md:text-base py-3 rounded-lg border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </button>

                            <button
                                onClick={handleNewRegistration}
                                className="w-full bg-[rgb(15,18,25)]/80 border-2 border-purple-400 hover:bg-purple-500/10 text-purple-400 font-bold font-mono text-sm md:text-base py-3 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Registration
                            </button>
                        </div>

                        {/* Footer Note */}
                        <p className="text-center text-gray-500 text-xs md:text-sm font-mono mt-6">
                            <span className="text-cyan-500/60">// </span>
                            See you at BTB Workshop 2025! 🚀
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(50px); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}
