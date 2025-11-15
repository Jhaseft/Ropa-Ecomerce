import { Map } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import AddressFormModal from './AddressFormModal';
import MapModal from './MapModal';

export default function ShippingForm({
    shippingType,
    setShippingType,
    date,
    setDate,
    time,
    setTime,
    address,
    setAddress
}) {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    const [hours] = useState(
        Array.from({ length: 25 }, (_, i) => {
            const h = String(i).padStart(2, '0');
            return [`${h}:00`, `${h}:30`];
        }).flat()
    );

    return (
        <>
            {/* MODALES */}
            <AddressFormModal
                open={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                onNext={() => {
                    setShowAddressModal(false);
                    setShowMapModal(true);
                }}
                setAddress={setAddress}
            />

            <MapModal
                open={showMapModal}
                onClose={() => setShowMapModal(false)}
                setAddress={setAddress}
            />

            {/* FORMULARIO */}
            <div className="border border-gray-700 p-4 rounded mb-4">
                <h3 className="font-semibold mb-4 text-white">Envío *</h3>

                {/* Opciones de envío */}
                <div className="flex flex-col gap-2">
                    <label
                        className={`border p-3 rounded cursor-pointer ${
                            shippingType === 'local'
                                ? 'border-blue-500 bg-gray-800'
                                : 'border-gray-600'
                        }`}
                    >
                        <input
                            type="radio"
                            name="shipping"
                            value="local"
                            className="mr-2"
                            checked={shippingType === 'local'}
                            onChange={(e) => setShippingType(e.target.value)}
                        />
                        <span className="font-semibold text-white">Recojo en el local</span>
                        <p className="text-gray-400 text-sm mt-1">
                            Recoja su pedido de nuestra oficina, la ubicación será enviada a su Email
                        </p>
                    </label>

                    <label
                        className={`border p-3 rounded cursor-pointer ${
                            shippingType === 'envio'
                                ? 'border-blue-500 bg-gray-800'
                                : 'border-gray-600'
                        }`}
                    >
                        <input
                            type="radio"
                            name="shipping"
                            value="envio"
                            className="mr-2"
                            checked={shippingType === 'envio'}
                            onChange={(e) => setShippingType(e.target.value)}
                        />
                        <span className="font-semibold text-white">Pedido a domicilio</span>
                        <p className="text-gray-400 text-sm mt-1">
                            Ubicaciones más alejadas tienen un costo extra a confirmar.
                        </p>
                    </label>
                </div>

                {/* Dirección */}
                {shippingType === 'envio' && (
                    <button
                        className="flex items-center gap-2 mt-4 w-full justify-center border border-gray-600 rounded p-2 text-white hover:bg-gray-700"
                        onClick={() => setShowAddressModal(true)}
                    >
                        <Map size={16} /> Introduzca la dirección
                    </button>
                )}

                {/* Fecha y hora */}
                <div className="mt-4 flex flex-col gap-2">
                    <label className="text-gray-300">Seleccione una fecha</label>
                    <DatePicker
                        className="w-full bg-black border border-gray-600 rounded p-2 text-white"
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        placeholderText="Seleccione una fecha"
                        dateFormat="dd/MM/yyyy"
                    />

                    <label className="text-gray-300 mt-2">Seleccione una hora</label>
                    <select
                        className={`w-full bg-black border border-gray-600 rounded p-2 text-white ${
                            !date ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={!date}
                    >
                        <option value="">-- Seleccione una hora --</option>
                        {hours.map((h) => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
