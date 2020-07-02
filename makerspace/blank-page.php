<?php

get_header();
?>
    <section id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
            <?php
                while ( have_posts() ) : the_post();
                    get_template_part( 'template-parts/content', 'notitle' );
                endwhile;
            ?>
        </main>
    </section>

<?php
get_footer();
