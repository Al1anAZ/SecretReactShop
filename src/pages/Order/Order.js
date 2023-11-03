import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyButton from "../../components/UI/MyButton/MyButton"
import { useEffect, useState,useMemo } from "react";
import { deleteFromCart,plusAmmount,minusAmmount, updateCart } from "../../store/CartSlice";
import classes from "./Order.module.scss"
import axios from "axios";

function DevicesForOder({device,editOrder}){
    const dispatch = useDispatch();
    const rootClass = [classes.DeviceInOrder]
    if(editOrder)
       rootClass.push(classes.editing)
    return(
        <div className={rootClass.join(" ")}>
           <div>
             <img src={`${device.src}`} height={110} width={100} alt="Device"/>
             <div className={classes.DeviceText}>
             <b>{device.name}</b>
             <hr/>
             <p>{device.price*device.count} грн.</p>
            </div>
            {editOrder ? 
            <span className={classes.DeviceCount}>
               <MyButton inlinestyle={MinusButtonsStyle} handle={()=> dispatch(minusAmmount(device.id))}  disable= {device.count>1 ? false : true}>-</MyButton>
                <input type="number" min={1} value={device.count} readOnly></input>
                <MyButton inlinestyle={PlusButtonsStyle}  handle={()=> dispatch(plusAmmount(device.id))}>+</MyButton>
             </span>
              :
             <b style={{paddingTop: 5}}>{device.count} шт.</b>
            }
             {editOrder && <div className={classes.DeleteItem} onClick={()=>  dispatch(deleteFromCart(device))}></div>}
           </div>
        </div>
    );
}

function Order(){
   const dispatch = useDispatch()
    const [editOrder,setceditOrder] = useState(false)
    const [orderComplete,setorderComplete] = useState(false)
    const [preventDrop,setPreventDrop] = useState(false)
    const [loading, setLoading] = useState(false)
    const [orderId,setOrderId] = useState(null)
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surname: '',
        phone: '',
        email: '',
        orderprice: 0,
        devices: []
    })
    const devicestoOrder = useSelector(state => state.cart.devicesInCart)
    const [isValid, setisValid] = useState({
      name: true,
      email: true,
      phone: true,
    })

    const price = useMemo(()=>devicestoOrder.reduce((prev,curr)=>{
        return prev +curr.price * curr.count
      },0),[devicestoOrder])
   
   useEffect(()=>{
     setFormData({
        ...formData,
        orderprice: price,
        devices: devicestoOrder
     })
    },[devicestoOrder,formData])
   
    if(!devicestoOrder.length && !preventDrop)
      return <Navigate to={"/SecretReactShop/"}/>

    return(
        <>
        {orderComplete ? 
        <div className={classes.OrderComplete}><h2>Ваше замовлення №<span style={{color: "rgba(113, 77, 175, 1)"}}>{orderId}</span> в обробці <br/>&#128516;</h2>
        <MyButton inlinestyle={MyButtonSubmitStyle} handle={()=>setPreventDrop(false)}>Повернутися</MyButton>
        </div>
        :  
         <>
         {loading ? 
        <div className={classes.Loading}><img src="../SecretReactShop/imgs/UI/Loading.svg" width={300} height={300} alt="Loading"/></div>
        :  
        <div className={classes.OrderForm}>
                  <h2 style={{color: "rgba(113, 77, 175, 1)"}}>Оформлення<span style={{color: "black"}}> замовлення:</span></h2>
           <form name="Order">
              <input name="name" placeholder="Введіть Імя*" className={isValid.name ? null : classes.ValiInput}
               onFocus={()=>{
                 setisValid({...isValid, name: true})
                }}
               onBlur={(e)=>{ 
                 if(e.target.value)
                   setFormData({...formData, name: e.target.value})
                 else
                 setisValid({...isValid, name: false})
                 }}
              ></input>
              <input  name="SurName" placeholder="Введіть Призвище" onBlur={(e)=> setFormData({...formData, surname: e.target.value})}></input>
              <input  name="Phone" placeholder="Введіть номер телефону*"  className={isValid.phone ? null : classes.ValiInput}
                onFocus={()=>{
                 setisValid({...isValid, phone: true})
                }}
                onBlur={(e)=>{
                 const validator = /^\+\d{1,4}\d{10}$/;
                   if(validator.test(e.target.value))
                    setFormData({...formData, phone: e.target.value})
                 else
                   setisValid({...isValid, phone: false})
            }}></input>
              <input  name="Email" placeholder="Введіть Email*" className={isValid.email ? null : classes.ValiInput}
                onFocus={()=>{
                 setisValid({...isValid, email: true})
                }}
               onBlur={(e)=>{
                  const validator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  if(validator.test(e.target.value))
                     setFormData({...formData, email: e.target.value})
                  else
                    setisValid({...isValid, email: false})
               }}></input>
           </form>
           <div className={classes.Devices}>
              <div className={classes.DevicesList}>  
              {devicestoOrder.map(device=>
                   <DevicesForOder 
                    key={device.id}
                   device={device}
                   editOrder={editOrder}
                   />
                   )}
              </div>
              <div className={classes.TotalPriceAndButtonChange}>
                 <div>
                   {editOrder && <MyButton handle={()=> setceditOrder(false)} inlinestyle={{borderRadius: "10px", marginRight: 5}}>Готово</MyButton>}
                   <MyButton handle={()=> setceditOrder(true)} disable = {editOrder}>Редагувати</MyButton>
                 </div>
              </div>
           </div>
           <h3>Сума замовлення: <span>{price}</span> грн.</h3>
           <MyButton handle={ async (e)=>{
            setPreventDrop(true)
              e.preventDefault()
               try{
                    setLoading(true)
                    const {data} = await axios.post('https://653c019ad5d6790f5ec7bdf7.mockapi.io/Orders',formData)
                    setOrderId(data.id)
                    dispatch(updateCart([]))
               }
               catch(error){
                    console.log("Не вдалось підтвердити замовлення")
               }
               setLoading(false)
               setorderComplete(true)
            }} inlinestyle={MyButtonSubmitStyle} disable={editOrder || !isValid.email || !isValid.name || !isValid.phone || !formData.name || !formData.email || !formData.phone}>Підтвердити замовлення!</MyButton>
       </div>
        }
        </>
       }

             
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
export default Order