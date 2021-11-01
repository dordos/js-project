$(function () {
    $('.videoPlayBtn').on(clickEvent, function () {
        $(this).hide();
        $(this).siblings('.convideoBox').show();
        var video = $(this).siblings('.convideoBox').find('video').get(0);
        video.play();
    });

    
    $('.videoClose').on(clickEvent, function (){
        $(this).parent().siblings('.videoPlayBtn').show();
        var video = $(this).siblings('video').get(0);
        video.pause();
        video.currentTime = 0;
    });
});
