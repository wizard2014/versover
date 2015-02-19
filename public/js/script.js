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

    /******************************************************************************
     form
     *******************************************************************************/
    (function() {
        $('textarea').autosize();

        // Send mail
        $('.send-mail-form').on('submit', function(e) {
            e.preventDefault();

            var subject = $.trim($('.subject').val()),
                email   = $.trim($('.email').val()),
                message = $.trim($('.message').val());

            var html  = '',
                error = false;

            $.ajax({
                type: 'POST',
                url: '/contacts',
                data: { subject: subject, email: email, message: message }
            })
                .done(function(data) {
                    var parse = JSON.parse(data.result);

                    $(parse).each(function(index, value) {
                        if (value.success !== undefined) {
                            html += '<div class="email-message email-message-success"><h2 class="text-center">'  + value.success + '<h2></div>';
                        } else {
                            html += '<div class="email-message email-message-error"><h2 class="text-center">'  + value.error + '<h2></div>';

                            error = true;
                        }

                        $('body').append(html);
                    });
                })
                .fail(function() {
                    html += '<div class="email-message email-message-error"><h2 class="text-center">Something went wrong.<h2></div>';
                })
                .always(function() {
                    var messenger   = $('.email-message'),
                        timer       = null;

                    autoClose();

                    messenger.on('click', function() {
                        $(this).fadeOut('slow');

                        clearTimeout(timer);
                    });

                    function autoClose() {
                        timer = setTimeout(function(){ messenger.trigger('click'); }, 8000);
                    }

                    // Clear fields
                    if (!error) {
                        $('.subject').val('');
                        $('.email').val('');
                        $('.message').val('');
                    }
                });
        });
    })();
});