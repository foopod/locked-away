var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var entryIndex;
var firstEntry = true;
var currentEntry;
var currentDate;
var currentYear;
var preloadedImage;

var hasLoadNextButton = function(){
    if(entryIndex+2 != entries.length){
        return '<a id="'+currentEntry.date+'" onclick="loadNextEntry()" class="submit">Previous Entry</a>';
    } else {
        return '<a id="'+currentEntry.date+'" onclick="loadLatestEntry()" class="submit">Previous Entry</a>';   
    }
}

var updateEntry = function() {
    currentEntry = entries[entryIndex];
    currentDate = new Date(currentEntry.date);
    if (currentYear !=currentDate.getFullYear()){
        currentYear = currentDate.getFullYear();
        $('#diaryContainer').append('<h1 class="header" style="margin-left:0;">'+currentYear+'</h1>');
        if(firstEntry){
            $('#diaryContainer').append('<div id="beginningContainer" class="entryContainer active"></div>');
            firstEntry = false;
        }
    }
    $('#diaryContainer').append('<div class="entryContainer active"><div id="entry' + currentEntry.date + '" class="entryHeader"><span>' + days[currentDate.getDay()] + '</span>' + '<span class="entryDate">' + currentDate.getDate() + ' ' + months[currentDate.getMonth()] + '</span></div><div class="entryBody"><p>' + currentEntry.entry + '</p></div><br><div style="text-align:center;">' + hasLoadNextButton() +'</div></div>');
    entryIndex++;
};

var showAttachment = function() {
    $('.submit').parent().remove();
    $("#thePicture").show();
    $("body").animate({scrollTop:$('#thePicture').offset().top -80},'slow');
    $("#beginningContainer").append('<br><div id="mc_embed_signup" style="max-width:30em;margin:auto;display:none;"><h1 style="text-align: center;font-size: 22px;font-weight: 300;">Want to see what <a href="http://jono.tech">Jono</a> makes next? <a href="http://twitter.com/foocodes"><i class="fa fa-twitter" aria-hidden="true"></i></a></h1><form action="//tech.us14.list-manage.com/subscribe/post?u=0163b6e55df2af9859e7e27db&amp;id=7576196686" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="" style="text-align:center;"><div id="mc_embed_signup_scroll"><input type="email" value="" name="EMAIL" id="mce-EMAIL" placeholder="Email" required=""><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0163b6e55df2af9859e7e27db_7576196686" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="submit" style="background-color:darkorange;"></div></div></form></div>');
    setTimeout(function(){
        $('#mc_embed_signup').slideDown('slow',function(){
           $("body").animate({scrollTop:$('#thePicture').offset().top - 10},'slow');
        });
        
    }, 2000);
}

var init = function() {
    //Sort diary entries
    entries.sort(function(a, b) {return new Date(b.date) - new Date(a.date);});
    $('#diaryContainer').empty();
    entryIndex = 0;
    currentYear= null;
    updateEntry();
    preloadedImage = new Image();
    preloadedImage.src = "assets/ourCouple.jpg";
    preloadedImage.id = "thePicture";
};

var loadNextEntry = function(){
    //Change diaryContainer class to grey
    $('.active').addClass('inactive');
    $('.inactive').removeClass('active');
    $('.submit').parent().remove();
    updateEntry();
    $("body").animate({scrollTop:$('#entry' + currentEntry.date).offset().top -50},'slow');
}

var loadLatestEntry = function(){
    $('.submit').parent().remove();
    $('#diaryContainer').append('<div class="entryContainer"><div class="entryBody inactive"><p style="text-align:center;">No more entries...</p></div></div>');
    $("body").animate({scrollTop:$(document).height()},'slow');
    $("#beginningContainer").append('<div style="text-align:center;"><a id="newEntry" onclick="showNewEntry()" class="submit">1 New Entry</a></div>');
    $("body").delay(900).animate({scrollTop:0},'slow');
    
}

var showNewEntry = function(){
    $("#beginningContainer").empty();
    $("#beginningContainer").hide();
    $("#beginningContainer").removeClass('inactive');
    $("#beginningContainer").addClass('active');
    currentEntry = entries[entryIndex];
    $("#beginningContainer").append('<div id="now" class="entryHeader"><span>Just Now</span></div><div class="entryBody">'+ currentEntry.entry+'</div><br><div style="text-align:center;"><a id="showAttachment" onclick="showAttachment()" class="submit">1 Attachment</a></div>');
    $("#beginningContainer").append(preloadedImage);
    $("#thePicture").hide();
    $("#beginningContainer").slideToggle( );
}