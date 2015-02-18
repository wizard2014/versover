$(function() {
    'use strict';

    /******************************************************************************
     material init
     *******************************************************************************/
    $.material.init();

    /******************************************************************************
     link to blog
     *******************************************************************************/
    (function() {
        $('.blog-link').on('click', function(e) {
            e.preventDefault();

            location.href = 'http://blog.versover.com';
        });
    })();

    /******************************************************************************
     accordion
     *******************************************************************************/
    (function() {
        $('.panel-title').on('click', function() {
            var $this       = $(this),
                elem        = $this.next(),
                className   = elem.prop('class'),
                i           = $this.parents('.panel-group').find('i');

            i.removeClass('mdi-content-remove').addClass('mdi-content-add');

            if (className == 'mdi-content-add') {
                elem.removeClass('mdi-content-add').addClass('mdi-content-remove');
            } else {
                elem.removeClass('mdi-content-remove').addClass('mdi-content-add');
            }
        });
    })();
});