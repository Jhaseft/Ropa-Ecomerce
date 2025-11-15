import { Head } from '@inertiajs/react';
import Header from '@/Components/welcome/Header';
import Footer from '@/Components/welcome/Footer';
import { CartProvider } from '@/Contexts/CartContext';

export default function Layout({ title, auth, children }) {


  return (
    <CartProvider>
      <Head title={title || "Carrito de Compras"} />

      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 relative">
        <Header auth={auth} />
        <main className="flex-1 container mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
