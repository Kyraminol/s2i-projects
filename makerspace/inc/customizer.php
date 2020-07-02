<?php

function makerspace_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'colors_customizations',
		array(
			'title' => __( 'Colors Customizations', 'makerspace' ),
			'description' => __( 'Colors', 'makerspace' ),
			'priority' => 20,
		)
	);
	$wp_customize->add_setting(
		'navbar_bg_setting',
		array(
			'default'     => '#563d7c',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'navbar_bg',
			array(
				'label'      => __( 'Navbar Background', 'makerspace' ),
				'section'    => 'colors_customizations',
				'settings'   => 'navbar_bg_setting',
			) )
	);

	$wp_customize->add_setting(
		'navbar_text_setting',
		array(
			'default'     => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'navbar_text',
			array(
				'label'      => __( 'Navbar Text', 'makerspace' ),
				'section'    => 'colors_customizations',
				'settings'   => 'navbar_text_setting',
			) )
	);

	$wp_customize->add_setting('navbar_collapse_color', array(
		'default'   => 'light',
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	) );
	$wp_customize->add_control( new WP_Customize_Control($wp_customize, 'navbar_collapse_color', array(
		'label' => __( 'Navbar Mobile Button', 'makerspace' ),
		'section'    => 'colors_customizations',
		'settings'   => 'navbar_collapse_color',
		'type'    => 'select',
		'choices' => array(
			'light' => __('Light', 'makerspace' ),
			'dark' => __('Dark', 'makerspace' ),
		)
	) ) );

	$wp_customize->add_setting(
		'body_bg_setting',
		array(
			'default'     => '#f0f0f0',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'body_bg',
			array(
				'label'      => __( 'Page Background', 'makerspace' ),
				'section'    => 'colors_customizations',
				'settings'   => 'body_bg_setting',
			) )
	);

	$wp_customize->add_setting(
		'footer_bg_setting',
		array(
			'default'     => '#c0c0c0',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'footer_bg',
			array(
				'label'      => __( 'Footer Background', 'makerspace' ),
				'section'    => 'colors_customizations',
				'settings'   => 'footer_bg_setting',
			) )
	);

	$wp_customize->add_setting(
		'footer_text_setting',
		array(
			'default'     => '#303030',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'footer_text',
			array(
				'label'      => __( 'Footer Text', 'makerspace' ),
				'section'    => 'colors_customizations',
				'settings'   => 'footer_text_setting',
			) )
	);



	$wp_customize->add_section(
        'other_customizations',
        array(
            'title' => __( 'Other Customizations', 'makerspace' ),
            'description' => __( 'Various stuff', 'makerspace' ),
            'priority' => 60,
        )
    );

    $wp_customize->add_setting( 'preset_style_setting', array(
        'default'   => 'default',
        'type'       => 'theme_mod',
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'preset_style_setting', array(
        'label' => __( 'Font', 'makerspace' ),
        'section'    => 'other_customizations',
        'settings'   => 'preset_style_setting',
        'type'    => 'select',
        'choices' => array(
            'default' => 'Default',
            'arbutusslab-opensans' => 'Arbutus Slab / Opensans',
            'montserrat-merriweather' => 'Montserrat / Merriweather',
            'montserrat-opensans' => 'Montserrat / Opensans',
            'oswald-muli' => 'Oswald / Muli',
            'poppins-lora' => 'Poppins / Lora',
            'poppins-poppins' => 'Poppins / Poppins',
            'roboto-roboto' => 'Roboto / Roboto',
            'robotoslab-roboto' => 'Roboto Slab / Roboto',
        )
    ) ) );



    $wp_customize->add_section(
        'header_image',
        array(
            'title' => __( 'Header Banner', 'makerspace' ),
            'priority' => 30,
        )
    );
    $wp_customize->add_control(
        'header_img',
        array(
            'label' => __( 'Header Image', 'makerspace' ),
            'section' => 'header_image',
            'type' => 'text',
        )
    );

    $wp_customize->add_setting(
        'header_bg_color_setting',
        array(
            'default'     => '#ffffff',
            'sanitize_callback' => 'sanitize_hex_color',
        )
    );
    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            'header_bg_color',
            array(
                'label'      => __( 'Header Banner Background Color', 'makerspace' ),
                'section'    => 'header_image',
                'settings'   => 'header_bg_color_setting',
            ) )
    );

    $wp_customize->add_setting( 'header_banner_title_setting', array(
        'default' => __( 'Maker\'s Space', 'makerspace' ),
    ) );

    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_banner_title_setting', array(
        'label' => __( 'Banner Title', 'makerspace' ),
        'section'    => 'header_image',
        'settings'   => 'header_banner_title_setting',
        'type' => 'text'
    ) ) );


    $wp_customize->add_setting( 'header_banner_tagline_setting', array(
        'default' => __( 'To customize the contents of this header banner and other elements of your site go to Dashboard - Appearance - Customize','makerspace' ),
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_banner_tagline_setting', array(
        'label' => __( 'Banner Tagline', 'makerspace' ),
        'section'    => 'header_image',
        'settings'   => 'header_banner_tagline_setting',
        'type' => 'text'
    ) ) );

	$wp_customize->add_setting(
		'header_title_color_setting',
		array(
			'default'     => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'header_title_color',
			array(
				'label'      => __( 'Title Color', 'makerspace' ),
				'section'    => 'header_image',
				'settings'   => 'header_title_color_setting',
			) )
	);
	$wp_customize->add_setting(
		'header_tagline_color_setting',
		array(
			'default'     => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'header_tagline_color',
			array(
				'label'      => __( 'Tagline Color', 'makerspace' ),
				'section'    => 'header_image',
				'settings'   => 'header_tagline_color_setting',
			) )
	);

	$wp_customize->add_setting('header_text_border', array(
		'default'   => 'none',
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	) );
	$wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_text_border', array(
		'label' => __( 'Text border', 'makerspace' ),
		'section'    => 'header_image',
		'settings'   => 'header_text_border',
		'type'    => 'select',
		'choices' => array(
			'none' => __('None', 'makerspace' ),
			'light' => __('Light', 'makerspace' ),
			'dark' => __('Dark', 'makerspace' ),
		)
	) ) );


	$wp_customize->add_setting( 'header_banner_visibility', array(
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'themeslug_sanitize_checkbox',
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_banner_visibility', array(
        'settings' => 'header_banner_visibility',
        'label'    => __('Remove Header Banner', 'makerspace'),
        'section'    => 'header_image',
        'type'     => 'checkbox',
    ) ) );



    $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
    $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	$wp_customize->get_control( 'header_backgroundcolor_setting'  )->section = '';
	$wp_customize->get_control( 'header_textcolor'  )->section = '';
	$wp_customize->get_control( 'background_color'  )->section = '';

	$wp_customize->add_setting( 'makerspace_logo', array(
        'sanitize_callback' => 'esc_url',
    ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'makerspace_logo', array(
        'label'    => __( 'Upload Logo (replaces text)', 'makerspace' ),
        'section'  => 'title_tagline',
        'settings' => 'makerspace_logo',
    ) ) );

}
add_action( 'customize_register', 'makerspace_customize_register' );

add_action( 'wp_head', 'makerspace_customizer_css');
function makerspace_customizer_css()
{
    ?>
    <style type="text/css">
        #page-sub-header { background: <?php echo get_theme_mod('header_bg_color_setting', '#ffffff'); ?>; }
        #page-sub-header .container > h1 {color: <?php echo get_theme_mod('header_title_color_setting', '#ffffff'); ?> !important; <?php echo makerspace_header_text_border()?>}
        #page-sub-header .container > p, #page-sub-header .container > a.page-scroller {color: <?php echo get_theme_mod('header_tagline_color_setting', '#ffffff'); ?> !important;}
        #masthead { background-color: <?php echo get_theme_mod('navbar_bg_setting', '#563d7c'); ?> !important; color: <?php echo get_theme_mod('navbar_text_setting', '#ffffff'); ?> !important;}
        #content { background-color: <?php echo get_theme_mod('body_bg_setting', '#f0f0f0'); ?>; }
        #colophon { background-color: <?php echo get_theme_mod('footer_bg_setting', '#c0c0c0'); ?> !important; color: <?php echo get_theme_mod('footer_text_setting', '#303030'); ?> !important;}
    </style>
    <?php
}

function makerspace_customize_preview_js() {
    wp_enqueue_script( 'makerspace_customizer', get_template_directory_uri() . '/inc/assets/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'makerspace_customize_preview_js' );
