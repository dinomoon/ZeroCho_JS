var table = document.createElement('table');
var tr;
var td;
var trs = [];
var tds = [];
var turn = "X";
var isEnd = false;
var count = 0;


// 테이블 그리기
for(var i=0; i<3; i++){
    tr = document.createElement('tr');
    trs.push(tr);
    tds.push([])
    for(var j=0; j<3; j++){
        td = document.createElement('td');
        td.addEventListener("click", where);
        tds[i].push(td);
        tr.append(td);
    }
    table.append(tr);
}

document.body.append(table);

//console.log(trs, tds);

function where(event){
//    console.log(event.target);
//    console.log(event.target.parentNode);
    var trN = trs.indexOf(event.target.parentNode);
    var tdN = tds[trN].indexOf(event.target);
    
    if(tds[trN][tdN].textContent == '') {
        tds[trN][tdN].textContent = turn;
        count += 1;
        
        // 가로줄 검사
        if(tds[trN][0].textContent === turn &&
          tds[trN][1].textContent === turn &&
          tds[trN][2].textContent === turn){
            alert(turn + "승리!");
            isEnd = true;
            count = 0;
            tds.forEach(function(e){
                e.forEach(function(e2){
                    e2.textContent = '';
                })
            })
        }
        
        // 세로줄 검사
        if(tds[0][tdN].textContent === turn &&
          tds[1][tdN].textContent === turn &&
          tds[2][tdN].textContent === turn) {
            alert(turn + "승리!");
            isEnd = true;
            count = 0;
            tds.forEach(function(e){
                e.forEach(function(e2){
                    e2.textContent = '';
                })
            })
        }
        // 대각선 검사
        if(trN === tdN || Math.abs(trN-tdN) === 2){
            if((tds[0][0].textContent === turn &&
              tds[1][1].textContent === turn &&
              tds[2][2].textContent === turn) || 
              tds[0][2].textContent == turn &&
              tds[1][1].textContent == turn &&
              tds[2][0].textContent == turn){
                alert(turn + "승리!");
                isEnd = true;
                count = 0;
                tds.forEach(function(e){
                e.forEach(function(e2){
                    e2.textContent = '';
                })
            })
            }
        }
        
        if(isEnd === false && count === 9){
            alert("무승부!");
            isEnd = true;
            count = 0;
            tds.forEach(function(e){
                e.forEach(function(e2){
                    e2.textContent = '';
                })
            })
        }
        
        if(isEnd === false){
            if (turn === "X")
                turn = "O";
            else
                turn = "X";    
        } else {
            isEnd = false;
        }
        console.log(count);
        
    } else {
        console.log("빈칸아닙니다.");
    }
}
