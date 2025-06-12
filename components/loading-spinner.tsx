import { Loader2, Sparkles } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          <div className="relative flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
            <Sparkles className="absolute h-6 w-6 text-pink-400 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-300 text-lg">Loading amazing movies...</p>
      </div>
    </div>
  )
}
