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
            console.log(data);
            console.log(data.now , data.nextTuesday);
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
            
            console.log('get vote date done');
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

            $("#"+id+" .panel-body").html(t.days + "天" + ('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    
})