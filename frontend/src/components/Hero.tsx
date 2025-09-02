import { Button } from "./ui/button.js";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Institutional-Grade
            <br />
            <span className="text-blue-400">Stablecoin Solutions</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            Providing corporate treasuries and institutional investors with secure,
            compliant digital asset infrastructure for the modern economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Link to="/register">Schedule Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-300 hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">$2.5B+</div>
              <div className="text-gray-400">Assets Under Management</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400">Enterprise Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}