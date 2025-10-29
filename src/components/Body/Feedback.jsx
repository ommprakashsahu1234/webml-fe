import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Feedback() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        branch: 'CSE',
        year: '',
        rating: 0,
        contentQuality: 0,
        instructorKnowledge: 0,
        venueRating: 0,
        feedback: '',
        improvements: '',
        nextEventSuggestion: '',
        wouldRecommend: null
    });

    const [errors, setErrors] = useState({});
    const [hoveredStar, setHoveredStar] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRating = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name is required';
        }
        if (!formData.year) {
            newErrors.year = 'Year is required';
        }
        if (formData.rating === 0) {
            newErrors.rating = 'Please rate your overall experience';
        }
        if (formData.contentQuality === 0) {
            newErrors.contentQuality = 'Please rate the content quality';
        }
        if (formData.instructorKnowledge === 0) {
            newErrors.instructorKnowledge = 'Please rate the instructor';
        }
        if (formData.venueRating === 0) {
            newErrors.venueRating = 'Please rate the venue';
        }
        if (!formData.feedback || formData.feedback.length < 10) {
            newErrors.feedback = 'Feedback must be at least 10 characters';
        }
        if (!formData.nextEventSuggestion) {
            newErrors.nextEventSuggestion = 'Please suggest a topic for next event';
        }
        if (formData.wouldRecommend === null) {
            newErrors.wouldRecommend = 'Please select if you would recommend';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('https://webml-be.vercel.app/api/feedback/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(data.error || 'Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            alert('Network Error. Unable to connect to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarRating = ({ field, label, value }) => {
        const displayValue = hoveredStar[field] || value;
        
        return (
            <div>
                <label className="block text-white font-mono text-sm md:text-base mb-2">
                    <span className="text-cyan-500/60">&lt;</span>{label}<span className="text-cyan-500/60">/&gt;</span>
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRating(field, star)}
                            onMouseEnter={() => setHoveredStar(prev => ({ ...prev, [field]: star }))}
                            onMouseLeave={() => setHoveredStar(prev => ({ ...prev, [field]: 0 }))}
                            className="transition-all transform hover:scale-110"
                        >
                            <svg
                                className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${
                                    star <= displayValue
                                        ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                                        : 'text-gray-600'
                                }`}
                                fill={star <= displayValue ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    ))}
                    <span className="text-cyan-400 font-mono ml-2 self-center">
                        {displayValue > 0 ? `${displayValue}/5` : ''}
                    </span>
                </div>
                {errors[field] && <p className="text-red-400 text-xs mt-1 font-mono">{errors[field]}</p>}
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden flex items-center justify-center px-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-8 md:p-12 max-w-2xl text-center shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                    <div className="w-20 h-20 bg-green-500/20 border-4 border-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] font-mono mb-4">
                        <span className="text-cyan-500/60">&lt;</span>
                        Thank You!
                        <span className="text-cyan-500/60">/&gt;</span>
                    </h2>
                    
                    <p className="text-gray-300 text-base md:text-lg mb-6 font-mono">
                        <span className="text-purple-500/60">// </span>
                        Your feedback has been submitted successfully.
                    </p>

                    <div className="bg-[rgb(15,18,25)]/80 border border-purple-400/30 rounded-lg p-6 mb-6">
                        <p className="text-purple-400 font-mono text-sm md:text-base">
                            🎉 We appreciate your time and valuable feedback!<br/>
                            Your insights help us improve future events.
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold font-mono rounded-lg border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all"
                    >
                        <span className="text-cyan-200/80">&lt;</span>
                        Back to Home
                        <span className="text-cyan-200/80">/&gt;</span>
                    </Link>
                </div>
            </div>
        );
    }

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
                <div className="max-w-4xl mx-auto backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-6 md:p-10 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <h1 className="text-2xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] font-mono">
                                <span className="text-cyan-500/60">&lt;</span>
                                Event Feedback
                                <span className="text-cyan-500/60">/&gt;</span>
                            </h1>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm font-mono">
                            <span className="text-cyan-500/60">// </span>
                            Help us improve by sharing your experience
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-white font-mono text-sm md:text-base mb-2">
                                    <span className="text-cyan-500/60">&lt;</span>Name<span className="text-cyan-500/60">/&gt;</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
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
                                    className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400"
                                >
                                    <option value="CSE">CSE</option>
                                    <option value="CSE-AI">CSE-AI</option>
                                    <option value="CSE-AIML">CSE-AIML</option>
                                    <option value="CSE-IoT">CSE-IoT</option>
                                    <option value="CSE-CS">CSE-CS</option>
                                    <option value="CSE-DS">CSE-DS</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EE">EE</option>
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
                                    className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400"
                                >
                                    <option value="">Select year</option>
                                    <option value="1st">1st Year</option>
                                    <option value="2nd">2nd Year</option>
                                    <option value="3rd">3rd Year</option>
                                    <option value="4th">4th Year</option>
                                </select>
                                {errors.year && <p className="text-red-400 text-xs mt-1 font-mono">{errors.year}</p>}
                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="backdrop-blur-sm bg-purple-900/10 border border-purple-400/30 rounded-lg p-6 space-y-6">
                            <h3 className="text-xl font-bold text-purple-400 font-mono text-center mb-4">
                                <span className="text-purple-500/60">&lt;</span>Rate Your Experience<span className="text-purple-500/60">/&gt;</span>
                            </h3>
                            
                            <StarRating field="rating" label="Overall Experience" value={formData.rating} />
                            <StarRating field="contentQuality" label="Content Quality" value={formData.contentQuality} />
                            <StarRating field="instructorKnowledge" label="Instructor Knowledge" value={formData.instructorKnowledge} />
                            <StarRating field="venueRating" label="Venue & Arrangements" value={formData.venueRating} />
                        </div>

                        {/* Feedback */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-2">
                                <span className="text-cyan-500/60">&lt;</span>Your Feedback<span className="text-cyan-500/60">/&gt;</span>
                            </label>
                            <textarea
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                placeholder="Share your thoughts about the workshop..."
                                rows={4}
                                className="w-full bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all resize-none"
                            />
                            {errors.feedback && <p className="text-red-400 text-xs mt-1 font-mono">{errors.feedback}</p>}
                        </div>

                        {/* Improvements */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-2">
                                <span className="text-green-500/60">&lt;</span>What can we improve? (Optional)<span className="text-green-500/60">/&gt;</span>
                            </label>
                            <textarea
                                name="improvements"
                                value={formData.improvements}
                                onChange={handleChange}
                                placeholder="Suggestions for improvement..."
                                rows={3}
                                className="w-full bg-[rgb(15,18,25)]/80 border border-green-400/30 rounded px-4 py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all resize-none"
                            />
                        </div>

                        {/* Next Event Suggestion */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-2">
                                <span className="text-pink-500/60">&lt;</span>Next Event Suggestion<span className="text-pink-500/60">/&gt;</span>
                            </label>
                            <input
                                type="text"
                                name="nextEventSuggestion"
                                value={formData.nextEventSuggestion}
                                onChange={handleChange}
                                placeholder="What topic would you like for the next workshop?"
                                className="w-full bg-[rgb(15,18,25)]/80 border border-pink-400/30 rounded px-4 py-2 md:py-3 text-white font-mono text-sm md:text-base focus:outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                            />
                            {errors.nextEventSuggestion && <p className="text-red-400 text-xs mt-1 font-mono">{errors.nextEventSuggestion}</p>}
                        </div>

                        {/* Would Recommend */}
                        <div>
                            <label className="block text-white font-mono text-sm md:text-base mb-3">
                                <span className="text-cyan-500/60">&lt;</span>Would you recommend this event to others?<span className="text-cyan-500/60">/&gt;</span>
                            </label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, wouldRecommend: true }));
                                        setErrors(prev => ({ ...prev, wouldRecommend: '' }));
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-mono font-bold transition-all ${
                                        formData.wouldRecommend === true
                                            ? 'bg-green-500/30 border-2 border-green-400 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                            : 'bg-[rgb(15,18,25)]/80 border border-green-400/30 text-gray-400 hover:text-green-400'
                                    }`}
                                >
                                    👍 Yes, Definitely!
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, wouldRecommend: false }));
                                        setErrors(prev => ({ ...prev, wouldRecommend: '' }));
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-mono font-bold transition-all ${
                                        formData.wouldRecommend === false
                                            ? 'bg-red-500/30 border-2 border-red-400 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                            : 'bg-[rgb(15,18,25)]/80 border border-red-400/30 text-gray-400 hover:text-red-400'
                                    }`}
                                >
                                    👎 Not Really
                                </button>
                            </div>
                            {errors.wouldRecommend && <p className="text-red-400 text-xs mt-1 font-mono">{errors.wouldRecommend}</p>}
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
                                    Submitting...
                                </span>
                            ) : (
                                <span>
                                    <span className="text-cyan-200/80">&lt;</span>
                                    Submit Feedback
                                    <span className="text-cyan-200/80">/&gt;</span>
                                </span>
                            )}
                        </button>
                    </form>
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
