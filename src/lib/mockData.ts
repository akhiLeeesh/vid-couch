export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  thumbnailUrl: string;
  trailerUrl: string;
  rating: string;
  duration: string;
}

export interface TVShow extends Movie {
  seasons: number;
  episodes: number;
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
  tvShows?: TVShow[];
}

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Dark Chronicle",
    description: "A gripping thriller that follows a detective's investigation into a series of mysterious disappearances in a small town.",
    genre: "Thriller",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "TV-14",
    duration: "2h 15m"
  },
  {
    id: "2", 
    title: "Stellar Wars: Genesis",
    description: "An epic space opera that explores the origins of an intergalactic conflict spanning multiple star systems.",
    genre: "Sci-Fi",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "PG-13",
    duration: "2h 42m"
  },
  {
    id: "3",
    title: "Comedy Central",
    description: "A hilarious adventure following two unlikely friends on a cross-country road trip filled with mishaps.",
    genre: "Comedy",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "R",
    duration: "1h 58m"
  },
  {
    id: "4",
    title: "Ocean's Depth",
    description: "A breathtaking underwater documentary revealing the hidden mysteries of the deep sea.",
    genre: "Documentary",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "G",
    duration: "1h 30m"
  }
];

export const mockTVShows: TVShow[] = [
  {
    id: "5",
    title: "Midnight Investigation",
    description: "A detective series following a team of investigators solving cold cases during the night shift.",
    genre: "Crime",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1594736797933-d0c430d7a097?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "TV-MA",
    duration: "45m",
    seasons: 3,
    episodes: 24
  },
  {
    id: "6",
    title: "Future Horizons",
    description: "A sci-fi series exploring humanity's first colony on Mars and the challenges they face.",
    genre: "Sci-Fi",
    year: 2023,
    thumbnailUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: "TV-14",
    duration: "50m",
    seasons: 2,
    episodes: 16
  }
];

export const categories: Category[] = [
  {
    id: "trending",
    name: "Trending Now",
    movies: mockMovies.slice(0, 3),
    tvShows: mockTVShows.slice(0, 1)
  },
  {
    id: "action",
    name: "Action & Adventure", 
    movies: [mockMovies[1], mockMovies[0]],
    tvShows: [mockTVShows[0]]
  },
  {
    id: "comedy",
    name: "Comedy",
    movies: [mockMovies[2]],
    tvShows: []
  },
  {
    id: "documentary",
    name: "Documentaries",
    movies: [mockMovies[3]],
    tvShows: []
  },
  {
    id: "scifi",
    name: "Sci-Fi & Fantasy",
    movies: [mockMovies[1]],
    tvShows: [mockTVShows[1]]
  }
];

export const featuredContent = mockMovies[0];