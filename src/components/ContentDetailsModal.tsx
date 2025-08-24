import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Play, Plus, X, Star } from "lucide-react";
import { Movie, TVShow } from "@/lib/api";

interface ContentDetailsModalProps {
  content: Movie | TVShow | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (content: Movie | TVShow) => void;
  onAddToWatchlist: (content: Movie | TVShow) => void;
}

export default function ContentDetailsModal({
  content,
  isOpen,
  onClose,
  onPlay,
  onAddToWatchlist,
}: ContentDetailsModalProps) {
  if (!content) return null;

  const isTVShow = (content: Movie | TVShow): content is TVShow => {
    return 'seasons' in content;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="sr-only">
          <h2>{content.title}</h2>
        </DialogHeader>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-black/50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative">
          {/* Hero Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={content.thumbnailUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                onClick={() => onPlay(content)}
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8"
              >
                <Play className="mr-2 h-6 w-6 fill-current" />
                Play
              </Button>
            </div>
          </div>

          {/* Content Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {content.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>8.5</span>
                  </div>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                    {content.rating}
                  </span>
                  <span>{content.year}</span>
                  <span>{content.duration}</span>
                  {isTVShow(content) && (
                    <span>{content.seasons} Season{content.seasons > 1 ? 's' : ''}</span>
                  )}
                </div>

                <p className="text-foreground leading-relaxed mb-6">
                  {content.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Genre: </span>
                    <span className="text-foreground">{content.genre}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year: </span>
                    <span className="text-foreground">{content.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating: </span>
                    <span className="text-foreground">{content.rating}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration: </span>
                    <span className="text-foreground">{content.duration}</span>
                  </div>
                  {isTVShow(content) && (
                    <>
                      <div>
                        <span className="text-muted-foreground">Seasons: </span>
                        <span className="text-foreground">{content.seasons}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Episodes: </span>
                        <span className="text-foreground">{content.episodes}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <Button
                  onClick={() => onAddToWatchlist(content)}
                  variant="outline"
                  className="min-w-[120px]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to List
                </Button>
              </div>
            </div>

            {/* Video embed */}
            {content.trailerUrl && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={content.trailerUrl}
                  title={`${content.title} Trailer`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}