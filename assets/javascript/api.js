
var animals = ["Dogs", "Cats", "Birds"];

      function renderButtons() {
        // Deleting the gifs prior to adding new gifs
        $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }



 	$('button').on('click',function(){
 		var x = $(this).data("animal");
 		console.log(x);

 // This is our info to point to our API databae
 		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+x+"&api_key=dc6zaTOxFJmzC&limit=10";
 		$.ajax({url:queryURL,method:"GET"})
 		.done(function(response){
 			console.log(response);

 //run a for loop so you can run through all of the gif objects in the array. 
 			for(var i=0; i<response.data.length;i++){
 //creates a new div using jquery
 				var animalDiv = $('<div>');
 //creates a new paragraph for the "rating" text. The text is in the response data.
 				var p = $('<p>').text("Rating: "+response.data[i].rating);
 //creates the image tag for all of the gifs and sets different attributes for the different state 
 // of the gif. We'll need this later so we can pause the gif using the on click function. 
  				var animalImage = $('<img>');
 				animalImage.attr('src',response.data[i].images.fixed_height_still.url);
 				animalImage.attr('data-still',response.data[i].images.fixed_height_still.url);
 				animalImage.attr('data-animate',response.data[i].images.fixed_height.url);
 				animalImage.attr('data-state',"still");
 				animalImage.addClass("gif");

 				animalDiv.append(p);
 				animalDiv.append(animalImage);
 				$('#gifs-go-here').append(animalDiv);

//here is our on click function to start and stop the gifs once loaded onto the page
 				
 			} //end of the for loop

 			$("img").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })
 		})


 	}) 	
