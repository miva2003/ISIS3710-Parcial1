interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  emptyMessage?: string
}

export default function List<T>({ items, renderItem, emptyMessage = 'No hay elementos.' }: ListProps<T>) {
  if (items.length === 0) return <p className="text-gray-400">{emptyMessage}</p>

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  )
}