'use client'
import { useEffect } from 'react'
import { useNotificationStore } from '../store/notificationStore'

export default function Notification() {
  const { message, type, isVisible, hideNotification } = useNotificationStore()

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(hideNotification, 3000)
    return () => clearTimeout(timer)
  }, [isVisible, hideNotification])

  if (!isVisible || !message) return null

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded shadow-lg text-white font-medium transition-all ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {message}
    </div>
  )
}