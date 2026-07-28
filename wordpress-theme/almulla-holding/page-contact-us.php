<?php
/**
 * Contact page template.
 *
 * @package AlMulla_Holding
 */
get_header();
?>
<section class="page-hero"><div class="almulla-container"><div class="eyebrow"><?php esc_html_e('Contact', 'almulla-holding'); ?></div><h1><?php the_title(); ?></h1></div></section>
<section class="section"><div class="almulla-container">
    <div class="content-card">
        <div class="eyebrow"><?php esc_html_e('Contact details', 'almulla-holding'); ?></div>
        <h2 class="section-title"><?php esc_html_e('Direct enquiries', 'almulla-holding'); ?></h2>
        <div class="contact-grid">
            <a class="contact-item" href="tel:<?php echo esc_attr(almulla_mod('phone_link')); ?>"><?php echo esc_html(almulla_mod('phone_display')); ?></a>
            <a class="contact-item" href="mailto:<?php echo esc_attr(almulla_mod('email')); ?>"><?php echo esc_html(almulla_mod('email')); ?></a>
        </div>
        <div class="entry-content"><?php while (have_posts()) : the_post(); the_content(); endwhile; ?></div>
    </div>
</div></section>
<?php get_footer(); ?>
