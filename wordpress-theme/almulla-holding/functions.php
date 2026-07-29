<?php
/**
 * Theme functions.
 *
 * @package AlMulla_Holding
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ALMULLA_THEME_VERSION', '1.0.0');
define('ALMULLA_PUBLIC_ORIGIN', 'https://almullaholding.com');

function almulla_setup(): void {
    load_theme_textdomain('almulla-holding', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height'      => 140,
        'width'       => 420,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    register_nav_menus([
        'primary' => __('Primary navigation', 'almulla-holding'),
        'footer'  => __('Footer navigation', 'almulla-holding'),
    ]);
}
add_action('after_setup_theme', 'almulla_setup');

function almulla_fallback_menu(): void {
    echo '<ul>';
    wp_list_pages(['title_li' => '', 'depth' => 1]);
    echo '</ul>';
}

function almulla_assets(): void {
    wp_enqueue_style('almulla-style', get_stylesheet_uri(), [], ALMULLA_THEME_VERSION);
    wp_enqueue_script(
        'almulla-theme',
        get_template_directory_uri() . '/assets/theme.js',
        [],
        ALMULLA_THEME_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'almulla_assets');

function almulla_default(string $key): string {
    $defaults = [
        'hero_title'       => "Building Legacies.\nEmpowering Futures.",
        'hero_text'        => 'AlMulla Holding Group is a diversified holding company committed to long-term value creation and sustainable growth across key sectors that shape tomorrow.',
        'sectors_title'    => 'Sectors That Shape Tomorrow',
        'phone_display'    => '04 2249688',
        'phone_link'       => '+97142249688',
        'email'            => 'info@almullaholding.com',
        'footer_text'      => 'A diversified holding group committed to building legacies and empowering future growth.',
        'chairman_name'    => 'Mr. Abdulla Mohamed Saeed AlMulla',
        'chairman_message' => 'AlMulla Holding Group continues to build around sectors where quality, trust, and service matter most.',
    ];

    $sectors = [
        'healthcare'  => ['Healthcare', 'Delivering advanced healthcare services that improve lives and communities.'],
        'education'   => ['Education', 'Supporting future generations through quality education and innovative learning.'],
        'hospitality' => ['Hospitality', 'Creating exceptional experiences through world-class hospitality and leisure.'],
        'energy'      => ['Energy', 'Powering progress through reliable energy platforms and solutions.'],
    ];

    foreach ($sectors as $slug => $data) {
        $defaults["sector_{$slug}_title"] = $data[0];
        $defaults["sector_{$slug}_text"] = $data[1];
    }

    return $defaults[$key] ?? '';
}

function almulla_mod(string $key): string {
    return (string) get_theme_mod($key, almulla_default($key));
}

function almulla_customize_register(WP_Customize_Manager $customizer): void {
    $customizer->add_panel('almulla_content', [
        'title'       => __('AlMulla Content', 'almulla-holding'),
        'description' => __('Edit the migrated website content and contact information.', 'almulla-holding'),
        'priority'    => 20,
    ]);

    $sections = [
        'almulla_home'    => __('Homepage', 'almulla-holding'),
        'almulla_sectors' => __('Business sectors', 'almulla-holding'),
        'almulla_about'   => __('Chairman and About', 'almulla-holding'),
        'almulla_contact' => __('Contact and Footer', 'almulla-holding'),
    ];
    foreach ($sections as $id => $title) {
        $customizer->add_section($id, ['title' => $title, 'panel' => 'almulla_content']);
    }

    $text_controls = [
        'hero_title'       => ['almulla_home', __('Hero heading', 'almulla-holding'), 'textarea'],
        'hero_text'        => ['almulla_home', __('Hero description', 'almulla-holding'), 'textarea'],
        'sectors_title'    => ['almulla_home', __('Sectors heading', 'almulla-holding'), 'text'],
        'chairman_name'    => ['almulla_about', __('Chairman name', 'almulla-holding'), 'text'],
        'chairman_message' => ['almulla_about', __('Chairman message', 'almulla-holding'), 'textarea'],
        'phone_display'    => ['almulla_contact', __('Displayed phone', 'almulla-holding'), 'text'],
        'phone_link'       => ['almulla_contact', __('International phone link', 'almulla-holding'), 'text'],
        'email'            => ['almulla_contact', __('Email address', 'almulla-holding'), 'email'],
        'footer_text'      => ['almulla_contact', __('Footer description', 'almulla-holding'), 'textarea'],
    ];

    foreach ($text_controls as $id => [$section, $label, $type]) {
        $sanitize = $type === 'email' ? 'sanitize_email' : ($type === 'textarea' ? 'sanitize_textarea_field' : 'sanitize_text_field');
        $customizer->add_setting($id, ['default' => almulla_default($id), 'sanitize_callback' => $sanitize]);
        $customizer->add_control($id, ['section' => $section, 'label' => $label, 'type' => $type]);
    }

    foreach (['hero' => __('Hero image', 'almulla-holding'), 'chairman' => __('Chairman image', 'almulla-holding')] as $id => $label) {
        $setting = "{$id}_image";
        $customizer->add_setting($setting, ['sanitize_callback' => 'absint']);
        $customizer->add_control(new WP_Customize_Media_Control($customizer, $setting, [
            'section'   => $id === 'hero' ? 'almulla_home' : 'almulla_about',
            'label'     => $label,
            'mime_type' => 'image',
        ]));
    }

    foreach (['healthcare', 'education', 'hospitality', 'energy'] as $sector) {
        foreach (['title' => 'text', 'text' => 'textarea'] as $field => $type) {
            $id = "sector_{$sector}_{$field}";
            $customizer->add_setting($id, [
                'default'           => almulla_default($id),
                'sanitize_callback' => $type === 'textarea' ? 'sanitize_textarea_field' : 'sanitize_text_field',
            ]);
            $customizer->add_control($id, [
                'section' => 'almulla_sectors',
                'label'   => ucfirst($sector) . ' ' . $field,
                'type'    => $type,
            ]);
        }
        $image_id = "sector_{$sector}_image";
        $customizer->add_setting($image_id, ['sanitize_callback' => 'absint']);
        $customizer->add_control(new WP_Customize_Media_Control($customizer, $image_id, [
            'section'   => 'almulla_sectors',
            'label'     => ucfirst($sector) . ' image',
            'mime_type' => 'image',
        ]));
    }
}
add_action('customize_register', 'almulla_customize_register');

function almulla_image_url(string $setting, string $fallback): string {
    $attachment_id = absint(get_theme_mod($setting));
    if ($attachment_id) {
        $image = wp_get_attachment_image_url($attachment_id, 'full');
        if ($image) {
            return $image;
        }
    }
    return get_template_directory_uri() . '/assets/images/' . $fallback;
}

function almulla_canonical(): void {
    if (is_front_page()) {
        $url = ALMULLA_PUBLIC_ORIGIN . '/';
    } elseif (is_singular()) {
        $path = (string) wp_parse_url(get_permalink(), PHP_URL_PATH);
        $url = ALMULLA_PUBLIC_ORIGIN . ($path ?: '/');
    } else {
        return;
    }
    echo '<link rel="canonical" href="' . esc_url($url) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
}
remove_action('wp_head', 'rel_canonical');
add_action('wp_head', 'almulla_canonical', 2);

function almulla_brand_metadata(): void {
    $logo_url = ALMULLA_PUBLIC_ORIGIN . '/site-icon-512.png';
    $site_name = get_bloginfo('name') ?: 'AlMulla Holding Group';
    $schema = [
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        'name'     => $site_name,
        'url'      => ALMULLA_PUBLIC_ORIGIN . '/',
        'logo'     => [
            '@type'  => 'ImageObject',
            'url'    => $logo_url,
            'width'  => 512,
            'height' => 512,
        ],
    ];

    echo '<link rel="icon" type="image/png" sizes="512x512" href="' . esc_url($logo_url) . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url($logo_url) . '">' . "\n";
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'almulla_brand_metadata', 3);

function almulla_activate(): void {
    $pages = [
        'home' => ['Home', ''],
        'about-us' => ['About Us', '<h2>Focused on quality, resilience, and long-term value.</h2><p>AlMulla Holding Group continues to build around sectors where quality, trust, and service matter most.</p>'],
        'contact-us' => ['Contact Us', '<h2>Get in touch with our team.</h2><p>For business enquiries, partnerships, or corporate requests, please contact us directly.</p>'],
        'privacy-policy' => ['Privacy Policy', '<h2>Privacy Policy</h2><p>Use this page to publish your website privacy and cookie policy.</p>'],
    ];

    $created = [];
    foreach ($pages as $slug => [$title, $content]) {
        $existing = get_page_by_path($slug);
        if ($existing) {
            $created[$slug] = $existing->ID;
            continue;
        }
        $created[$slug] = wp_insert_post([
            'post_type'    => 'page',
            'post_status'  => 'publish',
            'post_title'   => $title,
            'post_name'    => $slug,
            'post_content' => $content,
        ]);
    }

    if (!empty($created['home']) && !is_wp_error($created['home'])) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $created['home']);
    }
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'almulla_activate');
