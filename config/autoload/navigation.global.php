<?php
/**
 * Global navigation config
 */

return array(
    'navigation' => array(
        'default' => array(
            array(
                'label' => 'Home',
                'route' => 'home',
            ),
            array(
                'label' => 'Blog',
                'route' => 'blog',
                'class' => 'blog-link',
            ),
            array(
                'label' => 'Contacts',
                'route' => 'contacts',
            ),
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'navigation' => 'Zend\Navigation\Service\DefaultNavigationFactory',
        ),
    ),
);