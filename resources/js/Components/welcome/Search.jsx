import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative">
        {/* Ícono negro */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-6 h-6" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="
            w-full pl-14 pr-4 py-3 
            rounded-2xl 
            border border-gray-300
            bg-white
            text-black
            placeholder-gray-500
            shadow-sm

            focus:outline-none 
            focus:ring-2 focus:ring-black
            focus:border-black
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}
