"use client"

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      {/* Large blurred gradient orbs */}
      <div className="absolute -top-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-1/2 -right-1/2 w-[900px] h-[900px] bg-gradient-to-r from-pink-500/12 to-red-500/12 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s", animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "6s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-[700px] h-[700px] bg-gradient-to-r from-violet-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s", animationDuration: "10s" }}
      ></div>

      {/* Medium floating blurred shapes */}
      <div
        className="absolute top-1/6 left-1/5 w-[400px] h-[300px] bg-gradient-to-br from-emerald-500/8 to-green-500/8 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s", animationDuration: "7s" }}
      ></div>
      <div
        className="absolute bottom-1/5 right-1/6 w-[350px] h-[400px] bg-gradient-to-br from-orange-500/6 to-yellow-500/6 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "5s", animationDuration: "9s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/6 w-[300px] h-[350px] bg-gradient-to-br from-rose-500/7 to-pink-500/7 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "6s", animationDuration: "8s" }}
      ></div>

      {/* Small floating elements */}
      <div
        className="absolute top-1/3 right-1/3 w-[200px] h-[200px] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1.5s", animationDuration: "5s" }}
      ></div>
      <div
        className="absolute bottom-1/2 left-1/2 w-[250px] h-[180px] bg-gradient-to-r from-fuchsia-500/8 to-purple-500/8 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "3.5s", animationDuration: "6s" }}
      ></div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

      {/* Atmospheric haze effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(75, 0, 130, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0, 100, 100, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 90% 20%, rgba(255, 20, 147, 0.08) 0%, transparent 50%)
          `,
        }}
      ></div>
    </div>
  )
}
