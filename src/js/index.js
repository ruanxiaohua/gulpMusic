var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;
function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data
            root.renter(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent()
        },
        error:function(){
            console.log(error);
        }
    })
}

function bindEvent(){
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio);
        root.renter(dataList[index]);
        if(audio.status == 'play'){
            audio.play();
            rotated(0);
        }
        $('.img-box').attr("data-deg",0);
            $('.img-box').css({
                'transform':'rotateZ(0deg)',
                'transition':'none'
            })

    });
    $('.prev').on('click',function(){
        var i = control.prev();
        $('body').trigger('play:change',i);

    });
    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('play:change',i);
    });
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            var deg = $(".img-box").attr("data-deg");
            rotated(deg);
        } else {
            audio.pause();
            clearInterval(timer)
        }
        $('.play').toggleClass('playing');
    })
     function rotated(deg){
        clearInterval(timer)
        deg = +deg;     
        timer = setInterval(function(){
            deg += 2;
            $('.img-box').attr("data-deg",deg);
            $('.img-box').css({
                'transform':'rotateZ('+ deg + 'deg)',
                'transition':'all 1s ease-out'
            })
        },200);
     }
}

getData("../mock/data.json");

// 信息+图片渲染到页面上  render
// 点击按钮
// 音频的播放与暂停  切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切歌