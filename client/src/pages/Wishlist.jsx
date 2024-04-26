import Navbar from '../components/Header/Navbar'
import WishlistGrid from '../components/Product/WishListGrid'

export default function Wishlist() {
    return (
        <>
            <Navbar />
            <div className="pb-16"></div>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <WishlistGrid />
            </div>
        </>
    )
}
