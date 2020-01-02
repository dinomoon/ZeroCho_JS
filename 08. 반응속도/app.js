window.addEventListener('load', function(){
    var screen = document.querySelector("#screen");
    var result = screen.querySelector(".result");
    var dir = screen.querySelector('.dir');
    var opportunity = screen.querySelector('.opportunity');
    var opporCnt = 5;
    var currentTime;
    var clickTime;
    var timeOut;
    var sum = 0;
    var average;
        
    screen.onclick = function(){    
        if(opporCnt === 0){
            return;
        }
        if(screen.classList.contains('waiting')){
            screen.classList.remove('waiting')
            screen.classList.add('ready');
            dir.textContent = '초록색이 나오면 클릭하세요.';
            timeOut = setTimeout(function(){
                currentTime = new Date();
                screen.click();
            }, Math.random() * 1000 + 2000);
        } else if(screen.classList.contains('ready')){
            if(!currentTime){
                clearTimeout(timeOut);
                screen.classList.remove('ready');
                screen.classList.add('waiting');
                dir.textContent = '다시 하세요';
            } else {
                screen.classList.remove('ready');
                screen.classList.add('play');
                dir.textContent = '클릭하세요!';
            }
        } else {
            clickTime = new Date();
            result.textContent = ((clickTime-currentTime)/1000 + "초");
            sum += (clickTime-currentTime)/1000;
            currentTime = null;
            clickTime = null;
            opporCnt--;
            
            if(opporCnt === 0){
                average = sum / 5;
                result.textContent = '평균: ' + average.toFixed(2);
                dir.textContent = '다시하려면 새로고침 하세요.';
            } else {
                dir.textContent = '클릭하면 시작합니다.';
            }
            opportunity.textContent = '남은 횟수: ' + opporCnt + '번';
            screen.classList.remove('play')
            screen.classList.add('waiting');
        }
    }
});