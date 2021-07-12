$( document ).ready(function() {
    /* 슬라이드 */    
    var currentIndex=0;
    var $newIndex = 0;
    var $bannerDot = $(".subPop .tabTitle").find("li");

    $bannerDot.eq("0").addClass("selected");
    showSlide($newIndex);

    $bannerDot.on("click", function(){
        $newIndex = $bannerDot.index($(this));
        showSlide( $newIndex );
    });
 
    function showSlide($newIndex){
        if($newIndex!=currentIndex){
            $(".subPop .tabTitle li").removeClass("selected");
            $(".subPop .tabTitle li").eq($newIndex).addClass("selected");
            $(".subPop .tabContent > div").hide();
            $(".subPop .tabContent > div").eq($newIndex).show();
            currentIndex=$newIndex;
        }
    }
    /* 슬라이드 끝 */


    
    /* 하단 텝 끝 */
    $(".gotosubBtn").on(clickEvent,function(){
        var $this = $(this).attr("data-tab")-1;
        $(".bigPopup.subPop").css({'opacity':'1', transform:'scale(1)' });
        showSlide($this);
    });

    $(".bigPopup .popupClose").on( clickEvent,function(){
        //reset: 초기화 넣기( 동영상 죽이기 etc);
        $(".bigPopup").css({'opacity':'0', transform:'scale(0)' });
        showSlide(0); //슬라이드 초기화.
    });
})