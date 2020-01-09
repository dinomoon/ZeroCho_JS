window.addEventListener('load', function(){
    var table = document.createElement('table');
    var tr;
    var td;
    var data = [];
    var trData;

    //NOTE 
    //테이블 만들기
    for(var i=0; i<4; i++){
        tr = document.createElement('tr');
        trData = [];
        data.push(trData);
        for(var j=0; j<4; j++){
            td = document.createElement('td');
            trData.push(0);
            tr.append(td);
        }
        table.append(tr);
    }
    document.body.append(table);

    //NOTE 
    //빈자리 중에서 랜덤으로 골라서 2를 넣기
    function randomDraw(){
        var emptyList = [];
        data.forEach(function(tr, i){
            tr.forEach(function(td, j){
                if(!td){
                    //td가 0인 곳의 위치를 저장
                    emptyList.push([i, j]);
                }
            });
        });
        //randomTd: td가 0인 곳의 위치 중에서 랜덤으로 가져온다. [i, j]
        var randomTd = emptyList[Math.floor(Math.random()*emptyList.length)];
        data[randomTd[0]][randomTd[1]] = 2;
    }
    //NOTE 
    //data를 가지고 화면 그리기
    function draw(){
        data.forEach(function(tr, i){
            tr.forEach(function(td, j){
                if(td > 0){
                    table.children[i].children[j].textContent = td;
                } else {
                    table.children[i].children[j].textContent = '';
                }
            })
        })
    }
    //NOTE 
    //드래그 방향 결정하고 방향에따라 액션 수행
    var startDrag = false;
    var dragging = false;
    var startPoint;
    var endPoint;
    window.addEventListener('mousedown', function(e){
        startDrag = true;
        startPoint = [e.clientX, e.clientY];
    })
    window.addEventListener('mousemove', function(e){
        if(startDrag){
            dragging = true;
        }
    })
    window.addEventListener('mouseup', function(e){
        if(dragging){
            startDrag = false;
            dragging = false;
            var dir;
            endPoint = [e.clientX, e.clientY];
            var diffX = endPoint[0] - startPoint[0];
            var diffY = endPoint[1] - startPoint[1];
    
            if(diffX > 0 && Math.abs(diffY) / diffX < 1){
                dir = 'right';
            } else if (diffX < 0 && Math.abs(diffY) / Math.abs(diffX) < 1){
                dir = 'left';
            } else if (diffY < 0 && Math.abs(diffX) / Math.abs(diffY) < 1){
                dir = 'up';
            } else if (diffY > 0 && Math.abs(diffX) / diffY < 1){
                dir = 'down';
            }
            this.console.log(dir);
            switch(dir){
                case 'right':
                    var newData = [
                        [],
                        [],
                        [],
                        [],
                    ];
                    data.forEach(function(tr, i){
                        tr.forEach(function(td, j){
                            if(td){
                                if(newData[i][0] && newData[i][0] === td){
                                    newData[i][0] *= 2;
                                } else {
                                    newData[i].unshift(td);
                                }
                            }
                        });
                    });
                    [1,2,3,4].forEach(function(tr, i){
                        [1,2,3,4].forEach(function(td, j){
                            data[i][3-j] = newData[i][j] || 0;
                        });
                    });
                    break;
                case 'left':
                    var newData = [
                        [],
                        [],
                        [],
                        [],
                    ];
                    data.forEach(function(tr, i){
                        tr.forEach(function(td, j){
                            if(td){
                                if(newData[i][newData[i].length-1] && newData[i][newData[i].length-1] === td){
                                    newData[i][newData[i].length-1] *= 2;
                                } else {
                                    newData[i].push(td);
                                }
                            }
                        });
                    });
                    [1,2,3,4].forEach(function(tr, i){
                        [1,2,3,4].forEach(function(td, j){
                            data[i][j] = newData[i][j] || 0;
                        });
                    });
                    break;
                case 'up':
                    var newData = [
                        [],
                        [],
                        [],
                        [],
                    ];
                    data.forEach(function(tr, i){
                        tr.forEach(function(td, j){
                            if(td){
                                if(newData[j][newData[j].length-1] && newData[j][newData[j].length-1] === td){
                                    newData[j][newData[j].length-1] *= 2;
                                } else {
                                    newData[j].push(td);
                                }
                            }
                        });
                    });
                    [1,2,3,4].forEach(function(tr, i){
                        [1,2,3,4].forEach(function(td, j){
                            data[j][i] = newData[i][j] || 0;
                        });
                    });
                    break;
                case 'down':
                    var newData = [
                        [],
                        [],
                        [],
                        [],
                    ];
                    data.forEach(function(tr, i){
                        tr.forEach(function(td, j){
                            if(td){
                                if(newData[j][0] && newData[j][0] === td){
                                    newData[j][0] *= 2;
                                } else {
                                    newData[j].unshift(td);
                                }
                            }
                        });
                    });
                    [1,2,3,4].forEach(function(tr, i){
                        [1,2,3,4].forEach(function(td, j){
                            data[3-j][i] = newData[i][j] || 0;
                        });
                    });
                    break;
            } //end of switch
            randomDraw();
            draw();
        } //end of if(dragging)
    }) //end of mouseup
    randomDraw();
    draw();
});