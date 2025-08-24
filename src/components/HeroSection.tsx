import { Button } from "@/components/ui/button";
import { Play, Info, Plus } from "lucide-react";
import { Movie, TVShow } from "@/lib/api";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  featuredContent: Movie | TVShow;
  onPlay: (content: Movie | TVShow) => void;
  onShowDetails: (content: Movie | TVShow) => void;
  onAddToWatchlist: (content: Movie | TVShow) => void;
}

export default function HeroSection({ 
  featuredContent, 
  onPlay, 
  onShowDetails, 
  onAddToWatchlist 
}: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt={featuredContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {featuredContent.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
            <span className="bg-red-600 text-white px-2 py-1 rounded">
              {featuredContent.rating}
            </span>
            <span>{featuredContent.year}</span>
            <span>{featuredContent.duration}</span>
            <span className="border border-gray-400 px-2 py-1 rounded text-xs">
              {featuredContent.genre}
            </span>
          </div>

          <p className="text-lg text-gray-200 mb-8 leading-relaxed">
            {featuredContent.description}
          </p>

          <div className="flex space-x-4">
            <Button
              size="lg"
              onClick={() => onPlay(featuredContent)}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Play
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onShowDetails(featuredContent)}
              className="bg-gray-600/70 text-white hover:bg-gray-600 font-semibold px-8 backdrop-blur-sm"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => onAddToWatchlist(featuredContent)}
              className="border-gray-400 text-white hover:bg-gray-800/50 backdrop-blur-sm"
            >
              <Plus className="mr-2 h-5 w-5" />
              My List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}