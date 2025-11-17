import CategoryRow from "./CategoryRow";

export default function CategoryList({
  categories,
  selectionMode,
  selectedIds,
  setSelectedIds,
  onEdit
}) {

  const toggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (categories.length === 0)
    return <p className="text-gray-500">No hay categorías registradas.</p>;

  return (
    <div className="space-y-4">
      {categories.map(cat => (
        <CategoryRow
          key={cat.id}
          category={cat}
          isSelectable={selectionMode}
          selected={selectedIds.includes(cat.id)}
          onSelect={toggle}
          onEdit={onEdit}
          onView={() => console.log("Ver productos de:", cat.id)}
        />
      ))}
    </div>
  );
}
