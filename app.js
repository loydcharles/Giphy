//  topics-view class="btn btn-info"

// Initial array of topics
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
              "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
              "pygmy goat", "chicken", "capybara", "teacub pig", "serval", "salamander", "frog"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  //var queryURL = "http://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=40e9cece";

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8664c2d5bcea4729b69035d78e99e2e8&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
//    console.log(JSON.stringify(response));    
    for (var i=0; i < response.data.length; i++) {
      var stillImage = response.data[i].images.fixed_height_small_still.url;
      var animateImage = response.data[i].images.fixed_height_small.url;

      // Creating a div to hold the animal
      var animalDiv = $("<div class='animal'>");

      // Creating an element to hold the image
      var image = $("<img>").attr("src", stillImage);

      // Appending the image
      animalDiv.append(image);

      // Putting the entire animal above the previous topics
      $("#animals-view").prepend(animalDiv);
    }
  });
}


// Function for displaying animal data
function renderButtons() {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  topics.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();