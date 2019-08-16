<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/*
* Class to create custom WordPress REST endpoints
* for the restaurant menus from 'Quick Restaurant Menu plugin'
*/

Class RestaurantMenusJSON{

    public function __construct(){

        //End point to get list of menus
        add_action('rest_api_init', function () {
            register_rest_route( 'v2/rest-menu', 'menus',array(
                        'methods'  => 'GET',
                        'callback' => array($this,'get_list_of_menus')
            ));
        });

        //End point to get the specified menu list of items
        add_action('rest_api_init', function () {
            register_rest_route( 'v2/rest-menu', 'menus/(?P<menu_url>[\w\-]+)',array(
                        'methods'  => 'GET',
                        'callback' => array($this,'get_menu')
            ));
        });
    
    }


 
    /*
    * Get the list of menu titles and urls from 'erm_menu' post type
    * return Array;
    */
    public function get_list_of_menus(){

        $items = array();

        $args = array(
            'post_type' => 'erm_menu',
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'post_status' => 'publish',
            'posts_per_page' => -1 
        );

        $menu_posts = get_posts($args);

        if ( !empty($menu_posts) ) {

            foreach ( $menu_posts as $menu_post ){
                $items[] = array(
                    'title' => $menu_post -> post_title,
                    'url' => $menu_post -> post_name
                );
            }

        }
        else{
            return new WP_Error( 'no_menus', 'No menus found', array( 'status' => 404 ) );
        }

        return $items;

    }


     /*
    * Get the menu from 'erm_menu' post type with all the items from 'erm_menu_items' post type
    * return Array;
    */
    public function get_menu($menu_url){
        
        $menu_to_show = array();//array to store all menu data

        //get menu data
        $menu_post = get_page_by_path($menu_url['menu_url'], OBJECT, 'erm_menu');

        if ( !empty($menu_post) ) {

            $menu_to_show['title'] = $menu_post->post_title;
            $menu_to_show['header_content'] = $menu_post->post_content;
            $menu_to_show['footer_content'] = get_post_meta( $menu_post->ID, '_erm_footer_menu', true );
 
            //get menu items data
            $menu_items = get_post_meta( $menu_post->ID, '_erm_menu_items', true );
            
            if ( !empty($menu_items) ) {
            
                $menu_items = explode(',', $menu_items);

                $menu_to_show['menu_items'] = array();//array to store menu items data

                foreach ($menu_items as $item_id) {
                
                    // Visible item
                    if (get_post_meta($item_id, '_erm_visible', true) != 1) continue;

                    // Query
                    $args = array(
                        'post_type' => 'erm_menu_item',
                        'p' => $item_id
                    );

                    $items_posts = get_posts($args);
                    
                    if ( !empty($items_posts) ) {

                        foreach ( $items_posts as $item_post ){
                            
                            //get type
                            $type = get_post_meta($item_id, '_erm_type', true);
                            
                            //get prices
                            if( $type != "section" ){

                                $item_prices = array();
                                $prices = get_post_meta( $item_id, '_erm_prices', true );
                                if ( !empty($prices) ) {
                                    foreach($prices as $price){
                                        $item_prices[] = array(
                                                        'price_title' => $price['name'],
                                                        'price_value' => $price['value']
                                        );
                                    }
                                }
                            
                            }

                            //get img 
                            $image = array();
                            $has_thumbnail = has_post_thumbnail( $item_id );
                            if (  $has_thumbnail ) {

                                $image['id'] = get_post_thumbnail_id( $item_id );
                                $image['thumb_src'] = erm_get_image_src( (int)$image['id'], 'thumbnail' );
                                $image['src'] = wp_get_attachment_image_src( (int)$image['id'], 'full' );
                                $image['alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );

                            }


                            $menu_to_show['menu_items'][] = array(
                                                        'title' => $item_post -> post_title,
                                                        'content' => $item_post -> post_content,
                                                        'type' => $type,
                                                        'prices' => $item_prices,
                                                        'img' => array(
                                                            'thumb_src' => $image['thumb_src'],
                                                            'src' => $image['src'][0],
                                                            'alt' =>  $image['alt']
                                                        )
                                                    );
                        }
            
                    }
                    

                }
            
            }
  
  
        }
        else { //if no such menu
            return new WP_Error( 'no_menu', 'No such menu', array( 'status' => 404 ) );
        }

        //print_r($menu_to_show);

        return $menu_to_show;
        
    }


}

?>