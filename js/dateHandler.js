$(document).ready(function(){
    var deadline_date = null;
    
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
            if(data.isTuesday == "true"){
                console.log('when today is vote day');
                $("#vote_title").html("距離投票結束還剩：");
                deadline_date = data.now;
            }
            else{
                console.log('set btn disabled');
                setTimeout(function(){
                    $("#vote-for").attr("disabled","disabled");
                },1250);
                
                deadline_date = data.nextTuesday;
            }
        })
        .fail(function() {
            $("html").append("<div id='error-def' class='alert-danger container'>"+error+"</div>");
            setTimeout(function() {
                $("#error-def").remove();
            }, 1500);
        })
        .always(function() {
            initializeClock('countdownToVote', deadline_date);
        });
    }
    
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - new Date(Date.parse(new Date()) + 480 * 60 * 1000);
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

            $("#"+id+" .panel-body").html(t.days + "天" + ('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    
})