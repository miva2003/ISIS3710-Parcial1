import MovieEditPage from '@/modules/movies/pages/MovieEditPage'

export default async function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params
  return <MovieEditPage id={movieId} />
}