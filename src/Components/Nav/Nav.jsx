import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import './Nav.css'
const Nav = () => {

    const { numOfItem } = useContext(CartContext)
    const [touched, setTouched] = useState(false)
    const [nav, setNav] = useState(false)
    const { token, setToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tkn")
        setToken(null)
        navigate("/login")
    }

    function touchBtn() {

        if (touched === false) {
            setTouched(true)
        } else {
            setTouched(false)
        }
    }

    const handleNav = () => {
        if (window.scrollY >= 10) {
            setNav(true)
        } else {
            setNav(false)
        }
    }
    window.addEventListener("scroll", handleNav)

    return (
        <>
            <nav className={nav ? "bg-[#f0f3f2] shadow-xl border-gray-200 fixed top-0 end-0 start-0 py-2 transition-all duration-500 z-40" : "bg-[#f0f3f2] shadow-xl border-gray-200 fixed top-0 end-0 start-0 transition-all duration-500 z-40"}>
                <div className={nav ? " flex flex-wrap justify-between md:justify-center items-center mx-auto p-4 lg:w-[80%] transition-all duration-500" : "transition-all duration-500 flex flex-wrap justify-between items-center mx-auto p-4 lg:w-[90%]"}>
                    <Link
                        to={"/"}
                        className="flex items-center space-x-3 rtl:space-x-reverse md:w-1/8"
                    >
                        <img src={logo} className="block w-full" alt="fresh-cart logo" />
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0aad0a] focus:ring-offset-2 focus:ring-offset-gray-50"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                        onClick={touchBtn}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={touched ? "w-full md:w-7/8 md:flex md:justify-between md:items-center md:mx-3 flex-grow-1" : "hidden w-full md:w-4/6 md:flex md:justify-between md:items-center md:mx-3 flex-grow-1"}
                        id="navbar-default"
                    >
                        <ul className=" md:w-3/6 font-medium flex flex-col justify-items p-4 items-center md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            {token ? <><li>
                                <NavLink
                                    to={"/"} className="block py-2 px-3 text-gray-600 rounded-sm md:hover:text-[#000] transition-all duration-500 md:p-0"
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>

                                <li>
                                    <NavLink to={"/allorders"} className="block py-2 px-3 text-gray-600 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-[#000] transition-all duration-500 md:p-0">
                                        Orders
                                    </NavLink>
                                </li></> : ""}
                        </ul>

                        <div className="flex flex-wrap justify-center items-center flex-col md:flex-row md:justify-between md:space-x-3">
                            <div className="md:w-3/6 flex justify-center flex-row items-center md:flex-row space-x-3">

                                <i className="fa-brands fa-instagram md:hover:text-[#0aad0a] transition-all duration-300"></i>


                                <i className="fa-brands fa-facebook md:hover:text-[#0aad0a] transition-all duration-300"></i>


                                <i className="fa-brands fa-tiktok md:hover:text-[#0aad0a] transition-all duration-300"></i>


                                <i className="fa-brands fa-twitter md:hover:text-[#0aad0a] transition-all duration-300"></i>


                                <i className="fa-brands fa-linkedin md:hover:text-[#0aad0a] transition-all duration-300"></i>


                                <i className="fa-brands fa-youtube md:hover:text-[#0aad0a] transition-all duration-300"></i>

                                {
                                    token ? <><NavLink to={"/cart"} className="relative block py-2 px-3 mx-4 text-gray-600 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-[#000] transition-all duration-500 md:p-0">
                                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                        <div className="absolute inline-flex items-center justify-center w-[20px] h-[20px] text-[10px] font-bold text-white bg-red-500 border-2  rounded-full -top-2 -end-4">{numOfItem}</div>
                                    </NavLink>
                                    </> : ""
                                }


                            </div>
                            {!token ? <>
                                <NavLink to={"/register"} className="text-gray-600 md:hover:text-[#000] transition-all duration-500">Register</NavLink>
                                <NavLink to={"/login"} className="text-gray-600 md:hover:text-[#000] transition-all duration-500">Login</NavLink>
                            </>
                                :
                                <button className="text-gray-600 cursor-pointer md:hover:text-[#000] transition-all duration-500 " onClick={logout}>
                                    Log out
                                </button>}
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
