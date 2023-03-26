import { NavLink } from "react-router-dom"

export default function Menu(){
    return(
        <>
            <li>
                <NavLink to="/">Anasayfa</NavLink>
            </li>
            <li>
                <NavLink to="products">Ürünler</NavLink>
            </li>
            <li>
                <NavLink to="cart">Sepet</NavLink>
            </li>
        </>
    )
}