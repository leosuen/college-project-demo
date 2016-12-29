<?php
session_start();
$emp = $_SESSION['user_session'];
if(!isset($emp))
{
    header("Location: welcome.php");
}
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
	<title>TRIZ</title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="./css/bootstrap.css">

	<!-- jQuery library -->
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<!-- Latest compiled JavaScript -->
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	<link rel="stylesheet" href="./css/homeIndex.css">
	<link rel="stylesheet" href="./css/loading.css">
	<link rel="stylesheet" href="./css/panelTable.css">
	<link rel="stylesheet" href="./css/quick-float.css">
	<link rel="stylesheet" href="./css/font-awesome.min.css">
	<link rel="stylesheet" href="./css/w3.css">
	<link rel="stylesheet" href="./css/radiobutton.css">
	<!--<link rel="stylesheet" href="./css/countdown.css">-->
	<script type="text/javascript" src="./js/TrizSubSystem.js"></script>
	<script type="text/javascript" src="./js/upload-example.js"></script>
	<script type="text/javascript" src="./js/pollAssistanceHandler.js"></script>
	<script type="text/javascript" src="./js/voteSystemHandler.js"></script>
	<script type="text/javascript" src="./js/dateHandler.js"></script>
	<script type="text/javascript" src="./js/systemDescription.js"></script>
	<script>
        var pos = <?php echo json_encode($emp) ?>; //IGNORE LEFT WRONG SIGN
        $(document).ready(function(){
           $("#loading-message").hide();
        });
	</script>
	
</head>
<body>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="file:///D:/wamp64/www/triz-project-demo/index.php" id="HomeIndex">應用TRIZ理論於創造力支援系統</a>
	    </div>
	    
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        
	      </ul>
	      
	      <ul class="nav navbar-nav navbar-right">
	      	
	      	<li class="dropdown">
	      		<a class="dropdown-toggle" data-toggle="dropdown" href="javascript: void(0)"><?php echo $_SESSION['user_session']; ?><span class="caret"></span></a>
	      		<ul id="personal-dropmenu" class="dropdown-menu"></ul>
			</li>
	      	<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="javascript: void(0)">選單<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li class="TrizSysOpen HistorySysOpen"><a href="javascript: void(0)">歷史方案庫子系統</a></li>
					<li class="TrizSysOpen ProjectSupportSysOpen"><a href="javascript: void(0)">提案輔助子系統</a></li>
					<li class="TrizSysOpen ProjectScoreSysOpen"><a href="javascript: void(0)">提案評量子系統</a></li>
					<li class="TrizSysOpen AboutSysOpen"><a href="javascript: void(0)">關於系統</a></li>
					<li class="TrizSysOpen ProjectTestSysOpen"><a href="./votetest.php">模擬投票頁面</a></li>
				</ul>
			</li>
	      	
	        <li><a href="./logout.php">登出</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>

	<!-- TRIZ menu -->
	<section id="triz-menu">
		<div class="row">
			<div class="col-sm-6 col-md-4">
	            <div class="thumbnail">
	              <div class="caption">
	                <h3>歷史方案庫子系統</h3>
	                <p></p>
	                <p><button class="btn btn-default btn-block TrizSysOpen HistorySysOpen">由此去</a></p>
	              </div>
	            </div>
	        </div>
	        <div class="col-sm-6 col-md-4">
	            <div class="thumbnail">
	              <div class="caption">
	                <h3>提案輔助子系統</h3>
	                <p></p>
	                <p><button class="btn btn-default btn-block TrizSysOpen ProjectSupportSysOpen">由此去</a></p>
	              </div>
	            </div>
	        </div>
	        <div class="col-sm-6 col-md-4">
	            <div class="thumbnail">
	              <div class="caption">
	                <h3>提案評量子系統</h3>
	                <p></p>
	                <p><button class="btn btn-default btn-block TrizSysOpen ProjectScoreSysOpen">由此去</a></p>
	              </div>
	            </div>
	        </div>
		</div>
	</section>
	
	<div id="loading-message" class="container text-center"><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>載入中...</div>

	<!-- TRIZ SemiSystem1 -->
	<section id="HistorySystem" class="TrizSystem">
        <div id="all_view" class="SemiSystem_1 container">
        </div>
	</section>

	<!-- TRIZ SemiSystem2 -->
	<section id="ProjectSupportSystem" class="TrizSystem">
        <div class="page-controller"></div>
	    <div id="newProjectOrNot" class="container NewOrAdjust"></div>
	    <div id="adjustMyProject" class="container NewOrAdjust"></div>
	    <div id="adjustMyProject-detail"></div>
	    <div id="needAssistOrNot" class="container AssistOrNot"></div>
		<div id="define_question" class="container AssistOrNot">
		    <form id="question-form" class="form-horizontal">
		        <legend>定義問題</legend>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="emp_name">員工姓名</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="emp_name" value="<?php echo $_SESSION['username_position']; ?>">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="emp_id">員工編號</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="emp_id" value="<?php echo $emp; ?>">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_date">日期</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="question_date">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_why">為何要做(Why)</label>
                    <div class="col-sm-10">
                        <textarea id="question_why" class="form-control require-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_who">哪個項目有問題(Who)</label>
                    <div class="col-sm-10">
                        <textarea id="question_who" class="form-control require-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_what">有什麼需要改善(What)</label>
                    <div class="col-sm-10">
                        <textarea id="question_what" class="form-control require-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_where">販售地點(Where)</label>
                    <div class="col-sm-10">
                        <textarea id="question_where" class="form-control require-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_when">何時發售(When)</label>
                    <div class="col-sm-10">
                        <textarea id="question_when" class="form-control require-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_text">備註</label>
                    <div class="col-sm-10">
                        <textarea id="question_text" class="form-control optional-area" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
	                <div class="col-sm-10 col-sm-offset-2">
	                    <button type="reset" class="btn btn-default">全部清除</button>
                        <button type="submit" class="btn btn-primary">送出</button>
	                </div>
	            </div>
		    </form>
		</div>
		<div id="question_message" class="container"></div>
	</section>
	<div id="4p-triz-creative-rules" class="container"></div>

	<!-- TRIZ SemiSystem3 -->
	<section id="ProjectScoreSystem" class="TrizSystem">
        <div class="page-controller"></div>
        <div id="countdownToVote" class="container text-center">
            <h1 id="vote_title">距離投票日還有：</h1>
            <div id="countdown-body" class="panel-body"></div>
        </div>
	    <div id="poll-list" class="poll-system container"></div>
	    <div id="poll-object-detail" class="poll-system container"></div>
	    <div id="vote-message" class='container'></div>
	</section>
	
	<!-- Double check for the vote -->
    <div class="modal fade" id="check_for_vote" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">確認視窗</h4>
                </div>
                <div class="modal-body">
                    <p>確定選擇?</p>
                    <div id="testvalue"></div>
                </div>
                <div class="modal-footer">
                    <div class="col-xs-6 col-sm-6">
                        <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">我要重選</button>
                    </div>
                    <div class="col-xs-6 col-sm-6">
                        <button id="yes_to_vote" type="button" class="btn btn-default btn-block" data-dismiss="modal">確定</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="not_selected" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">OOPS</h4>
                </div>
                <div class="modal-body">
                  <p>沒有選擇喔...</p>
                  <div id="testvalue"></div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default btn-block" data-dismiss="modal">點此以繼續...</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="vote-window" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">投票成功</h4>
                </div>
                <div class="modal-body">
                    <p>投票成功</p>
                </div>
                <div class="modal-footer">
                    <div class="col-xs-12 col-sm-12">
                        <button id="vote-done" type="button" class="btn btn-default btn-block" data-dismiss="modal">確定</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
	
	<!-- TRIZ SemiSystem4 -->
	<section id="PollSystem" class="TrizSystem">
        <div class="page-controller"></div>
	    <div class="container">
	        <form id="poll_fill" class="form-horizontal">
                <legend>基本資料</legend>
                <div class="form-group">
	                <label class="control-label col-sm-2" for="emp_name">姓名</label>
	                <div class="col-sm-10">
	                    <input type="text" class="form-control" name="emp_name" value="<?php echo $_SESSION['username_position']; ?>">
	                </div>
	            </div>
                <div class="form-group">
	                <label class="control-label col-sm-2" for="emp_id">編號</label>
	                <div class="col-sm-10">
	                    <input type="text" class="form-control" name="emp_id" value="<?php echo $emp; ?>">
	                </div>
	            </div>
                <div class="form-group">
	                <label class="control-label col-sm-2" for="date">日期</label>
	                <div class="col-sm-10">
	                    <input type="date" class="form-control" name="date" id="poll_date">
	                </div>
	            </div>
                <legend>行銷4P</legend>
	            <div id="product_message" class="form-group">
	                <label class="control-label col-sm-2" for="product">產品策略</label>
	                <div class="col-sm-10">
	                    <textarea id="product" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="price_message" class="form-group">
	                <label class="control-label col-sm-2" for="price">價格策略</label>
	                <div class="col-sm-10">
	                    <textarea id="price" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="promotion_message" class="form-group">
	                <label class="control-label col-sm-2" for="promotion">促銷策略</label>
	                <div class="col-sm-10">
	                    <textarea id="promotion" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="place_message" class="form-group">
	                <label class="control-label col-sm-2" for="place">通路策略</label>
	                <div class="col-sm-10">
	                    <textarea id="place" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <legend>詳細提案內容5W1H</legend>
	            <div id="five_why_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-why">為何做(Why)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_why" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_who_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-who">客群(Who)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_who" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_what_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-what">項目(What)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_what" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_where_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-where">販售地點(Where)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_where" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_when_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-when">販售時間(When)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_when" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="one_how_message" class="form-group">
	                <label class="control-label col-sm-2" for="one-how">如何做(How)</label>
	                <div class="col-sm-10">
	                    <textarea id="one_how" class="form-control require-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="ps_note_message" class="form-group">
	                <label class="control-label col-sm-2" for="note-text">備註</label>
	                <div class="col-sm-10">
	                    <textarea id="ps_note" class="form-control optional-area" rows="5"></textarea>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-sm-10 col-sm-offset-2">
	                    <button id="clear_poll_form" type="reset" class="btn btn-danger">取消</button>
                        <button id="send_poll" type="button" class="btn btn-default">送出</button>
	                </div>
	            </div>
	        </form>
	    </div>
	    <div id="transmission-message" class="container"></div>
	</section>

	<!-- upload area -->
	<section id="uploadSystem" class="TrizSystem">
        <div id="upload_message" class="container"></div>
        <div class="container">
           <h2>案例區</h2>
            <form class="form-horizontal">
	            <div class="form-group">
	                <label class="control-label col-sm-2" for="title">標題</label>
	                <div class="col-sm-10">
	                    <input id="upload_title" type="text" class="form-control" name="title" placeholder="標題">
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="control-label col-sm-2" for="日期">日期</label>
	                <div class="col-sm-10">
	                    <input id="upload_date" type="date" class="form-control" name="date">
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="control-label col-sm-2" for="companyname">公司名稱</label>
	                <div class="col-sm-10">
	                    <input id="upload_companyname" type="text" class="form-control" name="companyname" placeholder="EX:全聯">
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="control-label col-sm-2" for="companyname">內容</label>
	                <div class="col-sm-10">
                        <textarea id="upload_content" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <div class="col-sm-offset-2 col-sm-10">
	                    <button id="upload_clickbutton" type="submit" class="btn btn-default">送出</button>
	                </div>
	            </div>
	        </form>
        </div>
	</section>
	
	<!-- about area -->
	<section id="aboutSystem" class="TrizSystem">
        <div class="container">
            <div class="col-xs-12 col-sm-12">
                <h1 class="page-header">About this system</h1>
                Version: 1.01
                Changelog:
                1.01
                add: error message will shown by Moadl style
                1.00
                maybe all of function are correctly to work
                0.70
                add: certificate te poll function for manager
                0.60
                add: search other company's i.e. function
                change: something visual style
                0.50
                adjust: give some function in some sub-system
                0.40
                change: some unclear description change
                0.30
                debug: the panel show "undefined" when trying get data 
                0.20
                add: the highest poll view and other polls view
                adjust: button position change
            </div>
        </div>
	</section>
</body>
</html>