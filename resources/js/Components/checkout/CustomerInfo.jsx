export default function CustomerInfoForm({ customerName, setCustomerName, customerPhone, setCustomerPhone }) {
    // Reglas: máximo 50 caracteres para nombre, solo letras y espacios
    const handleNameChange = (e) => {
        const value = e.target.value;
        // Permite letras, espacios, acentos y ñ
        if (/^[a-zA-ZÀ-ÿñÑ\s]*$/.test(value) && value.length <= 50) {
            setCustomerName(value);
        }
    };

    // Reglas: máximo 15 caracteres para teléfono, solo números
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 15) {
            setCustomerPhone(value);
        }
    };

    return (
        <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6 shadow-lg">
            <h3 className="text-black font-bold text-2xl mb-5 border-b border-gray-300 pb-3">
                Datos del Cliente
            </h3>

            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Nombre completo</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={handleNameChange}
                    placeholder="Ingresa tu nombre"
                    className="w-full p-3 rounded-xl bg-gray-100 text-black border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Número de teléfono</label>
                <input
                    type="text"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ingresa tu número"
                    className="w-full p-3 rounded-xl bg-gray-100 text-black border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    required
                />
            </div>

            <p className="text-gray-500 text-sm">
                Estos datos se usarán para tu pedido. No se requiere iniciar sesión.
            </p>
        </div>
    );
}
