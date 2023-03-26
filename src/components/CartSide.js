export default function CartSide(props){
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
                    </div>
                </div>
                
                
                )
                
                
            }
        </div>
    )
}