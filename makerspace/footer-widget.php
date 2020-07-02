<?php

if ( is_active_sidebar( 'footer' ) ) {?>
        <div id="footer-widget" class="row m-0 bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-4"><?php dynamic_sidebar( 'footer' ); ?></div>
                </div>
            </div>
        </div>

<?php }
