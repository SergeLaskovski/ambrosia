import React, { Component, Fragment } from 'react';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';

import ToggleButton from './Components/ToggleButton';
import Navigation from './Components/Navigation';
import ShowMenu from './Components/ShowMenu';
import Constants from './Settings';

import './App.css';


class App extends Component {
  

  constructor(props) {
    
    super(props);

    this._isMounted = false;

    this.div_state_handler = this.div_state_handler.bind(this);
    this.checked_menu_url_handler = this.checked_menu_url_handler.bind(this);
    this.set_search_str = this.set_search_str.bind(this);
    this.search_str = '';

    this.state = {
      div_state : '',
      checked_menu_url : '',
      rest_menus : []
    }

}


  componentWillUnmount() {
    this._isMounted = false;
  }
  
  componentWillMount(){
    let current_url = this.props.location.pathname;
    if (current_url.includes(Constants.MENU_URL)){
      this.div_state_handler('-open');
      let curr_url_array = current_url.split("/");
      this.setState({ checked_menu_url : curr_url_array[curr_url_array.length-2] });
    }
  }

  componentDidMount() {
    /*
      * get the list of menus from API
      * use it for getting th first menu url for ToggleButton Component
      * pass the list to the Navigation Component as props to render menu navigation
    */
    this._isMounted = true;
    const url = Constants.BASE_FULL + Constants.API_URL + '/';
    axios.get(url).then(response => response.data)
    .then((data) => {
      if (this._isMounted) {
        this.setState({ rest_menus: data });
        if( this.state.checked_menu_url === '' ){
          //set checeked_menu_url for toggle button
            this.setState({ checked_menu_url : this.state.rest_menus[0].url });
        }
      }
     })
     .catch(error => {
        console.log(error.response)
    });

    //
  }

  /*
  * function to open and close menu div. 
  * Open called from ToggleButton component. 
  * Close called from Navigation component
  */
  div_state_handler(div_state='') {
      this.setState({
        div_state : div_state
      });

  }


   /*
  * function to change selected menu url for ToggleButton component. 
  * Called from Navigation Component
  */
  checked_menu_url_handler(checked_menu_url) {
    this.setState({ 
      checked_menu_url : checked_menu_url 
    });
  }   

  set_search_str(search_str) {
    this.search_str = search_str;
  }   


  render() {
    return (

       <Fragment>

        <ToggleButton 
          open_div={this.div_state_handler} 
          checked_menu_url={this.state.checked_menu_url} 
          search_str={this.search_str}
        />

        <div id="menu-slider" className={'p-3 sidenav' + this.state.div_state}>

        <Link to={Constants.BASE_URL} onClick={() => this.div_state_handler('-close')} className='closebtn'>&#10007;</Link>
        
            <div className='w-100 h-100 main-background'
              style={
                  {'backgroundImage': "url('"+Constants.BASE_URL+"/wp-content/themes/ambrosia-react/images/pea.jpg')"}
                }
            >
          
              <Navigation 
                rest_menus={this.state.rest_menus} 
                checked_menu={this.state.checked_menu_url}
                change_checked_menu_url={this.checked_menu_url_handler}
              />

              {
                this._isMounted ? (
                  <Switch>
                    <Route exact path={Constants.BASE_URL + Constants.MENU_URL} render={() => (<div className='container-fluid text-center pt-5'>Choose menu</div>)} />
                    <Route 
                      path={Constants.BASE_URL + Constants.MENU_URL + "/:menu_slug"}
                      render={props => 
                        <ShowMenu 
                          key={shortid.generate()} 
                          set_search_str={this.set_search_str}
                          {...props} 
                        />}
                    />
                    <Route path='*' render={() => (<div className='container-fluid text-center pt-5'>Choose menu</div>)} />
                  </Switch>
                ) : (<div>Wait...</div>)
              }

            
            </div>
        </div>

       </Fragment>
    );
  }
}
export default withRouter(App);
