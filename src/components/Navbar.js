import { Instagram, Linkedin } from "lucide-react"; // Install lucide-react or use another icon library

export default function Navbar() {
    return (
        <nav className="bg-black py-4 w-full">
            <div className="flex items-center justify-between px-4">
                {/* Left-aligned logo */}
                <a href="#" className="text-white font-semibold text-xl">
                    . / tobias_franks
                </a>

                {/* Right-aligned links */}
                <div className="flex items-center space-x-6">
                    {/* Navigation Links */}
                    <a href="#software" className="text-white hover:text-gray-300">
                        Software
                    </a>
                    <a href="#artwork" className="text-white hover:text-gray-300">
                        Artwork
                    </a>

                    {/* Social Media Links */}
                    <a
                        href="https://www.instagram.com/tobias.xlyt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tobiasfranks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 mr-4"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </nav>
    );
}
