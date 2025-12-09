export default function ProductCard({
  product,
  handleAddToCart,
  addingId,
  successId,
}) {
  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
  const isOutOfStock = totalStock === 0;
  const imageUrl = product.image || "https://via.placeholder.com/600x400";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-md border
        ${isOutOfStock ? "border-black opacity-80" : "border-gray-300"}
        bg-white text-black
        hover:scale-[1.03] hover:shadow-lg
        transition-all duration-300
        font-playfair
      `}
    >
      {isOutOfStock && (
        <div className="absolute top-3 left-0 bg-white text-black px-4 py-1 text-lg font-bold rounded-r-lg shadow-md z-10">
          AGOTADO
        </div>
      )}

      <div className="w-full h-80 sm:h-72 lg:h-[25rem] overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col gap-5">
        <h3 className="text-3xl font-extrabold text-black leading-tight tracking-wide uppercase">
          {product.name}
        </h3>

        <p className="text-gray-700 text-lg leading-relaxed font-light">
          {product.description}
        </p>

        {product.variants?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.variants.map(v => (
              <span
                key={v.id}
                className={`px-3 py-1 text-sm font-semibold rounded-full border
                  ${
                    v.stock === 0
                      ? "bg-black text-white border-black"
                      : "bg-white border-black text-black"
                  }`}
              >
                {v.values.map(val => `${val.attribute}: ${val.value}`).join(", ")} ({v.stock})
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          {isOutOfStock && (
            <span className="px-3 py-1 text-sm font-semibold rounded-full border bg-white text-black border-black shadow-sm">
              Sin stock
            </span>
          )}

          <p className="text-3xl font-extrabold text-black tracking-wide">
            Bs {Number(product.price).toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(product)}
          disabled={addingId === product.id || isOutOfStock}
          className={`mt-3 w-full py-3 rounded-xl text-xl font-bold tracking-wider
            transition-all shadow-md uppercase
            ${
              addingId === product.id
                ? "bg-gray-500 text-white cursor-not-allowed"
                : successId === product.id
                ? "bg-black text-white"
                : "bg-black text-white hover:bg-gray-900"
            }`}
        >
          {isOutOfStock
            ? "No disponible"
            : addingId === product.id
            ? "Agregando..."
            : successId === product.id
            ? "¡Agregado!"
            : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
