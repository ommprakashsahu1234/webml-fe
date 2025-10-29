import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Cookies from 'js-cookie';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('registrations');
    const [registrations, setRegistrations] = useState([]);
    const [statistics, setStatistics] = useState({ total: 0, checkedIn: 0, notCheckedIn: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [scannedUser, setScannedUser] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const scannerRef = useRef(null);

    const ADMIN_CREDENTIALS = {
        'ommprakashsahu': ['2302094', '8144219523'],
        'jaynarayanpanda': ['2302067', '7846803792'],
        'jyotiswarupparhi': ['2302071', '9090598756']
    };

    useEffect(() => {
        const adminCookie = Cookies.get('btb_admin_auth');
        if (adminCookie) {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'registrations') {
                fetchRegistrations();
            }
            fetchStatistics();
        }
    }, [isAuthenticated, activeTab, searchTerm, filter]);

    const handleLogin = () => {
        const username = prompt('Enter Admin Username:');
        if (!username) return;

        const password = prompt('Enter Password:');
        if (!password) return;

        const normalizedUsername = username.toLowerCase().replace(/\s/g, '');
        
        if (ADMIN_CREDENTIALS[normalizedUsername] && 
            ADMIN_CREDENTIALS[normalizedUsername].includes(password)) {
            
            Cookies.set('btb_admin_auth', normalizedUsername, { expires: 1/96 }); // 15 minutes
            setIsAuthenticated(true);
            fetchData();
            alert('✅ Login Successful!');
        } else {
            alert('❌ Invalid credentials!');
        }
    };

    const handleLogout = () => {
        Cookies.remove('btb_admin_auth');
        setIsAuthenticated(false);
        setRegistrations([]);
        setStatistics({ total: 0, checkedIn: 0, notCheckedIn: 0 });
    };

    const fetchData = () => {
        fetchRegistrations();
        fetchStatistics();
    };

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            let url = 'http://localhost:5000/api/admin/registrations?';
            if (searchTerm) url += `search=${searchTerm}&`;
            if (filter !== 'all') url += `filter=${filter}`;

            const res = await fetch(url);
            const data = await res.json();
            
            if (data.success) {
                setRegistrations(data.data);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/statistics');
            const data = await res.json();
            
            if (data.success) {
                setStatistics(data.data);
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const handleScanQR = async (qrCode) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/registrations/qr/${qrCode}`);
            const data = await res.json();

            if (data.success) {
                setScannedUser(data.data);
                stopScanner();
            } else {
                alert('❌ Registration not found!');
            }
        } catch (error) {
            console.error('Error fetching user by QR:', error);
            alert('❌ Error scanning QR code!');
        }
    };

    const handleCheckIn = async () => {
        if (!scannedUser) return;

        try {
            const res = await fetch(`http://localhost:5000/api/admin/registrations/checkin/${scannedUser._id}`, {
                method: 'PUT'
            });
            const data = await res.json();

            if (data.success) {
                alert(`✅ ${scannedUser.name} checked in successfully!`);
                setScannedUser(null);
                fetchData();
            } else {
                alert(data.error || '❌ Check-in failed!');
            }
        } catch (error) {
            console.error('Error checking in:', error);
            alert('❌ Error checking in user!');
        }
    };

    const startScanner = () => {
        setIsScanning(true);
        setScannedUser(null);

        setTimeout(() => {
            const scanner = new Html5QrcodeScanner('qr-reader', {
                qrbox: { width: 250, height: 250 },
                fps: 10,
            });

            scanner.render(
                (decodedText) => {
                    handleScanQR(decodedText);
                },
                (error) => {
                    console.log(error);
                }
            );

            scannerRef.current = scanner;
        }, 100);
    };

    const stopScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
        }
        setIsScanning(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[rgb(15,18,25)] flex items-center justify-center px-4">
                <div className="backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-8 md:p-12 max-w-md w-full shadow-[0_0_40px_rgba(6,182,212,0.2)] text-center">
                    <svg className="w-16 h-16 mx-auto mb-6 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-cyan-400 mb-4 font-mono">
                        <span className="text-cyan-500/60">&lt;</span>
                        Admin Login
                        <span className="text-cyan-500/60">/&gt;</span>
                    </h1>
                    <p className="text-gray-400 mb-6 font-mono text-sm">
                        <span className="text-cyan-500/60">// </span>
                        Behind The Browser Workshop 2025
                    </p>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold font-mono py-3 rounded-lg border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all"
                    >
                        <span className="text-cyan-200/80">&lt;</span>
                        Login as Admin
                        <span className="text-cyan-200/80">/&gt;</span>
                    </button>
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
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg p-4 md:p-6 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono">
                                <span className="text-cyan-500/60">&lt;</span>
                                Admin Dashboard
                                <span className="text-cyan-500/60">/&gt;</span>
                            </h1>
                            <p className="text-gray-400 text-xs md:text-sm font-mono mt-1">
                                <span className="text-purple-500/60">// </span>
                                BTB Workshop 2025
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/20 border-2 border-red-500 text-red-400 font-mono rounded-lg hover:bg-red-500/30 transition-all text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="backdrop-blur-md bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-400 font-mono text-xs md:text-sm">Total Registrations</p>
                                <p className="text-3xl md:text-4xl font-bold text-white mt-2">{statistics.total}</p>
                            </div>
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="backdrop-blur-md bg-green-900/20 border border-green-400/30 rounded-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-400 font-mono text-xs md:text-sm">Checked In</p>
                                <p className="text-3xl md:text-4xl font-bold text-white mt-2">{statistics.checkedIn}</p>
                            </div>
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="backdrop-blur-md bg-orange-900/20 border border-orange-400/30 rounded-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-400 font-mono text-xs md:text-sm">Not Checked In</p>
                                <p className="text-3xl md:text-4xl font-bold text-white mt-2">{statistics.notCheckedIn}</p>
                            </div>
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="backdrop-blur-md bg-[rgb(21,24,33)]/60 border border-cyan-400/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="flex border-b border-cyan-400/20 overflow-x-auto">
                        {['registrations', 'scan'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    if (tab !== 'scan') stopScanner();
                                }}
                                className={`flex-1 min-w-[120px] px-4 py-3 md:py-4 font-mono text-sm md:text-base transition-all ${
                                    activeTab === tab
                                        ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
                                        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                                }`}
                            >
                                {tab === 'registrations' && '📋 Registrations'}
                                {tab === 'scan' && '📷 Scan QR'}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 md:p-6">
                        {/* Registrations Tab */}
                        {activeTab === 'registrations' && (
                            <div>
                                {/* Search and Filter */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, roll, mobile, branch..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                    />
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="bg-[rgb(15,18,25)]/80 border border-cyan-400/30 rounded px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                                    >
                                        <option value="all">All</option>
                                        <option value="checked-in">Checked In</option>
                                        <option value="not-checked-in">Not Checked In</option>
                                    </select>
                                </div>

                                {/* Registrations Table */}
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
                                        <p className="text-gray-400 font-mono mt-4">Loading...</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-cyan-400/30">
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Name</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Roll</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Branch</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Year</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Mobile</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Status</th>
                                                    <th className="text-left py-3 px-2 text-cyan-400 font-mono">Check-in Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-300 font-mono text-xs md:text-sm">
                                                {registrations.map((reg) => (
                                                    <tr key={reg._id} className="border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-colors">
                                                        <td className="py-3 px-2">{reg.name}</td>
                                                        <td className="py-3 px-2">{reg.roll}</td>
                                                        <td className="py-3 px-2">{reg.branch}</td>
                                                        <td className="py-3 px-2">{reg.year}</td>
                                                        <td className="py-3 px-2">{reg.mobile}</td>
                                                        <td className="py-3 px-2">
                                                            {reg.checkedIn ? (
                                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">✓ Checked In</span>
                                                            ) : (
                                                                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">⧗ Pending</span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            {reg.checkInTime ? new Date(reg.checkInTime).toLocaleString() : '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {registrations.length === 0 && (
                                            <div className="text-center py-8 text-gray-400 font-mono">
                                                No registrations found
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Scan Tab */}
                        {activeTab === 'scan' && (
                            <div>
                                {!isScanning && !scannedUser && (
                                    <div className="text-center py-12">
                                        <svg className="w-24 h-24 mx-auto mb-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        <button
                                            onClick={startScanner}
                                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold font-mono rounded-lg border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all"
                                        >
                                            📷 Start Camera
                                        </button>
                                    </div>
                                )}

                                {isScanning && (
                                    <div>
                                        <div id="qr-reader" className="mx-auto mb-4"></div>
                                        <div className="text-center">
                                            <button
                                                onClick={stopScanner}
                                                className="px-6 py-2 bg-red-500/20 border-2 border-red-500 text-red-400 font-mono rounded-lg hover:bg-red-500/30 transition-all"
                                            >
                                                Stop Scanner
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {scannedUser && (
                                    <div className="backdrop-blur-md bg-[rgb(15,18,25)]/80 border border-purple-400/30 rounded-lg p-6 max-w-2xl mx-auto">
                                        <h3 className="text-xl font-bold text-purple-400 mb-4 font-mono text-center">
                                            <span className="text-purple-500/60">&lt;</span>
                                            User Details
                                            <span className="text-purple-500/60">/&gt;</span>
                                        </h3>
                                        
                                        <div className="space-y-3 text-sm md:text-base font-mono">
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Name:</span>
                                                <span className="text-white font-bold">{scannedUser.name}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Roll No:</span>
                                                <span className="text-white">{scannedUser.roll}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Email:</span>
                                                <span className="text-white">{scannedUser.email}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Mobile:</span>
                                                <span className="text-white">{scannedUser.mobile}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Branch:</span>
                                                <span className="text-white">{scannedUser.branch}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">Year:</span>
                                                <span className="text-white">{scannedUser.year}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-400/20 pb-2">
                                                <span className="text-gray-400">ID:</span>
                                                <span className="text-cyan-400 text-xs break-all">{scannedUser._id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Status:</span>
                                                <span className={scannedUser.checkedIn ? "text-green-400" : "text-orange-400"}>
                                                    {scannedUser.checkedIn ? '✓ Already Checked In' : '⧗ Not Checked In'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex gap-4">
                                            {!scannedUser.checkedIn && (
                                                <button
                                                    onClick={handleCheckIn}
                                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold font-mono rounded-lg border-2 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] transition-all"
                                                >
                                                    ✓ Check In
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setScannedUser(null);
                                                    startScanner();
                                                }}
                                                className="flex-1 px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 font-bold font-mono rounded-lg hover:bg-cyan-500/30 transition-all"
                                            >
                                                Scan Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
