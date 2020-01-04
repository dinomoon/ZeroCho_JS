window.addEventListener('load', function(){
    var wrapper = document.querySelector('.wrapper');
    var row = 4;
    var col = 3;

    //NOTE 카드만들기
    function cardSetting(row, col){
        wrapper.innerHTML = '';
        var colorList = ['orange','orange','orangered','orangered',
        'yellowgreen','yellowgreen','dodgerblue','dodgerblue',
        'pink','pink','violet','violet']
        var shuffleColorList = [];
        var clickFlag = false;
        var clickCard = [];
        var completeCard = [];
        var startTime;
        var endTime;

        //NOTE 색깔섞기
        for(var i=0; colorList.length>0; i++){
            shuffleColorList = shuffleColorList.concat(colorList.splice(Math.floor(Math.random()*colorList.length),1));
        }
        for(var i=0; i<row*col; i++){
            var flipCard = document.createElement('div');
            var flipCardInner = document.createElement('div');
            var flipCardFront = document.createElement('div');
            var flipCardBack = document.createElement('div');
            flipCard.classList.add('flip-card', 'none');
            (function(c){
                c.addEventListener('click', function(){
                    if(clickFlag && !completeCard.includes(c) && !c.classList.contains('flip')){
                        c.classList.toggle('flip');
                        clickCard.push(c);
                    }
                    if(clickCard.length === 2){
                        if(clickCard[0].querySelector('.flip-card-back').style.backgroundColor === clickCard[1].querySelector('.flip-card-back').style.backgroundColor){
                            completeCard.push(clickCard[0]);
                            completeCard.push(clickCard[1]);
                            clickCard = [];
                            if(completeCard.length === row*col){
                                endTime = new Date();
                                var time = (endTime-startTime)/1000;
                                alert(time + "초 걸렸습니다.");
                                cardSetting(row, col);  
                            }
                        } else {
                            clickFlag = false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flip');
                                clickCard[1].classList.remove('flip');
                                clickFlag = true;
                                clickCard = [];
                            }, 500);
                        }
                    }
                });
            })(flipCard);
            flipCardInner.className = 'flip-card-inner';
            flipCardFront.className = 'flip-card-front';
            flipCardBack.className = 'flip-card-back';
            flipCardBack.style.backgroundColor = shuffleColorList[i];
            flipCardInner.append(flipCardFront, flipCardBack);
            flipCard.append(flipCardInner);
            wrapper.append(flipCard);

            //NOTE 카드보여주기
            document.querySelectorAll('.flip-card').forEach(function(card, index){
                setTimeout(function(){
                    card.classList.add('flip');
                }, 1000 + 100*index);
            });
            //NOTE 카드덮기
            setTimeout(function(){
                document.querySelectorAll('.flip-card').forEach(function(card){
                    card.classList.remove('flip');
                    clickFlag = true;
                    startTime = new Date();
                })
            }, 3000);
        }
    } cardSetting(row, col);
})