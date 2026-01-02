import { useRouter } from "next/router";
import { Linkedin, Github } from "lucide-react";

function SmartLink({ href, children, className, ...props }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const isSamePageAnchor = href.startsWith("#");
  const isSamePageHash = href.startsWith("/") && currentPath === "/" && href.includes("#");
  const openInSameTab = isSamePageAnchor || isSamePageHash;

  const target = openInSameTab ? "_self" : "_blank";
  const rel = openInSameTab ? undefined : "noopener noreferrer";

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-black py-4 w-full">
      <div className="nav-container flex justify-between items-center px-4">
        <a href="/" className="text-white font-semibold text-xl logo-text">
          . / tobias_franks
        </a>

        <div className="nav-links flex items-center">
          <SmartLink href="/#software" className="hover:text-gray-300">
            Software
          </SmartLink>
          <SmartLink
            href="https://www.github.com/tobias-x"
            aria-label="Github"
            className="hover:text-gray-300"
          >
            <Github size={20} />
          </SmartLink>
          <SmartLink
            href="https://www.linkedin.com/in/tobiasfranks"
            aria-label="LinkedIn"
            className="hover:text-gray-300"
          >
            <Linkedin size={20} />
          </SmartLink>
        </div>
      </div>
    </nav>
  );
}
