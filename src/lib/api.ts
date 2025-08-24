import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types for API responses
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  thumbnailUrl: string;
  trailerUrl?: string;
}

export interface TVShow {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  thumbnailUrl: string;
  trailerUrl?: string;
  seasons?: number;
  episodes?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

// Auth API calls
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  }
};

// Movies API calls
export const moviesAPI = {
  getMovies: async (): Promise<Movie[]> => {
    const response = await apiClient.get('/movies');
    return response.data;
  }
};

// TV Shows API calls
export const tvShowsAPI = {
  getTVShows: async (): Promise<TVShow[]> => {
    const response = await apiClient.get('/tvshows');
    return response.data;
  }
};

// Watchlist API calls
export const watchlistAPI = {
  getWatchlist: async (): Promise<(Movie | TVShow)[]> => {
    const response = await apiClient.get('/watchlist');
    return response.data;
  },

  addToWatchlist: async (contentId: string): Promise<void> => {
    await apiClient.post(`/watchlist/${contentId}`);
  },

  removeFromWatchlist: async (contentId: string): Promise<void> => {
    await apiClient.delete(`/watchlist/${contentId}`);
  }
};

// Helper functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('jwt_token');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const storeAuthData = (authResponse: AuthResponse): void => {
  localStorage.setItem('jwt_token', authResponse.token);
  localStorage.setItem('user', JSON.stringify(authResponse.user));
};