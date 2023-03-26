import { productList } from "../database/productList";
import ProductArea from "../components/ProductArea";
import Breadcrumb from "../components/Breadcrumb";

export function Products(props){
    const links = [{
        url: '/products',
        title: 'Ürünler',
        isActive: true
    }];
    return(
        <>
        <Breadcrumb link={links} mainTitle="Ürünler"/>
        <section className="products">
            <ProductArea sayi={productList.length} urunEkle={props.urunEkle}/>
        </section>
        </>
        
        
    )
}