import { useSelector } from "react-redux";
import classes from "./Header.module.scss"
import React, { useMemo } from "react";


export default React.memo(function Header({handleShoppingCard,visibleShoppingCart}){
  const showAmmount = [classes.AmmountInCard]
  const devicesInCard = useSelector(state => state.card.devicesInCard)
  const ammoutInCard = useMemo(()=> devicesInCard.reduce((prev,curr)=> prev + 1 * curr.count,0),[devicesInCard])
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
          <li style={{marginRight: 10}} onClick={()=>handleShoppingCard(!visibleShoppingCart)}>
            <img src="/imgs/UI/ShoppingCart.svg" width={24} height={24} alt="ShoppingCart"/>
            <span className={showAmmount.join(" ")}>{ammoutInCard}</span>
          </li>
          <li style={{marginRight: 10}}>
            <img src="imgs/UI/Heart.svg" width={24} height={24} alt="Profile"/>
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