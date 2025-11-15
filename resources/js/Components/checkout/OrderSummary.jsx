export default function OrderSummary({ cart, subtotal, total, loading }) {
    return (
        <div className="border border-gray-700 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2 text-white">Resumen del pedido</h3>
            {loading ? (
                <p className="text-gray-300">Cargando resumen del pedido...</p>
            ) : (
                <>
                    <p>Total artículos: <span className="text-gold-500">{cart.length}</span></p>
                    <p>Subtotal: <span className="text-gold-500">{Number(subtotal).toFixed(2)} Bs</span></p>
                    <p>Total: <span className="text-gold-500">{Number(total).toFixed(2)} Bs</span></p>
                </>
            )}
        </div>
    );
}
