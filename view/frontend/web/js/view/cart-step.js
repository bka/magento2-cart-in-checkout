define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'mage/translate'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        $t
    ) {
        'use strict';

        return Component.extend({
            defaults: {
            },
            isVisible: ko.observable(true),

            initialize: function () {
                this._super();
                stepNavigator.registerStep(
                    'cart',
                    null,
                    $t('Shopping Cart'),
                    this.isVisible,
                    _.bind(this.navigate, this),
                    5
                );
                return this;
            },

            navigate: function () {
              window.location.href = "/checkout/cart";
            },

            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
    }
);
