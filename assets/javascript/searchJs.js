$(function(){

    var charcterArray = ["Tinkerbell","Cinderella","Sleeping Beauty", "Dumbo", "Mulan"];

    var btnDiv  = $("#btnSection");

    btnLoad();
// ...................................................................................................................


    // ...................................................................................................................
    function btnLoad(){
        //This function will read the array and load the buttons to the jumbotran

        // read array with a for loop
        for (var i=0; i<charcterArray.length; i++){
            // create a new button for each array item and attributes and classes 
                createButton(charcterArray[i]);
        }   
    };

    // .................................................................................................................
    // This function will be executed when character buttons are clicked    
    
        $(document).on("click",".btnQueryVal",function(){
        // $("#btnTink").on("click" ,function(){
        debugger;
        // Api key genreated by Giphy.com
        var apiKey = "HH2R2kthUYB18vT3SRR2ePHdC3z3SJpB&q";

        var queryURL = ""; 
        // read the data value of the button and concatinate to the URL

        var queryValue = $(this).attr("data-name");
        console.log(queryValue);
        var results;
        if (queryValue != null) {

            // query URL from Gihpy.com
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
                        "=&limit=10&offset=0&rating=G&lang=en&q=" + queryValue;
                        console.log(queryURL);
        };

        // call API
        $.ajax({
            url : queryURL,
            method : "GET"
        }).then (function(response){
        //  read data from the API to results variable
            results = response.data;
            // create a new section to add the images 
            var divRow = $("<div>");
            divRow.addClass("row mt-1 mb-1");
            var searchText = $("<p>").text(queryValue);
            divRow.prepend(searchText);

            for (var i =0 ; i < results.length; i++){
                // add image and rating to a new column in the div 
                var imgCol = $("<div>").addClass("col-md-auto m-1 borderStyle");
                var imgTag = $("<img>").addClass("row");
                var ratingTag = $("<p>").addClass("row textStyle");
                ratingTag.text(results[i].rating.toUpperCase());
                imgTag.attr("src", results[i].images.fixed_height.url);

                imgCol.append(imgTag, ratingTag);
                divRow.append(imgCol);
            };

            var imgContainer = $("#divImages");
            imgContainer.prepend(divRow);
        });
    });

    // ..............................................................................................................
    $("#btnSubmit").on("click",function(event){
        // debugger
        event.preventDefault();

        var addBtnText = $("#searchVal").val();
        // console.log(addBtnText);
        charcterArray.push(addBtnText);
        createButton(addBtnText);
        $("#searchVal").val("");
    });  // end of function for btnSubmit on click 

    // .................................................................................................................
    function createButton(btnText){
       
        var newButton = $("<button>");            
        newButton.text(btnText);
        newButton.attr("id","btnTink")
        newButton.attr("data-name",btnText);
        newButton.attr("type","button");
        newButton.addClass("btnQueryVal btn text-danger border-bottom font-weight-bolder p-0 m-2");
        console.log(newButton);
        //add new button to the section with buttons 
        btnDiv.append(newButton);

    };

});