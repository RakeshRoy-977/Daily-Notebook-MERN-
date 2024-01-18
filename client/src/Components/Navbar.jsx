import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            NoteBook
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/login" className="text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
