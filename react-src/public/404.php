<?php header( $_ENV['SERVER_PROTOCOL']." 404 Not Found", true ); ?>
<!DOCTYPE html>
<html>
<head>
<title>Error 404</title>

<?php wp_head(); ?>

</head>

<body>


<div class="container w-100" style="max-width: 800px;">
    <div class="row p-0 m-0 white">
        <div class="col-lg-12 p-5 text-center">
                <h1>Error 404</h1>
                <h3>Something is missing, but we are looking for it</h3>
                Please, go back to our <a href="<?php print site_url(); ?>">main page </a>
                <img src="<?php echo get_template_directory_uri(); ?>/images/404.jpg" class="img-fluid">
        </div>
  </div>
</div>


<?php wp_footer(); ?>

</body>

</html>

