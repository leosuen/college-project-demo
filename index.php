<?php
	session_start();

	if(!isset($_SESSION['user_session']))
	{
		sleep(2);
		header("Location: welcome.php");
	}
    if($_SESSION['user_position'] == "MIS管理員"){
        header("Location: backend.php");
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
	<script type="text/javascript" src="./js/TrizSubSystem.js"></script>
	<script type="text/javascript" src="./js/upload-example.js"></script>
	<script type="text/javascript" src="./js/pollAssistanceHandler.js"></script>
	<script type="text/javascript" src="./js/voteSystemHandler.js"></script>
	<script>
        var pos = <?php echo json_encode($_SESSION['user_position']) ?>; //IGNORE LEFT WRONG SIGN
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
	      <a class="navbar-brand" href="file:///D:/wamp64/www/triz-project-demo/index.php" id="HomeIndex">TRIZ輔助用</a>
	    </div>
	    
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        
	      </ul>
	      
	      <ul class="nav navbar-nav navbar-right">
	      	
	      	<li class="dropdown">
	      		<a class="dropdown-toggle" data-toggle="dropdown" href="#"><?php echo $_SESSION['user_session']; ?><span class="caret"></span></a>
				<ul id="personal-dropmenu" class="dropdown-menu">
					<li class=""><a href="#">信件</a></li>
				</ul>
			</li>
	      	<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#">選單<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li class="TrizSysOpen HistorySysOpen"><a href="#">歷史方案庫子系統</a></li>
					<li class="TrizSysOpen ProjectSupportSysOpen"><a href="#">提案輔助子系統</a></li>
					<li class="TrizSysOpen ProjectScoreSysOpen"><a href="#">方案評量子系統</a></li>
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

	<!-- TRIZ SemiSystem1 -->
	<section id="HistorySystem" class="TrizSystem">
        <div id="manager_view" class="SemiSystem_1 container">
        </div><!-- manager has two options : upload the example or view the example -->
        <div id="employee_view" class="SemiSystem_1 container">
            <div id="emp_browse_panel" class="browse_panel container"></div>
            <div class="history-detail container"></div>
        </div><!-- employees can only view the example -->
        
        
	</section>

	<!-- TRIZ SemiSystem2 -->
	<section id="ProjectSupportSystem" class="TrizSystem">
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
                        <input type="text" class="form-control" id="emp_name" value="<?php echo $_SESSION['username_position'] ?>">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="emp_id">員工編號</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="emp_id" value="<?php echo $_SESSION['user_session'] ?>">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_date">日期</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="question_date">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_why">為何有問題(Why)</label>
                    <div class="col-sm-10">
                        <textarea id="question_why" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_who">哪個項目有問題(Who)</label>
                    <div class="col-sm-10">
                        <textarea id="question_who" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_what">什麼問題(What)</label>
                    <div class="col-sm-10">
                        <textarea id="question_what" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_where">哪裡有問題(Where)</label>
                    <div class="col-sm-10">
                        <textarea id="question_where" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_when">何時有問題(When)</label>
                    <div class="col-sm-10">
                        <textarea id="question_when" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question_text">備註</label>
                    <div class="col-sm-10">
                        <textarea id="question_text" class="form-control" rows="5"></textarea>
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
        <div id="countdownToVote" class="container"></div>
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
                        <button id="yes_to_vote" type="button" class="btn btn-default btn-block">確定</button>
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
	
	<!-- TRIZ SemiSystem4 -->
	<section id="PollSystem" class="TrizSystem">
        <div id="countdownToVote" class="container"></div>
	    <div class="container">
	        <form id="poll_fill" class="form-horizontal">
                <legend>基本資料</legend>
                <div class="form-group">
	                <label class="control-label col-sm-2" for="emp_name">姓名</label>
	                <div class="col-sm-10">
	                    <input type="text" class="form-control" name="emp_name" value="<?php echo $_SESSION['username_position'] ?>">
	                </div>
	            </div>
                <div class="form-group">
	                <label class="control-label col-sm-2" for="emp_id">編號</label>
	                <div class="col-sm-10">
	                    <input type="text" class="form-control" name="emp_id" value="<?php echo $_SESSION['user_session'] ?>">
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
	                    <textarea id="product" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="price_message" class="form-group">
	                <label class="control-label col-sm-2" for="price">價格策略</label>
	                <div class="col-sm-10">
	                    <textarea id="price" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="promotion_message" class="form-group">
	                <label class="control-label col-sm-2" for="promotion">促銷策略</label>
	                <div class="col-sm-10">
	                    <textarea id="promotion" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="place_message" class="form-group">
	                <label class="control-label col-sm-2" for="place">通路策略</label>
	                <div class="col-sm-10">
	                    <textarea id="place" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <legend>詳細提案內容5W1H</legend>
	            <div id="five_why_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-why">為何做(Why)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_why" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_who_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-who">對誰(Who)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_who" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_what_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-what">做什麼(What)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_what" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_where_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-where">在哪裡(Where)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_where" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="five_when_message" class="form-group">
	                <label class="control-label col-sm-2" for="five-when">何時做(When)</label>
	                <div class="col-sm-10">
	                    <textarea id="five_when" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="one_how_message" class="form-group">
	                <label class="control-label col-sm-2" for="one-how">如何做(How)</label>
	                <div class="col-sm-10">
	                    <textarea id="one_how" class="form-control" rows="5"></textarea>
	                </div>
	            </div>
	            <div id="ps_note_message" class="form-group">
	                <label class="control-label col-sm-2" for="note-text">備註</label>
	                <div class="col-sm-10">
	                    <textarea id="ps_note" class="form-control" rows="5"></textarea>
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
           <h2>上傳案例區</h2>
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
	                    <input id="upload_content" type="text" class="form-control" name="companyname">
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="control-label col-sm-2" for="url">連結</label>
	                <div class="col-sm-10">
	                    <input id="upload_url" type="text" class="form-control" name="url" placeholder="EX:www.google.com.tw">
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
                Version: Beta 0.10
            </div>
        </div>
	</section>
</body>
</html>