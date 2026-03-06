import { create } from 'zustand'
import { Actor } from '@/modules/actors/types/actor'

interface ActorsStore {
  actors: Actor[]
  selectedActor: Actor | null
  setActors: (actors: Actor[]) => void
  addActor: (actor: Actor) => void
  updateActor: (actor: Actor) => void
  deleteActor: (id: string) => void
  selectActor: (actor: Actor | null) => void
}

export const useActorsStore = create<ActorsStore>((set) => ({
  actors: [],
  selectedActor: null,
  setActors: (actors) => set({ actors }),
  addActor: (actor) => set((s) => ({ actors: [...s.actors, actor] })),
  updateActor: (updated) => set((s) => ({
    actors: s.actors.map((a) => a.id === updated.id ? updated : a),
  })),
  deleteActor: (id) => set((s) => ({
    actors: s.actors.filter((a) => a.id !== id),
  })),
  selectActor: (actor) => set({ selectedActor: actor }),
}))