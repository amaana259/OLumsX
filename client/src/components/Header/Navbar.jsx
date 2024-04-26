import Header1 from "./Header1";
import Header2 from "./Header2";

export default function Navbar() {
    return (
        <>
            <div className="fixed w-full top-0 z-20" style={{
                background: 'linear-gradient(to bottom, #000000, #303030)',
            }}>
                <Header1 />
                <Header2 />
            </div>

            <div className="pb-10"></div>
        </>
    )
}
