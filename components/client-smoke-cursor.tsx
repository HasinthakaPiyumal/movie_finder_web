'use client'

import React, { useEffect, useRef } from 'react'
import WebGLFluidEnhanced from "@/lib/fluid/index";

const FluidAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            console.error('Container element not found');
            return;
        }
        const simulation = new WebGLFluidEnhanced(container);
        simulation.multipleSplats(5)
        simulation.setConfig({
            backgroundColor: '#02020200',
            "simResolution": 100,
            "densityDissipation": 2,
            "velocityDissipation": 0.05,
            "pressure": 0.5,
            "curl": 3,
            "splatRadius": 0.05,
            "transparent": true,
            "colorPalette": [
                "#00FFD0",
                "#FF00FF",
                "#9900FF",

            ],
        })


        simulation.start();

        return () => {
            simulation.stop();
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 w-full h-full overflow-hidden'>
            <div ref={containerRef} className='w-full h-full'></div>
        </div>
    )
}

export default FluidAnimation