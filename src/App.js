import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import MyModal from "./components/UI/MyModal/MyModal";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Order from "./pages/Order/Order";

import { Route,Routes,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosDevices } from "./store/asyncActions/devices";
import { setVisibleCart,updateCart } from "./store/CartSlice";
import { updateFavorites } from "./store/DevicesSlice";

import style from "./style.scss";

function App() {


const dispatch = useDispatch();
const navigate = useNavigate();
const visibleCart = useSelector(state => state.cart.cartVisible)
const cart = useSelector(state => state.cart.devicesInCart)
const favoriteItems = useSelector(state => state.devices.favorites)

//При первом запуске, берем данные из 'бека,'проверка, есть ли что то в локал сторадже, если да то заливаем в корзину и в любимые 
useEffect(()=>{
  dispatch(axiosDevices())

  const cardItemsInStore = JSON.parse(localStorage.getItem('cart'))
  const favoriteItemsInStore = JSON.parse(localStorage.getItem('favorites'))
  
  if(favoriteItemsInStore){
    if(favoriteItemsInStore.length){
      dispatch(updateFavorites(favoriteItemsInStore))
    }
  }
  
  if(cardItemsInStore){
    if(cardItemsInStore.length){
      dispatch(updateCart(cardItemsInStore))
    }
  }
},[dispatch])
//Обновление локалстораджа,если что то добавлено в любимые 
useEffect(()=>{
   localStorage.setItem('favorites', JSON.stringify(favoriteItems))
},[favoriteItems])
//Обновление локалстораджа,если что то добавлено в корзину 
useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(cart))
},[cart])
  return (
    <div className="Wrapper">
            <Header/>
              <MyModal visible={visibleCart} setVisible={()=>dispatch(setVisibleCart(false))}>
                <ShoppingCart />
              </MyModal> 
     <div className="Body">
        <Routes> 
          <Route path="/SecretReactShop/" element={<Home/>}></Route>
          <Route path="/favorites" element={<Favorites/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
        </Routes>
        <Footer/>
     </div>
    </div>
  );
}



export default App;
