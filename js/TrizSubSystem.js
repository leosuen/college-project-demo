/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    //manager view hide in the beginning
    
    //dropdown list dynamically
    console.log(pos);
    if(pos == "主管"){
        $("#personal-dropmenu").append("<li><a id='upload-function' href='#'>上傳案例</a></li>");
        $("#employee_view").remove();
        chooseSectionToGo();
    }
    else{
        $("#manager_view").remove();
        AsNormal();
    }
    
    //homepage pushstate
    $("#HomeIndex").click(function(e){
        e.preventDefault();
        
    })
    
    //refresh when back to previous page
    
    
    //catch json variable
    var dataJSON = null ;
    
    $(".TrizSystem").hide();
    $(".TrizSysOpen").click(function(){
        $(".thumbnail").fadeOut("slow");
        $("#adjustMyProject").empty();
    });
    $("#HomeIndex").click(function(){
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function(){ $(".thumbnail").fadeIn("slow"); }, 1000);
    });
    
    
    $(".ProjectSupportSysOpen").click(function(e){
        e.preventDefault();
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function(){ $("#ProjectSupportSystem").fadeIn("slow"); }, 1000);
    });
    $(".ProjectScoreSysOpen").click(function(e){
        e.preventDefault();
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function(){ $("#ProjectScoreSystem").fadeIn("slow"); }, 1000);
    });
    $(".PollSysOpen").click(function(){
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function(){ $("#PollSystem").fadeIn("slow"); }, 1000);
    });
    
	$(".ProjectSupportSysOpen").click(function () {
		setTimeout(function () {
			ProjectSupportSysOpen();
		}, 1000);
	});
    
    $(".CreativeOpen").click(function () {
		setTimeout(function () {
			CreativeOpen();
		}, 1000);
	});
    
    //ProjectScoreSysOpen function is in another JS
    
    //input column add required automantically
    $("textarea").prop('required',true);
    
    
    var count = 0;
    var NumOfData = 0;
    //history system function area
	function HistoryBrowse(fromwhere) {
        console.log('call HistoryBrowse...');
        if(fromwhere == "Homepage"){
            $.ajax({
                url: './historyphp/browse.php',
                type: 'GET',
                datatype: 'json'

            })
            //.done will run after AJAX request
            .done(function(data) {
                dataJSON = data ;
                var url = "";
                if (NumOfData <= data.length){
                    for(var i=0; i < data.length; i++){
                        if(data[i].URL == null){
                            url = "無";
                        }
                        else{
                            url = data[i].URL;
                        }

                        if(pos == "MIS管理員" || pos == "主管"){
                            $('.browse_panel').append('<div id="'+data[i].ID+'" class="panel panel-default test" value='+data[i].ID+'>');
                                $('#'+data[i].ID+'').append('<div class="panel-heading" value='+data[i].ID+'>'+data[i].Title+'</div>');
                                    $('#'+data[i].ID+'').append('<div class="panel-body">'+data[i].Content+'</div>');
                                    $('#'+data[i].ID+'').append('<div id=footer'+data[i].ID+' class="panel-footer">');
                                        $('#footer'+data[i].ID+'').append('<div id=container'+data[i].ID+' class="container">');
                                        $('#container'+data[i].ID+'').append('<div class="col-xs-4 col-sm-4"><i class="fa fa-user fa-lg" aria-hidden="true"></i>'+ data[i].CompanyName +'</div><div class="col-xs-4 col-sm-4"><i class="fa fa-eye fa-lg" aria-hidden="true"></i>瀏覽</div>'+'<div class="col-xs-4 col-sm-4"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i><a href="#">刪除</a></div>');
                                        $('#footer'+data[i].ID+'').append('</div>');
                                    $('#'+data[i].ID+'').append('</div>');
                                    $('#'+data[i].ID+'').append('</div>');
                                $('#'+data[i].ID+'').append('</div>');
                            $('.browse_panel').append('</div>');
                            
                        }
                        else{
                            $('.browse_panel').append('<div id="'+data[i].ID+'" class="test panel panel-default" value='+data[i].ID+'>');
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
                    }
                    $(".browse_panel").fadeIn("slow");
                    NumOfData = data.length
                   
                    console.log("success");
                }
                else{
                    $(".browse_panel").fadeIn("slow");
                }

            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                $(document).on("click",".test",function () {
                    var temp = this.id
                    $(".browse_panel").fadeOut("slow");
                    setTimeout(function() {
                        HistoryDetail(temp);
                    }, 1000);
                });
                console.log("complete");
            });
        }
        else if(fromwhere == "fromDetail" || fromwhere == "reloadPage"){
            $(".browse_panel").fadeIn("slow");
        }
        
        
	}
    
    function HistoryDetail(string_value){
        $(".history-detail").empty();
        var getid = string_value;
        console.log(getid);
        var detailCode = parseInt(getid) - 1;
        console.log(detailCode);
        $(".history-detail").append("<div id='selected-panel' class='panel panel-default'>");
            $("#selected-panel").append("<div class='panel-heading'>" + dataJSON[detailCode].Title + "</div>");
            $("#selected-panel").append("<div class='panel-body'><table id='table-seperate' class='table table-bordered table-hover'>");
                $("#table-seperate").append("<thead></thead><tbody>");
                    $("#table-seperate tbody").append("<tr>"+"<td>編號</td><td>"+dataJSON[detailCode].ID+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>日期</td><td>"+dataJSON[detailCode].Date+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>公司</td><td>"+dataJSON[detailCode].CompanyName+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>內容</td><td>"+dataJSON[detailCode].Content+"</td>"+"</tr>");
                    $("#table-seperate tbody").append("<tr>"+"<td>網址</td><td>"+dataJSON[detailCode].URL+"</td>"+"</tr>");
                $("#table-seperate").append("</tbody>");
            $("#selected-panel").append("</table></div>");
            $("#selected-panel").append("<div class='panel-footer'>" + "<button id='back-to-history' class='btn btn-default btn-block'>回上頁</button>" + "</div>");
        $(".history-detail").append("</div>");
        $(".history-detail").fadeIn("slow");
        $(document).one("click","#back-to-history",function () {
            $(".history-detail").fadeOut("slow");
            setTimeout(function() {
                HistoryBrowse("fromDetail");
                $(".history-detail").empty();
            }, 1000);
        });
    }
    
    //create support system function area
    function ProjectSupportSysOpen(){
        $("#newProjectOrNot").empty();
        $("#newProjectOrNot").append('<div class="col-xs-12 col-sm-12">是要創建新提案嗎？</div>');
        $("#newProjectOrNot").append('<div id="newProject" class="col-sm-6 col-xs-12 round-border-style">是</div>');
        $("#newProjectOrNot").append('<div id="gotoAdjust" class="col-sm-6 col-xs-12 round-border-style">不，請帶我去修改提案區</div>');
        $("#newProjectOrNot").fadeIn("slow");
        
    }
    
    //ranking project system function area
    function chooseSectionToGo(){
        $(".HistorySysOpen").click(function(e){
            e.preventDefault();
            $("#manager_view").empty();
            $(".TrizSystem").fadeOut("slow");
            $("#manager_view").append('<div id="view_example" class="ViewOrUpload col-xs-12 col-sm-6 round-border-style">查看案例</div>');
            $("#manager_view").append('<div id="upload_example" class="ViewOrUpload col-xs-12 col-sm-6 round-border-style">上傳案例</div>');
            $("#manager_view").append('<div class="history-detail container"></div>');
            $("#HistorySystem").fadeIn("slow");
            //.one just run code once , .on will run multiple if you click more then one time
            $(document).one("click","#view_example",function(){
                console.log('func doing...');
                $(".ViewOrUpload").fadeOut("slow");
                $("#manager_view").append('<div id="man_browse_panel" class="browse_panel container"></div>');
                $(".history-detail").empty();
                setTimeout(function () {
                    $(".ViewOrUpload").remove();
                    HistoryBrowse("Homepage");
                }, 1000);
            });
        });
    }
    
    function AsNormal(){
        $(".HistorySysOpen").click(function(e){
            e.preventDefault();
            $(".browse_panel").empty();
            $(".TrizSystem").fadeOut("slow");
            setTimeout(function(){ 
                $("#HistorySystem").fadeIn("slow");
            }, 1000);
            $(".browse_panel").empty();
            $(".history-detail").empty();
            setTimeout(function () {
                HistoryBrowse("Homepage");
            }, 1000);
        });
    }
    
});