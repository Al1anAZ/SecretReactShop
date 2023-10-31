import classes from "./ShoppingCart.module.scss"
import MyButton from "../UI/MyButton/MyButton";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart,minusAmmount,plusAmmount,setVisibleCart, updateCart,setisOrderComplete } from "../../store/CartSlice";


function DeviceInCart({id,device}){
 
  const dispatch = useDispatch();

    return(
     <div className={classes.DeviceInCart}>
        <img src={device.src} alt="DeviceInCard" width={153} height={189}/>
        <div>
          <span>{device.name}</span>
           <hr/>
          <br/>
          <div>
          <h3>{device.price} грн.</h3>
          <span className={classes.DeviceCount}>
              <MyButton inlinestyle={MinusButtonsStyle} handle={()=> dispatch(minusAmmount(id))}  disable= {device.count>1 ? false : true}>-</MyButton>
              <input type="number" min={1} value={device.count} readOnly></input>
              <MyButton inlinestyle={PlusButtonsStyle}  handle={()=> dispatch(plusAmmount(id))}>+</MyButton>
          </span>
          </div>
        </div>
        <div className={classes.Xclose} style={{marginLeft: 30, width: 15, height: 15}}onClick={()=>dispatch(deleteFromCart(id))}></div>
     </div>
    );
}


function ShoppingCart(){
const dipatch = useDispatch()
const devicesInCard = useSelector(state => state.cart.devicesInCart);
const price = useMemo(()=>devicesInCard.reduce((prev,curr)=>{
  return prev +curr.price * curr.count
},0),[devicesInCard])

    return(
         <div className={classes.ShoppingCart}>
           <div className={classes.TopShoppingCart}>
            <h2>Кошик</h2>
              <div className={classes.Xclose} onClick={()=> dipatch(setVisibleCart(false))}></div>
           </div>
           <div className={classes.DevicesInCart}>
            {devicesInCard.length ? devicesInCard.map(device=>
            <DeviceInCart
                id = {device.id} 
                key={device.id}
                device={device}
            />) : <h2 style={{textAlign: "center"}}>Кошик Пустий! <br/>&#128542;</h2>
            }
           </div>
           <div className={classes.BottomShoppingCart}>
               <div className={classes.TotalPrice}>
                  <span>
                    Сума замовлення:
                  </span>
                  <h2>
                    {price} грн.
                  </h2>
               </div>
                 <MyButton inlinestyle={BuyNowButtonStyle} disable = {devicesInCard.length ? false : true}
                  handle={()=>{
                  dipatch(updateCart([])) 
                  dipatch(setisOrderComplete(true))
                }
                  }>
                    Купити зараз!
                 </MyButton>
           </div>
       </div>
    );
}
export default ShoppingCart

const MinusButtonsStyle ={
   height: 21,
   width: 21,
   borderRadius: 15,
   position: "absolute",
   left: 0
}
const PlusButtonsStyle ={
  height: 21,
  width: 21,
  borderRadius: 15,
  position: "absolute",
  right: 0
}
const BuyNowButtonStyle = {
    borderRadius: "180px 10px 300px 180px",
    fontSize: 24,
    padding: "18px 45px 18px 45px",
}
const BackButtonStyle = {
  ...BuyNowButtonStyle,
  borderRadius: "180px"
}