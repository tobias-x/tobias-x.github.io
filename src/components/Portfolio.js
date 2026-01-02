import React from 'react';
import { Github } from "lucide-react";

// Generic Portfolio renderer
function Portfolio({ title, id, items, description }) {
    return (
        <div id={id} className="bg-black text-white py-0">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <p className="text-center text-white mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 bg-[rgb(25,25,25)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between p-2 rounded">
                            <div className="flex items-center space-x-2 w-full overflow-hidden">
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target={item.link.startsWith('/') ? "_self" : "_blank"}
                                        rel={item.link.startsWith('/') ? undefined : "noopener noreferrer"}
                                        className="text-xl font-semibold text-white hover:text-gray-300 truncate whitespace-nowrap overflow-hidden"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <h3 className="text-xl font-semibold truncate whitespace-nowrap overflow-hidden">
                                        {item.name}
                                    </h3>
                                )}

                                {item.github_link && (
                                    <a
                                        href={`https://${item.github_link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-gray-300 transition-colors shrink-0"
                                        aria-label="GitHub Link"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {item.animation && (
                            <div className="p-2 rounded overflow-hidden">
                                <div className="relative w-full" style={{ paddingTop: '50%' }}>
                                    {item.animation?.toLowerCase().endsWith('.svg') ? (
                                        <object
                                            data={item.animation}
                                            type="image/svg+xml"
                                            className="absolute top-0 left-0 w-full h-full object-contain"
                                            aria-label="SVG Thumbnail"
                                        />
                                    ) : (
                                        <img
                                            src={item.animation}
                                            alt={`${item.name} thumbnail`}
                                            className="absolute top-0 left-0 w-full h-full object-contain"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        <p className="text-gray-400 mt-2 p-2 rounded">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-black"></div>
        </div>
    );
}

// Software projects
const softwareProjects = [
    {
        name: 'Astrodynamics Simulator',
        github_link: "github.com/tobias-x/astrodynamics_sim",
        animation: '/animations/astrodynamics.svg',
        description: "Built an Astrodynamics Simulator using C++/CUDA kernels. Visualised in OpenGL - CUDA version can handle 10k objects at once, with room for optimization."
    },
    {
        name: 'Polymarket Penny-Picker',
        animation: '/animations/penny_picker.svg',
        description: "Built a Polymarket token arbitrage engine using an asynchronous, event-driven framework in Python. Ran it out of an AWS region in Canada and added some magic to speed it up."
    },
    {
        name: 'Arb-free Vol Spline Fitter',
        animation: '/animations/vol_spline.svg',
        description: "Built an arb-free spline fitter in Python, manually fitting a B-spline with Cox-de-Boor and smoothing it with an adaptation of Fengler's method. Migrated it to C++ and used in other projects."
    },
    {
        name: 'Killer Sudoku iOS app',
        github_link: 'https://github.com/tobias-x/killer-sudoku/tree/main',
        animation: '/animations/sudoku.svg',
        description: "Tried to download a Killer Sudoku app and they were all $10. Built one myself using Swift instead. Terrible experience."
    },
    {
        name: 'XGBoost Trading Model',
        animation: '/animations/xgb.svg',
        description: "First exposure to trading during Uni, trying to predict whether a stock will go up or down based on some features and using XGBoost/LightGBM."
    },
    {
        name: 'KD-Tree Business Finder',
        github_link: "github.com/tobias-x/KD-Tree-Business-Finder",
        animation: '/animations/kdt.svg',
        description: "Built a 'Business Directory' tool using KD-Trees implemented in C."
    },
];

// Art
const artworkPieces = [
    { name: 'Artwork A', description: 'Description of Artwork A' },
    { name: 'Artwork B', description: 'Description of Artwork B' },
];

export function SoftwarePortfolio() {
    return (
        <Portfolio
            title="Software"
            id="software"
            items={softwareProjects}
            description="Most of the software I make is related to trading, because that's what I do for a job. But there's some other stuff as well."
        />
    );
}

export function ArtworkPortfolio() {
    return (
        <Portfolio
            title="Artwork"
            id="artwork"
            items={artworkPieces}
            description="A collection of some artwork I've made."
        />
    );
}

export default Portfolio;
