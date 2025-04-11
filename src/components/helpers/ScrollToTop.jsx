import React, { useEffect, useState } from 'react';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { FaCircleArrowUp } from "react-icons/fa6";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setShowButton(window.scrollY > 500); // show button after 300px scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        showButton && (
        <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 trans hover:bg-black"
        >
            <MdOutlineKeyboardArrowUp className='text-3xl text-white' />
        </button>
        )
    );
};

export default ScrollToTop;
