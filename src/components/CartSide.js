export default function CartSide(props){
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
        <div className="cart-sidebar">
            {
                props.urunler.map((urun, index) =>
                <div className="product-card" key={index}>
                    <div className="img-area">
                        <img src={urun.image} alt={urun.name} />
                    </div>
                    <div className="content">
                        <h3 className="title">{urun.name}</h3>
                        <div className="price-area">
                            <span>{urun.price} TL</span>
                        </div>
                        <div className="action-area">
                            <div className="left">
                                {urun.quantity !== 1 && <button className="decrease" onClick={() => decreaseQuantity(urun)}>-</button>}
                                <input type="text" readOnly={true} value={urun.quantity}/>
                                {urun.quantity < urun.stock && <button className="increase" onClick={() => increaseQuantity(urun)}>+</button>}
                            </div>
                            <div className="right">
                                <button type="reset" onClick={() => removeProduct(urun)}>Sil&nbsp;<i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                
                )
                
                
            }
        </div>
    )
}