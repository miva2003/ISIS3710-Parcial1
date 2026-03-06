import GenreEditPage from '@/modules/genres/pages/GenresEditPage'

export default async function Page({ params }: { params: Promise<{ genreId: string }> }) {
  const { genreId } = await params
  return <GenreEditPage id={genreId} />
}