import { useDispatch, useSelector } from "react-redux";
import { setVisibleCart } from "../../store/CartSlice";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss"
import React, { useMemo } from "react";


export default React.memo(function Header(){
  const dipatch = useDispatch();
  const showAmmountInCard = [classes.Ammount]
  const showAmmountFavorites = [classes.Ammount]
  const devicesInCart = useSelector(state => state.cart.devicesInCart)
  const ammoutInCard = useMemo(()=> devicesInCart.reduce((prev,curr)=> prev + 1 * curr.count,0),[devicesInCart])
  const favDevices = useSelector(state=> state.devices.favorites)
  if(ammoutInCard){
    showAmmountInCard.push(classes.active)
  }
  if(favDevices.length){
    showAmmountFavorites.push(classes.active)
  }
    return(
        <div className={classes.Header}>
        <div className={classes.HeaderElement}>
            <Link to="/SecretReactShop" className={classes.LogoBox}>
              <img src="./imgs/Logo.svg" alt="Logo"/>
              <h3>SecretReactShop</h3>
            </Link>
        <ul className={classes.UIBox}>
          <li style={{marginRight: 10}} onClick={()=>dipatch(setVisibleCart(true))}>
            <img src="/imgs/UI/ShoppingCart.svg" width={24} height={24} alt="ShoppingCart"/>
            <span className={showAmmountInCard.join(" ")}>{ammoutInCard}</span>
          </li>
          <li>
            <Link to="/favorites">
              <img src="./imgs/UI/Unliked.svg" width={24} height={24} alt="Profile"/>
              <span className={showAmmountFavorites.join(" ")}>{favDevices.length}</span>
            </Link>
          </li>
          {/* <li>
            <img src="/imgs/UI/Profile.svg" width={24} height={24} alt="Profile"/>
          </li> */}
        </ul>
          </div>
        <div className={classes.HeaderShadow}></div>
       </div>
    );
})