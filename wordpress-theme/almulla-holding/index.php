<?php
/**
 * Required fallback template.
 *
 * @package AlMulla_Holding
 */
get_header();
?>
<section class="section"><div class="almulla-container">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article class="content-card"><h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1><?php the_excerpt(); ?></article>
<?php endwhile; else : ?>
    <article class="content-card"><h1><?php esc_html_e('Nothing found', 'almulla-holding'); ?></h1></article>
<?php endif; ?>
</div></section>
<?php get_footer(); ?>
