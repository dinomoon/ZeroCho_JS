window.addEventListener('load', function(){
    var tetris = document.querySelector('#tetris');
    var tetrisData = [];
    var randomIdx;
    var randomBlock;

    function makeBackGround() {
        for (var i=0; i<20; i++) {
            var tr = document.createElement('tr');
            tetrisData.push([]);
            for (var j=0; j<10; j++) {
                var td = document.createElement('td');
                tr.append(td);
                tetrisData[i].push(0);
            }
            tetris.append(tr);
        }
    }
    makeBackGround();

    var blockShapes = {
        T: [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ],
        L: [
            [1,0,0],
            [1,0,0],
            [1,1,0],
        ],
    }
    var blocksArr = ['T', 'L'];
    var blockColors = ['red', 'orange'];

    function makeRandomBlock() {
        randomIdx = Math.floor(Math.random()*blocksArr.length);
        randomBlock = blockShapes[blocksArr[randomIdx]];
    
        randomBlock.forEach(function(tr, i) {
            tr.forEach(function(td, j) {
                tetrisData[i][j] = td;
            });
        });
        draw();
    }

    function draw() {
        for (var i=0; i<20; i++) {
            for (var j=0; j<10; j++) {
                if (tetrisData[i][j] === 1) {
                    tetris.children[i].children[j].style.backgroundColor = blockColors[randomIdx];
                } else {
                    tetris.children[i].children[j].style.backgroundColor = 'white';
                }
            }
        }
    }
    
    function drop() {
        for (var i=18; i>=0; i--) {
            for (var j=0; j<10; j++) {
                if (tetrisData[i+1][j] === 0) {
                    tetrisData[i+1][j] = tetrisData[i][j];
                    tetrisData[i][j] = 0;
                }
            }
        }
        draw();
    }
    makeRandomBlock();
    setInterval(drop, 1000);
})