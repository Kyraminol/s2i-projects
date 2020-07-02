<?php

get_header();
get_sidebar();
?>
    <section id="primary" class="content-area col-sm-12 col-lg-8">
        <main id="main" class="site-main" role="main">

            <?php
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/content', 'page' );

                if ( comments_open() || get_comments_number() ) :
                    comments_template();
                endif;
            endwhile;
            ?>

        </main>
    </section>

<?php
get_footer();
