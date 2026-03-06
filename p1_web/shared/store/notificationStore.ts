import { create } from 'zustand'

type NotificationType = 'success' | 'error'

interface NotificationState {
  message: string | null
  type: NotificationType
  isVisible: boolean
  showNotification: (message: string, type: NotificationType) => void
  hideNotification: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  type: 'success',
  isVisible: false,
  showNotification: (message, type) => set({ message, type, isVisible: true }),
  hideNotification: () => set({ isVisible: false, message: null }),
}))