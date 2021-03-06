$(document).ready(function () {
    $(document).on("click",".ProjectScoreSysOpen",function(e){
        e.preventDefault();
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function () {
			ProjectScoreSysOpen();
            $("#ProjectScoreSystem").fadeIn("slow");
		}, 1000);
    });
    //show current poll list
    function ProjectScoreSysOpen(){
        beforeToDo();
    }
    
    $(document).on("click","#poll-abstract",function(){
        readThePollDetail();
    });
});
var pollData = null;
var pollcount = 0;
function beforeToDo(){
    var obj = null;
    var inputValue = null;
    $.ajax({
        url: './pollphp/validation.php',
        type: 'GET',
        datatype: 'json'
    })
    .done(function(data){
        obj = jQuery.parseJSON(data);
        if(obj.status === "is voted"){
            inputValue = "isVoted";
        }
        else if(obj.status === "not voted"){
            inputValue = "HomePage";
        }
    })
    .fail(function(){
        var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
        $("html").append(modal_msg);
        $("#error-def").modal('show');
        setTimeout(function() {
            $("#error-def").modal('hide');
            $("#error-def").remove();
        }, 3000);
    })
    .always(function(){
        readThePollList(inputValue);
    })
}
function readThePollList(pollfromwhere){
    if(pollfromwhere === "backtopollabstract"){
        $("#poll-list").fadeIn("slow");
        $("#countdownToVote").fadeIn("slow");
    }
    else if(pollfromwhere === "HomePage"){
        $("#poll-list").empty();
        $.ajax({
            url: './pollphp/getPollList.php',
            type: 'GET',
            datatype: 'json'
        })
        //.done will run after AJAX request
        .done(function(data) {
            pollData = data;
            var i=0;
            if(pollcount <= data.length){
                for(i;i<data.length;i++){
                    $("#poll-list").append("<div id='"+pollData[i].ID+"' class='funkyradio'>");
                        $("#"+pollData[i].ID+"").append("<div id='container"+pollData[i].ID+"' class='funkyradio-primary'><input type='radio' name='pollradio' id='radio"+pollData[i].ID+"' value="+pollData[i].ID+">");
                            $("#container"+pollData[i].ID+"").append("<label for='radio"+pollData[i].ID+"'><div id='content"+pollData[i].ID+"'>");
                                $("#content"+pollData[i].ID+"").append("<div id='poll-container"+pollData[i].ID+"' class='pollclass panel panel-default col-xs-offset-1 col-sm-offset-1' value="+ i +">");
                                    $("#poll-container"+pollData[i].ID).append("<div class='panel-heading'>");
                                        $("#poll-container"+pollData[i].ID+" .panel-heading").append("<h3 class='panel-title'>第"+pollData[i].ID+"個提案</h3>");
                                    $("#poll-container"+pollData[i].ID).append("</div>");
                                    $("#poll-container"+pollData[i].ID).append("<div class='panel-body'>");
                                        $("#poll-container"+pollData[i].ID+" .panel-body").append("點擊此處獲得更多...");
                                    $("#poll-container"+pollData[i].ID).append("</div>");
                                $("#content"+pollData[i].ID+"").append("</div>");
                            $("#container"+pollData[i].ID+"").append("</div></label>");
                        $("#"+pollData[i].ID+"").append("</div>");
                    $("#poll-list").append("</div>");
                }
                pollcount = pollData.length;
                if(i === pollcount && i != 0){
                    $("#poll-list").append("<div class='col-sm-12 col-xs-12'><button id='vote-for' class='btn btn-default btn-block'>投票</button></div>");
                }
            }
            else{
                $("#poll-list").append("目前沒有更多資料");
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
            $(document).on("click",".pollclass",function () {
                var temp = this.id
                $("#poll-list").fadeOut("slow");
                $("#countdownToVote").fadeOut("slow");
                setTimeout(function() {
                    readThePollDetail(temp);
                }, 1000);
            });
        });
    }
    else if(pollfromwhere === "isVoted"){
        $("#poll-list").append("<div class='col-sm-12 col-xs-12 alert-danger text-center'>已經投票過了</div>");
        $("#vote-for").addClass("disabled");
    }
}
function readThePollDetail(pollstring){
    var id = pollstring;

    $("#poll-object-detail").empty();
    var pollDetailCode = $("#"+id).attr('value');
    $("#poll-object-detail").append("<div class='table-responsive'><table id='poll-table-seperate' class='table table-bordered table-hover'><thead>");
        $("#poll-table-seperate thead").append("<tr><th>項目</th><th>內容</th></tr>");
        $("#poll-table-seperate").append("</thead><tbody>")
        $("#poll-table-seperate tbody").append("<tr>"+"<td>產品策略</td><td>"+pollData[pollDetailCode].poll_product+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>價格策略</td><td>"+pollData[pollDetailCode].poll_price+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>促銷策略</td><td>"+pollData[pollDetailCode].poll_promotion+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>通路策略</td><td>"+pollData[pollDetailCode].poll_place+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>為何做(Why)</td><td>"+pollData[pollDetailCode].poll_why+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>客群(Who)</td><td>"+pollData[pollDetailCode].poll_who+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>項目(What)</td><td>"+pollData[pollDetailCode].poll_what+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>販售地點(Where)</td><td>"+pollData[pollDetailCode].poll_where+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>販售時間(When)</td><td>"+pollData[pollDetailCode].poll_when+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>如何做(How)</td><td>"+pollData[pollDetailCode].poll_how+"</td>"+"</tr>");
        $("#poll-table-seperate tbody").append("<tr>"+"<td>備註</td><td>"+pollData[pollDetailCode].poll_note+"</td>"+"</tr>");
    $("#poll-object-detail").append("</tbody></table></div>");
    $("#poll-object-detail").append("<button id='back-to-poll-list' class='btn btn-default btn-block'>回上頁</button>");
    $("#poll-object-detail").fadeIn("slow");
    $(document).on("click","#back-to-poll-list",function(){
        $("#poll-object-detail").fadeOut("slow");
        setTimeout(function() {
            readThePollList("backtopollabstract");
        }, 1000);
    });
}
$(document).ready(function(){
    $(document).on("click","#vote-for",function(){
        $("#testvalue").empty();
        var testval = $('input[name="pollradio"]:checked').val();
        $("#testvalue").append("第"+testval+"個提案");
        if(testval === null){
            $("#not_selected").modal();
        }
        else{
            $("#check_for_vote").modal();
        }
    });
    
    $(document).on("click","#yes_to_vote",function(){
        var sendval = $('input[name="pollradio"]:checked').val();
        $("#check_for_vote").modal("hide");
        addVote(sendval);
    });
    function addVote(sendval){
        var sendJSON = {"pollid": sendval}
        $.ajax({
            url: './pollphp/addVote.php',
            type: 'POST',
            data: {sendData:sendJSON},
            datatype: 'json'
        })
        .done(function(data){
            if(data === "complete"){
                $("#vote-window").modal();
                setTimeout(function() {
                    $(".TrizSystem").fadeOut("slow");
                    $("#triz-menu").fadeIn("slow");
                }, 1000);
            }
        })
        .fail(function(){
            var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
            $("html").append(modal_msg);
            $("#error-def").modal('show');
            setTimeout(function() {
                $("#error-def").modal('hide');
                $("#error-def").remove();
            }, 3000);
        })
        .always(function(){
            $("#poll-list").empty();
        });
    }
});