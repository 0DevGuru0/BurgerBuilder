import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems =(props)=>(
  <ul className={classes.NavigationItems}>
  <NavigationItem  clicked_close={props.clicked} link="/" exact>Burger Builder</NavigationItem> 
  {props.isAuthenticate 
  ?<NavigationItem clicked_close={props.clicked} link="/Orders">Orders</NavigationItem>
  :null}
  {!props.isAuthenticate 
  ?<NavigationItem clicked_close={props.clicked} link="/login">LOGIN</NavigationItem>
  :<NavigationItem clicked_close={props.clicked} link="/logout">LOGOUT</NavigationItem>}
  </ul>
);
export default navigationItems;