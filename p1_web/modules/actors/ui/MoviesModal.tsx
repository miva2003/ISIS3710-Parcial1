'use client'
import { MovieSummary } from '../types/actor'
import Image from 'next/image'

interface MoviesModalProps {
  isOpen: boolean
  onClose: () => void
  movies: MovieSummary[]
}

export default function MoviesModal({ isOpen, onClose, movies = [] }: MoviesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Películas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
            ✕
          </button>
        </div>

        {movies.length === 0 ? (
          <p className="text-gray-400">No tiene películas asociadas.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex gap-3 items-center border rounded p-3">
                <Image src={movie.poster} alt={movie.title} width={64} height={96} className="w-16 h-20 rounded-lg object-cover shrink-0" />
                <span className="font-medium">{movie.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}