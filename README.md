## 만든 것들
[01. 끝말잇기](https://dinomoon.github.io/ZeroCho_JS/01.%20끝말잇기/index.html)

[02. 구구단](https://dinomoon.github.io/ZeroCho_JS/02.%20구구단/index.html)

[03. 숫자야구](https://dinomoon.github.io/ZeroCho_JS/03.%20숫자야구/index.html)

[04. 틱택토](https://dinomoon.github.io/ZeroCho_JS/04.%20틱택토/index.html)

[05. 로또추첨기](https://dinomoon.github.io/ZeroCho_JS/05.%20로또추첨기/index.html)

[06. 가위바위보](https://dinomoon.github.io/ZeroCho_JS/06.%20가위바위보/index.html)

[07. 지뢰찾기](https://dinomoon.github.io/ZeroCho_JS/07.%20지뢰찾기/index2.html)

[08. 반응속도](https://dinomoon.github.io/ZeroCho_JS/08.%20반응속도/index.html)

[09. 카드 뒤집기](https://dinomoon.github.io/ZeroCho_JS/08.%20카드 뒤집기/index.html)

## 다른 사람이 만든 것들
[배트맨 vs 슈퍼맨 / Android vs IOS 틱택토](https://exporter-hamster-17117.netlify.com/) 진짜 잘 만든듯...!

## 강의를 통해 알게 된 것
1. $와 _ 도 변수명으로 사용할 수 있다.
2. ==와 ===는 다르다. (===를 사용할 것!)
3. prompt("답?")로 입력을 받으면 문자열로 받는다. 숫자로 바꾸려면 Number를 사용해야한다. (숫자를 문자열로 바꾸려면 String)
4. 변수를 선언만하면 undefined로 초기화된다. 사용하던 변수를 초기화할 때는 null을 사용하자.
5. 연산자 우선순위: 사칙연산 > 비교연산 > 대입연산
6. while(true)를 for( ; true; ) 이렇게 바꿀 수도 있다.
7. JS의 타입: 객체(함수, 배열), 문자, 숫자, 불린, null, undefined
8. 객체를 선언할 때 마지막값의 뒤에도 콤마를 써주는 것이 좋다.(실무에서..)
9. 객체의 값을 불러오는 방법: 최문경['이름'], 최문경.이름 (차이점: 대괄호안에는 변수를 쓸 수있지만 점 뒤에는 변수를 사용할 수 없다.)
10. "Hello".length -> "Hello"는 문자인데 어떻게 객체처럼 동작을 함? -> 점을 찍는 순간 브라우저가 문자객체로 인식함!
11. 그룹화는 하고 싶지만 속성 이름을 따로 주고 싶지는 않을 때 배열을 사용한다. var 배열 = ['사과','오렌지','딸기',]
12. js에서 최상위 객체는 window이고 window에는 수많은 객체들이 있는데 가장 중요한 건 document객체이다.
13. 엔터로 사용자 입력을 받으려면 form태그로 감싸줘야한다. 그리고 이벤트리스너의 매개변수로 submit을 넣어줘야한다. (그런데 submit의 기본값이 화면을 새로고침하기 때문에 preventDefault를 해줘야한다.)
14. js에서 비동기는 코드 상의 순서대로 실행되지 않는 코드를 의미한다. (ex. 콜백함수)
15. 배열 메소드: push(뒤에 추가), pop(뒤에서 뽑기), unshift(앞에 추가), shift(앞에서 뽑기), splice(위치, 개수)(위치에서 부터 개수만큼 뽑기)
16. 문자.split(구분자) -> 배열 / 배열.join(구분자) -> 문자
17. 이벤트리스너는 반복문을 대체 가능하다.
18. e.target -> 클릭된 요소 / e.target.parentNode -> 클릭된 요소의 부모
19. forEach문, [1,2,3,4,5].forEach(function(e){ console.log(e) });
20. [1,2,3,4,5].forEach(function(요소, 인덱스){ console.log(요소, 인덱스) });
21. empty는 반복문이 안된다. var list = Array(45);(list에는 empty 45개가 들어감) list.forEach(function(e){ console.log(e) }); (X)
22. var list2 = list.fill()이라고 하면 list2는 list의 empty가 모두 undefined로 바뀌어서 들어감.
23. 1~45의 숫자가 들어가있는 배열만들기? var list = Array(45).fill().map(function(e, i){ return i+1 });
24. 정렬하는 방법? var winNS = shuffleList.slice(0, 6).sort(function(p, c){return p-c}); <-내림차순 (p-c> 0 이면 자리를 바꾼다.)
25. JS에서는 -를 빼기로 인식하기 때문에 변수명으로 지을 수없고, 스타일을 넣을 때도 border-radius가 아니라 borderRadius로 해야함.
26. JS에서 객체는 딕셔너리 역할을 할 수도 있다.
27. Object.entries()를 사용해 객체를 2차원 배열로 바꿀 수 있다.
28. 배열.find()는 반복문이지만 원하는 것을 찾으면 멈춘다.
29. 1차원배열에서는 indexOf()를 자주 쓰고, 2차원배열에서는 find()와 findIndex()를 자주 쓴다.
30. 배열.includes()로 || 관계를 줄여서 쓸 수 있다. (scoreRCP[user] - scoreRCP[com(dist)] === 2) || (scoreRCP[user] - scoreRCP[com(dist)] === -1) => [2, -1].includes(scoreRCP[user] - scoreRCP[com(dist)])
31. 항상 데이터와 화면을 일치시켜야 한다는 생각을 가지고 있어야한다. (리액트, 뷰, 앵귤러를 사용하면 쉽게 일치시킬 수 있다.)
32. e.target vs e.currentTarget: target은 이벤트가 실제로 발생한 곳, currentTarget은 이벤트 리스너가 붙어있는 곳
33. 스코프 간의 상하관계를 스코프체인이라고 부른다.
34. e.currentTarget.textContent = 주변지뢰개수 || '' => 주변지뢰개수가 거짓(false, 0, '', null, undefined, NaN)이면 ''을 대신 써라(분기문을 하나 줄일 수 있다.)
35. undefined나 null을 없애는 방법.(filter함수를 사용한다.)(filter함수를 사용하면 원하는 조건에 해당하는 값만 추출할 수 있다.)
```javascript
aroundArray.filter(function(v){return !!v;}).forEach(function(around){
  around.click();
})
```
#### 08. 반응속도
1. 시간측정의 3가지 방법
  - new Date()로 현재 시간을 알아낸 뒤 차이를 구하기
  - console.time("시간"), console.timeEnd("시간")사용하기 (주로 디버깅할 때 사용)
  - performance.now()로 현재 시간을 알아낸 뒤 차이를 구하기 (new Date()보다 더 정밀하다.)
2. 호출 스택(currentTime와 clickTime을 onclick 안에 쓰면 왜 결과가 제대로 안나오는지 잘 이해가 안된다..)
```javascript
window.addEventListener('load', function(){
    var screen = document.querySelector("#screen");
    var text = screen.querySelector('span');
    
    
    screen.onclick = function(){
        var currentTime;
        var clickTime;
        if(screen.classList.contains('waiting')){
            screen.classList.remove('waiting')
            screen.classList.add('ready');
            text.textContent = '초록색이 나오면 클릭하세요.';
            setTimeout(function(){
                screen.click();
                currentTime = new Date();
            }, Math.random() * 1000 + 1000);
        } else if(screen.classList.contains('ready')){
            screen.classList.remove('ready')
            screen.classList.add('play');
            text.textContent = '클릭하세요!';
        } else {
            clickTime = new Date();
            console.log(currentTime);
            console.log(clickTime);
            console.log((clickTime - currentTime)/1000);
            screen.classList.remove('play')
            screen.classList.add('waiting');
            text.textContent = '클릭하면 시작합니다.';
        }
    }
});
```
3. Maximum call stack exceeded 에러 해결방법(완변한 해결방법은 아님)
```javascript
function a(){
  setTimeout(function(){
    a();
  }, 0)
}

a();
```

#### 09. 카드 뒤집기
1. 클로저 해결방법
```javascript
function closer(c){
  c.addEventListener('click', function(){
    c.classList.toggle('flip');
  });
}
closer(flipCard);

(function(c){
    c.addEventListener('click', function(){
        c.classList.toggle('flip');
    });
})(flipCard);
```
2. 참조와 복사
  - 문자, 불리언, 숫자는 기본적으로 복사(깊은 복사)가 되고, 객체들(객체, 배열, 함수)은 참조(얕은 복사)가 된다.
```javascript
//깊은 복사하는 방법
//1단계까지만 깊은 복사하는 방법
list2 = list.slice();

Object.assign(obj2, obj); //obj2 = Object.assign({}, obj); 도 가능

obj2 = {}
Object.keys(obj).forEach(function(key){
  obj2[key] = obj[key];
})
//끝까지 깊은 복사하는 방법(근데 성능 최악이라 되도록 안쓰는 게 좋다고 함, 프로토타입은 복사X)
복사 객체 = JSON.parse(JSON.stringify(원래 객체))
```
3. 팩토리 패턴과 프로토타입
```javascript
var prototype = {
    type: 'card',
    attack: function(){console.log("공격")},
    defend: function(){},
};
function cardFactory(name, att, hp){
    var card = Object.create(prototype);
    card.name = name;
    card.att = att;
    card.hp = hp;
    return card;
}
var aaa = cardFactory('aaa',10,20);

//객체 지향으로 짤 때(생성자 함수)
function Card(name, att, hp){
  this.name = name;
  this.att = att;
  this.hp = hp;
}
Card.prototype = prototype
var bbb = new Card('bbb',10,20);
```
4. 프로토타입을 쓰는 이유? 모든 객체의 값들을 한 방에 수정, 삭제, 추가가 가능하니까!
5. call by value, call by reference, call by sharing(12-1강)
  - 객체를 참조하는 것이 call by reference가 아니다. 자바스크립트에는 call by reference가 없다!
  - call by reference가 아닌 이유: 객체의 속성을 수정할 때는 참조이지만, 객체 자체를 수정할 때는 참조관계가 아니다.
```javascript
function 함수(매개변수){
  매개변수.a = 8;
  console.log(매개변수);
}
var 인자 = {a:2};
함수(인자);
console.log(인자);
//{a:8}
//{a:8}

function 함수(매개변수){
  매개변수 = 8;
  console.log(매개변수);
}
var 인자 = {a:2};
함수(인자);
console.log(인자);
//8
//{a:2}
```

## 개인 공부하며 알게 된 것
1. 브라켓에서 자바스크립트를 작성할 때 이상하게 왼쪽에 계속 X표시가 뜨면서 (작동은 잘 되지만..)document is not undefined라고 하길래 거슬려서 검색해봤는데 맨 위에 /*eslint-env browser*/를 추가해주면 된다고 해서 해보니까 되었다. (이유는 모르겠다..)
2. eslint가 뭔지 궁금해서 검색을 했고, "ESLint는 ES + Lint입니다. ES는 EcmaScript, 즉 자바스크립트를 의미하는 것이고요. Lint는 보푸라기라는 뜻인데 프로그래밍 쪽에서는 에러가 있는 코드에 표시를 달아놓는 것을 의미합니다. 즉 ESLint는 자바스크립트 문법 중 에러가 있는 곳에 표시를 달아놓는 도구를 의미합니다."라고 한다.. ([제로초님 블로그](https://www.zerocho.com/category/JavaScript/post/583231719a87ec001834a0f2)에서..)
3. 그럼 EcmaScript는 뭐지..? 궁금해서 또 검색해보니까 [재그지그님 블로그](https://wormwlrm.github.io/2018/10/03/What-is-the-difference-between-javascript-and-ecmascript.html)에 설명이 잘 되어있었다.
4. 복습하다가 원래 학교에서 배울 때는 innerHTML로 내용을 넣었었는 데 제로초님은 textContent로 넣었다. 둘의 차이가 궁금해서 검색! innerHTML은 태그까지 읽거나 넣을 수 있는 것이고, textContent는 말 그대로 태그 안의 내용만 가져오거나 넣을 수 있다.
5. 지뢰찾기 복습하다가 알게되었는데, 2차원배열에서 요소를 찾을 때, 행의 범위를 벗어나는 값을 넣으면 에러가 나지만 열의 범위를 벗어나는 값은 넣어도 에러가 나지 않고 undefined가 나옴. -> 그래서 주변의 지뢰를 찾을 때, if문과 concat을 사용해 주변 배열을 만들어서 찾을 수 있음.
