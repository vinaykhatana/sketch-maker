import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 border-b border-gray-200 text-white p-1 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" width={52} height={52} />
          <span className="text-2xl font-bold ml-2">Sketchify</span>
        </a>

        <a
          href="https://github.com/vinaykhatana"
          className="text-md hover:text-gray-300 flex items-center"
        >
          <img src="/assets/github.svg" alt="Logo" width={24} height={24} />
          <span className="ml-1">Github</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
