<!DOCTYPE html>
<html>
<head>
	<meta charset="<?php bloginfo('charset');?>">
    <meta name="description" content="<?php echo get_bloginfo(); ?> The best restaurant in Rotorua New Zealand">
	<meta name="keywords" content="<?php echo get_bloginfo(); ?>, restaurat, Rotorua, best restaurant, tasty food, specials, cousine, tasty">
    <meta name="author" content="Serge Lyaskovski">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <title><?php echo get_bloginfo(); ?></title>

    <?php wp_head(); ?>
	<script>
        ScrollReveal({ reset: true });
    </script>

</head>
<body style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/Ferntastic_temp.jpg')">

	<!-- Facebook robot-->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=2062228134099582&autoLogAppEvents=1';
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>



<!--Top header with logo-->
<div class="container-fluid white">
    <div class="row p-0">
        <div class="col-md text-center my-auto">
            <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" class="img-logo img-fluid">
        </div>
        <div class="col-md p-2 text-shadow my-auto" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/bay_leaves.jpg'); background-repeat: no-repeat; background-position: right top; background-size:contain;">
				<h4>1096 Tutanekai Street, Rotorua, 3010</h4>
				<h2><i class="fa fa-volume-control-phone"></i>&nbsp;<a href="tel:+6473583985" class="href-no-underline">(07) 348 3985</a></h2>
				Call and book now!<br><br>
				Open <span class="font-weight-bold">11.30 am till late</span> 7 days
				<div class="text-right" style="position: absolute; bottom: 0px; right: 10px;">
					<!--REACT menu here-->
					<div id="root"></div>
				</div>
        </div>
	</div>
</div>




<!-- Display Specials -->
<?php
$query = array(
    'orderby' => 'menu_order',
    'order' => 'ASC',
    'post_status' => 'publish',
	'post_type' => 'post',
	'posts_per_page' => -1
);
$posts = get_posts( $query );
if( ! empty( $posts ) ) {
	?>
	<div class="container-fluid white-transparent-much pt-3 pb-3 mb-1">
		<div class="row white pb-3">
			<div class="container">
				<div class="row">
					<?php
					foreach( $posts as $post ) {
						?>
						<div class="col-md pt-4 text-center">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gold.png" width="16" heigt="16" class="float-left mr-2 main-page-star load-hidden">
							<h4 class="header-specials align-middle"><?php echo $post->post_title; ?></h4>
							<?php
							echo apply_filters('the_content', $post->post_content);
							?>
						</div>
						<?php
					}
					?>
				</div>
			</div>
		</div>
	</div>
<?php
}
?>



<!-- Display Main Page blocks (WP pages) -->
<?php
$row_header = '
				<div class="container-fluid">
					<div class="row pr-1 pl-1">
';
$row_footer = '
					</div>
				</div>
';
$div_col_class['0'] = array("4","8");
$div_col_class['1'] = array("8","4");

$query = array(
    'orderby' => 'menu_order',
    'order' => 'ASC',
    'post_status' => 'publish',
	'post_type' => 'page',
	'posts_per_page' => -1
);

$posts = get_posts( $query );
if( ! empty( $posts ) ) {
	$post_count = 0;
	$row_count = 0;
	$num_posts = count($posts);

	foreach( $posts as $post ) {
		$post_count++;
		$row_select = 0;
		$div_select = 0;
		if(($post_count % 2) != 0){
			//if $post_count odd open the row
			echo $row_header;
			$row_count++;
			$div_select = 1;
		}
		if(($row_count % 2) != 0){
			//if $row_count odd set first div col-lg-8 second col-lg-4
			$row_select = 1;
		}
		if($post_count==$num_posts && ($post_count % 2) != 0){
			//div for last post set to col-sm-12 if this div is 1st in the row
			$div_col_class[$row_select][$div_select] = "12";
		}
		?>
		<div class="col-lg-<?php echo $div_col_class[$row_select][$div_select];  ?> p-2">
			<div class="container-fluid white-transparent-few h-100 p-3 main-page-block load-hidden">
				<?php
				if ( get_post_gallery( $post->ID ) ){
					echo get_post_gallery( $post->ID );
				}
				else {
					echo apply_filters('the_content', $post->post_content);
				}
				?>
			</div>
		</div>

		<?php
		if(($post_count % 2) == 0){
			//if $count even close the row
			echo $row_footer;
		}
	}

  	wp_reset_postdata();
 }
?>




<div class="container-fluid p-0 mt-1">
    <div class="row p-0 m-0 white"  style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/mint_leaves.jpeg'); background-repeat: no-repeat; background-position: left bottom; background-size:contain;">
      <div class="col-lg-12 p-4 m-0 text-shadow text-center">
		  <?php echo get_bloginfo(); ?> &copy; <?php echo date('Y');?>
		  <div class="w-100 d-inline-block  text-right small">Developed by <a href="mailto: lightgrey1238@gmail.com">Serge Laskovski</a></div>
	  </div>
  </div>
</div>

<?php wp_footer(); ?>

<script>
	ScrollReveal().reveal('.main-page-block', { scale: 0.85, delay: 100 });
	ScrollReveal().reveal('.main-page-star', { 
		scale: 5,
		rotate: {
        	x: 180,
			y: 180
    	},
		delay: 200
	});

</script>

</body>
</html>

