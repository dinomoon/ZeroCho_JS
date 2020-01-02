window.addEventListener('load', function(){
    var button = document.querySelector("input[type='button']")
    var tbody = document.querySelector("tbody");
    var tr;
    var td;
    var result = document.querySelector(".result");

    button.onclick = function(){
        tbody.innerHTML = '';
        var hor = parseInt(document.querySelector("#hor").value);
        var ver = parseInt(document.querySelector("#ver").value);
        var mine = parseInt(document.querySelector("#mine").value);
        var mineArrTemp = Array(hor*ver).fill().map(function(e, i){return i;})
        var mineArr = [];
        var trs = [];
        var tds = [];
        var row;
        var col;
        var stopFlag = false;
        var openCount = 0;
        result.textContent = '';

        while(mineArrTemp.length > hor*ver-mine){
            var temp = mineArrTemp.splice(Math.random() * mineArrTemp.length,1);
            mineArr.push(temp[0]);
        }

        //NOTE
        var dataset = []; //데이터와 화면의 일치를 위함
        
        for(var i=0; i<hor; i++){
            var arr = [] //데이터와 화면의 일치를 위함
            dataset.push(arr); //데이터와 화면의 일치를 위함
            tr = document.createElement("tr");
            trs.push(tr);
            for(var j=0; j<ver; j++){
                arr.push(0); //데이터와 화면의 일치를 위함
                td = document.createElement("td");
                tds.push(td);
                //NOTE onclick
                td.onclick = function(e){
                    openCount++;
                    if(stopFlag)
                        return;
                    if(e.target.textContent ==='!' || e.target.textContent ==='?')
                        return
                    
                    e.target.classList.add("opened");
                    
                    row = trs.indexOf(e.target.parentElement); //클릭한 행
                    col = tds.indexOf(e.target) % ver; //클릭한 열

                    if(dataset[row][col] === 'X'){
                        e.target.textContent = '펑';
                        e.target.style.backgroundColor = 'orangered';
                        e.target.style.color = 'white';
                        result.textContent = "실패";
                        stopFlag = true;
                    } else {
                        //NOTE 주변지뢰개수찾기
                        dataset[row][col] = 1;
                        var around = [dataset[row][col-1], dataset[row][col+1]];
                        if (dataset[row-1]) {
                            around = around.concat([dataset[row-1][col-1], dataset[row-1][col], dataset[row-1][col+1]]);
                        }
                        if (dataset[row+1]) {
                            around = around.concat([dataset[row+1][col-1], dataset[row+1][col], dataset[row+1][col+1]]);
                        }
                        var aroundMine = around.filter(function(v){
                            return v === 'X';
                        }).length;
                        e.target.textContent = aroundMine || '';
                        //NOTE 주변지뢰개수가 0이면 주변클릭하기
                        if(aroundMine === 0){
                            var aroundArray = [];
                            if(tbody.children[row-1]){
                                aroundArray = aroundArray.concat([
                                    tbody.children[row-1].children[col-1],
                                    tbody.children[row-1].children[col],
                                    tbody.children[row-1].children[col+1],
                                ])
                            }
                            aroundArray = aroundArray.concat([
                                tbody.children[row].children[col-1],
                                tbody.children[row].children[col+1],
                            ])
                            if(tbody.children[row+1]){
                                aroundArray = aroundArray.concat([
                                    tbody.children[row+1].children[col-1],
                                    tbody.children[row+1].children[col],
                                    tbody.children[row+1].children[col+1],
                                ])
                            }
                            aroundArray.filter(function(v){return !!v;}).forEach(function(around){
                                row = trs.indexOf(around.parentElement); //클릭한 행
                                col = tds.indexOf(around) % ver; //클릭한 열
                                if(dataset[row][col] === 0)
                                    around.click();
                            })
                        }
                        if(openCount === hor*ver-mine){
                            result.textContent = "성공";
                            return;
                        }
                    }
                }
                //NOTE oncontextmenu
                td.oncontextmenu = function(e){
                    e.preventDefault();
                    if(stopFlag || openCount === hor*ver-mine)
                        return;
                    if(e.target.textContent === ''){
                        e.target.textContent = '!';
                        e.target.style.backgroundColor = 'dodgerblue';
                        e.target.style.color = 'white';
                    } else if(e.target.textContent === '!'){
                        e.target.textContent = '?';
                        e.target.style.backgroundColor = 'orange';
                        e.target.style.color = 'white';
                    } else if(e.target.textContent === '?'){
                        e.target.textContent = '';
                        e.target.style.backgroundColor = '#666';
                        e.target.style.color = 'white';
                    }
                        
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        console.log(dataset);

        //NOTE 지뢰넣기
        for(var i=0; i<mineArr.length; i++){
            var row = Math.floor(mineArr[i]/ver);
            var col = mineArr[i]%ver;
            // tbody.children[row].children[col].textContent = 'X';
            dataset[row][col] = 'X';
        }
    }
});