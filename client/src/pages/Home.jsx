import Navbar from '../components/Header/Navbar';
import AdBanner from '../components/Ad/AdBanners';
import ProductGrid from '../components/Product/ProductGrid';

export default function Home() {
  return (
    <>
      <Navbar currentPage="Home" />

      <div className="pt-16"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <AdBanner />
        <ProductGrid />
      </div>
    </>
  );
}
