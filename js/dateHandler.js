$(document).ready(function(){
    var deadline_date = null;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if(day < 10){
        day = "0" + day ;
    }
    
    var currentDate = year + '-' + month + '-' + day;
    $(document).one("click",".ProjectScoreSysOpen",function(){
        getDatefromphp();
    });
    
    function getDatefromphp(){
        $.ajax({
            url: './datephp/getDate.php',
            type: 'GET',
            datatype: 'json'
        })
        
        .done(function(data) {
            if(currentDate == data){
                day = day + 1;
                currentDate = year + '-' + month + '-' + day
                deadline_date = currentDate;
            }
            else{
                $("#vote-for").addClass("disabled");
                deadline_date = data;
            }
            
            console.log(deadline_date);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            initializeClock('countdownToVote', deadline_date);
            console.log("complete");
        });
    }
    
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
        function updateClock() {
            var t = getTimeRemaining(endtime);

            $("#"+id+" .days").html(t.days);
            $("#"+id+" .hours").html(('0' + t.hours).slice(-2));
            $("#"+id+" .minutes").html(('0' + t.minutes).slice(-2));
            $("#"+id+" .seconds").html(('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    
})