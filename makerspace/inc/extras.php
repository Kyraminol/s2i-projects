<?php

function makerspace_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}
    if ( get_theme_mod( 'theme_option_setting' ) && get_theme_mod( 'theme_option_setting' ) !== 'default' ) {
        $classes[] = 'theme-preset-active';
    }
	return $classes;
}

add_filter( 'body_class', 'makerspace_body_classes' );
function makerspace_pingback_header() {
	echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
}
add_action( 'wp_head', 'makerspace_pingback_header' );

function makerspace_navbar_collapse_class(){
	switch (get_theme_mod( 'navbar_collapse_color' )) {
		case "dark":
			return 'navbar-light';
			break;
		default:
			return 'navbar-dark';
	}
}

function makerspace_header_text_border(){
	switch (get_theme_mod( 'header_text_border' )) {
		case "light":
			return 'text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white !important';
			break;
		case "dark":
			return 'text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important';
			break;
		default:
			return '';
	}
}
