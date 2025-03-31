import { Instagram, Linkedin } from "lucide-react"; // Install lucide-react or use another icon library

export default function Navbar() {
  return (
    <nav className="bg-black py-4 w-full">
      <div className="nav-container">
        {/* Left Section: ./tobias_franks */}
        <a
          href="#"
          className="text-white font-semibold text-xl logo-text"
        >
          . / tobias_franks
        </a>

        {/* Right Section: Navigation Links */}
        <div className="nav-links">
          <a href="#software" className="hover:text-gray-300">
            Software
          </a>
          <a href="#substack" className="hover:text-gray-300">
            Substack
          </a>
          <a
            href="https://www.instagram.com/tobias.xlyt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-300"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/tobiasfranks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-300"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
