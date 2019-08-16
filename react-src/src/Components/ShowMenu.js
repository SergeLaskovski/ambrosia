import React, { Component, Fragment } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Link, withRouter } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Constants from '../Settings';


class ShowMenu extends Component {

  

  constructor(props) {

    super(props);
    
    this._isDataReceived = false;
    this.msg = '';


    const queryString = require('query-string');
    const query = queryString.parse(this.props.location.search);
    this.search_str = query.search ? encodeURIComponent(query.search) : '';
    if ( this.search_str.length > 0 ){ this.props.set_search_str(this.search_str); }

    this.filterSearchItems = this.filterSearchItems.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this); 
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this); 
    this.images = [];

    this.state = {
      chosen_menu : [],
      _isErrorLoading : false,
      search_str : this.search_str,
      photoIndex: 0,
      isOpen : false,
      _isSearchResults : false
    }

  }



  componentDidMount() {

    const url = Constants.BASE_FULL + Constants.API_URL + "/" + this.props.match.params.menu_slug;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this._isDataReceived = true;
      if ( this.state.search_str.length > 0 && this.state.search_str !== "undefined"){
        this.filterSearchItems(data)
      }
      else {
        this.setState({ chosen_menu: data })
      }
     })
     .catch(error => {
        this.setState({ _isErrorLoading : true })
    });
     
  }


  //function to filter menu items for matching search string
  filterSearchItems(data){

      let new_data = [];
      new_data.menu_items = [];
      new_data.title = data.title;
      let title_to_compare = '';
      let content_to_compare = '';
      let search_str_to_compare = this.state.search_str.replace(/%20/g, " ").toUpperCase();
      let regEx = new RegExp(search_str_to_compare, "ig");
      let replaceMask = "<span class='search_hightlight'>$&</span>";

      data.menu_items.forEach(menu_item =>
        {
          title_to_compare = menu_item.title.toUpperCase();
          content_to_compare = menu_item.content.toUpperCase();
          if ( menu_item.type === 'product' && ( title_to_compare.includes(search_str_to_compare)  || content_to_compare.includes(search_str_to_compare) ) ){ 
            menu_item.title = menu_item.title.replace(regEx, replaceMask);
            menu_item.content = menu_item.content.replace(regEx, replaceMask);

            new_data.menu_items.push(menu_item);
          }
        }
      )
      if ( new_data.menu_items.length > 0 ){
        new_data.header_content = data.header_content;
        new_data.footer_content = data.footer_content;
      }
      else {
        this.msg += "Sorry, no match. Try new search";
      }
      this.setState({ chosen_menu: new_data,  _isSearchResults : true});

    }


  //function to render menu item view
  renderMenuItem(menu_item){
      //used for lightbox. contains image index number 
      let set_photoIndex = 0;
      if( menu_item.type === 'product' ) {
       
        //add image to array to show in the lightbox
        if ( menu_item.img.src ) { 
            this.images.push(menu_item.img.src);
            set_photoIndex = this.images.length-1;
        }
         //render menu item
        return (
              <div key={shortid.generate()} id="downloadmenu" className='pb-5'>
                {
                  menu_item.img.thumb_src ? (
                      <img 
                        alt={menu_item.title}
                        src={menu_item.img.thumb_src} 
                        className='menu_thumb float-right'
                        onClick={() => this.setState({ isOpen: true, photoIndex: set_photoIndex})}
                      />
                  ) : ''
                }
                  <h4 className='menu-item-title' dangerouslySetInnerHTML={{__html: menu_item.title}} />
                  <div className='pl-3 pb-0' dangerouslySetInnerHTML={{__html: menu_item.content}} />
                  <div className='text-right pt-0 prices'>
                    {
                      menu_item.prices ? (menu_item.prices.map(price =>
                        <div className='p-0 w-100' key={shortid.generate()}>
                          {price.price_title ? price.price_title + ': ' : ''} <div className='price'>{'$'+price.price_value}</div>
                        </div>
                      )) : ''
                    }
                  </div>
              </div>
        );
      }
      else {
        //render menu section
        return (
          <div key={menu_item.title} className='text-center pt-4 pb-2'>
            <h4 className='font-weight-bold'>{menu_item.title}</h4>
            {menu_item.content ? <div className='pl-3 pb-3' dangerouslySetInnerHTML={{__html: menu_item.content}} /> : ''}
          </div>
        );
      }

  }


  handleSearchChange(event) {
    this.setState({search_str: encodeURIComponent(event.target.value)});
  }

  handleSearchSubmit(event)  {
    event.preventDefault();
    this.props.history.push(Constants.BASE_URL + Constants.MENU_URL + '/' + this.props.match.params.menu_slug + '/?search=' + this.state.search_str)
  }


  render() {

    const { photoIndex, isOpen } = this.state;

    return (
      <div className='row text-center justify-content-center'>
        {
            this._isDataReceived ? (
              <Fragment>
                <div className='col-12 search-div text-center justify-content-center pt-2 pb-3'>
                  <form onSubmit={this.handleSearchSubmit}>
                  <div className='search-form input-group'>
                        <input 
                          type="text" 
                          className="form-control py-2 border-right-0 border search-form-input " 
                          value={decodeURIComponent(this.state.search_str)} 
                          onChange={this.handleSearchChange} placeholder={'Search in '+this.state.chosen_menu.title}
                          aria-label="Search"
                        />
                        <span className="input-group-append">
                            <button type="Submit" defaultValue="Submit" className="search-btn btn btn-outline-secondary border-left-0 border">
                              <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                  </div>
                  </form>
                  <div className='text-center small pl-2'>
                    Search examples:&nbsp;
                    <span className='search_example' onClick={() => this.setState({search_str: 'gluten free'})}>gluten free</span> or <span className='search_example' onClick={() => this.setState({search_str: 'beef'})}>beef</span>
                  </div>
                </div>
                <div className='col-12 menu-items text-left'>
                  {
                    //if search string defined then display link to full menu
                    this.state._isSearchResults ? (
                      <div className='p-3 text-center font-weight-bold'>
                        <Link 
                          to={Constants.BASE_URL + Constants.MENU_URL + '/' + this.props.match.params.menu_slug + '/'}
                        >
                          Back to "{this.state.chosen_menu.title}" menu
                        </Link>
                      </div>
                    ) : ''
                  }
                  {
                    // display message
                    this.msg ? (
                      <div className='p-3 text-center font-weight-bold'>{this.msg}</div>
                    ) : ''
                  }

                  {
                    // display header content
                    this.state.chosen_menu.header_content ? (
                      <div className='p-3 text-center font-weight-bold' dangerouslySetInnerHTML={{__html: this.state.chosen_menu.header_content}} />
                    ) : ''
                  }
                  
                  {
                    //render menu items using function
                    this.state.chosen_menu.menu_items.map(menu_item =>
                      this.renderMenuItem(menu_item)
                    )
                  }

                  {                    
                    //display footer content
                    this.state.chosen_menu.footer_content ? (
                      <div className='p-3 text-center font-weight-bold' dangerouslySetInnerHTML={{__html: this.state.chosen_menu.footer_content}} />
                    ) : ''
                  }
                </div>
              </Fragment>
            ) : ( //display loader or 'no menu' message
              <Fragment>
                {
                  this.state._isErrorLoading ? (
                    <div>Sorry, there is no such menu. Please choose from the list above.</div>
                  ) : (
                    <div className='col-12 menu-items text-center justify-content-center pt-5'><div className="loader"></div></div>
                  )
                }
              </Fragment>
            )
        }
        {isOpen && (
          <Lightbox
            mainSrc={this.images[photoIndex]}
            nextSrc={this.images[(photoIndex + 1) % this.images.length]}
            prevSrc={this.images[(photoIndex + this.images.length - 1) % this.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.images.length - 1) % this.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.images.length,
              })
            }
          />
        )}
      </div>
    );
  }
  
}

export default withRouter(ShowMenu);