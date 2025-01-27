import React from 'react';

function Portfolio({ title, items, description }) {
    return (
        <div className="bg-black text-white py-0">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <p className="text-center text-white mb-6">{description}</p> {/* Display the portfolio description */}

            {/* Container for grid items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 bg-[rgb(25,25,25)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between bg-[rgb(25,25,25)] p-2 rounded">
                            <h3 className="text-xl font-semibold bg-[rgb(25,25,25)] rounded">
                                {item.name}
                                {item.github_link && (
                                    <a
                                        href={`https://${item.github_link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 bg-[rgb(25,25,25)] p-1 rounded"
                                    >
                                        <img
                                            src="/github_logo.svg"
                                            alt="GitHub"
                                            className="w-5 h-5 inline bg-transparent"
                                        />
                                    </a>
                                )}
                            </h3>
                        </div>
                        {/* Render SVG Animation */}

                        {item.animation && (
                            <div className="bg-[rgb(25,25,25)] p-2 rounded">
                                <object
                                    data={item.animation}
                                    type="image/svg+xml"
                                    className="w-full h-auto"
                                    aria-label="Animated SVG"
                                />
                            </div>
                        )}
                        <p className="text-gray-400 mt-2 bg-[rgb(25,25,25)] p-2 rounded">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Adding space between grid items */}
            <div className="mt-8 bg-black"></div> {/* Ensure the background of the break is black */}
        </div>
    );
}

// Portfolio Data
const softwareProjects = [
    { 
        name: 'Astrodynamics Simulator', 
        github_link: "github.com/tobias-x/astrodynamics_sim", 
        animation: '/animations/astrodynamics.svg', 
        description: "Built an Astrodynamics Simulator using C++/CUDA kernels. Integrated it with some OpenGL graphics so that it can simulate and visualise multi-body problems in realtime. Super speedy." 
    },
    { 
        name: 'Polymarket Penny-Picker', 
        animation: '/animations/penny_picker.svg', // Corrected to point to penny_picker.svg
        description: "Built a Polymarket token arbitrage engine using an event-driven framework in Python. Ran it out an AWS region in Canada and added some special sauce to make it the fastest arb bot in the market." 
    },
    { 
        name: 'Arb-free Vol Spline Fitter', 
        animation: '/animations/vol_spline.svg',
        description: "Built an arb-free spline fitter in Python, manually fitting a B-spline with Cox-de-Boor and smoothing it with __. Eventually migrated it to C++." 
    },
    { 
        name: 'Killer Sudoku iOS app', 
        animation: '/animations/sudoku.svg', // Corrected to point to penny_picker.svg
        description: "Tried to download a Killer Sudoku app and they were all $10. Built one myself using Swift instead. Worst experience of my life." 
    },
    { 
        name: 'XGBoost Val Model', 
        animation: '/animations/xgb.svg',
        description: "First exposure to trading during Uni, trying to predict whether a stock will go up or down based on some features and using XGBoost/LightGBM." 
    },
    { 
        name: 'KD-Tree Business Finder', 
        animation: '/animations/kdt.svg',
        description: "Built a 'Business Directory' tool using KD-Trees implemented in C. Beautiful." 
    },
];

const artworkPieces = [
    { name: 'Artwork A', description: 'Description of Artwork A' },
    { name: 'Artwork B', description: 'Description of Artwork B' },
];

// Specific Portfolio Wrappers
export function SoftwarePortfolio() {
    return (
        <Portfolio
            title="Software"
            items={softwareProjects}
            description="Most of the software I make is related to trading, because that's what I do for a job. But there's some other stuff as well."
        />
    );
}

export function ArtworkPortfolio() {
    return (
        <Portfolio
            title="Artwork"
            items={artworkPieces}
            description="A collection of some artwork I've made."
        />
    );
}

export default Portfolio;
