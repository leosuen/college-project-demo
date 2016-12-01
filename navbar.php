<?php
session_start();
?>
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
            <a href="./index.php">回首頁</a>
        </li>

        <li><a href="./logout.php">登出</a></li>
      </ul>
    </div>
  </div>
</nav>