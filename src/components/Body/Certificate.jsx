import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
// Import logos
import gitaLogo from '../../../public/gita.png';  // Update path as needed
import csiLogo from '../../../public/csi.png';     // Update path as needed
// Import signature images
import hodsign from '../../signatures/hod.jpg'
import surensign from '../../signatures/suren.jpg';
import principalSign from '../../signatures/principal.jpg';

export default function Certificate() {
    const [userData, setUserData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const certificateRef = useRef(null);

    useEffect(() => {
        const data = sessionStorage.getItem('certificateData');
        if (!data) {
            navigate('/certificate-auth');
        } else {
            setUserData(JSON.parse(data));
        }

        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [navigate]);

    const downloadCertificate = async () => {
        setIsDownloading(true);
        try {
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;

            // === BACKGROUND & BORDERS ===
            pdf.setDrawColor(218, 165, 32);
            pdf.setLineWidth(3);
            pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

            pdf.setDrawColor(15, 118, 110);
            pdf.setLineWidth(2);
            pdf.rect(8, 8, pageWidth - 16, pageHeight - 16);

            pdf.setDrawColor(202, 138, 4);
            pdf.setLineWidth(1.5);
            pdf.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2));

            // === ADD LOGOS ===
            try {
                // Left logo - GITA
                pdf.addImage(gitaLogo, 'PNG', margin + 5, margin + 5, 20, 20);
                pdf.setFontSize(7);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(75, 85, 99);
                pdf.text('GITA Autonomous', margin + 15, margin + 28, { align: 'center' });
                pdf.text('College', margin + 15, margin + 32, { align: 'center' });

                // Right logo - CSI
                pdf.addImage(csiLogo, 'PNG', pageWidth - margin - 25, margin + 5, 20, 20);
                pdf.text('Computer Society', pageWidth - margin - 15, margin + 28, { align: 'center' });
                pdf.text('of India (CSI)', pageWidth - margin - 15, margin + 32, { align: 'center' });
            } catch (e) {
                console.log('Logos not added:', e.message);
            }

            // === CORNER DECORATIONS ===
            const cornerSize = 20;
            pdf.setDrawColor(15, 118, 110);
            pdf.setLineWidth(2);

            pdf.line(margin, margin, margin + cornerSize, margin);
            pdf.line(margin, margin, margin, margin + cornerSize);

            pdf.line(pageWidth - margin, margin, pageWidth - margin - cornerSize, margin);
            pdf.line(pageWidth - margin, margin, pageWidth - margin, margin + cornerSize);

            pdf.line(margin, pageHeight - margin, margin + cornerSize, pageHeight - margin);
            pdf.line(margin, pageHeight - margin, margin, pageHeight - margin - cornerSize);

            pdf.line(pageWidth - margin, pageHeight - margin, pageWidth - margin - cornerSize, pageHeight - margin);
            pdf.line(pageWidth - margin, pageHeight - margin, pageWidth - margin, pageHeight - margin - cornerSize);

            // === HEADER ===
            pdf.setFontSize(40);
            pdf.setFont('times', 'bold');
            pdf.setTextColor(31, 41, 55);
            pdf.text('Certificate of Participation', pageWidth / 2, 40, { align: 'center' });

            pdf.setDrawColor(202, 138, 4);
            pdf.setLineWidth(0.5);
            pdf.line(80, 48, 115, 48);
            pdf.line(pageWidth - 80, 48, pageWidth - 115, 48);

            pdf.setFontSize(14);
            pdf.setFont('times', 'italic');
            pdf.setTextColor(75, 85, 99);
            pdf.text('This is awarded to', pageWidth / 2, 55, { align: 'center' });

            // === NAME SECTION ===
            pdf.setFontSize(32);
            pdf.setFont('times', 'bold');
            pdf.setTextColor(15, 118, 110);
            pdf.text(userData.name, pageWidth / 2, 75, { align: 'center' });

            const nameWidth = pdf.getTextWidth(userData.name);
            pdf.setDrawColor(156, 163, 175);
            pdf.setLineWidth(0.8);
            pdf.line((pageWidth - nameWidth) / 2, 78, (pageWidth + nameWidth) / 2, 78);

            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(75, 85, 99);
            pdf.text(`${userData.branch} - ${userData.year} Year | Roll No: ${userData.roll}`, pageWidth / 2, 88, { align: 'center' });

            // === BODY TEXT ===
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(55, 65, 81);
            pdf.text('For the participation in the completion of', pageWidth / 2, 105, { align: 'center' });

            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(15, 118, 110);
            pdf.text('"BEHIND THE BROWSER"', pageWidth / 2, 115, { align: 'center' });

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(75, 85, 99);

            const descLine1 = 'A workshop on Node.js & Express.js server development and implementation,';
            const descLine2 = 'organized by Computer Society of India (CSI) in collaboration with';
            const descLine3 = 'the Department of CSE, GITA Autonomous College.';

            pdf.text(descLine1, pageWidth / 2, 127, { align: 'center' });
            pdf.text(descLine2, pageWidth / 2, 134, { align: 'center' });
            pdf.text(descLine3, pageWidth / 2, 141, { align: 'center' });

            pdf.setFontSize(10);
            pdf.setTextColor(107, 114, 128);
            pdf.text('Date: 1st November, 2025', pageWidth / 2, 151, { align: 'center' });

            // === SIGNATURES WITH ROTATION FIX ===
            const signY = pageHeight - 45;
            const leftX = 55;
            const rightX = pageWidth - 55;

            try {
                // Function to rotate image
                const rotateAndAddImage = async (imgSrc, x, y, width, height, rotation = 0) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = function () {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            // Set canvas dimensions based on rotation
                            if (rotation === 90 || rotation === 270) {
                                canvas.width = img.height;
                                canvas.height = img.width;
                            } else {
                                canvas.width = img.width;
                                canvas.height = img.height;
                            }

                            // Rotate and draw
                            ctx.save();
                            if (rotation === 90) {
                                ctx.translate(canvas.width, 0);
                                ctx.rotate(90 * Math.PI / 180);
                            } else if (rotation === 270 || rotation === -90) {
                                ctx.translate(0, canvas.height);
                                ctx.rotate(-90 * Math.PI / 180);
                            } else if (rotation === 180) {
                                ctx.translate(canvas.width, canvas.height);
                                ctx.rotate(180 * Math.PI / 180);
                            }

                            ctx.drawImage(img, 0, 0);
                            ctx.restore();

                            const rotatedImg = canvas.toDataURL('image/png');
                            pdf.addImage(rotatedImg, 'PNG', x, y, width, height);
                            resolve();
                        };
                        img.onerror = () => {
                            console.log('Image load error');
                            resolve();
                        };
                        img.src = imgSrc;
                    });
                };

                await rotateAndAddImage(csiSign, leftX - 20, signY - 15, 40, 12, 0);
                await rotateAndAddImage(principalSign, rightX - 20, signY - 15, 40, 12, 0);


            } catch (e) {
                console.log('Signature images not added:', e.message);
            }

            pdf.setDrawColor(31, 41, 55);
            pdf.setLineWidth(0.8);
            pdf.line(leftX - 25, signY, leftX + 25, signY);

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(55, 65, 81);
            pdf.text('CSI Co-ordinator', leftX, signY + 6, { align: 'center' });

            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(107, 114, 128);
            pdf.text('Computer Society of India', leftX, signY + 11, { align: 'center' });

            pdf.line(rightX - 25, signY, rightX + 25, signY);

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(55, 65, 81);
            pdf.text('Principal', rightX, signY + 6, { align: 'center' });

            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(107, 114, 128);
            pdf.text('GITA Autonomous College', rightX, signY + 11, { align: 'center' });

            // === CENTER STAR BADGE ===
            // const starX = pageWidth / 2;
            // const starY = signY;
            // const starRadius = 8;

            // pdf.setFillColor(234, 179, 8);
            // pdf.setDrawColor(202, 138, 4);
            // pdf.setLineWidth(1.5);
            // pdf.circle(starX, starY, starRadius, 'FD');

            // // Draw star properly
            // pdf.setFontSize(16);
            // pdf.setTextColor(133, 77, 14);
            // // pdf.text('★', starX, starY + 2, { align: 'center' });
            // pdf.text('A', starX, starY + 2, { align: 'center' });


            // === CENTER STAR BADGE ===
            const starX = pageWidth / 2;
            const starY = signY;
            const starRadius = 8;

            // Gold circle
            pdf.setFillColor(234, 179, 8);
            pdf.setDrawColor(202, 138, 4);
            pdf.setLineWidth(1.5);
            pdf.circle(starX, starY, starRadius, 'FD');

            // Draw a 5-pointed star shape
            const drawStar = (cx, cy, spikes, outerRadius, innerRadius) => {
                let rot = Math.PI / 2 * 3;
                let x = cx;
                let y = cy;
                const step = Math.PI / spikes;

                const points = [];

                for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    points.push({ x, y });
                    rot += step;

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    points.push({ x, y });
                    rot += step;
                }

                // Draw the star
                pdf.setFillColor(133, 77, 14); // Yellow-800
                pdf.setDrawColor(133, 77, 14);

                // Start path
                pdf.lines(
                    points.slice(1).map((p, i) => [
                        p.x - points[i].x,
                        p.y - points[i].y
                    ]),
                    points[0].x,
                    points[0].y,
                    [1, 1],
                    'FD',
                    true
                );
            };

            // Draw the star (5 points, outer radius 4, inner radius 1.5)
            drawStar(starX, starY, 5, 4, 1.5);


            pdf.save(`BTB_Certificate_${userData.roll}.pdf`);

            await fetch('https://webml-be.vercel.app/api/certificate/record-download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    roll: userData.roll
                })
            }).catch(err => console.error('Download tracking error:', err));

            alert('✅ Certificate downloaded successfully!');

        } catch (error) {
            console.error('Error generating certificate:', error);
            alert('❌ Error generating certificate: ' + error.message);
        } finally {
            setIsDownloading(false);
        }
    };


    if (!userData) {
        return <div className="min-h-screen bg-[rgb(15,18,25)] flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden py-6 md:py-12 px-2 md:px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                <div className="text-center mb-4 md:mb-8">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-cyan-400 font-mono mb-2">
                        <span className="text-cyan-500/60">&lt;</span>
                        Your Certificate is Ready!
                        <span className="text-cyan-500/60">/&gt;</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-xs md:text-sm">
                        <span className="text-purple-500/60">// </span>
                        Preview and download your certificate
                    </p>
                </div>

                {/* Certificate Preview Container */}
                <div className="bg-white border border-cyan-400/30 rounded-lg p-2 md:p-8 shadow-lg mb-6 md:mb-8">
                    <div ref={certificateRef} className="bg-white relative" style={{
                        width: '100%',
                        aspectRatio: isMobile ? 'auto' : '1.414/1',
                        minHeight: isMobile ? '600px' : 'auto'
                    }}>
                        {/* Certificate Design */}
                        <div className={`relative h-full border-4 md:border-8 border-double border-yellow-600 ${isMobile ? 'p-4' : 'p-10'}`}>

                            {/* LOGOS OVERLAY */}
                            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-lg p-2">
                                <img
                                    src={gitaLogo}
                                    alt="GITA Logo"
                                    className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} object-contain mb-1`}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <p className={`${isMobile ? 'text-[6px]' : 'text-[9px]'} text-gray-700 text-center font-semibold leading-tight`}>
                                    GITA Autonomous<br />College
                                </p>
                            </div>

                            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-lg p-2">
                                <img
                                    src={csiLogo}
                                    alt="CSI Logo"
                                    className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} object-contain mb-1`}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <p className={`${isMobile ? 'text-[6px]' : 'text-[9px]'} text-gray-700 text-center font-semibold leading-tight`}>
                                    Computer Society<br />of India (CSI)
                                </p>
                            </div>

                            {/* Corner Decorations */}
                            <div className={`absolute top-0 left-0 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-teal-700`}></div>
                            <div className={`absolute top-0 right-0 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-teal-700`}></div>
                            <div className={`absolute bottom-0 left-0 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-teal-700`}></div>
                            <div className={`absolute bottom-0 right-0 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-teal-700`}></div>

                            {/* Content */}
                            <div className="flex flex-col justify-between h-full text-center relative">
                                {/* Header - MOBILE TEXT SIZES REDUCED */}
                                <div className={isMobile ? 'mt-20' : ''}>
                                    <h1 className={`${isMobile ? 'text-lg' : 'text-3xl md:text-5xl'} font-serif font-bold text-gray-800 ${isMobile ? 'mb-2' : 'mb-6'}`}>
                                        Certificate of Participation
                                    </h1>
                                    <div className={`flex items-center justify-center ${isMobile ? 'gap-2 mb-3' : 'gap-4 mb-8'}`}>
                                        <div className={`h-px bg-yellow-600 ${isMobile ? 'w-10' : 'w-32'}`}></div>
                                        <p className={`${isMobile ? 'text-xs' : 'text-xl'} text-gray-600 font-serif italic`}>This is awarded to</p>
                                        <div className={`h-px bg-yellow-600 ${isMobile ? 'w-10' : 'w-32'}`}></div>
                                    </div>
                                </div>

                                {/* Name - MOBILE TEXT SIZES REDUCED */}
                                <div className={isMobile ? 'my-2' : 'my-6'}>
                                    <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-4xl'} font-serif font-bold text-teal-700 ${isMobile ? 'mb-1' : 'mb-2'} border-b-2 border-gray-400 pb-2 inline-block ${isMobile ? 'px-4' : 'px-12'}`}>
                                        {userData.name}
                                    </h2>
                                    <p className={`${isMobile ? 'text-[10px]' : 'text-lg'} text-gray-600 ${isMobile ? 'mt-1' : 'mt-4'}`}>
                                        {userData.branch} - {userData.year} Year
                                    </p>
                                    <p className={`${isMobile ? 'text-[10px]' : 'text-lg'} text-gray-600`}>
                                        Roll No: {userData.roll}
                                    </p>
                                </div>

                                {/* Body Text - MOBILE TEXT SIZES REDUCED */}
                                <div className={isMobile ? 'my-2' : 'my-6'}>
                                    <p className={`${isMobile ? 'text-[10px]' : 'text-lg'} text-gray-700 leading-relaxed`}>
                                        For the participation in the completion of
                                    </p>
                                    <h3 className={`${isMobile ? 'text-sm my-1' : 'text-2xl my-3'} font-bold text-teal-700`}>
                                        "BEHIND THE BROWSER"
                                    </h3>
                                    <p className={`${isMobile ? 'text-[8px] leading-tight' : 'text-base'} text-gray-600 ${isMobile ? 'mx-2' : 'max-w-3xl mx-auto'} leading-relaxed`}>
                                        A workshop on <span className="font-semibold">Node.js & Express.js server development and implementation</span>,
                                        organized by <span className="font-semibold">Computer Society of India (CSI)</span> in collaboration with
                                        the <span className="font-semibold">Department of CSE, GITA Autonomous College</span>.
                                    </p>
                                    <p className={`${isMobile ? 'text-[8px] mt-1' : 'text-sm mt-3'} text-gray-500`}>
                                        Date: 1st November, 2025
                                    </p>
                                </div>

                                {/* Signatures Section */}
                                <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-end'} mt-auto ${isMobile ? 'pt-2 px-4 pb-3' : 'pt-4 px-12 pb-6'}`}>
                                    {isMobile ? (
                                        <>
                                            <div className="flex justify-between items-end border-t border-gray-300 pt-2">
                                                <div className="text-left flex-1">
                                                    <div className="mb-1" style={{ height: '25px' }}>
                                                        <img
                                                            src={csiSign}
                                                            alt="CSI Signature"
                                                            className="h-full w-auto object-contain"
                                                            style={{ maxWidth: '80px' }}
                                                            onError={(e) => e.target.style.display = 'none'}
                                                        />
                                                    </div>
                                                    <div className="border-t-2 border-gray-800 w-24 mb-1"></div>
                                                    <p className="text-[8px] font-semibold text-gray-700 leading-tight">CSI Co-ordinator</p>
                                                    <p className="text-[7px] text-gray-500 leading-tight">Computer Society of India</p>
                                                </div>

                                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-600 shadow-lg">
                                                    <svg className="w-5 h-5 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="mb-1 flex justify-end" style={{ height: '25px' }}>
                                                    <img
                                                        src={principalSign}
                                                        alt="Principal Signature"
                                                        className="h-full w-auto object-contain"
                                                        style={{ maxWidth: '80px' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                </div>
                                                <div className="border-t-2 border-gray-800 w-24 mb-1 ml-auto"></div>
                                                <p className="text-[8px] font-semibold text-gray-700 leading-tight">Principal</p>
                                                <p className="text-[7px] text-gray-500 leading-tight">GITA Autonomous College</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-center flex flex-col items-center" style={{ width: '35%' }}>
                                                <div className="mb-1 flex items-end justify-center" style={{ height: '50px' }}>
                                                    <img
                                                        src={csiSign}
                                                        alt="CSI Signature"
                                                        className="max-w-full h-auto object-contain"
                                                        style={{ maxHeight: '50px', maxWidth: '160px' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                </div>
                                                <div className="border-t-2 border-gray-800 w-full mb-1.5"></div>
                                                <p className="text-xs font-semibold text-gray-700 leading-tight">CSI Co-ordinator</p>
                                                <p className="text-[10px] text-gray-500 leading-tight">Computer Society of India</p>
                                            </div>

                                            <div className="flex items-end justify-center" style={{ width: '25%' }}>
                                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-yellow-600 shadow-lg mb-3">
                                                    <svg className="w-8 h-8 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="text-center flex flex-col items-center" style={{ width: '35%' }}>
                                                <div className="mb-1 flex items-end justify-center" style={{ height: '50px' }}>
                                                    <img
                                                        src={principalSign}
                                                        alt="Principal Signature"
                                                        className="max-w-full h-auto object-contain"
                                                        style={{ maxHeight: '50px', maxWidth: '160px' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                </div>
                                                <div className="border-t-2 border-gray-800 w-full mb-1.5"></div>
                                                <p className="text-xs font-semibold text-gray-700 leading-tight">Principal</p>
                                                <p className="text-[10px] text-gray-500 leading-tight">GITA Autonomous College</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:gap-4 max-w-2xl mx-auto px-2">
                    <button
                        onClick={downloadCertificate}
                        disabled={isDownloading}
                        className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold font-mono text-sm md:text-lg rounded-lg border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating PDF...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF Certificate
                            </span>
                        )}
                    </button>

                    <Link
                        to="/"
                        className="w-full px-6 md:px-8 py-3 md:py-4 bg-[rgb(21,24,33)] border-2 border-cyan-400 text-cyan-400 font-bold font-mono text-sm md:text-lg rounded-lg hover:bg-cyan-500/10 transition-all text-center"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                    </Link>
                </div>

                {/* Help Section */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-[rgb(21,24,33)] border border-purple-400/30 rounded-lg max-w-2xl mx-auto">
                    <p className="text-purple-400 font-mono text-xs md:text-sm mb-2 md:mb-3">
                        <span className="text-purple-500/60">// </span>
                        Need Help?
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm font-mono mb-2 md:mb-3">
                        If any issue persists in downloading certificate or details in certificate, please contact the organizers:
                    </p>
                    <a
                        href="tel:8144219523"
                        className="px-4 md:px-6 py-2 md:py-3 bg-green-500/20 border-2 border-green-400 text-green-400 font-mono text-xs md:text-sm rounded-lg hover:bg-green-500/30 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        📞 8144219523
                    </a>
                </div>
            </div>
        </div>
    );

}
