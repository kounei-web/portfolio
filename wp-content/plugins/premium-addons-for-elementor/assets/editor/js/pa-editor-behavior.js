(function ($) {

	'use strict';

	var PAWidgetsEditor = {

		init: function () {

			window.elementor.on('preview:loaded', function () {

				elementor.$preview[0].contentWindow.PAWidgetsEditor = PAWidgetsEditor;

			});

			window.elementor.on('panel:init', function () {

				setTimeout(function () {

					PAWidgetsEditor.handleUnusedWidgetsDialog();

				}, 10 * 1000);

			});



		},

		handleUnusedWidgetsDialog: function () {

			jQuery.ajax({
				type: "GET",
				url: paEditorSettings.ajaxurl,
				dataType: "JSON",
				data: {
					action: "pa_check_unused_widgets",
					security: paEditorBehaviorSettings.nonce,
				},
				success: function (res) {

					if (res.success) {

						var dialogsManager = new DialogsManager.Instance();

						dialogsManager.createWidget(
							'confirm',
							{
								headerMessage: wp.i18n.__('Disable Premium Addons Unused Elements', 'premium-addons-for-elementor'),
								message: wp.i18n.__('You have a couple of Premium Addons elements being unused for some time. Disable them for a faster editor loading speed.', 'premium-addons-for-elementor'),
								strings: {
									confirm: wp.i18n.__('Disable Unused Widgets', 'premium-addons-for-elementor'),
									cancel: wp.i18n.__('Never show again', 'premium-addons-for-elementor'),
								},
								onConfirm: function () {
									window.open(paEditorBehaviorSettings['disable_unused_link'], '_blank')
								},
								onHide: function () {

									jQuery.ajax({
										type: "GET",
										url: paEditorSettings.ajaxurl,
										dataType: "JSON",
										data: {
											action: "pa_hide_unused_widgets_dialog",
											security: paEditorBehaviorSettings.nonce,
										}
									});

								}
							}
						).show();

					}


				},
				error: function (err) {

					console.log(err);

				}
			});



		},

		activateControlsTab: function (tab, parentTab) {

			setTimeout(function () {

				if (parentTab)
					$('.elementor-tab-control-' + parentTab).trigger('click');

				var $tab = $("div.elementor-control-" + tab);

				if ($tab.length && !$tab.hasClass('e-open')) {

					$tab.trigger('click');
				}

			}, 150);

		}

	}

	$(window).on('elementor:init', PAWidgetsEditor.init);

	window.PAWidgetsEditor = PAWidgetsEditor;


})(jQuery);
