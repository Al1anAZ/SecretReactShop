import { useDispatch, useSelector } from "react-redux";
import { setVisibleCart } from "../../store/CartSlice";
import classes from "./Header.module.scss"
import React, { useMemo } from "react";


export default React.memo(function Header(){
  const dipatch = useDispatch();
  const showAmmount = [classes.AmmountInCard]
  const devicesInCart = useSelector(state => state.cart.devicesInCart)
  const ammoutInCard = useMemo(()=> devicesInCart.reduce((prev,curr)=> prev + 1 * curr.count,0),[devicesInCart])
  if(ammoutInCard){
    showAmmount.push(classes.active)
  }
    return(
        <div className={classes.Header}>
        <div className={classes.HeaderElement}>
          <div className={classes.LogoBox}>
           <img src="/imgs/Logo.svg" alt="Logo"/>
           <h3>SecretReactShop</h3>
        </div>
        <ul className={classes.UIBox}>
          <li style={{marginRight: 10}} onClick={()=>dipatch(setVisibleCart(true))}>
            <img src="/imgs/UI/ShoppingCart.svg" width={24} height={24} alt="ShoppingCart"/>
            <span className={showAmmount.join(" ")}>{ammoutInCard}</span>
          </li>
          <li style={{marginRight: 10}}>
            <img src="imgs/UI/Unliked.svg" width={24} height={24} alt="Profile"/>
          </li>
          <li>
            <img src="/imgs/UI/Profile.svg" width={24} height={24} alt="Profile"/>
          </li>
        </ul>
          </div>
        <div className={classes.HeaderShadow}></div>
       </div>
    );
})