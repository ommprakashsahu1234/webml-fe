import React, { useState, useEffect } from 'react';

import jay from '../organisers/jaynarayanpanda.jpg'
import omm from '../organisers/ommprakashsahu.png'
import jyoti from '../organisers/jyoti.png'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [typedText, setTypedText] = useState('');
  const fullText = "Join us for the ultimate WebML Camp 2025 experience! Dive into Full-Stack Web Development and AI-ML fundamentals to build smart, practical applications.";


  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2025-11-01T12:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust speed (lower = faster)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(15,18,25)] text-white">

      {/* Hero Section */}
      {/* Hero Section with Typing Effect */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="backdrop-blur-md bg-[rgb(21,24,33)]/40 border border-cyan-400/20 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-cyan-400 text-2xl md:text-3xl font-mono">&lt;&gt;</span>
              <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                Welcome to WebML
              </h1>
              <svg className="w-8 h-8 md:w-10 md:h-10 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            {/* Typing Effect Text */}
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-mono">
                <span className="text-cyan-500/60">&lt;p&gt;</span>
                <span className="mx-2">
                  {typedText}
                  <span className="inline-block w-0.5 h-5 bg-cyan-400 animate-pulse ml-1"></span>
                </span>
                <span className="text-cyan-500/60">&lt;/p&gt;</span>
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Event Countdown Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-pink-400/30 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <svg className="w-8 h-8 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
                Event Countdown
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4 font-mono text-sm md:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>1st Nov, 2025 | 12:00 PM onwards</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-green-400 mb-8 font-mono text-sm md:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Seminar Hall, Main Building (209)</span>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { value: timeLeft.days.toString().padStart(2, '0'), label: 'Days', color: 'cyan' },
                { value: timeLeft.hours.toString().padStart(2, '0'), label: 'Hours', color: 'pink' },
                { value: timeLeft.minutes.toString().padStart(2, '0'), label: 'Minutes', color: 'green' },
                { value: timeLeft.seconds.toString().padStart(2, '0'), label: 'Seconds', color: 'purple' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`text-4xl md:text-6xl font-bold font-mono text-${item.color}-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] bg-${item.color}-500/10 border-2 border-${item.color}-400/50 rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]`}>
                    {item.value}
                  </div>
                  <div className={`text-xs md:text-sm mt-2 text-${item.color}-400 font-mono`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About WebML Camp 2025 Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="backdrop-blur-md bg-[rgb(21,24,33)]/40 border border-cyan-400/20 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                About WebML Camp 2025
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              <span className="text-cyan-400 font-mono">&lt;p&gt;</span>
              <span className="mx-2">
                WebML Camp 2025 is a one-day technical workshop designed to introduce students to Full-Stack Web Development (MERN Stack) and Artificial Intelligence (Machine Learning fundamentals). Organized by the CSE Department, the event aims to provide students with hands-on experience in building smart web applications.
              </span>
              <span className="text-cyan-400 font-mono">&lt;/p&gt;</span>
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <span className="text-cyan-400 font-mono">&lt;span&gt;</span>
              <span className="mx-2">
                This event is ideal for B.Tech 1st & 2nd year students eager to expand their technical skillset and gain practical knowledge.
              </span>
              <span className="text-cyan-400 font-mono">&lt;/span&gt;</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Who Should Attend */}
            <div className="backdrop-blur-sm bg-cyan-900/10 border border-cyan-400/30 rounded-lg p-6 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 font-mono">
                <span className="text-cyan-500/60">&lt;</span>Who Should Attend<span className="text-cyan-500/60">/&gt;</span>
              </h3>
              <ul className="space-y-3">
                {[
                  'B.Tech 1st and 2nd year students from CSE and related branches',
                  'Students eager to learn modern web development and AI/ML tools'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Learning Outcomes */}
            <div className="backdrop-blur-sm bg-green-900/10 border border-green-400/30 rounded-lg p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all">
              <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4 font-mono">
                <span className="text-green-500/60">&lt;</span>Key Learning Outcomes<span className="text-green-500/60">/&gt;</span>
              </h3>
              <ul className="space-y-3">
                {[
                  'Hands-on with MERN stack technologies',
                  'Foundation in Artificial Intelligence and Machine Learning concepts',
                  'Project-based learning to build real applications'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Topics to be Covered Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="backdrop-blur-md bg-[rgb(21,24,33)]/40 border border-cyan-400/20 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                Topics to be Covered
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Web Development */}
            <div className="backdrop-blur-sm bg-cyan-900/10 border border-cyan-400/30 rounded-lg p-6 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 text-center font-mono">
                <span className="text-cyan-500/60">&lt;</span>Web Development<span className="text-cyan-500/60">/&gt;</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-400/30">
                      <th className="text-left py-2 px-2 text-cyan-400 font-mono">Session</th>
                      <th className="text-left py-2 px-2 text-cyan-400 font-mono">Topic</th>
                      <th className="text-left py-2 px-2 text-cyan-400 font-mono">Duration</th>
                      <th className="text-left py-2 px-2 text-cyan-400 font-mono">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 font-mono text-xs md:text-sm">
                    {[
                      { session: '1', topic: 'HTML + CSS Basics', duration: '1 hr', outcome: 'Create awesome layout' },
                      { session: '2', topic: 'JavaScript Fundamentals', duration: '0.5-1 hr', outcome: 'Add interactivity to page' },
                      { session: '3', topic: 'Node.js & NPM Intro', duration: '0.5 hr', outcome: 'Backend basics & level server' },
                      { session: '4', topic: 'Express Basics', duration: '0.5-0.75 hr', outcome: 'Build basic REST API' },
                      { session: '5', topic: 'MongoDB Overview', duration: '0.5-0.75 hr', outcome: 'Insert & fetch data from DB' },
                      { session: '6', topic: 'React Basics', duration: '1-1.25 hr', outcome: 'Build front component' },
                      { session: '7', topic: 'Mini Project', duration: '', outcome: 'Integration' }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-colors">
                        <td className="py-2 px-2 text-cyan-400">{row.session}</td>
                        <td className="py-2 px-2">{row.topic}</td>
                        <td className="py-2 px-2 text-cyan-300">{row.duration}</td>
                        <td className="py-2 px-2 text-gray-400">{row.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Machine Learning */}
            <div className="backdrop-blur-sm bg-green-900/10 border border-green-400/30 rounded-lg p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all">
              <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-6 text-center font-mono">
                <span className="text-green-500/60">&lt;</span>Machine Learning<span className="text-green-500/60">/&gt;</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-400/30">
                      <th className="text-left py-2 px-2 text-green-400 font-mono">Session</th>
                      <th className="text-left py-2 px-2 text-green-400 font-mono">Topic</th>
                      <th className="text-left py-2 px-2 text-green-400 font-mono">Duration</th>
                      <th className="text-left py-2 px-2 text-green-400 font-mono">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 font-mono text-xs md:text-sm">
                    {[
                      { session: '1', topic: 'Introduction to AI & ML', duration: '0.5 hr', outcome: 'Understand ML use cases' },
                      { session: '2', topic: 'Python Basics for ML', duration: '0.75 hr', outcome: 'Basic Python for data' },
                      { session: '3', topic: 'Pandas & Matplotlib', duration: '0.5-1 hr', outcome: 'Explore datasets visually' },
                      { session: '4', topic: 'ML Concepts Intro', duration: '0.5 hr', outcome: 'Understand ML pipeline' },
                      { session: '5', topic: 'Scikit-Learn Hands-on', duration: '1-1.25 hr', outcome: 'Train text ML model' },
                      { session: '6', topic: 'Mini Project Demo', duration: '', outcome: '' }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors">
                        <td className="py-2 px-2 text-green-400">{row.session}</td>
                        <td className="py-2 px-2">{row.topic}</td>
                        <td className="py-2 px-2 text-green-300">{row.duration}</td>
                        <td className="py-2 px-2 text-gray-400">{row.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-400/30 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                What You'll Learn
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                text: 'Learn to build full stack apps using MERN',
                color: 'cyan'
              },
              {
                icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
                text: 'Understand basics of AI-ML',
                color: 'green'
              },
              {
                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
                text: 'Get practical exposure to React, Node.js, and Scikit-learn',
                color: 'purple'
              },
              {
                icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
                text: 'Build and deploy small projects',
                color: 'pink'
              }
            ].map((item, index) => (
              <div key={index} className={`backdrop-blur-sm bg-${item.color}-900/10 border border-${item.color}-400/30 rounded-lg p-6 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all flex items-start gap-4`}>
                <svg className={`w-6 h-6 text-${item.color}-400 flex-shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <p className="text-gray-300 text-sm md:text-base">
                  <span className={`text-${item.color}-500/60 font-mono`}>&lt;li&gt;</span>
                  <span className="mx-2">{item.text}</span>
                  <span className={`text-${item.color}-500/60 font-mono`}>&lt;/li&gt;</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="backdrop-blur-md bg-[rgb(21,24,33)]/40 border border-pink-400/30 rounded-lg p-8 md:p-12 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
                Contact Us
              </h2>
            </div>
          </div>

          {/* Faculty Coordinator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="backdrop-blur-sm bg-cyan-900/10 border border-cyan-400/30 rounded-lg p-6 text-center">
              <h3 className="text-cyan-400 font-mono text-lg mb-2">Faculty Coordinator</h3>
              <h4 className="text-2xl font-bold text-white mb-4">Prof. Ramesh Kumar</h4>
              <div className="flex flex-col gap-2 text-gray-300 font-mono text-sm">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>csefaculty@university.edu</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 - 9876543210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organizers */}
          <div className="mb-6">
            <h3 className="text-center text-green-400 font-mono text-xl mb-6">
              <span className="text-green-500/60">&lt;</span>Organizers<span className="text-green-500/60">/&gt;</span>
            </h3>
          </div>


<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
  {[
    { 
      name: 'Omm Prakash Sahu', 
      role: 'Lead Organizer', 
      profile: omm,
      links: {
        github: 'https://github.com/ommprakashsahu1234',
        linkedin: 'https://www.linkedin.com/in/omm-prakash-sahu',
        portfolio: 'https://ommprakashsahu-portfolio.netlify.app',
        email: 'mailto:opsommprakash@gmail.com'
      }
    },
    { 
      name: 'Jaynarayan Panda', 
      role: 'Co-Organizer', 
      profile: jay,
      links: {
        github: 'https://github.com/Jaypanda28',
        linkedin: 'https://www.linkedin.com/in/jaynarayan-panda-8531831b6',
        portfolio: 'https://jaynarayanportfolio.netlify.app',
        email: 'pandajaynarayan49@gmail.com'
      }
    },
    { 
      name: 'Jyoti Swarup Parhi', 
      role: 'Technical Lead', 
      profile: jyoti,
      links: {
        github: 'https://github.com/Jyoti-jitu',
        linkedin: 'http://www.linkedin.com/in/jyoti-swarup',
        portfolio: 'https://github.com/Jyoti-jitu/Bput-Smartreach',
        email: 'jspbp2005@gmail.com'
      }
    }
  ].map((organizer, index) => (
    <div 
      key={index} 
      className="backdrop-blur-sm bg-purple-900/10 border border-purple-400/30 rounded-lg p-6 text-center hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all"
    >
      {/* Profile Picture with Neon Border */}
      <div className="relative w-28 h-28 mx-auto mb-4 group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 animate-pulse"></div>
        <div className="absolute inset-1 rounded-full bg-[rgb(21,24,33)] flex items-center justify-center overflow-hidden">
          <img 
            src={organizer.profile} 
            alt={organizer.name} 
            title={organizer.name}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-1">{organizer.name}</h4>
      <p className="text-sm text-gray-400 font-mono mb-4">{organizer.role}</p>
      
      <div className="flex justify-center gap-3">
        {/* GitHub */}
        <a 
          href={organizer.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a 
          href={organizer.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* Portfolio/Project */}
        <a 
          href={organizer.links.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          aria-label="Portfolio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>

        {/* Email */}
        <a 
          href={organizer.links.email}
          className="text-cyan-400 hover:text-cyan-300 transition-colors hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </a>
      </div>
    </div>
  ))}
</div>



        </div>
      </section>

      {/* Ready to Level Up CTA Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 pb-16">
        <div className="backdrop-blur-md bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-400/30 rounded-lg p-8 md:p-12 text-center shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">
            <span className="text-cyan-500/60 font-mono">&lt;</span>
            Ready to Level Up?
            <span className="text-cyan-500/60 font-mono">/&gt;</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to learn cutting-edge technologies and build real-world projects-LT!
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 border-2 border-pink-400 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-400 font-bold font-mono rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] group"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-pink-500/60">&lt;</span>
              Register for WebML Camp 2025
              <span className="text-pink-500/60">/&gt;</span>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
