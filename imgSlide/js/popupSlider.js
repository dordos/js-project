

$( document ).ready(function() {
    /* 슬라이드 */    
    var aniTime=300;
    var currentIndex=0;
    var $newIndex = 0;
   
    var $bannerSlide = $(".slider_in");
    var SliderWidth = "605";
    var bannerLength = $bannerSlide.children("div").length;
    
    $bannerSlide.css("width", SliderWidth*bannerLength + "px");
    $bannerSlide.children("div").css("width", SliderWidth + "px");

    
    showSlide($newIndex);

    if( bannerLength == "1" ){
        $(".page_wrap > span").addClass("out");
    }

    $(".next").on("click",function(){
        nextBanner();
    });

    $(".prev").on("click",function(){
        prevBanner();
    });

    function nextBanner(){
        $newIndex=currentIndex+1;
        if($newIndex>=bannerLength){
            $newIndex=0;			
        }
        showSlide($newIndex);
    }
    
    function prevBanner(){
        $newIndex=currentIndex-1;
        if($newIndex<0){
            $newIndex=bannerLength-1;
        }
        showSlide($newIndex);
    }

    function showSlide($newIndex){
        if($newIndex!=currentIndex){
            console.log(SliderWidth)
            console.log($newIndex)
            var newPosition=-SliderWidth*$newIndex;
            $bannerSlide.stop();
            $bannerSlide.animate({left:newPosition}, aniTime);
            showDot($newIndex);
            currentIndex=$newIndex;
        }
    }
    
    function goSlide($newIndex){
      
           var newPosition=-SliderWidth*$newIndex;
            $bannerSlide.stop();
            $bannerSlide.css({left:newPosition});
            showDot($newIndex);
            currentIndex=$newIndex;
       
    }

    function showDot($newIndex){
       
        if( $newIndex == bannerLength-1){
            $(".next").addClass("out");
            $(".prev").removeClass("out");
        } else if( $newIndex == "0" ) {
            $(".prev").addClass("out");
            $(".next").removeClass("out");
        } else {
            $(".prev,.next").removeClass("out");            
        }
    }
    /* 슬라이드 끝 */

    /* 하단 텝 끝 */
    $(".simg_btn").on(clickEvent,function(){
        var $this = $(this).attr("data-idx")-1;
     
        $("[id^='checke_']").removeClass("cur");
        $(".titlePopup").addClass("dim").show();
        $(".slider").addClass("on");
        goSlide($this);
       
      
    });

    $(".popupc_btn").on(clickEvent,function(){
        showSlide(0); //슬라이드 초기화.
        $('.titlePopup').hide()
    });


})