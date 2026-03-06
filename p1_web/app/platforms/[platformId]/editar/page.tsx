import PlatformEditPage from '@/modules/platforms/pages/PlatformEditPage'

export default async function Page({ params }: { params: Promise<{ platformId: string }> }) {
  const { platformId } = await params
  return <PlatformEditPage id={platformId} />
}