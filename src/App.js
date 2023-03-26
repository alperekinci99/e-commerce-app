import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";

import { toast } from 'react-toastify';

// pages
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { useEffect, useState } from "react";

function App() {
  const [ cartList, setCartList ] = useState([]);

  // component yüklendiğinde localStorage üzerinden değerleri getir
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('products'));
    if(data) {
        setCartList(data)
    }
  }, []);

  // notes state'i update edildiğinde
  useEffect(() => {
      localStorage.setItem('products', JSON.stringify(cartList))
  }, [cartList])

  const addProduct = (product) => {
      // ilgili product eklenmişse, tekrar eklememek için
      if(!cartList.includes(product)){
        product.quantity = 1;
        setCartList(prevList => [...prevList, product]);
        toast.success("Ürün başarıyla sepete eklendi!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          theme: "dark"
        })
      } else{
        toast.warning("Bu ürün zaten sepette bulunmaktadır!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          theme: "dark"
        })
      }
  }

  const removeProduct = (product) => {
      setCartList(prevList => prevList.filter(item => item.id !== product.id));
      toast.error("Ürünü başarıyla sildiniz!", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        theme: "dark"
      })
  }

  const incQuantity = (product) => {
    setCartList(prevList => prevList.map((item) => {
      if (item.id === product.id) {
        return { ...product, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    }));
  }
  const decQuantity = (product) => {
    setCartList(prevList => prevList.map((item) => {
      if (item.id === product.id) {
        return { ...product, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    }));
  }
  
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartList.forEach((urun) => {
      totalPrice += urun.price
    });
    return totalPrice;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout urunler={cartList} urunSayisi={cartList.length} />,
      children: [
        {index: true, element: <Home urunEkle={addProduct} />},
        {path: 'home', element: <Home />},
        {path: 'cart', element: <Cart urunler={cartList} urunSil={removeProduct} adetArttir={incQuantity} adetAzalt={decQuantity} toplamFiyat={getTotalPrice}/>},
        {
          path: 'products', 
          children: [
            { index: true, element: <Products urunEkle={addProduct}/> },
            { path: '/products/:productId', element: <ProductDetail urunEkle={addProduct} sepettekiUrunler={cartList}/> }
          ]
        },
        {
          path: '*', element: <NotFound />
        }
      ]
    },
    
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
