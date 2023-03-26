import { Link } from "react-router-dom"
import CartSide from "./CartSide"
import Menu from "./Menu"

export default function Header(props){
    const showSidebar = () => {
        document.querySelector('header .cart-area .cart-sidebar').classList.toggle('show')
    }
    const showMobileMenu = () => {
        document.querySelector('header .menu-area .mobile-menu').classList.toggle('show')
    }
    return(
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="logo-link">
                        <h1>E-Commerce App</h1>
                    </Link>
                    <div className="menu-area">
                        <ul className="desktop">
                            <Menu />
                        </ul>
                        <div className="mobile">
                            <button type="button" className="mobile-btn" onClick={showMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <ul className="mobile-menu">
                                <Menu />
                            </ul>
                        </div>
                        <div className="cart-area">
                            <div className="icon">
                                <i className="fa-solid fa-cart-shopping" onClick={showSidebar}></i>&nbsp;
                                <div className="cart-piece">
                                    {props.urunSayisi}
                                </div>
                            </div>
                            <CartSide urunler={props.urunler}/>
                        </div>
                    </div>   
                </nav>
            </div>
        </header>
    )
}