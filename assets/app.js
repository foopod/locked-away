var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var entryIndex;
var currentEntry;
var currentDate;
var currentYear;

var hasLoadNextButton = function(){
    if(entryIndex != entries.length){
        return '<a onclick="loadNextEntry()" class="submit">Previous Entry</a>';
    } else {
        return '';   
    }
}

var updateEntry = function() {
    currentEntry = entries[entryIndex];
    currentDate = new Date(currentEntry.date);
    if (currentYear !=currentDate.getFullYear()){
        currentYear = currentDate.getFullYear();
        $('#diaryContainer').append('<h1 class="header">'+currentYear+'</h1>');
    }
    $('#diaryContainer').append('<div class="entryContainer active"><div class="entryHeader"><span>' + days[currentDate.getDay()] + '</span>' + '<span class="entryDate">' + currentDate.getDate() + ' ' + months[currentDate.getMonth()] + '</span></div><div class="entryBody"><p>' + currentEntry.entry + '</p></div><br><br><div style="text-align:center;">' + hasLoadNextButton() +'</div></div>');
    entryIndex++;
};

var init = function() {
    //Sort diary entries
    entries.sort(function(a, b) {return new Date(b.date) - new Date(a.date);});
    $('#diaryContainer').empty();
    entryIndex = 0;
    currentYear= null;
    updateEntry();
};

var loadNextEntry = function(){
    //Change diaryContainer class to grey
    $('.active').addClass('inactive');
    $('.inactive').removeClass('active');
    $('.submit').remove();
    updateEntry();
    $("body").animate({scrollTop:$(document).height()},'slow');
}

init();