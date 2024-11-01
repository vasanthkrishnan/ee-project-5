import { ClipboardListIcon, StopCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for making API requests

export const OpenAttendance = () => {
    const [openAttendance, setOpenAttendance] = useState(() => {
        const storedValue = localStorage.getItem('isOpen');
        const expirationTime = localStorage.getItem('expirationTime');
        const currentTime = new Date().getTime();

        if (storedValue === 'true' && expirationTime && currentTime < expirationTime) {
            return true;
        }
        return false;
    });

    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (openAttendance) {
            const expirationTime = localStorage.getItem('expirationTime');
            const currentTime = new Date().getTime();
            const timeLeft = expirationTime - currentTime;

            if (timeLeft > 0) {
                setRemainingTime(Math.floor(timeLeft / 1000));

                const interval = setInterval(() => {
                    setRemainingTime((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            setOpenAttendance(false);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(interval);
            } else {
                setOpenAttendance(false);
            }
        } else {
            localStorage.removeItem('expirationTime');
        }
    }, [openAttendance]);

    const handleOpenAttendance = async () => {
        setOpenAttendance(true);
        const expirationTime = new Date().getTime() + 90 * 60 * 1000;
        localStorage.setItem('expirationTime', expirationTime);
        setRemainingTime(90 * 60);
        localStorage.setItem('isOpen', 'true');
    };

    const handleStopAttendance = () => {
        setOpenAttendance(false);
        localStorage.removeItem('isOpen');
        localStorage.removeItem('expirationTime');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className='h-full w-full flex flex-row justify-center items-center'>
                <button
                    onClick={handleOpenAttendance}
                    className='p-3 bg-[#008000] hover:bg-[#005700] shadow-lg rounded-lg font-bold text-white text-xl flex items-center space-x-2 transition-all duration-300'>
                    <ClipboardListIcon />
                    <span>
                        {openAttendance ? formatTime(remainingTime) : 'Open Attendance'}
                    </span>
                </button>
                {openAttendance && (
                    <button
                        onClick={handleStopAttendance}
                        className='p-3 ml-4 bg-red-700 hover:bg-red-800 shadow-lg rounded-lg font-bold text-white text-xl flex items-center space-x-2 transition-all duration-300'>
                        <StopCircle className="h-6 w-6" />
                        <span>Stop</span>
                    </button>
                )}
            </div>
        </>
    );
};

export default OpenAttendance;
