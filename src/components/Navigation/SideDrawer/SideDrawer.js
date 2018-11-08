 import React from 'react';
 import Logo from '../../Logo/Logo';
 import NavigationItems from '../NavigationItems/NavigationItems';
 import classes from './SideDrawer.css';
 import Backdrop from '../../UI/Backdrop/Backdrop';
 import Aux from '../../../hoc/AUX/AU';
 const SideDrawer = (props) =>{
   let attachedclass = [classes.SideDrawer,classes.close];
   if(props.open){
     attachedclass = [classes.SideDrawer,classes.open];
   }
  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedclass.join(' ')}>
        <Logo height='11%'/>
        <nav>
          <NavigationItems  clicked={props.closed} isAuthenticate={props.isAuth} />
        </nav>
      </div>
    </Aux>
    
  ) 
 }
 export default SideDrawer;