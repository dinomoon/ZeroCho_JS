var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);

var word = document.createElement('div');
word.textContent = num1 + " 곱하기 " + num2 + "는?";
document.body.append(word);

var form = document.createElement('form');
document.body.append(form);

var text = document.createElement('input');
form.append(text);

var btn = document.createElement('button');
btn.textContent = "입력";
form.append(btn);

var result = document.createElement('div');
result.textContent = '';
document.body.append(result);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if(num1*num2 === Number(text.value)){
        result.textContent = "딩동댕";
        text.value = '';
        text.focus();
        num1 = Math.ceil(Math.random()*9);
        num2 = Math.ceil(Math.random()*9);
        word.textContent = num1 + " 곱하기 " + num2 + "는?";
    } else {
        result.textContent = "땡";
        text.value = '';
        text.focus();
    }
})
