import Breadcrumb from "../components/Breadcrumb"

export function Cart(props){

    const links = [{
        url: '/cart',
        title: 'Sepet',
        isActive: true
    }];

    const removeProduct = (product) => {
        if(window.confirm('Ürünü silmek istediğinize emin misiniz?')){
            props.urunSil(product);
        }
        
    }

    const increaseQuantity = (product) => {
        props.adetArttir(product);
    }

    const decreaseQuantity = (product) => {
        props.adetAzalt(product);
    }
    
    return(
        <>
        <Breadcrumb link={links} mainTitle="Sepet"/>
        <section className="cart">
            { props.urunler.length !== 0 ? 

            <div className="section-content-area">
                <div className="cart-products">
                    {props.urunler.map((item, index) => 
                    <div className="product-card" key={index}>
                        <div className="img-area">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="content">
                            <h3 className="title">{item.name}</h3>
                            <div className="price-area">
                                <span>{item.price} TL</span>
                            </div>
                            <div className="action-area">
                                <div className="left">
                                    {item.quantity !== 1 && <button className="decrease" onClick={() => decreaseQuantity(item)}>-</button>}
                                    <input type="text" readOnly={true} value={item.quantity}/>
                                    {item.quantity < item.stock && <button className="increase" onClick={() => increaseQuantity(item)}>+</button>}
                                </div>
                                <div className="right">
                                    <button type="reset" onClick={() => removeProduct(item)}>Sil&nbsp;<i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        
                    </div>)}
                </div>
                <div className="sidebar">
                    <div className="content">
                        <div className="totalPrice">
                            Toplam Fiyat: <span> {props.toplamFiyat} TL</span>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
             : <div className="alert alert-warning">Sepetinizde ürün bulunmamaktadır...</div>
        }

        </section>
        </>
        
        

            

    )
}