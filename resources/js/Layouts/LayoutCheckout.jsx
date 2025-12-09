import { Head } from '@inertiajs/react';
import Header from '@/Components/welcome/Header';
import Footer from '@/Components/welcome/Footer';
import { CartProvider } from '@/Contexts/CartContext';

export default function Layout({ title, auth, children }) {
  return (
    <CartProvider>
      <Head title={title || "Carrito de Compras"} />

      {/* Fondo blanco con toques negros */}
      <div className="min-h-screen flex flex-col bg-white text-black relative">

        {/* Encabezado */}
        <Header auth={auth} className="bg-white text-black shadow-sm" />

        {/* Contenido principal */}
        <main className="flex-1 container mx-auto px-6 py-12">
          {children}
        </main>

        {/* Pie de página */}
        <Footer className="bg-black text-white" />


      </div>
    </CartProvider>
  );
}
