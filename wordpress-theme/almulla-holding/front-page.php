<?php
/**
 * Homepage template.
 *
 * @package AlMulla_Holding
 */
get_header();
$sectors = [
    'healthcare'  => 'sector-healthcare.jpg',
    'education'   => 'sector-education.jpg',
    'hospitality' => 'sector-hospitality.jpg',
    'energy'      => 'sector-energy.jpg',
];
?>
<section class="hero">
    <img class="hero-image" src="<?php echo esc_url(almulla_image_url('hero_image', 'hero.jpg')); ?>" alt="">
    <div class="hero-overlay"></div>
    <div class="almulla-container hero-content">
        <h1><?php echo nl2br(esc_html(almulla_mod('hero_title'))); ?></h1>
        <p><?php echo esc_html(almulla_mod('hero_text')); ?></p>
    </div>
</section>
<section class="section" id="businesses">
    <div class="almulla-container">
        <div class="eyebrow"><?php esc_html_e('What We Do', 'almulla-holding'); ?></div>
        <h2 class="section-title"><?php echo esc_html(almulla_mod('sectors_title')); ?></h2>
        <div class="sector-grid">
            <?php foreach ($sectors as $sector => $fallback) : ?>
                <article class="sector-card">
                    <img src="<?php echo esc_url(almulla_image_url("sector_{$sector}_image", $fallback)); ?>" alt="<?php echo esc_attr(almulla_mod("sector_{$sector}_title")); ?>">
                    <div class="sector-body">
                        <h3><?php echo esc_html(almulla_mod("sector_{$sector}_title")); ?></h3>
                        <p><?php echo esc_html(almulla_mod("sector_{$sector}_text")); ?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>
