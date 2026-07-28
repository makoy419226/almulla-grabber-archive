<?php
/**
 * Site header.
 *
 * @package AlMulla_Holding
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="almulla-container header-inner">
        <?php if (has_custom_logo()) : ?>
            <?php the_custom_logo(); ?>
        <?php else : ?>
            <a class="site-title" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php esc_attr_e('AlMulla Holding home', 'almulla-holding'); ?>">
                <img class="default-logo" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/logo.png'); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
            </a>
        <?php endif; ?>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">
            <?php esc_html_e('Menu', 'almulla-holding'); ?>
        </button>
        <nav class="primary-nav" id="primary-menu" aria-label="<?php esc_attr_e('Primary navigation', 'almulla-holding'); ?>">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'fallback_cb'    => 'almulla_fallback_menu',
            ]);
            ?>
        </nav>
    </div>
</header>
<main id="content">
