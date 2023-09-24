$(function () {

  var container = $(".container-lg");

  for (var i = 9; i < 18; i++) {
    
    var timeText = i;
    var timeStyle = "";
    var currentHour = dayjs().hour();

    if (i <= 12) {
      timeText = i + " AM";
    }else {
      timeText = i - 12 + " PM";
    }

    if (currentHour === i) {
      timeStyle = "present";
    }
    else if (i < currentHour) {
      timeStyle = "past";
    }
    else {
      timeStyle = "future";
    }
    
    var newDiv = $("<div id='hour-" + i + "' class='row time-block " + timeStyle + "'></div>");
    var nestedDiv = $("<div class='col-2 col-md-1 hour text-center py-3'>" + timeText + "</div>");
    var nestedTextarea = $("<textarea class='col-8 col-md-10 description' rows=3> </textarea>");
    var nestedButton = $(
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'>" + 
      "<i class='fas fa-save' aria-hidden='true'></i>" +
      "</button>"
    );
        
    newDiv.append(nestedDiv, nestedTextarea, nestedButton);
    container.append(newDiv);
  }

  $(".btn").click(function(){
    var data = $(this).prev("textarea").val();
    localStorage.setItem(this.parentElement.id, data )
  })

  $(".container-lg").children().each(function () {
    
    var id = $(this).attr("id");
    var data = localStorage.getItem(id)

    if (data != null) {
      $(this).find("textarea").html(data);
    }
  })
  
});
