var dayToday = moment().format("dddd, MMMM Do");

$("#currentDay").text(dayToday);

var calender = JSON.parse(localStorage.getItem("calender"));
$(document).ready(function() {
    if (calender == null || calender.date !== moment().format('MMMM Do YYYY')) {
        calender = {};
        calender.date = moment().format('MMMM Do YYYY');
    } else {
        $(".input-box").each(function() {
            $(this).val(calender[$(this).attr("id")]);
        })
    }
    $(".time-block").each(function(i, element) {
        var currentTime = parseInt(moment().format("HH"));
        if (i < currentTime) {
            $(element).addClass("past text-black-50");
            $(element).find("textarea").attr("readonly", "readonly");
            $(element).find("textarea").addClass("text-black-50");
        } else if (i == currentTime) {
            $(element).addClass("present");
        } else {
            $(element).addClass("future");
        }
    })
});

$(".save").on("click", function() {
    var buttonID = "#" + $(this).attr("id");
    calender[$(buttonID).prev().attr("id")] = $(buttonID).prev().val();
    localStorage.setItem("calender", JSON.stringify(calender));
    
})