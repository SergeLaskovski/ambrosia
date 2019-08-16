import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Constants from '../Settings';



class ToggleButton extends Component {

  render() {
      let search_str = this.props.search_str ? '?search='+this.props.search_str : '';
      return (
        <Fragment>
          <h4>
          <i className='fa fa-leaf menu_leaf'></i>
          <Link 
              to={Constants.BASE_URL + Constants.MENU_URL + '/' + this.props.checked_menu_url + '/' + search_str } 
              onClick={() => this.props.open_div('-open')}
          >
            Menu
          </Link>
        </h4>
        </Fragment>
      );
    }
  
}

export default ToggleButton;
