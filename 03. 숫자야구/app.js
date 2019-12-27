var result = document.createElement('h1');
result.textContent = "";
document.body.append(result);

var form = document.createElement('form');
document.body.append(form);

var text = document.createElement('input');
form.append(text);

var btn = document.createElement('button');
btn.textContent = "입력";
form.append(btn);

var num = [1,2,3,4,5,6,7,8,9];
var com = [];
for(var i=0; i<4; i++){
    var input = num.splice(Math.floor(Math.random()*(9-i)), 1)[0];
    com.push(input);
}
console.log(com);
var S = 0;
var B = 0;

form.addEventListener("submit", function(e){
    e.preventDefault();
    S = 0;
    B = 0;
    for(var i=0; i<4; i++){
        if(com[i] === Number(text.value[i])){
            S += 1;
        } else if (com.includes(Number(text.value[i]))) {
            B += 1;
        }
    }
    if (S == 4)
        result.textContent = "홈런~!";
    else
        result.textContent = S + "S " + B + "B";
})