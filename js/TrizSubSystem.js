/*jslint browser: true*/
/*global $, jQuery, alert*/
//first loading judgement
var HistoryfirstLoading = true;
var HighestPollfirstLoading = true;
var OtherPollfirstLoading = true;
$(document).ready(function () {
    
    //dropdown list dynamically
    
    $("#personal-dropmenu").append("<li><a href='./uploadValidation.php'>當選提案審核</a></li>");
    $(document).on("click",".HistorySysOpen",function(e){
        e.preventDefault();
        chooseSectionToGo();
    });
    
    //homepage pushstate
    $("#HomeIndex").click(function(e){
        e.preventDefault();
    });
    
    //catch json variable
    
    
    $(".TrizSystem").hide();
    $(".TrizSysOpen").click(function(){
        $(".thumbnail").fadeOut("slow");
        $("#adjustMyProject").empty();
    });
    $("#HomeIndex").click(function(){
        $(".TrizSystem").fadeOut("slow");
        $("#all_view").empty();
        setTimeout(function(){ $(".thumbnail").fadeIn("slow"); }, 1000);
    });
    
    //input column add required automantically
    $(".require-area").prop('required',true);
    
    function chooseSectionToGo(){
        $(".browse_panel").empty();
        $(".TrizSystem").fadeOut("slow");
        $("#all_view").append('<div class="col-xs-12 col-sm-3"><button id="view_example" class="btn btn-default btn-lg btn-block ViewOrUpload">查詢其他公司案例</button></div>');
        $("#all_view").append('<div class="col-xs-12 col-sm-3"><button id="upload_example" class="btn btn-default btn-lg btn-block ViewOrUpload">上傳其他公司案例</button></div>');
        $("#all_view").append('<div class="col-xs-12 col-sm-3"><button id="highest_poll" class="btn btn-default btn-lg btn-block ViewOrUpload">查詢採用提案單</button></div>');
        $("#all_view").append('<div class="col-xs-12 col-sm-3"><button id="other_poll" class="btn btn-default btn-lg btn-block ViewOrUpload">查詢提案單</button></div>');
        $("#all_view").append('<div class="history-detail container"></div>');
        $("#all_view").append('<div class="high-detail container"></div>');
        $("#all_view").append('<div class="other-detail container"></div>');
        $("#HistorySystem").fadeIn("slow");
        /*history area*/
        /*highest*/
        
        /*other*/
        
    }
    
    //history system function area
    
    
    //POLL HANDLER AREA
    
    //other
    
    
    function queryTitle(strval,strclass){
        var jsonsender = {"titleVal": strval,"searchClass": strclass};
        $.ajax({
            url: './historyphp/searchTitle.php',
            type: 'POST',
            data: {pollData:jsonsender},
            datatype: 'json'
        })
        .done(function(data){
            for(var i=0;i<data.length;i++){
                $('.browse_panel').empty();
                $('.browse_panel').append('<div id="'+data[i].ID+'" class="browse-class panel panel-default" value='+i+'>');
                    $('#'+data[i].ID+'').append('<div class="panel-heading" value='+data[i].ID+'>'+data[i].Title+'</div>');
                        $('#'+data[i].ID+'').append('<div class="panel-body">'+data[i].Content+'</div>');
                        $('#'+data[i].ID+'').append('<div id=footer'+data[i].ID+' class="panel-footer">');
                            $('#footer'+data[i].ID+'').append('<div id=container'+data[i].ID+' class="container">');
                            $('#container'+data[i].ID+'').append('<div class="col-xs-6 col-sm-6"><i class="fa fa-user fa-lg" aria-hidden="true"></i>'+ data[i].CompanyName +'</div><div class="col-xs-6 col-sm-6"><i class="fa fa-eye fa-lg" aria-hidden="true"></i>瀏覽</div>');
                            $('#footer'+data[i].ID+'').append('</div>');
                        $('#'+data[i].ID+'').append('</div>');
                        $('#'+data[i].ID+'').append('</div>');
                    $('#'+data[i].ID+'').append('</div>');
                $('.browse_panel').append('</div>');
                $(".browse_panel").show();
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
            $(document).on("click",".browse-class",function () {
                var temp = this.id;
                $(".browse_panel").fadeOut("slow");
                setTimeout(function() {
                    HistoryDetail(temp);
                }, 1000);
            });
            $(document).on("click","#back_to_history_select",function () {
                $(".browse_panel").fadeOut("slow");
                setTimeout(function() {
                    $(".ViewOrUpload").fadeIn("slow");
                }, 1000);
            });
        })
    }
    
});
//history area
$(document).ready(function(){
    var dataJSON = null ;
    $(document).on("click","#view_example",function(){
        $(".ViewOrUpload").fadeOut("slow");
        $("#all_view").append('<div id="browse-control" class="container"></div>');
        $("#all_view").append('<div id="man_browse_panel" class="browse_panel container"></div>');
        $(".history-detail").empty();
        setTimeout(function () {
            if(HistoryfirstLoading){
                HistoryBrowse("Homepage");
                HistoryfirstLoading = false;
            }
            else{
                HistoryBrowse("loaded");
            }
        }, 1000);
    });
    var NumOfData = 0;
	function HistoryBrowse(fromwhere) {
        if(fromwhere === "Homepage" || fromwhere === "refresh"){
            $(".browse_panel").empty();
            $.ajax({
                url: './historyphp/browse.php',
                type: 'GET',
                datatype: 'json'

            })
            //.done will run after AJAX request
            .done(function(data) {
                dataJSON = data ;
                $('#browse-control').html("<div class='input-group col-xs-12 col-sm-12'><span class='input-group-addon'><i class='fa fa-search'aria-hidden='true'></i></span><input id='search_title' type='text' class='form-control' aria-describedby='basic-addon1'></div>");
                $('#browse-control').append("<div class='col-sm-6 col-xs-6'><button id='back_to_history_select' class='browsebtn btn btn-default btn-block'><i class='fa fa-history' aria-hidden='true'></i>  回上頁</button></div>");
                $('#browse-control').append("<div class='col-sm-6 col-xs-6'><button id='refresh_history_data' class='browsebtn btn btn-default btn-block'><i class='fa fa-refresh' aria-hidden='true'></i>  重新整理</button></div><br><br><br>");
                if (NumOfData <= data.length){
                    for(var i=0; i < data.length; i++){
                        $('.browse_panel').append('<div id="'+data[i].ID+'" class="browse-class panel panel-default" value='+i+'>');
                            $('#'+data[i].ID+'').append('<div class="panel-heading" value='+data[i].ID+'>'+data[i].Title+'</div>');
                                $('#'+data[i].ID+'').append('<div class="panel-body">'+data[i].Content+'</div>');
                                $('#'+data[i].ID+'').append('<div id=footer'+data[i].ID+' class="panel-footer">');
                                    $('#footer'+data[i].ID+'').append('<div id=container'+data[i].ID+' class="container">');
                                    $('#container'+data[i].ID+'').append('<div class="col-xs-6 col-sm-6"><i class="fa fa-user fa-lg" aria-hidden="true"></i>'+ data[i].CompanyName +'</div><div class="col-xs-6 col-sm-6"><i class="fa fa-eye fa-lg" aria-hidden="true"></i>瀏覽</div>');
                                    $('#footer'+data[i].ID+'').append('</div>');
                                $('#'+data[i].ID+'').append('</div>');
                                $('#'+data[i].ID+'').append('</div>');
                            $('#'+data[i].ID+'').append('</div>');
                        $('.browse_panel').append('</div>');
                    }
                    $(".browse_panel").fadeIn("slow");
                    NumOfData = data.length;
                    $("#loading-message").hide();
                }
                else{
                    $(".SemiSystem_1").fadeIn("slow");
                }

            })
            .fail(function(error) {
                var modal_msg = '<div class="modal fade" id="error-def" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">錯誤訊息</h4></div><div class="modal-body"><p>'+error+'</p></div><div class="modal-footer"><div class="col-xs-12 col-sm-12">3秒後消失</div></div> </div></div></div>';
                $("html").append(modal_msg);
                $("#error-def").modal('show');
                setTimeout(function() {
                    $("#error-def").modal('hide');
                    $("#error-def").remove();
                }, 3000);
            })
            .always(function() {
                $(document).on("click",".browse-class",function () {
                    var temp = this.id;
                    $(".browse_panel").fadeOut("slow");
                    $("#browse-control").fadeOut("slow");
                    setTimeout(function() {
                        HistoryDetail(temp);
                    }, 1000);
                });
                $(document).on("click","#back_to_history_select",function () {
                    $(".browse_panel").fadeOut("slow");
                    $('#browse-control').fadeOut("slow");
                    setTimeout(function() {
                        $(".ViewOrUpload").fadeIn("slow");
                    }, 1000);
                });
                $(document).on("change","#search_title",function () {
                    var searchVal = this.value;
                    $(".browse_panel").hide();
                    setTimeout(function() {
                        queryTitle(searchVal,"history");
                    }, 500);
                });
                $(document).on("click","#refresh_history_data",function(){
                    $(".browse_panel").empty();
                    $(".browse_panel").html("<div class='text-center'><i class='fa fa-refresh fa-spin fa-3x fa-fw'></i></div>");
                    setTimeout(function() {
                        $(".browse_panel").empty();
                        HistoryBrowse("refresh");
                    }, 2000);
                });
            });
        }
        else if(fromwhere === "fromDetail" || fromwhere === "reloadPage" || fromwhere === "loaded"){
            $(".browse_panel").fadeIn("slow");
        }
	}
    
    function HistoryDetail(string_value){
        $(".history-detail").empty();
        var getid = string_value;
        var detailCode = $("#"+getid).attr("value");
        $(".history-detail").append("<div id='selected-panel' class='panel panel-default'>");
            $("#selected-panel").append("<div class='panel-heading'>" + dataJSON[detailCode].Title + "</div>");
            $("#selected-panel").append("<div class='panel-body'><table id='table-seperate' class='table table-bordered table-hover'>");
                $("#table-seperate").append("<thead></thead><tbody>");
                    $("#table-seperate tbody").append("<tr>"+"<td>編號</td><td>"+dataJSON[detailCode].ID+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>日期</td><td>"+dataJSON[detailCode].Date+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>公司</td><td>"+dataJSON[detailCode].CompanyName+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>內容</td><td>"+dataJSON[detailCode].Content+"</td>"+"</tr>");
                $("#table-seperate").append("</tbody>");
            $("#selected-panel").append("</table></div>");
            $("#selected-panel").append("<div class='panel-footer'>" + "<button id='back-to-history' class='btn btn-default btn-block'>回上頁</button>" + "</div>");
        $(".history-detail").append("</div>");
        $(".SemiSystem_1").fadeIn("slow");
        $(document).on("click","#back-to-history",function () {
            $(".history-detail").fadeOut("slow");
            setTimeout(function() {
                HistoryBrowse("fromDetail");
                $("#browse-control").fadeIn("slow");
                $(".history-detail").empty();
            }, 1000);
        });
    }
});
//high area
$(document).ready(function(){
    $(document).on("click","#highest_poll",function(){
        $(".ViewOrUpload").fadeOut("slow");
        $("#all_view").append('<div id="man_highest_poll" class="highest_poll container"></div>');
        $(".history-detail").empty();
        setTimeout(function () {
            if(HighestPollfirstLoading){
                HighestPollBrowse("firstload");
                HighestPollfirstLoading = false;
            }
            else{
                HighestPollBrowse("loaded");
            }
        }, 1000);
    });
    var getPollJSON = null;
    function HighestPollBrowse(ajaxrel){
        if(ajaxrel === "firstload" || ajaxrel === "refresh"){
            $(".highest_poll").html("<div class='col-sm-6 col-xs-6'><button id='back_to_history_select' class='btn btn-default btn-block'><i class='fa fa-history' aria-hidden='true'></i>  回上頁</button></div>");
            $(".highest_poll").append("<div class='col-sm-6 col-xs-6'><button id='refresh_highestPoll_data' class='btn btn-default btn-block'><i class='fa fa-refresh' aria-hidden='true'></i>  重新整理</button></div><br><br><br>");
            $.ajax({
                url: './historyphp/getHighestPoll.php',
                type: 'GET',
                datatype: 'json'
            })
            .done(function(data){
                getPollJSON = data;
                if(data.length >0){
                    for(var i=0;i<data.length;i++){
                        $('.highest_poll').append('<div id="high-'+data[i].ID+'" class="panel panel-default high-class" value='+i+'>');
                            $('#high-'+data[i].ID+'').append('<div class="panel-heading">'+data[i].Name+'的提案</div>');
                                $('#high-'+data[i].ID+'').append('<div class="panel-body">點擊此處觀看詳細資訊</div>');
                                
                                $('#high-'+data[i].ID+'').append('</div>');
                            $('#high-'+data[i].ID+'').append('</div>');
                        $('.highest_poll').append('</div>');
                    }
                }
                else{
                    $('.highest_poll').append("NO DATA");
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
                $(document).on("click",".high-class",function(){
                    var tempID = this.id;
                    $(".highest_poll").fadeOut("slow");
                    setTimeout(function(){
                        PollDetail(tempID,"high");
                    }, 1000);
                });
                $(document).on("click","#back_to_history_select",function () {
                    $(".highest_poll").fadeOut("slow");
                    setTimeout(function() {
                        $(".ViewOrUpload").fadeIn("slow");
                    }, 1000);
                });
                $(document).on("click","#refresh_highestPoll_data",function(){
                    $(".highest_poll").empty();
                    $(".highest_poll").html("<div class='text-center'><i class='fa fa-refresh fa-spin fa-3x fa-fw'></i></div>");
                    setTimeout(function() {
                        $(".highest_poll").empty();
                        HighestPollBrowse("refresh");
                    }, 2000);
                });
            });
        }
        else if(ajaxrel === "fromDetail" || ajaxrel === "loaded"){
            $(".highest_poll").fadeIn("slow");
        }
    }
});
//other area
$(document).ready(function(){
    $(document).on("click","#other_poll",function(){
        $(".ViewOrUpload").fadeOut("slow");
        $("#all_view").append('<div id="man_other_poll" class="other_poll container"></div>');
        $(".history-detail").empty();
        setTimeout(function () {
            if(OtherPollfirstLoading){
                OtherPollBrowse("firstload");
                OtherPollfirstLoading = false;
            }
            else{
                OtherPollBrowse("loaded");
            }
        }, 1000);
    });
    var getPollJSON = null;
    function OtherPollBrowse(ajaxrel){
        if(ajaxrel === "firstload" || ajaxrel === "refresh"){
            $(".other_poll").html("<div class='col-sm-6 col-xs-6'><button id='back_to_history_select' class='btn btn-default btn-block'><i class='fa fa-history' aria-hidden='true'></i>  回上頁</button></div>");
            $(".other_poll").append("<div class='col-sm-6 col-xs-6'><button id='refresh_OtherPoll_data' class='btn btn-default btn-block'><i class='fa fa-refresh' aria-hidden='true'></i>  重新整理</button></div><br><br><br>");
            $.ajax({
                url: './historyphp/getOtherPoll.php',
                type: 'GET',
                datatype: 'json'
            })
            .done(function(data){
                getPollJSON = data;
                if(data != null){
                    for(var i=0;i<data.length;i++){
                        $('.other_poll').append('<div id="other-'+data[i].ID+'" class="panel panel-default other-class" value='+i+'>');
                            $('#other-'+data[i].ID+'').append('<div class="panel-heading">'+data[i].Name+'的提案</div>');
                                $('#other-'+data[i].ID+'').append('<div class="panel-body">點擊此處觀看詳細資訊</div>');
                            $('#other-'+data[i].ID+'').append('</div>');
                        $('.other_poll').append('</div>');
                    }
                }
                else{
                    $('.other_poll').append("NO DATA");
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
                $(document).on("click",".other-class",function(){
                    var tempID = this.id;
                    $(".other_poll").fadeOut("slow");
                    setTimeout(function(){
                        PollDetail(tempID,"other");
                    },1000);
                });
                $(document).on("click","#back_to_history_select",function () {
                    $(".other_poll").fadeOut("slow");
                    setTimeout(function() {
                        $(".ViewOrUpload").fadeIn("slow");
                    }, 1000);
                });
                $(document).on("click","#refresh_OtherPoll_data",function(){
                    $(".other_poll").empty();
                    $(".other_poll").html("<div class='text-center'><i class='fa fa-refresh fa-spin fa-3x fa-fw'></i></div>");
                    setTimeout(function() {
                        $(".other_poll").empty();
                        OtherPollBrowse("refresh");
                    }, 2000);
                });
            });
        }
        else if(ajaxrel === "fromDetail" || ajaxrel === "loaded"){
            $(".other_poll").fadeIn("slow");
        }
    }
    
    function PollDetail(strid,strClass){
        var getid = strid;
        var getClass = strClass;
        var detailCode = $("#"+getid).attr("value");
        if(getClass === "other"){
            $(".other-detail").empty();
            $(".other-detail").append("<div id='selected-panel' class='panel panel-default'>");
            $(".other-detail").append("</div>");
            $(".other-detail").fadeIn("slow");
        }
        if(getClass === "high"){
            $(".high-detail").empty();
            $(".high-detail").append("<div id='selected-panel' class='panel panel-default'>");
            $(".high-detail").append("</div>");
            $(".high-detail").fadeIn("slow");
        }
            $("#selected-panel").append("<div class='panel-heading'>詳細內容</div>");
            $("#selected-panel").append("<div class='panel-body'><table id='table-seperate' class='table table-bordered table-hover'>");
                $("#table-seperate").append("<thead></thead><tbody>");
                    $("#table-seperate tbody").append("<tr>"+"<td>編號</td><td>"+getPollJSON[detailCode].ID+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>提案者姓名</td><td>"+getPollJSON[detailCode].Name+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>產品策略</td><td>"+getPollJSON[detailCode].poll_product+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>價格策略</td><td>"+getPollJSON[detailCode].poll_price+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>促銷策略</td><td>"+getPollJSON[detailCode].poll_promotion+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>通路策略</td><td>"+getPollJSON[detailCode].poll_place+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>為何做</td><td>"+getPollJSON[detailCode].poll_why+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>客群</td><td>"+getPollJSON[detailCode].poll_who+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>項目</td><td>"+getPollJSON[detailCode].poll_what+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>販售地點</td><td>"+getPollJSON[detailCode].poll_where+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>販售時間</td><td>"+getPollJSON[detailCode].poll_when+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>如何做</td><td>"+getPollJSON[detailCode].poll_how+"</td>"+"</tr>");
                $("#table-seperate").append("</tbody>");
            $("#selected-panel").append("</table></div>");
            $("#selected-panel").append("<div class='panel-footer'>" + "<button id='back-to-history' class='btn btn-default btn-block'>回上頁</button>" + "</div>");
        
        
        $(document).on("click","#back-to-history",function () {
            $("."+getClass+"-detail").fadeOut("slow");
            setTimeout(function() {
                if(getClass === "other"){
                    OtherPollBrowse("fromDetail");
                }
                else if(getClass === "high"){
                    HighestPollBrowse("fromDetail");
                }
            }, 1000);
        });
    }
});