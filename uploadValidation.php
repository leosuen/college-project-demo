<?php
session_start();

?>


<html>
    <head>
        <title>當選提案審核</title>
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
        
        <script type="text/javascript" src="./js/pollCertificateHandler.js"></script>
        <script type="text/javascript">
            var human = '<?php echo $_SESSION['user_session']; ?>';
        </script>
    </head>
    <body>
        <div></div><!-- for nav bar -->
        <div id="msg"></div>
        <h1 id="title01" class="text-center">等待審核的提案</h1>
        <div id="wait-abs" class="container"></div>
        <div id="waitToCertificate" class="container text-center">
            
        </div>
        <div class="modal fade" id="check_for_cert" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">確認視窗</h4>
                    </div>
                    <div class="modal-body">
                        <p>確定審核?</p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-xs-6 col-sm-6">
                            <button id="yes_to_cert" type="button" class="btn btn-default btn-block" data-dismiss="modal">確定</button>
                        </div>
                        <div class="col-xs-6 col-sm-6">
                            <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">取消</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="msg_success" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Success!</h4>
                    </div>
                    <div class="modal-body">
                        <p>審核成功!!</p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-xs-12 col-sm-12">
                            <button type="button" class="btn btn-default btn-block" data-dismiss="modal">確定</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </body>
</html>