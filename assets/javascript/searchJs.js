$(function(){

    var characterArray = ["TINKERBELL","CINDERELLA","SLEEPING BEAUTY", "DUMBO", "MULAN"];

    var btnDiv  = $("#btnSection");

    btnLoad();
// ...................................................................................................................


    // ...................................................................................................................
    function btnLoad(){
        //This function will read the array and load the buttons to the jumbotran
        $("#btnSection").empty();
        // read array with a for loop
        for (var i=0; i<characterArray.length; i++){
            // create a new button for each array item and attributes and classes 
                createButton(characterArray[i]);
        }   
    };

    // .................................................................................................................
    // This function will be executed when character buttons are clicked    
    
        $(document).on("click",".btnQueryVal",function(){
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
            divRow.addClass("row mt-1 mb-1 justify-content-center");
            var searchText = $("<p>").text(queryValue);
            divRow.prepend(searchText);

            for (var i =0 ; i < results.length; i++){
                // add image and rating to a new column in the div 

                var imgCol = $("<div>").addClass("col-md-auto m-1 borderStyle text-center");

                // image tag
                var imgTag = $("<img>").addClass("row imgFile");            
                imgTag.attr("src", results[i].images.fixed_height.url);
                
                // tag for title
                var titleTag = $("<p>").addClass("row textStyle");
                titleTag.text(getTitleCase(results[i].title));

                // tag for rating
                var ratingTag = $("<p>").addClass("row textStyle");
                ratingTag.text("Rating " + results[i].rating.toUpperCase());

                // button to download images. This is not added to the page. for future upgrades
                var btnDownload = $("<button>").addClass("btn btn-sm row btnFile font-weight-bold");
                btnDownload.text("Download");
                btnDownload.attr("data-file",results[i].id);
                btnDownload.attr('href', "../DownLoads/" ) ;
                btnDownload.attr('download', results[i].id + ".gif");

                // button to add images to the favorities section. This is not added to the page. for future upgrades
                var btnfavorite = $("<button>").addClass("btn btn-sm row btnFav font-weight-bold");
                btnfavorite.text("Add to Favorites");
                btnfavorite.attr("data-file",results[i].id);

              
              
               
                imgCol.append(imgTag, titleTag, ratingTag);
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
        if(buttonExists(addBtnText)){
            alert("This button exists");
        }
        else{
            // add button value to the array 
        charcterArray.push(addBtnText.toUpperCase());
        // display buttons
        btnLoad();  
        }

        $("#searchVal").val("");
    });  // end of function for btnSubmit on click 

    // .................................................................................................................
    $(document).on("click",".btnFile",function(e){
    //   function to download images. This is not completed
        e.preventDefault();
        var useConfirm = confirm("Do you want to download this image?")
        window.location.href = '../DownLoads/'+$(this).attr("data-id")+".gif";

    });

    //................................................................................................................

    $(document).on("click", "btnFav",function(){
        // this function will add images to favorites. Not completed
    })
    // .................................................................................................................
    function createButton(btnText){
       debugger;
        var newButton = $("<button>");            
        newButton.text(getTitleCase(btnText));
        newButton.attr("id","btnTink")
        newButton.attr("data-name",btnText);
        newButton.attr("type","button");
        newButton.addClass("btnQueryVal btn text-light border-bottom font-weight-bolder p-0 m-2");
        console.log(newButton);
        //add new button to the section with buttons 
        btnDiv.append(newButton);

    };

    function getTitleCase(imgTitle){
        //This function converts the parameter value to title case
        return imgTitle.charAt(0).toUpperCase() + imgTitle.substr(1).toLowerCase();
    };

    function buttonExists(txtSearch){
        // This functions checkes if user input is already in the button list.
        // It first converts the input to uppercase and serch with the array;

        var n = characterArray.includes(txtSearch.toUpperCase());

        return n;


    };
});