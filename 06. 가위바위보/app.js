// 가위바위보 사진 background-position 움직여야할 거리
var dist = '0';

// 결과 출력 div 만들기
var result = document.createElement('div');
document.body.append(result);

// 횟수 출력 div 만들기
var countWin = document.createElement('div');
countWin.textContent = '이긴 횟수: ';
countWin.style.color = 'dodgerblue';
document.body.append(countWin);

var countLose = document.createElement('div');
countLose.textContent = '진 횟수: ';
countLose.style.color = 'orangered';
document.body.append(countLose);

var countDraw = document.createElement('div');
countDraw.textContent = '비긴 횟수: ';
countDraw.style.color = 'black';
document.body.append(countDraw);

var win = 0;
var draw = 0;
var lose = 0;

var RCP = {
    R: '0',
    C: '-250px',
    P: '-530px',
};

// 거리를 이용해 컴퓨터가 무엇을 냈는지 확인`
console.log(Object.entries(RCP));
function com(dist) {
    return Object.entries(RCP).find(function(v){
        return v[1] === dist;
    })[0];
}

//var find = Object.entries(RCP).find(function(v) {
//    console.log(v);
//    return v[0] === 'C';
//});
console.log(find);

// 0.1초 마다 컴퓨터가 내는 것이 달라지게 함.
var interval;
function makeInterval(){
    interval = setInterval(function() {
        if(dist === RCP.R){
            dist = RCP.C;
        } else if(dist === RCP.C) {
            dist = RCP.P;
        } else {
            dist = RCP.R;
        }
        document.querySelector('div').style.backgroundPosition = dist;
    }, 100);
}
makeInterval();

var scoreRCP = {
    '가위': 1,
    '바위': 2,
    '보': 3,
    C: 1,
    R: 2,
    P: 3,
}

// 사용자가 버튼을 클릭했을 때
document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function(){
        clearInterval(interval);
        setTimeout(function() {
            makeInterval();
        }, 1000);
        
        console.log(this.textContent, com(dist));
        var user = this.textContent;
//        if(user === '가위') {
//            if (com(dist) === 'C')
//                console.log("비겼습니다.");
//            else if (com(dist) === 'R')
//                console.log("졌습니다.");
//            else
//                console.log("이겼습니다.");
//        } else if (user === '바위') {
//            if (com(dist) === 'C')
//                console.log("이겼습니다.");
//            else if (com(dist) === 'R')
//                console.log("비겼습니다.");
//            else
//                console.log("졌습니다.");
//        } else {
//            if (com(dist) === 'C')
//                console.log("졌습니다.");
//            else if (com(dist) === 'R')
//                console.log("이겼습니다.");
//            else
//                console.log("졌습니다.");
//        }
        
        
        // 가위(1)바위(2)보(3)의 숫자 규칙
        // 사/컴 가위  바위  보
        // 가위  1,1  1,2  1,3
        // 바위  2,1  2,2  2,3
        // 보    3,1  3,2  3,3
        // 숫자가 같다 -> 비김
        // 사-컴 = 2 또는 -1 -> 짐
        // 사-컴 = 1 또는 -2 -> 이김
        var userScore = scoreRCP[user];
        var comScore = scoreRCP[com(dist)];
        var scoreDiff = userScore - comScore;
        
        if(scoreDiff === 0){
            result.innerHTML = "<h2>비겼습니다.</h2>"
            result.style.color = 'black';
            draw++;
            countDraw.textContent = '비긴 횟수: ' + draw;
            countDraw.style.color = 'black';
        } else if([2, -1].includes(scoreDiff)){
            result.innerHTML = "<h2>졌습니다.</h2>"
            result.style.color = 'orangered';
            lose++;
            countLose.textContent = '진 횟수: ' + lose;
            countLose.style.color = 'orangered';
        } else {
            result.innerHTML = "<h2>이겼습니다.</h2>"
            result.style.color = 'dodgerblue';
            win++;
            countWin.textContent = '이긴 횟수: ' + win;
            countWin.style.color = 'dodgerblue';
        }
    })
})
