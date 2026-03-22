import React from "react";
import ImgSketchConverter from "./components/ImgSketchConverter";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-200 flex flex-col items-center px-2 py-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Image to Sketch Converter
        </h1>
        <ImgSketchConverter />
        <footer className="mt-10 text-center text-md text-gray-500">
          Built with ❤️ using React & TailwindCSS
        </footer>
      </div>
    </div>
  );
};

export default App;
