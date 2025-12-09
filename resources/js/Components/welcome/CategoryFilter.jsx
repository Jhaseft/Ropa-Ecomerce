export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">

      {/* BOTÓN "TODAS" */}
      <button
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300
          ${
            selectedCategory === ''
              ? 'bg-black text-white shadow-md'    // Seleccionado → negro
              : 'bg-white text-black border border-black hover:bg-gray-200 hover:shadow-md' // No seleccionado
          }`}
        onClick={() => onSelectCategory('')}
      >
        Todas
      </button>

      {/* BOTONES DE CATEGORÍA */}
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300
            ${
              selectedCategory === cat.name
                ? 'bg-black text-white shadow-md'   // Seleccionado → negro
                : 'bg-white text-black border border-black hover:bg-gray-200 hover:shadow-md' // No seleccionado
            }`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
