import { productList } from "../database/productList";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export function ProductDetail(props){
    const {productId} = useParams();
    const thisProduct = productList.find(prod => prod.id === Number(productId));
    const cartProducts = props.sepettekiUrunler;
    const links = [
        {
        url: '/products',
        title: 'Ürünler',
        isActive: false
        },
        {
        url: `/products/${productId}`,
        title: thisProduct.name,
        isActive: true
        }
    ];

    return(
        <>
        <Breadcrumb link={links} mainTitle={thisProduct.name}/>
        <section className="product-detail">
            <div className="product">
                <div className="img-area">
                    <img src={thisProduct.image} alt={thisProduct.name} />
                </div>
                <div className="content-area">
                    <h1 className="title">{thisProduct.name}</h1>
                    <div className="price-area">
                        <span>{thisProduct.price} TL</span>
                    </div>
                    <div className="action-area">
                        {
                            cartProducts.find(prod => prod.id === Number(productId)) ? <button className="grey-btn">Bu ürünü sepete eklediniz!</button> : 
                            <button className="addToCart-btn" onClick={() => props.urunEkle(thisProduct)}><i className="fa-solid fa-cart-shopping"></i>&nbsp;Sepete Ekle</button>
                        }
                        
                    </div>
                </div>
            </div>
        </section>
        </>
        
        
    )
}