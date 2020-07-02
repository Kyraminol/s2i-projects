<?php

?>
<?php if(!is_page_template( 'blank-page.php' ) && !is_page_template( 'blank-page-with-container.php' )): ?>
			</div>
		</div>
	</div>
    <?php get_template_part( 'footer-widget' ); ?>
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="container pt-3 pb-3">
            <div class="site-info">
                &copy; <?php echo date('Y'); ?> <?php echo '<a href="'.home_url().'">'.get_bloginfo('name').'</a>'; ?>
                <span class="sep"> | </span>
                <a class="credits" href="https://github.com/Kyraminol/s2i-projects/tree/master/makerspace" target="_blank"><?php echo esc_html__('Maker\'s Space WordPress Theme','makerspace'); ?></a>
            </div>
		</div>
	</footer>
<?php endif; ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
