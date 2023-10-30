import Header from "./components/Header/Header";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Device  from "./components/Device/Device";
import MyModal from "./components/UI/MyModal/MyModal";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosDevices } from "./store/asyncActions/devices";
import { setVisibleCart,updateCart } from "./store/CartSlice";

import style from "./style.scss";

function App() {
const loadingdevices = [<Device key={0} loading = {true}/>,<Device  key={1} loading = {true}/>,<Device  key={2} loading = {true}/>,<Device  key={3} loading = {true}/>,<Device key={4}  loading = {true}/>]

const dispatch = useDispatch();
const devices = useSelector(state => state.devices.devices);
const visibleCart = useSelector(state => state.cart.cartVisible)
const cart = useSelector(state => state.cart.devicesInCart)

//При первом запуске, проверка, есть ли что то в локал сторадже, если да то заливаем в корзину
useEffect(()=>{
  const localst = JSON.parse(localStorage.getItem('cart'))
  if(localst.length)
    dispatch(updateCart(localst))

},[])

//Обновление локалстораджа,если что то добавлено в корзину 
useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(cart))
},[cart])

//Подгрузка с 'бека' девайсов
useEffect(()=>{
  dispatch(axiosDevices())
},[dispatch])

  return (
    <div className="Wrapper">
            <Header/>
            <MyModal visible={visibleCart} setVisible={()=>dispatch(setVisibleCart(false))}>
               <ShoppingCart />
            </MyModal> 
     <div className="Body">
        <div className="Slider">

        </div>
       <div className="AllDevices">
          <div style={{display: "flex", justifyContent: "space-between"}}>  
            <h2>Усі<span> девайси:</span></h2>
          {devices.length ? <div className="Search">
              <div>
                <input placeholder="Я шукаю..."></input>
              </div>
            </div> : null}
         </div>
        <div className="AllDevicesBox">
        {devices.length ? devices.map(device=>
        <Device
          key={device.id}
          device={device}
         />)
         : loadingdevices
        }
        </div>
        </div> 
     </div>
    </div>
  );
}

export default App;
