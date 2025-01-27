export default function Navbar() {
    return (
      <nav className="bg-black py-4 w-full">
        <div className="flex items-center justify-between px-4">
          <a href="#" className="text-white font-semibold text-xl">. / tobias_franks</a>
          <div className="flex space-x-6">
            <a href="#about" className="text-white hover:text-gray-300">About</a>
            <a href="#software" className="text-white hover:text-gray-300">Software</a>
            <a href="#artwork" className="text-white hover:text-gray-300">Artwork</a>
          </div>
        </div>
      </nav>
    );
  }
  