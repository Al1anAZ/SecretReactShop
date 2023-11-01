import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyButton from "../../components/UI/MyButton/MyButton"
import { useEffect, useState,useMemo } from "react";
import classes from "./Order.module.scss"

function DevicesForOder({device}){
    return(
        <div className={classes.DeviceInOrder}>
           <div>
             <img src={device.src} height={110} width={100}/>
             <div className={classes.DeviceText}>
             <b>{device.name}</b>
             <hr/>
             <p>{device.price} грн.</p>
            </div>
            <b style={{paddingTop: 5}}>{device.count} шт.</b>
           </div>
        </div>
    );
}

function Order(){
    const [confirmOrderButton,setconfirmOrderButton] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        devices: []
    })
    const isOrderValid = useSelector(state => state.cart.isOrderComplete)
    const devicestoOrder = useSelector(state => state.cart.devicesInCart)
    const price = useMemo(()=>devicestoOrder.reduce((prev,curr)=>{
        return prev +curr.price * curr.count
      },0),[devicestoOrder])
    useEffect(()=>{
     setFormData({
        ...formData,
        devices: devicestoOrder
     })
    },[])

    if(!isOrderValid)
       return <Navigate to={"/"}/>

    return(
        <>
           <h2 style={{color: "rgba(113, 77, 175, 1)"}}>Оформлення<span style={{color: "black"}}> замовлення:</span></h2>
        <div className={classes.OrderForm}>
            <form name="Order">
               <input name="name" placeholder="Введіть Імя"></input>
               <input  name="SurName" placeholder="Введіть Призвище"></input>
               <input  name="Phone" placeholder="Введіть номер телефону"></input>
               <input  name="Email" placeholder="Введіть Email"></input>
            </form>
            <div className={classes.Devices}>
               <div className={classes.DevicesList}>  
               {devicestoOrder.map(device=>
                    <DevicesForOder key={device.id}
                    device={device}
                    />
                    )}
               </div>
               <div className={classes.TotalPriceAndButtonChange}>
                 <h4>Сума замовлення: <br/><span>{price}</span> грн.</h4>
                  <div>
                    {confirmOrderButton && <MyButton handle={()=> setconfirmOrderButton(false)} inlinestyle={{borderRadius: "10px", marginRight: 5}}>Готово</MyButton>}
                    <MyButton handle={()=> setconfirmOrderButton(true)} disable = {confirmOrderButton}>Редагувати</MyButton>
                  </div>
               </div>
            </div>
            <MyButton handle={(e)=>e.preventDefault()} inlinestyle={MyButtonSubmitStyle} disable = {confirmOrderButton}>Підтвердити замовлення!</MyButton>
        </div>
        </>
    );
}
const MyButtonSubmitStyle={
      fontSize: 24,
      height: 70,
      width: 300,
      borderRadius: "10px",
      marginTop: 30
}
export default Order