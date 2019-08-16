<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

//styles and scripts
function ambr_theme_styles_scripts() {
    wp_enqueue_style( 'BootstrapCss','https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css', array(), null, 'all' );
    wp_enqueue_style( 'FontAwsome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), null, 'all' );
    wp_enqueue_style( 'GoogleFonts', 'https://fonts.googleapis.com/css?family=Kanit|Open+Sans', array(), null, 'all' );
    wp_enqueue_style( 'AmbrosiaCustomStyle', get_stylesheet_uri(), array(), null, 'all' );
    wp_enqueue_style( 'GalleryOutputStyle', get_template_directory_uri().'/css/gallery.css', array(), null, 'all' );
    wp_enqueue_script( 'ScrollAnimation', 'https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js', array(), null, false );
    wp_enqueue_script( 'GallerySliderScript', get_template_directory_uri().'/js/gallery_slider.js', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'ambr_theme_styles_scripts' );

//Custom REST endpoints for restaurant menus 
require_once('includes/restaurant_menus_json.php');
new RestaurantMenusJSON;


//Disable users API endpoint
add_filter('rest_endpoints', function( $endpoints ) {

    foreach( $endpoints as $route => $endpoint ){
        if( 0 === stripos( $route, '/users/' ) ){
            unset( $endpoints[ $route ] );
        }
    }

    return $endpoints;
});



//change default gallery output
require_once('includes/gallery_output.php');
new GalleryOutput;

//remove admin top bar
add_filter('show_admin_bar', '__return_false');


/*Favicon*/
function add_ambr_favicon() {
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/images/favicon.ico" />';
}
add_action( 'wp_head', 'add_ambr_favicon' );


// Featured Image Support
function my_Theme_Setup(){
  add_theme_support( 'post-thumbnails' );
  add_image_size('small-thumb', 150, 150, true);
}
add_action( 'after_setup_theme', 'my_Theme_Setup' );


//Change "posts" to "specials" in the admin side menu
function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Specials';
    $submenu['edit.php'][5][0] = 'Specials';
    $submenu['edit.php'][10][0] = 'Add Special';
}
add_action( 'admin_menu', 'change_post_menu_label' );

// Change post object labels to "Specials"
function change_post_object_label() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Specials';
    $labels->singular_name = 'Special';
    $labels->add_new = 'Add Special';
    $labels->add_new_item = 'Add Special';
    $labels->edit_item = 'Edit Special';
    $labels->new_item = 'Special';
    $labels->view_item = 'View Specials';
    $labels->search_items = 'Search Specials';
    $labels->not_found = 'No Specials';
    $labels->not_found_in_trash = 'No Specials in Trash';
}
add_action( 'init', 'change_post_object_label' );


/*code to disable comments*/
add_action('admin_init', function () {
    // Redirect any user trying to access comments page
    global $pagenow;
    
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url());
        exit;
    }

    // Remove comments metabox from dashboard
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

    // Disable support for comments and trackbacks in post types
    foreach (get_post_types() as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});
/*END code to disable comments*/



//remove WP version from code (security reason)
function wpbeginner_remove_version() {
    return '';
}
add_filter('the_generator', 'wpbeginner_remove_version');

?>