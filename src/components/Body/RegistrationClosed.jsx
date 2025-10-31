import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationClosed() {
    return (
        <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden flex items-center justify-center px-4 py-12">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl w-full">
                {/* Main Card */}
                <div className="backdrop-blur-md bg-[rgb(21,24,33)]/80 border-2 border-red-400/50 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(248,113,113,0.3)] text-center">
                    
                    {/* Clock Icon with Exclamation */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-red-400 shadow-[0_0_50px_rgba(248,113,113,0.6)] animate-pulse">
                                <svg className="w-14 h-14 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full border-4 border-[rgb(21,24,33)] flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.8)]">
                                <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 text-red-400">
                        <span className="text-red-500/60">&lt;</span>
                        Registration Closed
                        <span className="text-red-500/60"> /&gt;</span>
                    </h1>

                    <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mb-8"></div>

                    {/* Main Message */}
                    <div className="space-y-5 mb-10">
                        <p className="text-2xl md:text-3xl font-bold text-white font-mono">
                            <span className="text-orange-400">Sorry! You're Late</span>
                        </p>

                        <p className="text-gray-300 text-lg md:text-xl font-mono leading-relaxed">
                            <span className="text-gray-500">// </span>
                            The registration window for this event has been closed.
                        </p>

                        <p className="text-red-300 text-base md:text-lg font-mono">
                            All slots have been filled.
                        </p>
                    </div>

                    {/* Encouraging Message Box */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/40 rounded-xl p-6 md:p-8 mb-10 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <div className="mb-4">
                            <p className="text-cyan-400 font-mono text-2xl md:text-3xl font-bold mb-2">
                                But Don't Worry! 🎉
                            </p>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                        </div>
                        
                        <p className="text-gray-200 font-mono text-base md:text-lg leading-relaxed mb-4">
                            Stay connected with us on WhatsApp to get notified about our upcoming amazing workshops and events.
                        </p>
                        
                        <p className="text-purple-400 font-mono text-xl md:text-2xl font-bold">
                            Better Luck Next Time! 🚀
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                        <a
                            href="https://chat.whatsapp.com/your-group-link" // Replace with actual link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold font-mono text-base md:text-lg rounded-lg border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Join WhatsApp Group
                        </a>

                        <Link
                            to="/"
                            className="w-full md:w-auto px-8 py-4 bg-[rgb(21,24,33)] border-2 border-cyan-400 text-cyan-400 font-bold font-mono text-base md:text-lg rounded-lg hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>

                    {/* Info Box */}
                    <div className="p-5 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                        <p className="text-purple-400 font-mono text-sm md:text-base">
                            <span className="text-purple-500/60">// </span>
                            Follow us on WhatsApp for real-time updates on workshops, hackathons, and tech events
                        </p>
                    </div>
                </div>

                {/* Footer Contact */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 font-mono text-sm md:text-base">
                        <span className="text-gray-600">{"/* "}</span>
                        Have questions? Contact us at{' '}
                        <a 
                            href="tel:8144219523" 
                            className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold hover:underline"
                        >
                            📞 8144219523
                        </a>
                        <span className="text-gray-600">{" */"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
