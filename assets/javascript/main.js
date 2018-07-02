$(document).ready(function () {
    var topics = ["The Eric Andre Show", "Mostly 4 Millenials", "Bojack Horseman", "Rick and Morty", "WestWorld", "Tim and Eric Awesome Show, Great Job!", "South Park", "Key & Peele", "Conan", "Arrested Development"];
    function generateButtons() {
        $("#showGif").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("gif-button");
            gifBtn.attr("data-name", topics[i]);
            gifBtn.text(topics[i]);
            $("#showGif").append(gifBtn);
        }
    };
    generateButtons();
    $("#addGif").on('click', function (event) {
        event.preventDefault();
        var gif = $("#userInput").val().trim();
        topics.push(gif);
        generateButtons();
    });    
});

$(document).on('click', ".gif-button", function () {
    var querySearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + querySearch + "&apikey=nw1HUTKjlICc1zqRzWONKjwI1XYHr3Wp" + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
                rating = response.data[i].rating;
                animate = response.data[i].images.fixed_width.url;
                still = response.data[i].images.fixed_width_still.url;                
            if (rating === "pg" || rating === "pg-13") {
                $('#gifDisplay').prepend('<p>' + rating + '</p>');
                var gif = $('<img>')
                gif.attr('src', still);
                gif.attr("data-still", still);
                gif.attr("data-animate", animate);
                gif.attr("data-state", "still");
                $('#gifDisplay').prepend(gif);
                }
            }

        });
    $('#gifDisplay').on('click', 'img', function() {            
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr('src', $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else if (state === "animate") {
                $(this).attr('src', $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
});