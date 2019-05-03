$(function(){

    var charcterArray = ["Tinkerbel","Cinderella", "Shophia","Shophia","Shophia","Shophia","Shophia","Shophia","Shophia",
    "Shophia","Shophia","Shophia","Shophia","Shophia","Shophia","Shophia","Shophia",];
    var btnDiv  = $("#btnSection");
    btnLoad();

    function btnLoad(){
        //This function will read the array and load the buttons to the jumbotran

        for (var i=0; i<charcterArray.length; i++){
            var newButton = $("<button>");            
            newButton.text(charcterArray[i]);
            newButton.attr("data-name",charcterArray[i]);
            newButton.addClass("btn text-danger border-bottom font-weight-bolder p-0 m-2 btnQueryVal");
            console.log(newButton);
            btnDiv.append(newButton);
        }
    };


    $(".btnQueryVal").on("click", function(event){
        event.preventDefault();
        debugger;
        var apiKey = "HH2R2kthUYB18vT3SRR2ePHdC3z3SJpB&q";

        var queryURL = ""; 
        var queryValue = $(this).attr("data-name");
        console.log(queryValue);
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