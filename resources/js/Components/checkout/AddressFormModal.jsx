import { X } from "lucide-react";

export default function AddressFormModal({ open, onClose, onNext, setAddress }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-xl w-[520px] border border-gray-700 relative shadow-2xl">

                {/* Botón X */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <h2 className="text-white font-semibold text-xl mb-6 text-center">
                    Datos de dirección
                </h2>

                <div className="flex flex-col gap-5">
                    <input
                        className="w-full bg-black border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="Dirección de la calle"
                        onChange={(e) =>
                            setAddress((a) => ({ ...a, street: e.target.value }))
                        }
                    />

                    <input
                        className="w-full bg-black border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="Apartamento o número de casa"
                        onChange={(e) =>
                            setAddress((a) => ({ ...a, number: e.target.value }))
                        }
                    />

                    <input
                        className="w-full bg-black border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="Ciudad"
                        onChange={(e) =>
                            setAddress((a) => ({ ...a, city: e.target.value }))
                        }
                    />

                    <input
                        className="w-full bg-black border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="País"
                        onChange={(e) =>
                            setAddress((a) => ({ ...a, country: e.target.value }))
                        }
                    />
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        className="bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
                        onClick={onNext}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
