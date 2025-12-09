export default function Footer() {
  return (
    <footer className="bg-black text-center py-6 mt-10 border-t border-gray-800 shadow-inner">
      <p className="text-white font-medium tracking-wide">
        © {new Date().getFullYear()} Exclusive — Todos los derechos reservados.
      </p>
    </footer>
  );
}
