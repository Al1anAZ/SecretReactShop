import { useEffect, useState,Children, cloneElement } from "react";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import classes from "./MySlider.module.scss"


function MySlider({children}){
const [pages,setPages] = useState([])
const [offset, setOffset] = useState(0)
const LastSlide = -100 * pages.length+100;
function handleLeftArrowClick(){
    setOffset(currOffset=>{
        if(currOffset>=0)
          return LastSlide
        return currOffset + 100
    })
}
function handleRightArrowClick(){
   setOffset(currOffset=>{
      if(currOffset<= LastSlide)
        return 0
       return currOffset - 100
   })
}
 useEffect(()=>{
  setPages(
    Children.map(children,child =>{
        return cloneElement(child, {
            style:{
                height: '100%',
                minWidth: '100%',
                maxWidth: '100%'
            }
        })
    })
  )
 },[])   
  return(
    <div className={classes.SliderContainer}>
        <FaChevronLeft className={classes.Arrow} onClick={handleLeftArrowClick}/>
      <div className={classes.ViewWindow}> 
         <div className={classes.Items}
         style={{
            transform: `translateX(${offset}%)`
         }}
         >
            {pages}
         </div>
      </div>
      <FaChevronRight className={classes.Arrow} onClick={handleRightArrowClick}/>
    </div>
  );
} 

export default  MySlider