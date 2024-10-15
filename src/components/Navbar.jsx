import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold">Quran App</div>
                    <div>
                        <Link to="/" className="text-gray-300 hover:text-white mx-2">Home</Link>
                        <Link to="/about" className="text-gray-300 hover:text-white mx-2">About</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
