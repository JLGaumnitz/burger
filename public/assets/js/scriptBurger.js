$(document).ready(function() {
    
    $(".devour-form").on("submit", function(event) {
      event.preventDefault();
  
      var burger_id = $(this).children(".burger_id").val();
      $.ajax({
        method: "PUT",
        url: "/burgers/" + burger_id
      }).then(function(data) {
        // Reload page to display devoured burger in proper column
        location.reload();
      });
  
    });
  });
  