(function($) {

	$(document).ready(function() {
		var row = $('#utilities li');
		var editor = $('textarea.code');
		var path = '../utilities/';

		row.hover(function() {
			$(this).css('cursor', 'pointer');
		});

		row.click(function() {
			var filename = $(this).find('a').html();
			var lines = editor.val().split('\n');
			var xsl = '<xsl:import href="' + path + filename + '"/>';

			if ($(this).hasClass('selected')) {
				for (var i = 0, stop = false; i < lines.length && !stop; ++i) {
					if (lines[i].match("^" + xsl.replace('/>', '')) != null) {
						lines.splice(i, 1);
						stop = !stop;
					}
				}

				editor.val(lines.join('\n'));
				$(this).removeClass('selected');
			}
			else {
				for (var i = 0, stop = false; i < lines.length && !stop; ++i) {
					if (lines[i] === '') {
						lines[i] = '\n' + xsl;
						stop = !stop;
					}
				}

				editor.val(lines.join('\n'));
				$(this).addClass('selected');
			}
		});

	});
})(jQuery);
