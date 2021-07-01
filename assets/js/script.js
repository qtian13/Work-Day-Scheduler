var dayToday = moment().format("dddd, MMMM Do");
// get the calendar in Local Storage if there is
var calendar = JSON.parse(localStorage.getItem("calendar"));

// display the date today like in format like Thursday, July 1st
$("#currentDay").text(dayToday);
// rrun the function when document is loaded
$(document).ready(function() {
    // check if there is calendar of today stored before
    if (calendar == null || calendar.date !== moment().format('MMMM Do YYYY')) {
        // if not, assign an empty object to the calendar and set the date as today
        calendar = {};
        calendar.date = moment().format('MMMM Do YYYY');
    } else {
        // if so, update the page content with the calendar
        $(".input-box").each(function() {
            $(this).val(calendar[$(this).attr("id")]);
        })
    }
    // check each hour block is past, present or future and change the background color
    $(".time-block").each(function(i, element) {
        var currentTime = parseInt(moment().format("HH"));
        if (i + 8 < currentTime) {
            $(element).addClass("past text-black-50");
            $(element).find("textarea").addClass("text-black-50");
        } else if (i + 8 == currentTime) {
            $(element).addClass("present");
        } else {
            $(element).addClass("future");
        }
    })
});

// save the textarea value in the calender and store the calender to Local Storage every time the save button is clicked
$(".saveBtn").on("click", function() {
    var buttonID = "#" + $(this).attr("id");
    calendar[$(buttonID).prev().attr("id")] = $(buttonID).prev().val();
    localStorage.setItem("calendar", JSON.stringify(calendar));
})