import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { productList } from "../database/productList";

export default function ProductArea(props){

    const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = useState(config);
      
        const sortedItems = useMemo(() => {
          let sortableItems = [...productList];
          if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            });
          }
          return sortableItems;
        }, [items, sortConfig]);
      
        const requestSort = (key) => {
          let direction = 'ascending';
          if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
          ) {
            direction = 'descending';
          }
          setSortConfig({ key, direction });
        };
      
        return { items: sortedItems, requestSort, sortConfig };
    };

    const { items, requestSort, sortConfig } = useSortableData(productList);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const sirala = (key) => {
        requestSort(key);
        getClassNamesFor(key);
    }

    return(
        <>
        <ul className="ordered-list">
            <li>Sırala:</li>
            <li className="order-item">
                <button type="button" onClick={() => sirala('price')}>
                Fiyata Göre&nbsp;&nbsp;<i className="fa-solid fa-sort"></i>
                </button>
            </li>
            <li className="order-item">
                <button type="button"
                onClick={() => sirala('name')}>
                İsme Göre (Alfabetik)&nbsp;&nbsp;<i className="fa-solid fa-sort"></i>
                </button>
            </li>
        </ul>
        <div className="product-list">
            {
             items.slice(0, props.sayi).map((product, index) =>
                <div className="product-card" key={index}>
                   <div className="img-area">
                     <img src={product.image} alt={product.name} />
                   </div>
                   <div className="content-area">
                     <Link to={`/products/${product.id}`}>
                        <h2 className="title">
                            {product.name}
                        </h2>
                     </Link>
                     <div className="price">
                         <span>{product.price} TL</span>
                     </div>
                     <div className="shipping-area">
                     {product.price >= 6000 && 
                     <>
                     <i className="fa-solid fa-truck"></i> Kargo Bedava
                     </>
                     }
                     </div>
                     <div className="action-area">
                        <button onClick={() => props.urunEkle(product)}><i className="fa-solid fa-cart-shopping"></i>&nbsp;Sepete Ekle</button>
                     </div>
                   </div>
                </div>
             )
            }
        </div>
        </>
        
        
    )
}