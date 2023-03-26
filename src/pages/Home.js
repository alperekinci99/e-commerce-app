import ProductArea from "../components/ProductArea";
import { productList } from "../database/productList";
import { Link } from "react-router-dom";

export function Home(props){
    return(
        <section className="home">
            <h3>Hoşgeldiniz!</h3>
            <p>
                Sitemize hoşgeldiniz, aşağıda ürünleri görebilirsiniz.
            </p>
            <ProductArea sayi={productList.length-3} urunEkle={props.urunEkle}/>
            <div className="more-btn">
                <Link to="products">Tümünü Gör&nbsp;&nbsp;<i className="fa-solid fa-eye"></i></Link>
            </div>
        </section>
    )
}