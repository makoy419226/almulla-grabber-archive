<?php
/**
 * Site footer.
 *
 * @package AlMulla_Holding
 */
?>
</main>
<footer class="site-footer">
    <div class="almulla-container footer-grid">
        <section>
            <h2><?php bloginfo('name'); ?></h2>
            <p><?php echo esc_html(almulla_mod('footer_text')); ?></p>
            <small>&copy; <?php echo esc_html(wp_date('Y')); ?> <?php bloginfo('name'); ?>.</small>
        </section>
        <section>
            <h3><?php esc_html_e('Quick Links', 'almulla-holding'); ?></h3>
            <?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-menu', 'fallback_cb' => false]); ?>
        </section>
        <section>
            <h3><?php esc_html_e('Contact Us', 'almulla-holding'); ?></h3>
            <p><a href="tel:<?php echo esc_attr(almulla_mod('phone_link')); ?>"><?php echo esc_html(almulla_mod('phone_display')); ?></a></p>
            <p><a href="mailto:<?php echo esc_attr(almulla_mod('email')); ?>"><?php echo esc_html(almulla_mod('email')); ?></a></p>
        </section>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
