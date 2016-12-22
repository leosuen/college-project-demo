$(document).ready(function(){
    var firstload = true;
    var JSONcontainer = null;
    var certval = null;
    identifyTheHuman(human);
    
    $("div:first").load("navbar.php");
    
    function identifyTheHuman(human){
        $.ajax({
            url: './pollphp/checkHuman.php',
            type: 'GET',
            datatype: 'json'
        })
        .done(function(data){
            if(data === "chosenOne"){
                getHighestPollbutNotCertificate("firsttime");
            }
            else{
                $("#title01").remove();
                $("#wait-abs").remove();
                $("#waitToCertificate").remove();
                $(".modal").remove();
                $("#msg").html("你不是本周的提案當選人，或者你已經審核過了。");
            }
        })
        .fail(function(error){
            var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
            $("html").append(modal_msg);
            $("#error-def").modal('show');
            setTimeout(function() {
                $("#error-def").modal('hide');
                $("#error-def").remove();
            }, 3000);
        })
        .always(function(){
            
        });
    }
    
    function getHighestPollbutNotCertificate(judgeValue){
        if(firstload){
            getPoll();
            firstload = false;
        }
        else if(judgeValue === "refreshPage"){
            getPoll();
        }
        function getPoll(){
            $("#waitToCertificate").empty();
            $.ajax({
                url: './pollphp/getTheMostPoll.php',
                type: 'GET',
                datatype: 'json',
                beforeSend: function(){
                    $("html").append("<div id='before-def' class='alert-info container text-center'>載入中...</div>");
                }
            })
            .done(function(data){
                if(data.length === 0){
                    $("#waitToCertificate").html("目前沒有需要審核的提案。");
                }
                else{
                    JSONcontainer = data;
                    $("#wait-abs").append("<table class='table table-bordered table-hover'>");
                        $("#wait-abs .table").append("<thead></thead>");
                        $("#wait-abs .table").append("<tbody>");
                        for(var i = 0; i<data.length;i++){
                            $("#wait-abs .table tbody").append("<tr><td>第"+(i+1)+"個待審核提案</td><td><button id='poll-detail' class='btn btn-default btn-block' value="+i+">查看</button></td></tr>");
                        }
                        $("#wait-abs .table").append("</tbody>");
                    $("#wait-abs").append("</table>");
                }
            })
            .fail(function(error){
                $("html").append("<div id='error-def' class='alert-danger container'>"+error+"</div>");
                setTimeout(function() {
                    $("#error-def").remove();
                }, 1500);
            })
            .always(function(){
                $("#before-def").remove();
                $(document).on("click","#poll-detail",function(){
                    var tempvar = this.value;
                    $("#wait-abs").fadeOut("slow");
                    setTimeout(function() {
                        readThePoll(tempvar);
                    }, 1250);
                });
            });
        }
        
        function readThePoll(tempvar){
            var pollCode = tempvar;
            $("#waitToCertificate").append("<table class='table table-bordered'>");
                $("#waitToCertificate .table").append("<thead></thead>");
                $("#waitToCertificate .table").append("<tbody>");
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>提案單編號</td><td>"+JSONcontainer[pollCode].ID+"</td>"+"</tr>");
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>提案者姓名</td><td>"+JSONcontainer[pollCode].Name+"</td>"+"</tr>");
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>產品策略</td><td><textarea id='product-stra' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#product-stra").val(JSONcontainer[pollCode].poll_product);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>價格策略</td><td><textarea id='price-stra' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#price-stra").val(JSONcontainer[pollCode].poll_price);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>促銷策略</td><td><textarea id='promotion-stra' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#promotion-stra").val(JSONcontainer[pollCode].poll_promotion);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>通路策略</td><td><textarea id='place-stra' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#place-stra").val(JSONcontainer[pollCode].poll_place);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>為何做(Why)</td><td><textarea id='poll-why' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-why").val(JSONcontainer[pollCode].poll_why);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>客群(Who)</td><td><textarea id='poll-who' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-who").val(JSONcontainer[pollCode].poll_who);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>項目(What)</td><td><textarea id='poll-what' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-what").val(JSONcontainer[pollCode].poll_what);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>販售地點(Where)</td><td><textarea id='poll-where' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-where").val(JSONcontainer[pollCode].poll_where);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>販售時間(When)</td><td><textarea id='poll-when' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-when").val(JSONcontainer[pollCode].poll_when);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>如何做(How)</td><td><textarea id='poll-how' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-how").val(JSONcontainer[pollCode].poll_how);
                    $("#waitToCertificate .table tbody").append("<tr>"+"<td>備註</td><td><textarea id='poll-note' class='form-control' rows='5'></textarea></td>"+"</tr>");
                    $("#poll-note").val(JSONcontainer[pollCode].poll_note);
                $("#waitToCertificate .table").append("</tbody>");
            $("#waitToCertificate").append("</table>");
            $("#waitToCertificate").append("<br>");
            $("#waitToCertificate").append("<button id='certifiy_poll' class='btn btn-default btn-block' value="+JSONcontainer[pollCode].ID+">送出</button>");
            $("#waitToCertificate").append("<button id='back_to_top' class='btn btn-danger btn-block'>回上頁</button>");
            $("#waitToCertificate").fadeIn("slow");
            $(document).on("click","#back_to_top",function(){
                $("#waitToCertificate").fadeOut("slow");
                setTimeout(function() {
                    $("#waitToCertificate").empty();
                    $("#wait-abs").fadeIn("slow");
                }, 1250);
            });
            $(document).on("click","#certifiy_poll",function(){
                certval = $("#certifiy_poll").attr("value");
                $("#check_for_cert").modal('toggle');
            });
        }
    }
    
    $(document).on("click","#yes_to_cert",function(){
        $("#check_for_cert").modal('hide');
        setTimeout(function() {
            updateAndPush(certval);
        }, 2500);
    });
    
    function updateAndPush(strval){
        $.ajax({
            url: './pollphp/addCertificate.php',
            type: 'POST',
            data: {postdata:strval}
        })
        .done(function(data){
            if(data === "complete"){
                $("#msg_success").modal();
            }
        })
        .fail(function(error){
            var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
            $("html").append(modal_msg);
            $("#error-def").modal('show');
            setTimeout(function() {
                $("#error-def").modal('hide');
                $("#error-def").remove();
            }, 3000);
        })
        .always(function(){
            
        });
    }
})