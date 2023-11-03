import classes from "./Footer.module.scss"

function Footer(){
    return(
        <div className={classes.Footer}>
           <div className={classes.LeftFooter}>
           <img src="./imgs/Logo.svg" height={55} width={66} alt="FooterLogo"/> 
             <h4>© 2023 <span style={{color: "rgba(113, 77, 175, 1)"}}>SercetReactShop</span>. Всі права захищені.</h4>
           </div>
           <div className={classes.RightFooter}>
               <h4><span style={{color: "rgba(113, 77, 175, 1)"}}>Мої</span> соціальні мережі: </h4>
               <div className={classes.Contacts}>
               <a href="https://www.instagram.com/al1_a_n_rtz/"  target="_blank" rel="noreferrer"><img src="./imgs/UI/instagram.svg" height={50} width={50} alt="InstagramLogo"/></a>
               <a href="https://github.com/Al1anAZ"   target="_blank" rel="noreferrer"><img src="./imgs/UI/github.svg" height={37} width={37} alt="GitHubLogo"/></a>
               </div>
           </div>
        </div>
    )
}

export default Footer