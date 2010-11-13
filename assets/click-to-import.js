(function($) {

	$(document).ready(function() {
		var UTILITIES_PATH = '../utilities/';
		var row = $('#utilities li');

		row.hover(function() {
			$(this).css('cursor', 'pointer');
		});

		row.click(function(event) {
			if ($(event.target).is('a')) return;

			var editor = $('textarea.code');
			var lines = editor.val().split('\n');
			var filename = $(this).find('a').text();

			var currentpath = ($('form:first').attr('action').indexOf('blueprints/pages') > -1) ? UTILITIES_PATH : '';
			var statement = '<xsl:import href="' + currentpath + filename + '"/>';
			var qstring = statement.replace('/>', '');

			if ($(this).hasClass('selected')) {

				for (var i = 0, stop = false; i < lines.length && !stop; ++i) {
					if (lines[i].match("^" + qstring) != null || lines[i].match("^" + qstring.replace(filename, UTILITIES_PATH + filename)) != null) {
						lines.splice(i, 1);
						stop = !stop;
					}
				}

				editor.val(lines.join('\n'));
				$(this).removeClass('selected');
			}
			else {

				for (var i = 0, stop = false; i < lines.length && !stop; ++i) {
					if ($.trim(lines[i]).substring(0, 4) === '<!--' || $.trim(lines[i]).match('^<xsl:(?:import|variable|output|comment|template)')) {
						lines[i] = statement + '\n' + lines[i];
						stop = !stop;
					}
				}

				editor.val(lines.join('\n'));
				$(this).addClass('selected');
			}
		});

		

	});
})(jQuery);
