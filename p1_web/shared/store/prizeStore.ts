import { create } from 'zustand'
import { Prize } from '@/modules/prizes/types/prize'

interface PrizesStore {
  prizes: Prize[]
  selectedPrize: Prize | null
  setPrizes: (prizes: Prize[]) => void
  addPrize: (prize: Prize) => void
  updatePrize: (prize: Prize) => void
  deletePrize: (id: string) => void
  selectPrize: (prize: Prize | null) => void
}

export const usePrizesStore = create<PrizesStore>((set) => ({
  prizes: [],
  selectedPrize: null,
  setPrizes: (prizes) => set({ prizes }),
  addPrize: (prize) => set((s) => ({ prizes: [...s.prizes, prize] })),
  updatePrize: (updated) => set((s) => ({
    prizes: s.prizes.map((p) => p.id === updated.id ? updated : p),
  })),
  deletePrize: (id) => set((s) => ({
    prizes: s.prizes.filter((p) => p.id !== id),
  })),
  selectPrize: (prize) => set({ selectedPrize: prize }),
}))