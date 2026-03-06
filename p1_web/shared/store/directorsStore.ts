import { create } from 'zustand'
import { Director } from '@/modules/directors/types/director'

interface DirectorsStore {
  directors: Director[]
  selectedDirector: Director | null
  setDirectors: (directors: Director[]) => void
  addDirector: (director: Director) => void
  updateDirector: (director: Director) => void
  deleteDirector: (id: string) => void
  selectDirector: (director: Director | null) => void
}

export const useDirectorsStore = create<DirectorsStore>((set) => ({
  directors: [],
  selectedDirector: null,
  setDirectors: (directors) => set({ directors }),
  addDirector: (director) => set((s) => ({ directors: [...s.directors, director] })),
  updateDirector: (updated) => set((s) => ({
    directors: s.directors.map((d) => d.id === updated.id ? updated : d),
  })),
  deleteDirector: (id) => set((s) => ({
    directors: s.directors.filter((d) => d.id !== id),
  })),
  selectDirector: (director) => set({ selectedDirector: director }),
}))