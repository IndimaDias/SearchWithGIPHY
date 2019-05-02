$(function(){
    $("#btnSubmit").on("click", function(event){
        event.preventDefault();
        var apiKey = "HH2R2kthUYB18vT3SRR2ePHdC3z3SJpB&q";

        var queryURL = ""; 
        var queryValue = $("#searchVal").val();
        var results;
        if (queryValue != null) {
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
                        "=&limit=10&offset=0&rating=G&lang=en&q=" + queryValue;
                        console.log(queryURL);
        };

        $.ajax({
            url : queryURL,
            method : "GET"
        }).then (function(response){
            debugger;
            results = response.data;
            var divRow = $("<div>");
            divRow.addClass("row mt-1 mb-1");
            var searchText = $("<p>").text(queryValue);
            divRow.prepend(searchText);

            for (var i =0 ; i < results.length; i++){
                var imgTag = $("<img>");
                imgTag.addClass("col-md-auto p-1");
                imgTag.attr("src", results[i].images.fixed_height.url);

                divRow.append(imgTag);
            };

            var imgContainer = $("#divImages");
            imgContainer.prepend(divRow);
        });
    });
});