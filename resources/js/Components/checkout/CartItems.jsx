export default function CartItems({ cart, loading, subtotal, total }) {
    return (
        <div className="border border-gray-300 p-4 rounded-lg mb-6 bg-white">
            <h3 className="font-bold mb-4 text-black text-xl">Artículos en tu carrito</h3>

            {loading ? (
                <p className="text-gray-500">Cargando artículos...</p>
            ) : cart.length === 0 ? (
                <p className="text-gray-500">No hay artículos en el carrito</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="hidden sm:table min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-black">
                                <th className="py-2 px-4 text-left">Imagen</th>
                                <th className="py-2 px-4 text-left">Producto</th>
                                <th className="py-2 px-4 text-center">Cantidad</th>
                                <th className="py-2 px-4 text-right">Precio (Bs)</th>
                                <th className="py-2 px-4 text-right">Subtotal (Bs)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map(item => {
                                const itemSubtotal = Number(item.qty) * Number(item.price);

                                return (
                                    <tr key={item.rowId} className="border-b border-gray-200">
                                        <td className="py-2 px-4">
                                            <img
                                                src={item.options.image || 'https://via.placeholder.com/100'}
                                                alt={item.name}
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4 text-black font-semibold">{item.name}</td>
                                        <td className="py-2 px-4 text-center">{item.qty}</td>
                                        <td className="py-2 px-4 text-right">{Number(item.price).toFixed(2)}</td>
                                        <td className="py-2 px-4 text-right font-semibold">{itemSubtotal.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colSpan="4" className="py-2 px-4 text-right font-bold text-lg">Total:</td>
                                <td className="py-2 px-4 text-right font-bold text-lg">
                                    {Number(total).toFixed(2)} Bs
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* --- MOBILE VERSION --- */}
                    <div className="sm:hidden space-y-4">
                        {cart.map(item => {
                            const itemSubtotal = Number(item.qty) * Number(item.price);

                            return (
                                <div key={item.rowId} className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.options.image || 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="text-black font-semibold">{item.name}</p>
                                            <p className="text-gray-600 text-sm">Precio: {Number(item.price).toFixed(2)} Bs</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 flex justify-between text-sm">
                                        <span className="text-gray-600">Cantidad:</span>
                                        <span className="font-semibold">{item.qty}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-bold text-black">{itemSubtotal.toFixed(2)} Bs</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* TOTAL PARA MÓVIL */}
                        <div className="flex justify-between border-t border-gray-300 pt-3 text-lg font-bold text-black">
                            <span>Total:</span>
                            <span>{Number(total).toFixed(2)} Bs</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
