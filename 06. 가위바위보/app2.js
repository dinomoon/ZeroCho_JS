window.addEventListener('load', function(){
    var img = document.querySelector(".img");
    var buttons = document.querySelectorAll("input[type='button']");
    var currentPos = '0';
    var interval;
    var table = { "바위": 1, "가위": 2, "보": 3, "0":1, "-250px":2, "-530px":3}

    // NOTE setInterval 
    function makeInterval(){
        interval = setInterval(function(){
            if(currentPos === '0'){
                currentPos = '-250px'; // 바위 -> 가위
            } else if (currentPos === '-250px'){
                currentPos = '-530px'; // 가위 -> 보
            } else {
                currentPos = '0'; // 보 -> 바위
            }
            img.style.backgroundPosition = currentPos;
        }, 100); // 0.1초 마다 바위->가위->보->바위...
    }
    makeInterval();

    // NOTE clearInterval
    buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
            clearInterval(interval);
            setTimeout(function(){
                makeInterval();
            }, 1000);

            // NOTE 승부
            var user = table[btn.value];
            var com = table[currentPos];
            var result = user - com;

            if(result === 0){
                console.log("비겼습니다.");
            } else if(result===-1 || result===2){
                console.log("이겼습니다.");
            } else if (result===1 || result===-2){
                console.log("졌습니다.");
            }
        })
    });
});