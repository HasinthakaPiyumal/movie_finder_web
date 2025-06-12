"use client"

export default function Loading() {
    return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
            {/* Film reel animation */}
            <div className="relative w-24 h-24">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-700 animate-spin-slow"></div>

                {/* Inner circle */}
                <div className="absolute inset-2 rounded-full border-2 border-gray-800"></div>

                {/* Center hole */}
                <div className="absolute inset-[35%] rounded-full bg-gray-900"></div>

                {/* Film sprocket holes */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-gray-900 rounded-full border border-gray-800"
                        style={{
                            transform: `rotate(${i * 45}deg) translateY(-34px) translateX(-1.5px)`
                        }}
                    ></div>
                ))}
            </div>

            {/* Gradient glow under the film reel */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur-sm mt-5 animate-pulse"></div>

            {/* Loading text */}
            <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm mb-1">Loading your movie experience</p>
                <div className="flex justify-center space-x-1">
                    {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
                        <span
                            key={index}
                            className="inline-block text-red-400 font-medium animate-bounce"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animationDuration: '1s'
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
