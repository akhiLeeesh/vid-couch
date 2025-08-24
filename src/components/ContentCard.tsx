import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Plus, Info } from "lucide-react";
import { Movie, TVShow } from "@/lib/mockData";

interface ContentCardProps {
  content: Movie | TVShow;
  onPlay: (content: Movie | TVShow) => void;
  onAddToWatchlist: (content: Movie | TVShow) => void;
  onShowDetails: (content: Movie | TVShow) => void;
}

export default function ContentCard({ 
  content, 
  onPlay, 
  onAddToWatchlist, 
  onShowDetails 
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="relative bg-card border-border overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onShowDetails(content)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}>
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(content);
              }}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(content);
              }}
              className="bg-secondary/90 hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(content);
              }}
              className="bg-secondary/90 hover:bg-secondary"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {content.rating}
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {content.year}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 text-foreground line-clamp-1">
          {content.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {content.description}
        </p>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>{content.genre}</span>
          <span>{content.duration}</span>
        </div>
      </div>
    </Card>
  );
}