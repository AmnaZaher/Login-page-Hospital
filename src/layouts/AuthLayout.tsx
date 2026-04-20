import React from 'react';
import HospitalImg from '../assets/Hos.png';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[650px] flex-col md:flex-row border border-slate-100">
            {/* Left Side — Hospital Image */}
            <div className="relative w-full md:w-1/2 p-5">
                <div className="relative h-48 md:h-full w-full rounded-[1.5rem] overflow-hidden group">
                    <img
                        src={HospitalImg}
                        alt="Healthcare Facility"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-blue-900/10 to-transparent" />
                </div>
            </div>

            {/* Right Side — Form Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-12 bg-white">
                <div className="w-full max-w-md mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;