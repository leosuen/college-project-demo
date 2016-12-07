<?php
session_start();
?>


<html>
    <head>
        <title>投票頁面</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="./css/bootstrap.css">
        <link rel="stylesheet" href="./css/homeIndex.css">
        <link rel="stylesheet" href="./css/loading.css">
        <link rel="stylesheet" href="./css/panelTable.css">
        <link rel="stylesheet" href="./css/quick-float.css">
        <link rel="stylesheet" href="./css/font-awesome.min.css">
        <link rel="stylesheet" href="./css/w3.css">
        <link rel="stylesheet" href="./css/radiobutton.css">

        <!-- jQuery library -->
        <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/voteSystemHandler.js"></script>
        <script type="text/javascript" src="./votetestJS.js">
            
        </script>
    </head>
    <body>
        <div></div><!-- for nav bar -->
        <section id="triz-menu">
            <div class="container">
                <div class="col-sm-12 col-md-12">
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
        
        <section id="ProjectScoreSystem" class="TrizSystem">
            <div class="page-controller"></div>
            <div id="countdown" class="container text-center">
                <h1 id="vote_title">投票時間還剩：</h1>
                <div class="panel-body"></div>
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
    </body>
</html>