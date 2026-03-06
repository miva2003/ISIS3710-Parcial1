import { create } from 'zustand'
import { Platform } from '@/modules/platforms/types/platform'

interface PlatformsStore {
  platforms: Platform[]
  selectedPlatform: Platform | null
  setPlatforms: (platforms: Platform[]) => void
  addPlatform: (platform: Platform) => void
  updatePlatform: (platform: Platform) => void
  deletePlatform: (id: string) => void
  selectPlatform: (platform: Platform | null) => void
}

export const usePlatformsStore = create<PlatformsStore>((set) => ({
  platforms: [],
  selectedPlatform: null,
  setPlatforms: (platforms) => set({ platforms }),
  addPlatform: (platform) => set((s) => ({ platforms: [...s.platforms, platform] })),
  updatePlatform: (updated) => set((s) => ({
    platforms: s.platforms.map((p) => p.id === updated.id ? updated : p),
  })),
  deletePlatform: (id) => set((s) => ({
    platforms: s.platforms.filter((p) => p.id !== id),
  })),
  selectPlatform: (platform) => set({ selectedPlatform: platform }),
}))