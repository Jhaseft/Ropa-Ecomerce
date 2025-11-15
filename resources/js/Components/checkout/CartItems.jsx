export default function CartItems({ cart, loading }) {
    return (
        <div className="border border-gray-700 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2 text-white">Artículos</h3>
            {loading ? (
                <p className="text-gray-300">Cargando artículos...</p>
            ) : cart.length === 0 ? (
                <p className="text-gray-300">No hay artículos en el carrito</p>
            ) : (
                cart.map(item => (
                    <div key={item.rowId} className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                        <div className="flex items-center gap-2">
                            <img
                                src={item.options.image || 'https://via.placeholder.com/100'}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <p className="text-white font-semibold">{item.name}</p>
                                <p className="text-gray-300">{item.qty} x {Number(item.price).toFixed(2)} Bs</p>
                            </div>
                        </div>
                        <p className="text-gold-500 font-semibold">{(Number(item.qty) * Number(item.price)).toFixed(2)} Bs</p>
                    </div>
                ))
            )}
        </div>
    );
}
