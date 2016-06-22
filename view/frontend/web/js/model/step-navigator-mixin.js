/*
 * changes function navigateTo from step-navigator to respond to cart clicking with
 * a location href change
 */
define(['mage/utils/wrapper'], function (wrapper) {
    'use strict';
    return function (navigator) {
            navigator['navigateTo'] = function(code, scrollToElementId) {
                if (code == "cart") {
                    window.location = "/checkout/cart";
                    return;
                }
                var sortedItems = steps.sort(this.sortItems);
                var bodyElem = $.browser.safari || $.browser.chrome ? $("body") : $("html");
                scrollToElementId = scrollToElementId || null;

                if (!this.isProcessed(code)) {
                    return;
                }
                sortedItems.forEach(function(element) {
                    if (element.code == code) {
                        element.isVisible(true);
                        bodyElem.animate({scrollTop: $('#' + code).offset().top}, 0, function () {
                            window.location = window.checkoutConfig.checkoutUrl + "#" + code;
                        });
                        if (scrollToElementId && $('#' + scrollToElementId).length) {
                            bodyElem.animate({scrollTop: $('#' + scrollToElementId).offset().top}, 0);
                        }
                    } else {
                        element.isVisible(false);
                    }

                });
            };
        return navigator;
    };
});
