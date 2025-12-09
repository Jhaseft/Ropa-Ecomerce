export default function OrderSummary({ cart, subtotal, total, loading }) {
    return (
        <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6 shadow-lg">
            <h3 className="text-black font-bold text-2xl mb-4 border-b border-gray-300 pb-2">
                Resumen del pedido
            </h3>

            {loading ? (
                <p className="text-gray-500">Cargando resumen del pedido...</p>
            ) : (
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                        <span>Total artículos:</span>
                        <span className="font-semibold text-black">{cart.length}</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                        <span>Subtotal:</span>
                        <span className="font-semibold text-black">{Number(subtotal).toFixed(2)} Bs</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                        <span>Total:</span>
                        <span className="font-bold text-black text-lg">{Number(total).toFixed(2)} Bs</span>
                    </div>
                </div>
            )}
        </div>
    );
}
