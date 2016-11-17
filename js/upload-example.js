$(document).ready(function () {
    $(document).on("click","#upload-function",function(){
        $(".TrizSystem").fadeOut("slow");
        $(".thumbnail").fadeOut("slow");
        setTimeout(function(){ $("#uploadSystem").fadeIn("slow"); }, 1000);
    });
    
    $(document).one("click","#upload_clickbutton",function(e){
        e.preventDefault();
        sendToServer();
    });
    
    function sendToServer(){
        var title = $("#upload_title").val();
        var date = $("#upload_date").val();
        var companyname = $("#upload_companyname").val();
        var content = $("#upload_content").val();
        var url = $("#upload_url").val();
        if(title == "" || date == "" || companyname == "" || content == ""){
            $("#upload_message").append("<div class='alert-danger'>有缺填，請補上</div>")
            setTimeout(function(){
                $("#upload_message").remove();
            },1000);
        }
        else{
            var uploadjson = {
                "title": title,
                "date": date,
                "companyname": companyname,
                "content": content,
                "url": url
            }
            $.ajax({
                url: '../uploadphp/uploadHandler.php',
                type: 'POST',
                data: {uploadjson:uploadjson},
                datatype: 'json',
            })
            .done(function(data){
                if(data == "uploadcomplete"){
                    $("#upload_message").append("案例上傳成功");
                    setTimeout(function(){
                        $("#upload_message").remove();
                        uploadjson = null;
                        $('#upload_title').attr('value') = null;
                        $('#upload_date').attr('value') = null;
                        $('#upload_companyname').attr('value') = null;
                        $('#upload_content').attr('value') = null;
                        $('#upload_url').attr('value') = null;
                    },1000);
                }
            })
            .fail(function(){
                
            })
            .always(function(){
                console.log('AJAX done.');
            });
        }
    }
})