import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>

            {/* Centered Logo */}
            <div className="w-full bg-white py-4 flex justify-center">
                <h1 className="text-4xl text-pink-300" style={{ fontFamily: "Pacifico" }}>
                    My Vanity ✧
                </h1>
            </div>

            {/* Pink Navigation Bar */}
            <nav className="w-full bg-pink-300 py-3 shadow-md">
                <ul className="flex justify-center space-x-8 text-white font-medium">
                    <li>
                        <Link to="/" className="hover:text-pink-100">Home</Link>
                    </li>
                    <li>
                        <Link to="/makeup" className="hover:text-pink-100">Makeup</Link>
                    </li>
                    <li>
                        <Link to="/skincare" className="hover:text-pink-100">Skincare</Link>
                    </li>
                    <li>
                        <Link to="/haircare" className="hover:text-pink-100">Haircare</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}
