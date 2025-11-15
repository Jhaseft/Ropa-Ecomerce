import { X } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    Autocomplete
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px"
};

export default function MapModal({ open, onClose, setAddress }) {
    if (!open) return null;

    const [position, setPosition] = useState({ lat: -17.3895, lng: -66.1568 });
    const [autocomplete, setAutocomplete] = useState(null);

    // Cargar la API
    const { isLoaded } = useJsApiLoader({
        libraries: ["places"]
    });

    const onLoad = useCallback((autocomplete) => setAutocomplete(autocomplete), []);
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                setPosition({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
            }
        }
    };

    const handleConfirm = () => {
        setAddress((a) => ({
            ...a,
            lat: position.lat,
            lng: position.lng
        }));
        onClose();
    };

    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-xl w-[700px] border border-gray-700 relative shadow-xl">
                {/* Botón X */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <h2 className="text-white font-semibold text-xl mb-4">
                    Seleccione la ubicación en el mapa
                </h2>

                {/* Autocomplete */}
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        placeholder="Buscar dirección..."
                        className="w-full p-3 mb-4 rounded text-black"
                    />
                </Autocomplete>

                {/* Mapa */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={15}
                    onClick={(e) =>
                        setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                    }
                >
                    <Marker
                        position={position}
                        draggable={true}
                        onDragEnd={(e) =>
                            setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                        }
                    />
                </GoogleMap>

                {/* Botón confirmar */}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-green-600 px-5 py-2 rounded-lg text-white font-medium hover:bg-green-700"
                        onClick={handleConfirm}
                    >
                        Confirmar ubicación
                    </button>
                </div>
            </div>
        </div>
    );
}
