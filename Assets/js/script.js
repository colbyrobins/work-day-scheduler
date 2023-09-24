$(function () {

  // set the date and time in the web page header.
  var currentDay = $("#currentDay");
  currentDay.text(dayjs().format("dddd, MMMM D YYYY"));

  var container = $(".container-lg");

  // iterate the hours of a work day and create a time block for each hour.
  for (var i = 9; i < 18; i++) {
    
    var timeText = i;
    var timeStyle = "";
    var currentHour = dayjs().hour();

    // check the hour to determine if its AM or PM
    if (i <= 12) {
      timeText = i + " AM";
    }else {
      timeText = i - 12 + " PM";
    }
    
    // check current hour to see if the time box is in the past present or future.
    if (currentHour === i) {
      timeStyle = "present";
    }
    else if (i < currentHour) {
      timeStyle = "past";
    }
    else {
      timeStyle = "future";
    }
    
    // create the time boxes.
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

  // the save button to capture input.
  $(".btn").click(function(){
    var data = $(this).prev("textarea").val();
    localStorage.setItem(this.parentElement.id, data )
  })

  // iterate each time box and check if data was saved. If it was display it.
  $(".container-lg").children().each(function () {
    
    var id = $(this).attr("id");
    var data = localStorage.getItem(id)

    if (data != null) {
      $(this).find("textarea").html(data);
    }
  })
  
});
