<?php
/**
 * About page template.
 *
 * @package AlMulla_Holding
 */
get_header();
?>
<section class="page-hero"><div class="almulla-container"><div class="eyebrow"><?php esc_html_e("Chairman's message", 'almulla-holding'); ?></div><h1><?php the_title(); ?></h1></div></section>
<section class="section"><div class="almulla-container about-grid">
    <article class="content-card entry-content">
        <h2><?php esc_html_e('Focused on quality, resilience, and long-term value.', 'almulla-holding'); ?></h2>
        <p><?php echo esc_html(almulla_mod('chairman_message')); ?></p>
        <?php while (have_posts()) : the_post(); the_content(); endwhile; ?>
    </article>
    <aside>
        <div class="chairman-photo"><img src="<?php echo esc_url(almulla_image_url('chairman_image', 'chairman.jpg')); ?>" alt="<?php echo esc_attr(almulla_mod('chairman_name')); ?>"></div>
        <div class="content-card"><strong><?php esc_html_e('Chairman', 'almulla-holding'); ?></strong><h2><?php echo esc_html(almulla_mod('chairman_name')); ?></h2></div>
    </aside>
</div></section>
<?php get_footer(); ?>
