import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentCard from "./ContentCard";
import { Movie, TVShow } from "@/lib/mockData";

interface ContentRowProps {
  title: string;
  content: (Movie | TVShow)[];
  onPlay: (content: Movie | TVShow) => void;
  onAddToWatchlist: (content: Movie | TVShow) => void;
  onShowDetails: (content: Movie | TVShow) => void;
}

export default function ContentRow({ 
  title, 
  content, 
  onPlay, 
  onAddToWatchlist, 
  onShowDetails 
}: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (content.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4 px-4">{title}</h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Content container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <div key={item.id} className="flex-none w-48">
              <ContentCard
                content={item}
                onPlay={onPlay}
                onAddToWatchlist={onAddToWatchlist}
                onShowDetails={onShowDetails}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}