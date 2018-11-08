import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../AUX/AU';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
  state={
    showSideDrawer:false
  }
  sideDrawerCloseHandler =()=>{
    this.setState({showSideDrawer:false})
  }
  sideDrawerToggleHandler =()=>{
    this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer};
    })
  }

  render() {
    return(
      <Aux>
        <Toolbar isAuth = {this.props.isAuthenticate} toggleDrawer={this.sideDrawerToggleHandler}/>
        <SideDrawer 
          isAuth = {this.props.isAuthenticate}
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>

      </Aux>
    );
  }

}

const mapStateToProps = (state)=>{
  return{
    isAuthenticate:state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);