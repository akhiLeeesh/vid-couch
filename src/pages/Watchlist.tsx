import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import ContentDetailsModal from "@/components/ContentDetailsModal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Movie, TVShow } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<(Movie | TVShow)[]>([]);
  const [selectedContent, setSelectedContent] = useState<Movie | TVShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }

    // Load watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(storedWatchlist);
  }, [navigate]);

  const handlePlay = (content: Movie | TVShow) => {
    toast({
      title: `Playing ${content.title}`,
      description: "Starting playback...",
    });
  };

  const handleRemoveFromWatchlist = (content: Movie | TVShow) => {
    const updatedWatchlist = watchlist.filter(item => item.id !== content.id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    toast({
      title: "Removed from List",
      description: `${content.title} has been removed from your watchlist.`,
    });
  };

  const handleShowDetails = (content: Movie | TVShow) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.setItem("watchlist", "[]");
    toast({
      title: "Watchlist cleared",
      description: "All items have been removed from your watchlist.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My List</h1>
          {watchlist.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWatchlist}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Your watchlist is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Browse movies and TV shows to add them to your list
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Browse Content
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((content) => (
              <div key={content.id} className="relative group">
                <ContentCard
                  content={content}
                  onPlay={handlePlay}
                  onAddToWatchlist={() => handleRemoveFromWatchlist(content)}
                  onShowDetails={handleShowDetails}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromWatchlist(content)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <ContentDetailsModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPlay={handlePlay}
        onAddToWatchlist={handleRemoveFromWatchlist}
      />
    </div>
  );
}