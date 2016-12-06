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
        <div id="countdown" class="container text-center">
            <h1 id="vote_title">投票時間還剩：</h1>
            <div class="panel-body"></div>
        </div>
    </body>
</html>