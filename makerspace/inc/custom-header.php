<?php
function makerspace_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'makerspace_custom_header_args', array(
		'default-image'          => '',
		'default-text-color'     => 'fff',
		'width'                  => 1920,
		'height'                 => 500,
		'flex-height'            => true,
		'wp-head-callback'       => 'makerspace_header_style',
	) ) );
}
add_action( 'after_setup_theme', 'makerspace_custom_header_setup' );

if ( ! function_exists( 'makerspace_header_style' ) ) :
function makerspace_header_style() {
	$header_text_color = get_header_textcolor();

	if ( get_theme_support( 'custom-header', 'default-text-color' ) === $header_text_color ) {
		return;
	}

	?>
	<style type="text/css">
	<?php
		if ( ! display_header_text() ) :
	?>
		.site-title,
		.site-description {
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
		}
	<?php
		else :
	?>
        a.site-title,
		.site-description {
			color: #<?php echo esc_attr( $header_text_color ); ?>;
		}

        #masthead .navbar-brand > a {
            color: <?php echo get_theme_mod( 'navbar_text_setting', '#ffffff') ?> !important;
        }


	<?php endif; ?>
	</style>
	<?php
}
endif;
