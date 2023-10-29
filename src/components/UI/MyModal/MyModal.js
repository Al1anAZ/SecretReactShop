import classes from "./MyModal.module.scss"

function MyModal({visible,setVisible,children}){
    const rootClasses = [classes.MyModal]
    if(visible){
        rootClasses.push(classes.active)
    }
      return(
        <div className={rootClasses.join(' ')} onClick={()=> setVisible(false)}>
            <div className={classes.MyModalContent} onClick={(e)=> e.stopPropagation()}>
                 {children}
            </div>
        </div>
      );
}

export default MyModal