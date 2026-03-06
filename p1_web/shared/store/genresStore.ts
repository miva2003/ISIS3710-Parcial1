import { create } from 'zustand'
import { Genre } from '@/modules/genres/types/genre'

interface GenresStore {
  genres: Genre[]
  selectedGenre: Genre | null
  setGenres: (genres: Genre[]) => void
  addGenre: (genre: Genre) => void
  updateGenre: (genre: Genre) => void
  deleteGenre: (id: string) => void
  selectGenre: (genre: Genre | null) => void
}

export const useGenresStore = create<GenresStore>((set) => ({
  genres: [],
  selectedGenre: null,
  setGenres: (genres) => set({ genres }),
  addGenre: (genre) => set((s) => ({ genres: [...s.genres, genre] })),
  updateGenre: (updated) => set((s) => ({
    genres: s.genres.map((g) => g.id === updated.id ? updated : g),
  })),
  deleteGenre: (id) => set((s) => ({
    genres: s.genres.filter((g) => g.id !== id),
  })),
  selectGenre: (genre) => set({ selectedGenre: genre }),
}))