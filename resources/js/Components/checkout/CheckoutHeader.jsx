import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';

export default function CheckoutHeader() {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1  className="text-4xl font-semibold text-black"
                    style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>Checkout</h1>

                <h2
                    className="text-4xl font-semibold text-black"
                    style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}
                >
                    EXCLUSIVE
                </h2>

                <p
                    className="text-xs text-gray-600 tracking-widest"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Oruro · Bolivia
                </p>
            </div>

            <Link href="/" className="text-black hover:text-gray-700 transition-colors">
                <Home size={28} />
            </Link>
        </div>
    );
}
