(function ($) {

    var PremiumButtonHandler = function ($scope, $) {

        var $btnGrow = $scope.find('.premium-button-style6-bg'),
            $basicBtn = $scope.find('.premium-image-button-none');

        if ($btnGrow.length !== 0 && $scope.hasClass('premium-mouse-detect-yes')) {
            $scope.on('mouseenter mouseleave', '.premium-button-style6', function (e) {

                var parentOffset = $(this).offset(),
                    left = e.pageX - parentOffset.left,
                    top = e.pageY - parentOffset.top;

                $btnGrow.css({
                    top: top,
                    left: left,
                });

            });
        }

        // Fix: Small gap appears when hover background color is the same as the border color && border-radius is applied.
        if ($basicBtn.length) {
            var btnHoverAttr = getComputedStyle($basicBtn[0], '::after'),
                hoverStyle = {},
                bgColor = btnHoverAttr.backgroundColor,
                bgImage = btnHoverAttr.backgroundImage;

            if (bgColor) {
                hoverStyle['background-color'] = bgColor;
            }

            if (bgImage && (bgImage.startsWith("linear-gradient") || bgImage.startsWith("radial-gradient"))) {
                hoverStyle['background-image'] = bgImage;
            }

            $basicBtn.hover(function () { $(this).css(hoverStyle); }, function () { $(this).css({ 'background-color': '', 'background-image': '' }); });
        }
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-image-button.default', PremiumButtonHandler);
    });
})(jQuery);

