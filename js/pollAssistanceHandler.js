$(document).ready(function () {
    //Global variables
    getCurrentDate();
    $(".note-area").removeProp("required");
    
    var currentDate = null;
    console.log(currentDate);
    $("#define_question").hide();
    
    function getCurrentDate(){
        $.ajax({
            url: "./datephp/getDate.php",
            type: 'GET',
            datatype: 'json'
        })
        .done(function(data){
            currentDate = data.now;
        })
        .fail(function(error){
            console.log(error);
        })
        .always(function(){
            $("#question_date").val(currentDate);
            console.log('AJAX done.');
        });
    }
    
    //prepare to do
    $(".ProjectSupportSysOpen").click(function(e){
        e.preventDefault();
        $(".TrizSystem").fadeOut("slow");
        setTimeout(function(){
            ProjectSupportSysOpen();
            $("#ProjectSupportSystem").fadeIn("slow");
        }, 1000);
    });
    
    //create support system function area
    function ProjectSupportSysOpen(){
        $("#newProjectOrNot").empty();
        $("#newProjectOrNot").append('<div class="col-xs-12 col-sm-12">是要創建新提案嗎？</div>');
        $("#newProjectOrNot").append('<div id="newProject" class="col-sm-6 col-xs-12 round-border-style">是</div>');
        $("#newProjectOrNot").append('<div id="gotoAdjust" class="col-sm-6 col-xs-12 round-border-style">不，請帶我去修改提案區</div>');
        $("#newProjectOrNot").fadeIn("slow");
        
    }
    
    //step 1 : new project or not
    $(document).on("click","#newProject",function(){
        $("#needAssistOrNot").empty();
        $("#needAssistOrNot").fadeIn("slow");
        $("#needAssistOrNot").append("<div class='col-sm-12 col-xs-12'>需要使用TRIZ方法來協助嗎？</div>");
        $("#needAssistOrNot").append("<div id='assistant' class='col-sm-6 col-xs-12 round-border-style'>是</div>");
        $("#needAssistOrNot").append("<div id='NOassistant' class='col-sm-6 col-xs-12 round-border-style'>不需要，請帶我去建立提案</div>");
        setTimeout(function() {
            $("#newProjectOrNot").hide();
        }, 1000);
        $("#newProjectOrNot").fadeOut("slow");
    });
    $(document).on("click","#gotoAdjust",function(){
        adjustList();
        $(this).parent().fadeOut("slow");
    });
    
    //step 1-1 : For the person who dont need to new
    
    $(document).on("click","#BacktoAdjustList",function(){
        $("#adjustMyProject-detail").fadeOut("slow");
        $("#adjustMyProject").fadeIn("slow");
    });
    
    $(document).on("click","#updateMyPoll",function(){
        var update_product = $("#update_product").val();
        var update_price = $("#update_price").val();
        var update_promotion = $("#update_promotion").val();
        var update_place = $("#update_place").val();
        var update_five_why = $("#update_five_why").val();
        var update_five_who = $("#update_five_who").val();
        var update_five_what = $("#update_five_what").val();
        var update_five_where = $("#update_five_where").val();
        var update_five_when = $("#update_five_when").val();
        var update_one_how = $("#update_one_how").val();
        var update_ps_note = $("#update_ps_note").val();
    });
    
    function adjustList(){
        $("#adjustMyProject").empty();
        $.ajax({
            url: './questionphp/getAdjust.php',
            type: 'GET',
            datatype: 'json',
            beforeSend:function () {
                $("#adjustMyProject").append("<button id='RefreshTheAdjustList' type='button' class='btn btn-default btn-block'>重新整理</button>");
            }
        })
        .done(function(data){
            adjustData = data;
            var i = null;
            var adjustcount = adjustData.length;
            if(adjustcount != null){
                for(i=0;i<adjustcount;i++){
                    $("#adjustMyProject").append("<div id='adjust"+adjustData[i].ID+"' class='col-xs-12 col-sm-12 round-border-style adjustpoll' value='"+i+"'>第"+adjustData[i].ID+"個提案</div>");
                }
            }
        })
        .fail(function(){
            console.log('error');
        })
        .always(function(){
            $(document).on("click",".adjustpoll",function(){
                var temp = this.id;
                $("#adjustMyProject").fadeOut("slow");
                formList(temp);
            });
            console.log('AJAX done.');
        });
    }
    
    function formList(varstring){
        $("#adjustMyProject-detail").empty();
        var id = varstring;
        var formValue = $("#"+id).attr('value');
        $("#adjustMyProject-detail").append("<div class='container'>");
            $("#adjustMyProject-detail .container").append("<button id='BacktoAdjustList' type='button' class='btn btn-default btn-block'><i class='fa fa-refresh' aria-hidden='true'></i>回上一頁</button>");
            $("#adjustMyProject-detail .container").append("<form id='adjust-form' class='form-horizontal'>");
                $("#adjust-form").append("<legend>行銷4P</legend>");
                $("#adjust-form").append("<div id='product_form' class='form-group'>");
                    $("#adjust-form #product_form").append("<label class='control-label col-sm-2' for='product'>產品策略</label>");
                    $("#adjust-form #product_form").append("<div class='col-sm-10'><textarea id='update_product' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_product+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='price_form' class='form-group'>");
                    $("#adjust-form #price_form").append("<label class='control-label col-sm-2' for='price'>價格策略</label>");
                    $("#adjust-form #price_form").append("<div class='col-sm-10'><textarea id='update_price' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_price+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='promotion_form' class='form-group'>");
                    $("#adjust-form #promotion_form").append("<label class='control-label col-sm-2' for='promotion'>促銷策略</label>");
                    $("#adjust-form #promotion_form").append("<div class='col-sm-10'><textarea id='update_promotion' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_promotion+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='place_form' class='form-group'>");
                    $("#adjust-form #place_form").append("<label class='control-label col-sm-2' for='place'>通路策略</label>");
                    $("#adjust-form #place_form").append("<div class='col-sm-10'><textarea id='update_place' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_place+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<legend>詳細提案內容5W1H</legend>");
                $("#adjust-form").append("<div id='five_why_form' class='form-group'>");
                    $("#adjust-form #five_why_form").append("<label class='control-label col-sm-2' for='five-why'>為何做(Why)</label>");
                    $("#adjust-form #five_why_form").append("<div class='col-sm-10'><textarea id='update_five_why' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_why+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='five_who_form' class='form-group'>");
                    $("#adjust-form #five_who_form").append("<label class='control-label col-sm-2' for='five-who'>對誰(Who)</label>");
                    $("#adjust-form #five_who_form").append("<div class='col-sm-10'><textarea id='update_five_who' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_who+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='five_what_form' class='form-group'>");
                    $("#adjust-form #five_what_form").append("<label class='control-label col-sm-2' for='five-what'>做什麼(What)</label>");
                    $("#adjust-form #five_what_form").append("<div class='col-sm-10'><textarea id='update_five_what' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_what+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='five_where_form' class='form-group'>");
                    $("#adjust-form #five_where_form").append("<label class='control-label col-sm-2' for='five-where'>在哪裡(Where)</label>");
                    $("#adjust-form #five_where_form").append("<div class='col-sm-10'><textarea id='update_five_where' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_where+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='five_when_form' class='form-group'>");
                    $("#adjust-form #five_when_form").append("<label class='control-label col-sm-2' for='five-when'>何時做(When)</label>");
                    $("#adjust-form #five_when_form").append("<div class='col-sm-10'><textarea id='update_five_when' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_when+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='one_how_form' class='form-group'>");
                    $("#adjust-form #one_how_form").append("<label class='control-label col-sm-2' for='one-how'>如何做(How)</label>");
                    $("#adjust-form #one_how_form").append("<div class='col-sm-10'><textarea id='update_one_how' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_how+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='ps_note_form' class='form-group'>");
                    $("#adjust-form #ps_note_form").append("<label class='control-label col-sm-2' for='note-text'>備註</label>");
                    $("#adjust-form #ps_note_form").append("<div class='col-sm-10'><textarea id='update_ps_note' class='form-control' rows=5 value=''>"+adjustData[formValue].poll_note+"</textarea></div>");
                $("#adjust-form").append("</div>");
                $("#adjust-form").append("<div id='btncol' class='form-group'>");
                    $("#adjust-form #btncol").append("<button id='updateMyPoll' type='button' class='btn btn-default btn-block'>更新</button>");
                $("#adjust-form").append("</div>");
            $("#adjustMyProject-detail .container").append("</form>");
        $("#adjustMyProject-detail").append("</div>");
        $("#adjustMyProject-detail").fadeIn("slow");
    }
    
    //step 2 : need assist or not
    $(document).on("click","#assistant",function(){
        $("#define_question").fadeIn("slow");
        setTimeout(function() {
            $("#needAssistOrNot").empty();
        }, 1000);
        $("#needAssistOrNot").fadeOut("slow");
    });
    $(document).on("click","#NOassistant",function(){
        redirectToPollForm();
        $(this).parent().fadeOut("slow");
    });
    
    //step 2-1 : For the person who dont need assistance
    function redirectToPollForm(){
        $("#poll_date").val(currentDate);
        $("#PollSystem").fadeIn("slow");
    }
    
    //step 3 : SOP for the person who needs assistance
    $("#question_date").val(currentDate);

    $("#question-form").submit(function(event){
        event.preventDefault();
        QuestionSendingScreen();
        QuesstionSendProcedure();
    });

    function QuestionSendingScreen(){

    }

    function QuesstionSendProcedure(){
        var name = $("#emp_name").val();
        var id = $("#emp_id").val();
        var question_date = $("#question_date").val();
        var question_why = $("#question_why").val();
        var question_who = $("#question_who").val();
        var question_what = $("#question_what").val();
        var question_where = $("#question_where").val();
        var question_when = $("#question_when").val();
        var question_text = $("#question_text").val();
        var jsoncontainer = {
            "name": name,
            "id": id,
            "question_date": question_date,
            "question_why": question_why,
            "question_who": question_who,
            "question_what": question_what,
            "question_where": question_where,
            "question_when": question_when,
            "question_text": question_text
        }
        $.ajax({
            url: './questionphp/sendingHandler.php',
            type: 'POST',
            data: {sendData:jsoncontainer},
            datatype: 'json',
            beforeSend:function () {
                $("#question_message").append("<div class='info'>資料傳送中...</div>");
            }

        })
        //.done will run after AJAX request
        .done(function(data) {
            if(data == "complete"){
                $("#define_question").fadeOut("slow");
                $("#question_message").append("<div class='success'>資料傳送完成</div>");
                setTimeout(function() {
                    $("#question_message").fadeOut("slow");
                    $("#question_message").empty();
                }, 1000);
                AppendTrizList();
                $("#4p-triz-creative-rules").fadeIn("slow");
            }
            else if(data == "data is not completely filled"){
                $("#question_message").append("<div class='danger'>資料傳送過程有問題</div>");
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }
    
    function AppendTrizList(){
        $("#4p-triz-creative-rules").append("<div class='panel-group' id='accordion'>");
            $("#accordion").append("<div id='4p-product' class='panel panel-default'>");
                $("#4p-product").append("<div class='panel-heading text-center' data-toggle='collapse' data-parent='#accordion' href='#4p-product-body'>可運用於產品創新行銷的TRIZ方法");
                $("#4p-product").append("</div>");
                $("#4p-product").append("<div id='4p-product-body' class='panel-collapse collapse'>");
                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product1' class='btn btn-default btn-block'>1.分割(Segmentation)</button>");
                    $("#4p-product-body").append("<div id='product1' class='panel-collapse collapse'>");
                        $("#4p-product-body #product1").append("<ul class='list-group'>");
                            $("#4p-product-body #product1 .list-group").append("<li>1.將產品分割成好幾個部分。<br>例如：相機可以分割成鏡頭、閃光燈、相機本體等等，可以分開販售。</li>");
                            $("#4p-product-body #product1 .list-group").append("<li>2.將產品分割成幾個可以組合的形式。<br>例如： 麥當勞將原本固定的套餐組合(薯條、可樂)，分割成薯條可以搭配玉米濃湯或是沙拉搭配可樂等形式。</li>");
                            $("#4p-product-body #product1 .list-group").append("<li>3.增加產品的分割程度。<br>例如：從相機分割出來的鏡頭，又可以依據功能分割成不同的鏡頭，有魚眼鏡頭、超廣角鏡頭等。</li>");
                        $("#4p-product-body #product1").append("</ul>");
                    $("#4p-product-body").append("</div>");
        
                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product2' class='btn btn-default btn-block'>2.多重功能(Universality)</button>");
                    $("#4p-product-body").append("<div id='product2' class='panel-collapse collapse'>");
                        $("#4p-product-body #product2").append("<ul class='list-group'>");
                            $("#4p-product-body #product2 .list-group").append("<li>1.使產品有多重功能，以減少對其他產品的需求。<br>例如一：ibon提供多重服務，包括訂購票券、繳費、列印等服務。<br>例如二：Apple Watch將手錶結合通話、上網、運動手環等多重功能。</li>");
                        $("#4p-product-body #product2").append("</ul>");
                    $("#4p-product-body .list-group").append("</div>");
        
                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product3' class='btn btn-default btn-block'>4.反向操作(The Other Way Round)</button>");
                    $("#4p-product-body").append("<div id='product3' class='panel-collapse collapse'>");
                        $("#4p-product-body #product3").append("<ul class='list-group'>");
                            $("#4p-product-body #product3 .list-group").append("<li>1.用相反的作用將產品反轉。<br>例如：穆罕默德‧尤努斯創辦鄉村銀行，顛覆傳統銀行的運作模式，他獨創小額信貸給窮人，少了傳統銀行貸款的限制，只要求借款人努力工作還款，創造驚人的高還款率，在創立不到三年就獲利1500萬美元。</li>");
                        $("#4p-product-body #product3").append("</ul>")
                    $("#4p-product-body").append("</div>");

                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product4' class='btn btn-default btn-block'>7.回饋(Feedback)</button>");
                    $("#4p-product-body").append("<div id='product4' class='panel-collapse collapse'>");
                        $("#4p-product-body #product4").append("<ul class='list-group'>");
                            $("#4p-product-body #product4 .list-group").append("<li>1.採取回饋制度。<br>例如：建立回饋制度是產品策略的一環，客戶投訴和建議制度可以用來改善產品策略。<br>2.若回饋制度已經存在，則改變回饋的大小和方向。<br>例如：從接收客戶回饋改變成回饋給社會，TOMS每賣出一雙鞋，將會提供一雙全新免費的鞋子給需要的孩童(One for One)的方式回饋社會，同時也達到促銷的作用，建立良好的企業形象。</li>");
                    $("#4p-product-body").append("</div>");
                    
                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product5' class='btn btn-default btn-block'>8.改變顏色(Color Change)</button>");
                    $("#4p-product-body").append("<div id='product5' class='panel-collapse collapse'>");
                        $("#4p-product-body #product5").append("<ul class='list-group'>");
                            $("#4p-product-body #product5 .list-group").append("<li>1.改變產品或周遭的顏色。<br>例如：iPhone5推出玫瑰金色，造成全球轟動。<br>2.改變產品資訊之透明度。<br>例如：透過產銷履歷可以直接了解產品原料來源，讓客戶更清楚產品的資訊。</li>");
                        $("#4p-product-body #product5").append("</ul>");
                    $("#4p-product-body ").append("</div>");
        
                    $("#4p-product-body").append("<button data-toggle='collapse' href='#product6' class='btn btn-default btn-block'>9.複合材料(Composite Materials)</button>");
                    $("#4p-product-body").append("<div id='product6' class='panel-collapse collapse'>");
                        $("#4p-product-body #product6").append("<ul class='list-group'>");
                            $("#4p-product-body #product6 .list-group").append("<li>複合式的產品取代單一產品。<br>例如一：7-11的優惠組合餐，將飲料和鮮食搭配販售，成功使兩者產品銷量成長。<br>例如二：荷蘭創意工作室OOOMS結合木頭與USB，做出既時尚又環保的3C用品。</li>");
                        $("#4p-product-body #product6").append("</ul>");
                    $("#4p-product-body").append("</div>");
                $("#4p-product").append("</div>");
            $("#accordion").append("</div>");
        
            $("#accordion").append("<div id='4p-price' class='panel panel-default'>");
                $("#4p-price").append("<div class='panel-heading text-center' data-toggle='collapse' data-parent='#accordion' href='#4p-price-body'>可運用於價格創新行銷的TRIZ方法");
                $("#4p-price").append("</div>");
                $("#4p-price").append("<div id='4p-price-body' class='panel-collapse collapse'>");
                    $("#4p-price-body").append("<button data-toggle='collapse' href='#price1' class='btn btn-default btn-block'>3.預先行動(Prior Action)</button>");
                    $("#4p-price-body").append("<div id='price1' class='panel-collapse collapse'>");
                        $("#4p-price-body #price1").append("<ul class='list-group'>");
                            $("#4p-price-body #price1 .list-group").append("<li>1.預先導入有用的作用到價格中。<br>例如：產品推出前事先調查同類產品的平均市售價格，以制訂出最適合的產品價格。</li>");
                        $("#4p-price-body #price1").append("</ul>");
                    $("#4p-price-body").append("</div>");
        
                    $("#4p-price-body").append("<button data-toggle='collapse' href='#price2' class='btn btn-default btn-block'>5.動態化(Dynamics)</button>");
                    $("#4p-price-body").append("<div id='price2' class='panel-collapse collapse'>");
                        $("#4p-price-body #price2").append("<ul class='list-group'>");
                            $("#4p-price-body #price2 .list-group").append("<li>1.在不同條件下，價格能改變至最佳的狀態。<br>例如：產品的價格會因為環境因素(原物料上漲)而改變。</li>");
                        $("#4p-price-body #price2").append("</ul>");
                    $("#4p-price-body").append("</div>");
        
                    $("#4p-price-body").append("<button data-toggle='collapse' href='#price3' class='btn btn-default btn-block'>6.週期性(Periodic Action)</button>");
                    $("#4p-price-body").append("<div id='price3' class='panel-collapse collapse'>");
                        $("#4p-price-body #price3").append("<ul class='list-group'>");
                            $("#4p-price-body #price3 .list-group").append("<li>1.以週期性價格取代連續性價格。<br>例如一：舉辦週年慶時，產品的價格比平常的價格優惠。<br>例如二：產品的價格會隨著產品生命週期變動，而不是連續一致不變的價格。</li>");
                            $("#4p-price-body #price3 .list-group").append("<li>2.若已是週期性價格，增加週期性的頻率。<br>例如：增加優惠促銷活動的次數。</li>");
                        $("#4p-price-body #price3").append("</ul>");
                    $("#4p-price-body").append("</div>");
        
                    $("#4p-price-body").append("<button data-toggle='collapse' href='#price4' class='btn btn-default btn-block'>8.改變顏色(Color Change)</button>");
                    $("#4p-price-body").append("<div id='price4' class='panel-collapse collapse'>");
                        $("#4p-price-body #price4").append("<ul class='list-group'>");
                            $("#4p-price-body #price4 .list-group").append("<li>1.改變價格之透明度。<br>例如：產品價格標示清楚，讓客戶選購時可以直接知道價格。</li>");
                        $("#4p-price-body #price4").append("</ul>");
                    $("#4p-price-body").append("</div>");
                $("#4p-price").append("</div>");
            $("#accordion").append("</div>");
        
            $("#accordion").append("<div id='4p-propmotion' class='panel panel-default'>");
                $("#4p-propmotion").append("<div class='panel-heading text-center' data-toggle='collapse' data-parent='#accordion' href='#4p-promotion-body'>可運用於促銷創新行銷的TRIZ方法");
                $("#4p-propmotion").append("</div>");
        
                $("#4p-propmotion").append("<div id='4p-promotion-body' class='panel-collapse collapse'>");
                    $("#4p-promotion-body").append("<button data-toggle='collapse' href='#promotion1' class='btn btn-default btn-block'>1.分割(Segmentation)</button>");
                    $("#4p-promotion-body").append("<div id='promotion1' class='panel-collapse collapse'>");
                        $("#4p-promotion-body #promotion1").append("<ul class='list-group'>");
                            $("#4p-promotion-body #promotion1 .list-group").append("<li>1.將促銷分割成好幾個部分。<br>例如：Facebook以前在不同用戶的網頁上都發送相同的廣告，後來會將相同的廣告分割成根據不同用戶平常瀏覽網頁喜好的廣告。</li>");
                            $("#4p-promotion-body #promotion1 .list-group").append("<li>2.增加促銷的分割程度。<br>例如：從Facebook根據不同用戶發送的廣告中，再分割為不同時段或季節發送不同的廣告。</li>");
                        $("#4p-promotion-body #promotion1").append("</ul>");
                    $("#4p-promotion-body").append("</div>");
        
                    $("#4p-promotion-body").append("<button data-toggle='collapse' href='#promotion2' class='btn btn-default btn-block'>2.多重功能(Universality)</button>");
                    $("#4p-promotion-body").append("<div id='promotion2' class='panel-collapse collapse'>");
                        $("#4p-promotion-body #promotion2").append("<ul class='list-group'>");
                            $("#4p-promotion-body #promotion2 .list-group").append("<li>1.使促銷有多重功能，以減少對其他促銷的需求。<br>例如：TOMS每賣出一雙鞋，將會提供一雙全新免費的鞋子給需要的孩童(One for One)的促銷策略有多重功能，除了提升銷售業績之外，也提升了企業形象。</li>");
                        $("#4p-promotion-body #promotion2").append("</ul>");
                    $("#4p-promotion-body").append("</div>");
        
                    $("#4p-promotion-body").append("<button data-toggle='collapse' href='#promotion3' class='btn btn-default btn-block'>3.預先行動(Prior Action)</button>");
                    $("#4p-promotion-body").append("<div id='promotion3' class='panel-collapse collapse'>");
                        $("#4p-promotion-body #promotion3").append("<ul class='list-group'>");
                            $("#4p-promotion-body #promotion3 .list-group").append("<li>1.預先導入有用的作用到促銷中。<br>例如：產品上市前先開放預購名額，作為產品上市後促銷的依據。告訴顧客已賣出多少產品，達到廣告的效果。</li>");
                            $("#4p-promotion-body #promotion3 .list-group").append("<li>2.預先導入有用的作用到通路中。<br>例如：事先與通路商簽約，保障銷售時的通路。</li>");
                        $("#4p-promotion-body #promotion3").append("</ul>");
                    $("#4p-promotion-body").append("</div>");
        
                    $("#4p-promotion-body").append("<button data-toggle='collapse' href='#promotion4' class='btn btn-default btn-block'>7.回饋(Feedback)</button>");
                    $("#4p-promotion-body").append("<div id='promotion4' class='panel-collapse collapse'>");
                        $("#4p-promotion-body #promotion4").append("<ul class='list-group'>");
                            $("#4p-promotion-body #promotion4 .list-group").append("<li>1.採取回饋制度。<br>例如：建立回饋制度是產品策略的一環，客戶投訴和建議制度可以用來改善促銷策略。</li>");
                        $("#4p-promotion-body #promotion4").append("</ul>");
                    $("#4p-promotion-body").append("</div>");
                $("#4p-propmotion").append("</div>");
            $("#accordion").append("</div>");
        
            $("#accordion").append("<div id='4p-place' class='panel panel-default'>");
                $("#4p-place").append("<div class='panel-heading text-center' data-toggle='collapse' data-parent='#accordion' href='#4p-place-body'>可運用於通路創新行銷的TRIZ方法");
                $("#4p-place").append("</div>");
                $("#4p-place").append("<div id='4p-place-body' class='panel-collapse collapse'>");
                    $("#4p-place-body").append("<button data-toggle='collapse' href='#place1' class='btn btn-default btn-block'>3.預先行動(Prior Action)</button>");
                    $("#4p-place-body").append("<div id='place1' class='panel-collapse collapse'>");
                        $("#4p-place-body #place1").append("<ul class='list-group'>");
                            $("#4p-place-body #place1 .list-group").append("<li>1.將通路調整成最適合發揮作用的狀態。<br>例如：通路策略包括存貨，依據銷售週期，預先安排存貨。</li>");
                        $("#4p-place-body #place1").append("</ul>");
                    $("#4p-place-body").append("</div>");
        
                   $("#4p-place-body").append("<button data-toggle='collapse' href='#place2' class='btn btn-default btn-block'>5.動態化(Dynamics)</button>");
                    $("#4p-place-body").append("<div id='place2' class='panel-collapse collapse'>");
                        $("#4p-place-body #place2").append("<ul class='list-group'>");
                            $("#4p-place-body #place2 .list-group").append("<li>1.將固定的通路設計成可動或可被更換的形式。<br>例如：網路購物，宅配到府。</li>");
                        $("#4p-place-body #place2").append("</ul>");
                    $("#4p-place-body").append("</div>");
                $("#4p-place").append("</div>");
            $("#accordion").append("</div>");
        $("#4p-triz-creative-rules").append("</div>");
        $("#4p-triz-creative-rules").append("<div id='jumpToPollList' class='col-xs-12 col-sm-12 round-border-style'>若想到創意，可按此處轉至提案單填寫處</div>");
    }
    //step 4 : Fill the poll form
    $(document).on("click","#jumpToPollList",function(){
        $("#4p-triz-creative-rules").fadeOut("slow");
        setTimeout(function(){
            $("#4p-triz-creative-rules").empty();
            $("#poll_date").val(currentDate);
            $("#PollSystem").fadeIn("slow");
        },1000);
    });
    //step 5 : Sending te data to server
    var sendPollJSON = {};
    var OKtoSend = null;
    $(document).on("click","#send_poll",function(e){
        e.preventDefault();
        var emp_name,emp_id,date,product,price,promotion,place,five_why,five_who,five_what,five_where,five_when,one_how,ps_note;
        
        emp_name = $("#emp_name").val();
        emp_id = $("#emp_id").val();
        date = $("#poll_date").val();
        product = $("#product").val();
        price = $("#price").val();
        promotion = $("#promotion").val();
        place = $("#place").val();
        five_why = $("#five_why").val();
        five_who = $("#five_who").val();
        five_what = $("#five_what").val();
        five_where = $("#five_where").val();
        five_when = $("#five_when").val();
        one_how = $("#one_how").val();
        ps_note = $("#ps_note").val();
        checkTheFieldsBeforeSend(product,price,promotion,place,five_why,five_who,five_what,five_where,five_when,one_how,ps_note);
        sendPollJSON = {
            "emp_name": emp_name,
            "emp_id": emp_id,
            "date": date,
            "product": product,
            "price": price,
            "promotion": promotion,
            "place": place,
            "five_why": five_why,
            "five_who": five_who,
            "five_what": five_what,
            "five_where": five_where,
            "five_when": five_when,
            "one_how": one_how,
            "ps_note": ps_note
        };
        console.log(OKtoSend);
        doTheSendProcedure(OKtoSend);
    });
    
    function checkTheFieldsBeforeSend(product,price,promotion,place,five_why,five_who,five_what,five_where,five_when,one_how,ps_note){
        if(product == "" || price == "" || promotion == "" || place == "" || five_why == "" || five_who == "" || five_what == "" || five_where == "" || five_when == "" || one_how == ""){
            OKtoSend = "NO";
            if(product == ""){
                $("#product_message").addClass("alert-danger");
                console.log('error1');
            }
            if(price == ""){
                $("#price_message").addClass("alert-danger");
                console.log('error2');
            }
            if(promotion == ""){
                $("#promotion_message").addClass("alert-danger");
                console.log('error3');
            }
            if(place == ""){
                $("#place_message").addClass("alert-danger");
                console.log('error4');
            }
            if(five_why == ""){
                $("#five_why_message").addClass("alert-danger");
                console.log('error5');
            }   
            if(five_who == ""){
                $("#five_who_message").addClass("alert-danger");
                console.log('error6');
            }
            if(five_what == ""){
                $("#five_what_message").addClass("alert-danger");
            }
            if(five_where == ""){
                $("#five_where_message").addClass("alert-danger");
            }
            if(five_when == ""){
                $("#five_when_message").addClass("alert-danger");
            }
            if(one_how == ""){
                $("#one_how_message").addClass("alert-danger");
            }
            if(ps_note == ""){
                $("#ps_note_message").addClass("alert-danger");
            }
        }
        else{
            OKtoSend = "OK";
        }
    }
    
    function doTheSendProcedure(OKtoSend){
        if(OKtoSend == "OK"){
            $.ajax({
            url: './pollphp/postPoll.php',
            type: 'POST',
            data: {pollData:sendPollJSON},
            datatype: 'json',
            beforeSend:function () {
                $("#transmission-message").append("<div class='info'>資料傳送中...</div>");
            }

        })
        //.done will run after AJAX request
        .done(function(data) {
            if(data == "complete"){
                $("#poll_fill").fadeOut("slow");
                $("#transmission-message").append("<div class='success'>資料傳送完成</div>");
                setTimeout(function() {
                    $("#transmission-message").fadeOut("slow");
                }, 1000);
                setTimeout(function() {
                    $("#transmission-message").empty();
                }, 1000);
                $(".TrizSystem").fadeOut("slow");
                $("#triz-menu").fadeIn("slow");
            }
            else if(data == "data is not completely filled"){
                $("#transmission-message").append("<div class='danger'>資料傳送過程有問題</div>");
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        }else{
            $("#transmission-message").append("<div class='alert-danger'>OOPS... Someting Went Wrong</div>")
            console.log("nothing to do...");
            setTimeout(function() {
                $("#transmission-message").empty();
            }, 1500);
        }
    }
});