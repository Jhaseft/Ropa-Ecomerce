import { Head } from '@inertiajs/react';
import Header from '@/Components/welcome/Header';
import Footer from '@/Components/welcome/Footer';
import { CartProvider } from '@/Contexts/CartContext';
import { useState } from 'react';
import CartIcon from '@/Components/welcome/Cart/CartIcon';
import CartModal from '@/Components/welcome/Cart/CartModal';

export default function Layout({ title, auth, children }) {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Head title={title || "Tienda de Ropa"} />

      <div className="min-h-screen flex flex-col bg-white text-black relative">
        <Header auth={auth} />
        <main className="flex-1 container mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />

        {/* Carrito */}
        <div className="fixed bottom-6 right-6 z-[9999]">
          <CartIcon
            className="text-black hover:text-gray-800 transition"
            onClick={() => setCartOpen(true)}
          />
        </div>

        {/* Modal del carrito */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          className="z-[99999]"
        />

        {/* Botón WhatsApp */}
        <a
          href="https://wa.me/75985891"
          target="_blank"
          className="fixed bottom-12 right-6 w-16 h-16 rounded-full bg-black shadow-xl flex items-center justify-center hover:bg-gray-800 transition z-[1000]"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-8 h-8 filter brightness-0 invert"
          />
        </a>
      </div>
    </CartProvider>
  );
}
