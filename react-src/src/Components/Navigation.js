import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Constants from '../Settings';

class Navigation extends Component {
  
  constructor(props) {
    super(props);
    this.renderMenuLink = this.renderMenuLink.bind(this);
  }

  renderMenuLink(rest_menu){
    if( rest_menu.url !== this.props.checked_menu ){
      return (
        <div key={rest_menu.url} className='rest-menu-list-item'>
          <Link 
            to={Constants.BASE_URL + Constants.MENU_URL + '/' + rest_menu.url + '/'}
            onClick={() => this.props.change_checked_menu_url(rest_menu.url)}
          >
            {rest_menu.title}
          </Link>
        </div>
      );
    }
    else {
      return (
        <div key={rest_menu.url} className='rest-menu-list-item-selected'>
          {rest_menu.title}
        </div>
      );
    }
  }

  render() {
    return (
      <Fragment>
        
        <div className='row text-center justify-content-center'>
          <div className='col-12'>
            { 
              this.props.rest_menus.map(rest_menu => 
                    this.renderMenuLink(rest_menu))
            }
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Navigation;
