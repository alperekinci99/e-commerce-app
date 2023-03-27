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
  const [totalPrice, setTotalPrice] = useState(0);

  // component yüklendiğinde localStorage üzerinden değerleri getir
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('products'));
    if(data) {
        setCartList(data)
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('products', JSON.stringify(cartList))
  }, [cartList])

  const addProduct = (product) => {
      // ilgili product eklenmişse, tekrar eklememek için
      if(!cartList.includes(product)){
        product.quantity = 1;
        setCartList(prevList => [...prevList, product]);
        setTotalPrice(
          prevPrice => prevPrice += product.price
        )
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
      setTotalPrice(
        prevPrice => prevPrice -= (product.price * product.quantity)
      )
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
    setTotalPrice(
      prevPrice => prevPrice += product.price
    )
  }
  const decQuantity = (product) => {
    setCartList(prevList => prevList.map((item) => {
      if (item.id === product.id) {
        return { ...product, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    }));
    setTotalPrice(
      prevPrice => prevPrice -= product.price
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout urunler={cartList} urunSayisi={cartList.length} urunSil={removeProduct} adetArttir={incQuantity} adetAzalt={decQuantity}/>,
      children: [
        {index: true, element: <Home urunEkle={addProduct} />},
        {path: 'home', element: <Home />},
        {path: 'cart', element: <Cart urunler={cartList} urunSil={removeProduct} adetArttir={incQuantity} adetAzalt={decQuantity} toplamFiyat={totalPrice}/>},
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
