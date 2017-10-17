/* globals $ */

// Set up your $(document).ready(function() {...});
// create variables for all the items i wan to display in the dom.
$(document).ready(function() {
	var $input = $(".moviesearch-input");
	var $poster = $(".moviesearch-movie-poster");
	var $title = $(".moviesearch-movie-info-title");
	var $year = $(".moviesearch-movie-info-year");
	var $plot = $(".moviesearch-movie-info-plot");
	var $director = $(".moviesearch-movie-info-director");
	var $actors = $(".moviesearch-movie-info-actors");
	var $genres = $(".moviesearch-movie-info-genres");

// Create a keyup event that is linked to the title input field.
	$input.on("keyup", function() {
		var title = $input.val();

		// Don't search if it's a short title (less than three characters in length)
		if (title.length < 3) {
			return;
		}

		// Set up the ajax call.
		$.ajax({
			type: "GET",
			url: "http://omdbapi.com",
			data: {
				apiKey: "1a18ddb3",
				t: title,
			},
			success: function(res) {
				if (!res.Error) {
					// Input the movie in to all elements
					$poster.attr("src", res.Poster);
					$title.html(res.Title);
					$year.html(res.Year);
					$plot.html(res.Plot);
					$director.html("Directed by " + res.Director);
					$actors.html("Starring " + res.Actors);
					$genres.html(res.Genre);
				}
				else {
					// Reset all elements with blank values
					$poster.attr("src", "");
					$title.html("No movie found");
					$year.html("");
					$plot.html("");
					$director.html("");
					$actors.html("");
					$genres.html("");

					// clears the input field when you click/focus on the input field.
					// if the input field is ledd that 3 letters then you can refocus on the input
					// and clear the field.
					$('#input').focus(function() {
						if ($(this).val('') < 3) {
							return $(this).val('');
						}
					});
				}
				// shows the data object in the console.
				console.log(res);
			},
		});
	});
});
