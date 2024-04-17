import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { axiosFetch } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import { Loader } from "..";
import "./Navbar.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosFetch.get('/auth/me');
        setUser(data.user);
      } catch ({ response }) {
        localStorage.removeItem('user');
        console.log(response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
      });
    };
  }, []);

  const menuLinks = [
    { path: "/MobilePhones", name: "Mobile Phones" },
    { path: "/Laptops-Computers", name: "Laptops and Computers" },
    { path: "/TechAccessories", name: "Tech Accessories" },
    { path: "/Fashion", name: "Fashion" },
    { path: "/Home-Decor", name: "Home and Decor" },
    { path: "/Beauty-Health", name: "Support Services" },
    { path: "/Books", name: "Books" },
    { path: "/Toys-Games", name: "Toys and Games" },
    { path: "/Sports-Outdoors", name: "Sports and Outdoors" },
    { path: "/Food-Grocery", name: "Food and Grocery" },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    prevArrow: <GrFormPrevious />,
    nextArrow: <GrFormNext />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await axiosFetch.post("/auth/logout");
      localStorage.removeItem('user');
      setUser(null);
      navigate("/");
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  return (
    <nav className={showMenu || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">OLumsX</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <div className="menu-links">
            <Link to="/ourteam" className="link">Our Team</Link>
          </div>
          {isLoading ? (
            <Loader size={35} />
          ) : (
            <>
              {!user && (
                <span>
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </span>
              )}
              {!user && (
                <button
                  className={showMenu || pathname !== "/" ? "join-active" : ""}
                >
                  <Link to="/register" className="link">
                    Join
                  </Link>
                </button>
              )}
              {user && (
                <div className="user" onClick={() => setShowPanel(!showPanel)}>
                  <img src={user.image || "/media/noavatar.png"} alt="User avatar" />
                  <span>{user?.username}</span>
                  {showPanel && (
                    <div className="options">
                      <Link className="link" to="/profile">
                        Profile
                      </Link>
                      <Link className="link" to="/settings">
                        Settings
                      </Link>
                      <Link className="link" to="/logout" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {(showMenu || pathname !== "/") && (
        <>
          <hr />
          <Slider className="menu" {...settings}>
            {menuLinks.map(({ path, name }) => (
              <div key={name} className="menu-item">
                <Link className="link" to={path}>
                  {name}
                </Link>
              </div>
            ))}
          </Slider>
        </>
      )}
    </nav>
  );
};

export default Navbar;
