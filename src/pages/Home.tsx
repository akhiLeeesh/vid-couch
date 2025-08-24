import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import ContentDetailsModal from "@/components/ContentDetailsModal";
import { categories, featuredContent, Movie, TVShow } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<Movie | TVShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

  const handlePlay = (content: Movie | TVShow) => {
    toast({
      title: `Playing ${content.title}`,
      description: "Starting playback...",
    });
    // In a real app, this would navigate to a video player
  };

  const handleAddToWatchlist = (content: Movie | TVShow) => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isAlreadyInList = watchlist.some((item: Movie | TVShow) => item.id === content.id);
    
    if (!isAlreadyInList) {
      const updatedWatchlist = [...watchlist, content];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      toast({
        title: "Added to My List",
        description: `${content.title} has been added to your watchlist.`,
      });
    } else {
      toast({
        title: "Already in List",
        description: `${content.title} is already in your watchlist.`,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection
          featuredContent={featuredContent}
          onPlay={handlePlay}
          onShowDetails={handleShowDetails}
          onAddToWatchlist={handleAddToWatchlist}
        />

        <div className="relative z-10 -mt-32 pb-8">
          {categories.map((category) => {
            const allContent = [...category.movies, ...(category.tvShows || [])];
            return (
              <ContentRow
                key={category.id}
                title={category.name}
                content={allContent}
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