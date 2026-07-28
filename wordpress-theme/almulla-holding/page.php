<?php
/**
 * Standard page template.
 *
 * @package AlMulla_Holding
 */
get_header();
while (have_posts()) :
    the_post();
?>
<section class="page-hero"><div class="almulla-container"><h1><?php the_title(); ?></h1></div></section>
<section class="section"><div class="almulla-container"><article class="content-card entry-content"><?php the_content(); ?></article></div></section>
<?php
endwhile;
get_footer();
