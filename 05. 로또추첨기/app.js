// 1~45 리스트 만들기
var numList = Array(45).fill().map(function(e, i){
    return i+1;
});
//console.log(numList);

// 섞은 리스트 만들기
var shuffleList = [];
while(numList.length > 0){
    var temp = numList.splice(Math.floor(Math.random() * numList.length), 1);
    shuffleList.push(temp[0]);
}
//console.log(shuffleList);

// 뽑기
var winNS = shuffleList.slice(0, 6).sort(function(p, c){return p-c});
console.log(winNS);

var bonusN = shuffleList[shuffleList.length-1];
console.log(bonusN);

// 넣기
var winning_number = document.querySelector("#winning-number");
var bonus_number = document.querySelector("#bonus-number");

setTimeout(function() {
    ballDeco(winNS[0], 'w');
}, 1000)
setTimeout(function() {
    ballDeco(winNS[1], 'w');
}, 2000)
setTimeout(function() {
    ballDeco(winNS[2], 'w');
}, 3000)
setTimeout(function() {
    ballDeco(winNS[3], 'w');
}, 4000)
setTimeout(function() {
    ballDeco(winNS[4], 'w');
}, 5000)
setTimeout(function() {
    ballDeco(winNS[5], 'w');
}, 6000)
setTimeout(function() {
    ballDeco(bonusN, 'b');
}, 7000)

// 꾸미기
function ballDeco(n, WorB){
    var ball = document.createElement('div');
    ball.textContent = n;
    ball.style.display = 'inline-block';
    ball.style.width = '50px';
    ball.style.height = '50px';
    ball.style.border = '1px solid white';
    ball.style.borderRadius = '50%';
    ball.style.textAlign = 'center';
    ball.style.lineHeight = '50px';
    ball.style.marginRight = '5px';
    ball.style.fontWeight = 'bold';
    ball.style.color = '#333';
    if(n <= 10) {
        ball.style.backgroundColor = 'orangered';
    } else if (n <= 20) {
        ball.style.backgroundColor = 'orange';
    } else if (n <= 30) {
        ball.style.backgroundColor = 'yellow';
    } else if (n <= 40) {
        ball.style.backgroundColor = 'dodgerblue';
    } else {
        ball.style.backgroundColor = 'limegreen';
    }
    
    if(WorB === 'w')
        winning_number.append(ball);
    else
        bonus_number.append(ball);
}