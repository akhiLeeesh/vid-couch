import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import ContentDetailsModal from "@/components/ContentDetailsModal";
import { Movie, TVShow, moviesAPI, tvShowsAPI, watchlistAPI, isAuthenticated } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<Movie | TVShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
      return;
    }

    const fetchContent = async () => {
      try {
        const [moviesData, tvShowsData] = await Promise.all([
          moviesAPI.getMovies(),
          tvShowsAPI.getTVShows()
        ]);
        setMovies(moviesData);
        setTVShows(tvShowsData);
      } catch (error) {
        toast({
          title: "Error loading content",
          description: "Failed to fetch movies and TV shows",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [navigate, toast]);

  const handlePlay = (content: Movie | TVShow) => {
    toast({
      title: `Playing ${content.title}`,
      description: "Starting playback...",
    });
    // In a real app, this would navigate to a video player
  };

  const handleAddToWatchlist = async (content: Movie | TVShow) => {
    try {
      await watchlistAPI.addToWatchlist(content.id);
      toast({
        title: "Added to My List",
        description: `${content.title} has been added to your watchlist.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to watchlist. It may already be in your list.",
        variant: "destructive",
      });
    }
  };

  const handleShowDetails = (content: Movie | TVShow) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  // Create featured content from the first movie or TV show
  const featuredContent = movies.length > 0 ? movies[0] : tvShows.length > 0 ? tvShows[0] : null;

  // Organize content into categories
  const categories = [
    {
      id: "trending",
      name: "Trending Now",
      content: [...movies.slice(0, 10), ...tvShows.slice(0, 10)],
    },
    {
      id: "movies",
      name: "Popular Movies",
      content: movies,
    },
    {
      id: "tvshows", 
      name: "TV Shows",
      content: tvShows,
    },
    {
      id: "action",
      name: "Action & Adventure",
      content: [...movies, ...tvShows].filter(item => 
        item.genre.toLowerCase().includes('action') || 
        item.genre.toLowerCase().includes('adventure')
      ),
    },
    {
      id: "comedy",
      name: "Comedy",
      content: [...movies, ...tvShows].filter(item => 
        item.genre.toLowerCase().includes('comedy')
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {featuredContent && (
          <HeroSection
            featuredContent={featuredContent}
            onPlay={handlePlay}
            onShowDetails={handleShowDetails}
            onAddToWatchlist={handleAddToWatchlist}
          />
        )}

        <div className="relative z-10 -mt-32 pb-8">
          {categories.map((category) => {
            if (category.content.length === 0) return null;
            return (
              <ContentRow
                key={category.id}
                title={category.name}
                content={category.content}
                onPlay={handlePlay}
                onAddToWatchlist={handleAddToWatchlist}
                onShowDetails={handleShowDetails}
              />
            );
          })}
        </div>
      </main>

      <ContentDetailsModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPlay={handlePlay}
        onAddToWatchlist={handleAddToWatchlist}
      />
    </div>
  );
}