$(document).ready(function () {
    console.log("ready!")
    //Set up gobal variables
    var utellyResp;
    var name;
    var streamUrl;

    //Getting the name from local storage
    // console.log(localStorage.getItem("movieName"));
    let moviename = (localStorage.getItem("storageName"))

    //Create structure for displaying movie name======================================================
    //Jquery to make a Movie Div
    var titleDiv = $("<div>");

    //Adding Class titleDiv
    titleDiv.addClass("titleDiv");

    //Setup a <p> tage for moviename
    var p = $("<p>").text(moviename);

    //Adding Class Title
    p.addClass("title");

    //Prepends the movie title
    $("#title-view").prepend(p);

    //Puts the Title in the span 
    $(".result").text("  " + moviename);
    //================================================================================================================================     

    //Utelly API call to get the show that was searched for to see where it's streaming    
    const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=' + moviename + '&country=us'
    const options = {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "dfb87b0ec6msh548e75d6f762a4bp1dc2f1jsn322c78d86502"
        },
    }
    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            utellyResp = (myJson);
            //Testing -Console logs to deteremine where the data fields we want are            
            console.log(myJson)
            //Loop through to get movie name
            for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                console.log(utellyResp.results[0].locations[a].display_name);
                streamUrl = utellyResp.results[0].locations[a].url
                console.log(streamUrl);

                //Creating a div to hold streaming results
                var streamDiv = $("<div>");
                streamDiv.addClass("streamDiv");
                var stream = utellyResp.results[0].locations[a].display_name; //Loop through UTELLY Json to get display name                   
                p.addClass("stream")
                $("#stream-view").append(p); // Appends the DIv to the stream-view section of HTML 
                //Links the movie URL to the movie display name
                var streamLink = $("<br> <a href=" + streamUrl + ">" + stream + "</a>");
                $(".stream").append(streamLink);
            }

        });

    //===========================================================================================================
    var queryURL = "https://www.omdbapi.com/?t=" + moviename + "&apikey=bbe0873c";

    // Creating an AJAX call for IMDB
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //Creating a Div for the plot
        var movieDiv = $("<div class='movie'>");
        // Storing the plot
        var plot = response.Plot;
        // Creating an element to hold the plot
        var pZero = $("<p>").text("Plot: " + plot);
        // Appending the plot
        pZero.addClass("plot");
        movieDiv.append(pZero);
        //============================================================================================================================== 
        //Creating a Div for the Rating, Image and Release
        var mviewDiv = $("<div class='m-view'>");

        // Storing the rating data
        var rating = response.Rated;
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
        pOne.addClass("rating")
        // Displaying the rating
        // mviewDiv.append(pOne);

        // Storing the release year
        var released = response.Released;
        // Creating an element to hold the release year 
        var pTwo = $("<p>").text("Released: " + released);
        pTwo.addClass("year")
        //Displaying the release year
        //mviewDiv.append(pTwo);

        // Storing the release year
        var runtime = response.Runtime;
        // Creating an element to hold the release year 
        var pThree = $("<p>").text("Runtime: " + runtime);
        pThree.addClass("runtime")
        //Displaying the release year
        //mviewDiv.append(pThree);

        // Storing the release year
        var genre = response.Genre;
        // Creating an element to hold the release year 
        var pFour = $("<p>").text("Genre: " + genre);
        pFour.addClass("genre")
        //Displaying the release year
        //mviewDiv.append(pFour);

        // Storing the release year
        var actors = response.Actors;
        // Creating an element to hold the release year 
        var pFive = $("<p>").text("Genre: " + actors);
        pFive.addClass("actors")
        //Displaying the release year
        // mviewDiv.append(pFive);

        // Storing the release year
        var imdb = response.imdbRating;
        // Creating an element to hold the release year 
        var pSix = $("<p>").text("IMDB Rating: " + imdb);
        pSix.addClass("imdbRating")
        //Displaying the release year
        // mviewDiv.append(pSix);

        // Retrieving the URL for the image
        var imgURL = response.Poster;
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        image.addClass("imgMovie")
        // Appending the image
        mviewDiv.append(image);
        // Putting the information in the DIVS
        $("#movies-view").prepend(movieDiv);
        var newRow = $("<tr>").append(
            $("<td>").text(rating),
            $("<td>").text(released),
            $("<td>").text(runtime),
            $("<td>").text(genre),
            $("<td>").text(actors),
            $("<td>").text(imdb),
        );
        // Append the new row to the table
        $("#myTable > tbody").append(newRow);
        $("#m-view").prepend(mviewDiv);
    });

    //YOU TUBE API TRAILERS IS WORKING!!
    //=========================================================================================================================================
    var APIKey = "AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8"
    // -----------------------------------------------------------------------
    function getVideo() {
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8',
                q: moviename + "trailer",
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true,
            },
            success: function (data) {
                embedVideo(data)
                console.log(data);
            },
            error: function (response) {
                console.log("Request Failed");
                console.log(response);
            }
        });
    }


    function embedVideo(data) {
        $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
        $('h3').text(data.items[0].snippet.title)
        $('.description').text(data.items[0].snippet.description)
    }


    getVideo();


});