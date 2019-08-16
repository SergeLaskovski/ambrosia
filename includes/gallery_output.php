<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/*
* Class to create custom WordPress gallery
* this gallery requres /css/gallery.css and /js/gallery_slider.js
* this gallery uses bootstrap CSS classes
*/

Class GalleryOutput{

    public function __construct(){

        add_filter('post_gallery', array($this, 'my_post_gallery'), 99, 2);
    
    }

    public function my_post_gallery($output, $attr) {
        global $post;
        
        if (isset($attr['orderby'])) {
            $attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
            if (!$attr['orderby'])
                unset($attr['orderby']);
        }
        
        extract(shortcode_atts(array(
            'order' => 'ASC',
            'orderby' => 'menu_order ID',
            'id' => $post->ID,
            'itemtag' => 'dl',
            'icontag' => 'dt',
            'captiontag' => 'dd',
            'columns' => 3,
            'size' => 'thumbnail',
            'include' => '',
            'exclude' => ''
        ), $attr));
        
        $id = intval($id);
        if ('RAND' == $order) $orderby = 'none';
        
        if (!empty($include)) {
            $include = preg_replace('/[^0-9,]+/', '', $include);
            $_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));
        
            $attachments = array();
            foreach ($_attachments as $key => $val) {
                $attachments[$val->ID] = $_attachments[$key];
            }
        }
        
        if (empty($attachments)) return '';
        
        // Here's your actual output, you may customize it to your need
        $output = '
        <!--Gallery output-->
            <div class="slideshow-container">
        ';

        $i=0;
        // Now you loop through each attachment
        foreach ($attachments as $id => $attachment) {
            $i++;
            // Fetch all data related to attachment 
            $img = wp_prepare_attachment_for_js($id);
            //print("<pre>".print_r($img,true)."</pre>");
        
            // If you want a different size change 'large' to eg. 'medium'
            $url = $img['sizes']['full']['url'];
            $height = $img['sizes']['full']['height'];
            $width = $img['sizes']['full']['width'];
            $alt = $img['alt'];
            $caption = $img['caption'];
        

            $output .= '
                <div class="mySlides galleryfade text-center" style="display: none;">
                    <div class="numbertext">'.($i).' / '.count($attachments).'</div>
            ';

            $output .= '
                        <img src="'.$url.'" width="'.$width.'" height="'.$height.'" class="img-fluid"/>
            ';
        
            // Output the caption if it exists
            if ($caption) { 
                $output .= '
                        <div class="text">'.$caption.'</div>
                ';
            }
            $output .= '
                </div>
            ';
            $dots .= '
                <span class="gallery-dot" onclick="currentSlide('.$i.')"></span>
            ';
        }
        
        $output .= '
                <span class="prev" onclick="plusSlides(-1)">&#10094;</span>
                <span class="next" onclick="plusSlides(1)">&#10095;</span>
            </div>
            <div class=" pt-2 text-center">
                '.$dots.'
            </div>
            <!-- END Gallery output -->
        ';
        
        return $output;
    }

}

?>