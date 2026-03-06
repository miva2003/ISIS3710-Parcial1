import MovieDetailPage from '@/modules/movies/pages/MovieDetailPage'

export default async function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params
  return <MovieDetailPage id={movieId} />
}