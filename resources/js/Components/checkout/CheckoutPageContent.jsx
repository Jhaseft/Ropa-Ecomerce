import { useState, useEffect } from 'react';
import { useCart } from '@/Contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CustomerInfo from './CustomerInfo';
import CartItems from './CartItems';
import ShippingForm from './ShippingForm';
import OrderSummary from './OrderSummary';
import PlaceOrderButton from './PlaceOrderButton';
import Layout from '@/Layouts/LayoutCheckout';
import { Head } from '@inertiajs/react';

export default function CheckoutPageContent({ auth }) {
    const { cart = [], subtotal = 0, total = 0 } = useCart();
    const [loading, setLoading] = useState(true);
    const [shippingType, setShippingType] = useState("local");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (cart.length > 0 || subtotal > 0 || total > 0) setLoading(false);
    }, [cart, subtotal, total]);

    const handlePlaceOrder = () => {
        console.log("Pedido realizado:", {
            clientName: auth.user.name,
            email: auth.user.email,
            cart,
            shippingType,
            date,
            time,
            address
        });
        alert(`Pedido realizado para ${auth.user.name}. Revisar consola para detalles.`);
    };

    return (
        <Layout title="Checkout" auth={auth}>
            <Head title="Checkout" />
            <div className="max-w-2xl mx-auto p-4 text-white">
                <CheckoutHeader />
                <CustomerInfo user={auth.user} />
                <CartItems cart={cart} loading={loading} />
                <ShippingForm
                    shippingType={shippingType} setShippingType={setShippingType}
                    date={date} setDate={setDate}
                    time={time} setTime={setTime}
                    address={address} setAddress={setAddress}
                />
                <OrderSummary cart={cart} subtotal={subtotal} total={total} loading={loading} />
                <PlaceOrderButton handlePlaceOrder={handlePlaceOrder} />
            </div>
        </Layout>
    );
}
