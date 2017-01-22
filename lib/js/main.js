$(document).ready(function () {

    
    //Adding Music
    var sound = new Howl({
        src: ['music.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
    });

//Play music button
    var clicked = false;
    $("#mbtn").click(function () {
        if (clicked === false) {
            sound.play();
            console.log("playing");
            clicked = true;
        } else {
            sound.pause();
            console.log("paused");
            clicked = false;
        }
    });



    //New Quote Button
    $("#qbtn").click(function (e) {
        getQuote(function () {

            console.log("Button Clicked");
        });
        e.stopPropagation();
    });

    //Tweet Quote Button
    $("#tbtn").click(function (e) {
        var c = $('#quote').text();
        var d = $('#author').text();
        tweetQuote(c, d);
        e.stopPropagation();
    });

    //Get The Quotes
    function getQuote(lelo) {
        $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
            type: 'GET',
            data: {},
            datatype: 'json',
            success: function (data) {
                jSonify(data);
                lelo();
            }, // Call the callback!
            error: function (err) { alert(err); },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "qKPbfOzWKemsh2qi30QgbOA1WufXp1ok1NsjsnAkvh6yVJfaAk");
            }
        });
    }

    //Processing Data
    var jSonify = function (rawData) {
        var jSonified = jQuery.parseJSON(rawData);
        var quote = jSonified.quote;
        var author = jSonified.author;
        changeQuote(quote, author);
        console.log(quote);
        console.log(author);
        return [quote, author];
    };

    //Change Quotes
    function changeQuote(a, b) {
        $("#quote").html(a);
        $("#author").html('- ' + b);
    }

    //Tweet Quotes
    function tweetQuote(c, d) {
        var quoteTemp = c.replace(/ /g, '%20');
        console.log(quoteTemp);
        var tweetContent = "https://twitter.com/intent/tweet?text=" + '"' + quoteTemp + "%20" + d + '"';
        $("a").prop("href", tweetContent);
    }

});