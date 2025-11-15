export default function CustomerInfo({ user }) {
    return (
        <div className="border border-gray-700 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2 text-white">Cliente</h3>
            <p className="bg-black p-2 rounded text-gray-300">
                Nombre: <span className="text-white font-semibold">{user.name}</span>
            </p>
            <p className="bg-black p-2 rounded text-gray-300 mt-2">
                Email: <span className="text-white font-semibold">{user.email}</span>
            </p>
            <p className="text-gray-400 mt-2 text-sm">
                Este será el nombre y correo utilizado para el pedido. No se puede cambiar.
            </p>
        </div>
    );
}
