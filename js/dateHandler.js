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
            if(data.isTuesday === "true"){
                $("#vote_title").html("距離投票結束還剩：");
                deadline_date = data.now;
            }
            else{
                setTimeout(function(){
                    $("#vote-for").attr("disabled","disabled");
                },1250);
                deadline_date = data.nextTuesday;
            }
        })
        .fail(function() {
            var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
            $("html").append(modal_msg);
            $("#error-def").modal('show');
            setTimeout(function() {
                $("#error-def").modal('hide');
                $("#error-def").remove();
            }, 3000);
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
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
        function updateClock() {
            var t = getTimeRemaining(endtime);
            $("#"+id+" .panel-body").html(t.days + "天" + ('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));
            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
        }
    }

    
})