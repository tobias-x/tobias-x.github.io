import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed top-4 right-6 z-[9999] bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
                    aria-label="Back to top"
                >
                    <ChevronsUp size={20} />
                </button>
            )}
        </>
    );
}
