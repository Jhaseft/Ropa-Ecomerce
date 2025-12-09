import { useEffect, useState } from 'react';
import SearchBar from '@/Components/welcome/Search';
import { useCart } from '@/Contexts/CartContext';
import CategoryFilter from './CategoryFilter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingId, setAddingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const { addToCart } = useCart();

  const priorityCategories = ['Destacados', 'Ofertas'];

  useEffect(() => {
    setLoading(true);
    fetch('/products')
      .then(res => res.json())
      .then(data => {
        let cats = Array.isArray(data) ? data : [];

        cats.sort((a, b) => {
          const indexA = priorityCategories.indexOf(a.name);
          const indexB = priorityCategories.indexOf(b.name);
          if (indexA !== -1 || indexB !== -1) return indexA !== -1 ? -1 : 1;
          return 0;
        });

        setCategories(cats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (product) => {
    const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
    if (totalStock === 0) return;

    setAddingId(product.id);
    await addToCart({
      id: product.id,
      nombre: product.name,
      precio: product.price,
      cantidad: 1,
      image: product.image || 'https://via.placeholder.com/100',
    });

    setAddingId(null);
    setSuccessId(product.id);
    setTimeout(() => setSuccessId(null), 1500);
  };

  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-500 text-xl animate-pulse">
        Cargando productos...
      </p>
    );
  }

  const displayedCategories = selectedCategory
    ? categories.filter(cat => cat.name === selectedCategory)
    : categories;

  return (
    <section className="px-4 sm:px-6 lg:px-8 text-black">

      <SearchBar onSearch={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {displayedCategories.map((category, idx) => {
        const filteredProducts = category.products.filter(product =>
          (product.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        );

        const hasChildren = category.children && category.children.length > 0;

        return (
          <div key={category.id} className="mb-12">

            {idx !== 0 && <hr className="border-gray-300 my-12" />}

            <div className="relative mb-6">
              <h2
                className="
                              text-4xl md:text-5xl font-bold text-black 
                              tracking-[2px] uppercase pl-4 py-2
                              border-l-[6px] border-black
                            "
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-600 mt-2 italic pl-2">
                  {category.description}
                </p>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <CategorySwiper
                products={filteredProducts}
                handleAddToCart={handleAddToCart}
                addingId={addingId}
                successId={successId}
              />
            )}

            {hasChildren && category.children.map((sub, subIdx) => {
              const filteredSubProducts = sub.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <div key={sub.id} className="mt-12">
                  <h3
                    className="
                        text-2xl mb-10 md:text-3xl font-semibold text-gray-900 
                        tracking-wide pl-3 border-l-4 border-black
                      "
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {sub.name}
                  </h3>

                  {filteredSubProducts.length > 0 && (
                    <CategorySwiper
                      products={filteredSubProducts}
                      handleAddToCart={handleAddToCart}
                      addingId={addingId}
                      successId={successId}
                    />
                  )}

                  {subIdx !== category.children.length - 1 && <hr className="border-gray-200 mt-8" />}
                </div>
              );
            })}

          </div>
        );
      })}
    </section>
  );
}

function CategorySwiper({ products, handleAddToCart, addingId, successId }) {
  if (!products || products.length === 0) return null;

  const isDesktopCarousel = products.length > 3;

  return isDesktopCarousel ? (
    <Swiper
      className="z-[1]"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ '--swiper-navigation-color': '#000' }}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard
            product={product}
            handleAddToCart={handleAddToCart}
            addingId={addingId}
            successId={successId}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          addingId={addingId}
          successId={successId}
        />
      ))}
    </div>
  );
}
