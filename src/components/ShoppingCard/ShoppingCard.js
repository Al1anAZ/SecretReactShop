import classes from "./ShoppingCard.module.scss"
import MyButton from "../UI/MyButton/MyButton";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCard,minusAmmount,plusAmmount,setVisibleCrad } from "../../store/CardSlice";


function DeviceInCard({id,device}){
 
  const dispatch = useDispatch();

    return(
     <div className={classes.DeviceInCard}>
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
        <div className={classes.Xclose} style={{marginLeft: 30, width: 15, height: 15}}onClick={()=>dispatch(deleteFromCard(id))}></div>
     </div>
    );
}


function ShoppingCard(){
const dipatch = useDispatch()
const devicesInCard = useSelector(state => state.card.devicesInCard);
const price = useMemo(()=>devicesInCard.reduce((prev,curr)=>{
  return prev +curr.price * curr.count
},0),[devicesInCard])

    return(
       <div className={classes.ShoppingCard}>
           <div className={classes.TopShoppingCard}>
            <h2>Кошик</h2>
              <div className={classes.Xclose} onClick={()=> dipatch(setVisibleCrad(false))}></div>
           </div>
           <div className={classes.DevicesInCard}>
            {devicesInCard.length ? devicesInCard.map(device=>
            <DeviceInCard
                id = {device.id} 
                key={device.id}
                device={device}
            />) : <h2 style={{textAlign: "center"}}>Кошик Пустий! <br/>&#128542;</h2>
            }
           </div>
           <div className={classes.BottomShoppingCard}>
               <div className={classes.TotalPrice}>
                  <span>
                    Сума замовлення:
                  </span>
                  <h2>
                    {price} грн.
                  </h2>
               </div>
                 <MyButton inlinestyle={BuyNowButtonStyle} disable = {devicesInCard.length ? false : true}>
                    Купити зараз!
                 </MyButton>
           </div>
       </div>
    );
}
export default ShoppingCard

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
