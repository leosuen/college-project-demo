$(document).ready(function(){
    var deadline_date = null;
    $(document).one("click",".ProjectScoreSysOpen",function(){
        $("#countdownToVote").empty();
        getDatefromphp();
        executeBetweenNowAndEnddate();
        displayOnThePage();
    });
    
    function getDatefromphp(){
        $.ajax({
            url: './datephp/getDate.php',
            type: 'GET',
            datatype: 'json'
        })
        
        .done(function(data) {
            deadline_date = data;
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }
    
    function executeBetweenNowAndEnddate(){
        
    }
    
    function displayOnThePage(){
        
    }
})