import DirectorEditPage from '@/modules/directors/pages/DirectorEditPage'

export default async function Page({ params }: { params: Promise<{ directorId: string }> }) {
  const { directorId } = await params
  return <DirectorEditPage id={directorId} />
}