import { useParams } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import ProductGrid from "../components/Product/ProductGrid";

export default function CategoryPage() {
  const { category } = useParams() || "";

  const categoryNames = {
    mobilephones: "Mobile Phones",
    laptopsandcomputers: "Laptops and Computers",
    techaccessories: "Tech Accessories",
    fashion: "Fashion",
    homeanddecor: "Home and Decor",
    beautyandhealth: "Beauty and Health",
    books: "Books",
    toysandgames: "Toys and Games",
    sportsandoutdoors: "Sports and Outdoors",
    foodandgrocery: "Food and Grocery"
  };

  function getCategoryName(category) {
    const normalizedCategory = category.toLowerCase();
    const categoryName = categoryNames[normalizedCategory];
    return categoryName;
  }

  const categoryName = getCategoryName(category);
  console.log(categoryName);

  return (
    <>
      <Navbar />
      <div className="pb-16"></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <ProductGrid category={categoryName} />
      </div>
    </>
  )
}
