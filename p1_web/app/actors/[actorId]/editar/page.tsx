import ActorEditPage from '@/modules/actors/pages/ActorEditPage'

export default async function Page({ params }: { params: Promise<{ actorId: string }> }) {
  const { actorId } = await params
  return <ActorEditPage id={actorId} />
}