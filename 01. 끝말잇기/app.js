var word = document.createElement('div');
//word.textContent = "코끼리";
window.onload = function() {
    word.textContent = prompt("제시어");
    text.focus();
}
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
    if(word.textContent[word.textContent.length-1] === text.value[0]){
        result.textContent = '딩동댕';
        result.style.color = 'dodgerblue';
        word.textContent = text.value;
        text.value = '';
        text.focus();
    } else {
        result.textContent = '땡';
        result.style.color = 'red';
        text.value = '';
        text.focus();
    }
})
