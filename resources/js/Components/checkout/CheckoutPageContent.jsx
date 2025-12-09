'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/Contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CustomerInfoForm from './CustomerInfo'; 
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import Layout from '@/Layouts/LayoutCheckout';
import { Head, router } from '@inertiajs/react';

export default function CheckoutPageContent() {
    const { cart = [], subtotal = 0, total = 0 } = useCart();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    useEffect(() => {
        if (cart.length > 0) setLoading(false);
    }, [cart]);

    const handlePlaceOrder = () => {
        if (!customerName.trim() || !customerPhone.trim()) {
            alert("Debes ingresar tu nombre y número de teléfono.");
            return;
        }

        setProcessing(true);

        const orderItems = cart.map(item => ({
            id: item.id,
            quantity: item.qty,
            price: item.price,
            subtotal: item.price * item.qty
        }));

        router.post('/orders/store', {
            customer_name: customerName,
            customer_phone: customerPhone,
            shipping_type: shippingType,
            delivery_date: date,
            delivery_time: time,
            address,
            cart: orderItems,
            subtotal,
            total,
        }, {
            onError: (errors) => {
                console.error("Error al crear pedido: ", errors);
                setProcessing(false);
            },
            onSuccess: () => setProcessing(false)
        });
    };

    return (
        <Layout title="Checkout">
            <Head title="Checkout" />

            <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-2xl shadow-lg border border-gray-300">
                <CheckoutHeader />

                {/* Formulario de cliente */}
                <CustomerInfoForm
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    customerPhone={customerPhone}
                    setCustomerPhone={setCustomerPhone}
                    className="mb-6"
                />

                {/* Carrito de productos */}
                <CartItems cart={cart} loading={loading} subtotal={subtotal} total={total} className="mb-6" />

                
                {/* Resumen de pedido */}
                <OrderSummary cart={cart} subtotal={subtotal} total={total} loading={loading} className="mb-6" />

                {/* Botón de realizar pedido */}
                <button
                    className={`w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md flex justify-center items-center transition-all duration-300 ${
                        (loading || processing) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePlaceOrder}
                    disabled={loading || processing}
                >
                    {processing && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    )}
                    {processing ? "Procesando..." : "Realizar Pedido"}
                </button>
            </div>
        </Layout>
    );
}
