import { Link } from "react-router-dom";
import { Button } from "../ui/button.js";

export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-2xl text-white">FOL Capital</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                About
              </a>
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                Solutions
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                Process
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-slate-800">
              <Link to="/login">Client Portal</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}