window.addEventListener('load', function(){
    var enemyDeck = document.querySelector('.enemy-deck');
    var enemyFieldWrapper = document.querySelector('.enemy-field-wrapper');
    var enemyHero = document.querySelector('.enemy-hero');
    var enemyField = document.querySelector('.enemy-field');
    var enemyCost = document.querySelector('.enemy-hero .cost');
    var enemyDeckData = [];
    var enemyFieldData = [];

    var myDeck = document.querySelector('.my-deck');
    var myFieldWrapper = document.querySelector('.my-field-wrapper');
    var myField = document.querySelector('.my-field');
    var myHero = document.querySelector('.my-hero');
    var myCost = document.querySelector('.my-hero .cost');
    var myDeckData = [];
    var myFieldData = [];
    var turnbtn = document.querySelector('.turn-btn');
    var turn = true;

    myFieldWrapper.style.backgroundColor = 'antiquewhite'
    //NOTE
    //턴 버튼 클릭했을 때
    turnbtn.onclick = function(){
        turn = !turn;
        if(turn === false){ //상대방 턴으로 넘어갔을 때
            myFieldData.forEach(function(card){
                card.classList.remove('selected');
                card.classList.remove('turn-over');
            });
            enemyFieldWrapper.style.backgroundColor = 'antiquewhite';
            myFieldWrapper.style.backgroundColor = 'white';
            enemyCost.textContent = 10;
            // makeEnemyDeck(5);
        } else { //내 턴으로 돌아왔을 때
            enemyFieldData.forEach(function(card){
                card.classList.remove('selected');
                card.classList.remove('turn-over');
            });
            myFieldWrapper.style.backgroundColor = 'antiquewhite';
            enemyFieldWrapper.style.backgroundColor = 'white'
            myCost.textContent = 10;
            // makeMyDeck(5);
        }
    }

    //NOTE
    //Card 생성자
    function Card(hero){
        if(hero){
            this.att = 1;
            this.hp = 30;
        } else {
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.floor((this.att + this.hp) / 2);
        }
    }

    //NOTE 
    //덱에 들어갈 카드랑 영웅 만들기
    function makeMyDeck(count){
        for(var i=0; i<count; i++){
            myDeckData.push(new Card);
        }
        myDeckData.forEach(function(data){
            cardDomConnect(data, myDeck);
        })
    }
    function makeEnemyDeck(count){
        for(var i=0; i<count; i++){
            enemyDeckData.push(new Card);
        }
        enemyDeckData.forEach(function(data){
            cardDomConnect(data, enemyDeck);
        })
    }
    function makeMyHero(){
        cardDomConnect(new Card(true), myHero, true);
    }
    function makeEnemyHero(){
        cardDomConnect(new Card(true), enemyHero, true);
    }

    makeMyHero();
    makeEnemyHero();
    makeMyDeck(5);
    makeEnemyDeck(5);

    //NOTE 
    //만들어진 객체들을 화면에 나타내기
    function cardDomConnect(data, where, hero){
        var template = document.querySelector('template');
        var cloneCard = document.importNode(template.content, true);
        var info = cloneCard.querySelectorAll('span');
        
        if(hero){
            info[0].style.display = 'none';
            info[1].textContent = data.att;
            info[2].textContent = data.hp;
        } else {
            info[0].textContent = data.cost;
            info[1].textContent = data.att;
            info[2].textContent = data.hp;
        }
        var card = cloneCard.childNodes[1];
        if(where === myHero)
            myFieldData.push(card);
        else if(where === enemyHero)
            enemyFieldData.push(card);
        //NOTE 
        //카드에 클릭 이벤트 붙이기
        card.addEventListener('click', function(){
            if(turn && where === myDeck && myCost.textContent >= data.cost && !(myFieldData.indexOf(card) > -1)){
                //클릭하면 필드에 카드 넣기
                myFieldData.push(card);
                myField.append(card);
                //필드에 들어간 카드는 덱 데이터에서 삭제하기
                var idx = myDeckData.indexOf(card);
                myDeckData.splice(idx, 1);
                myCost.textContent -= data.cost;
            }
            else if (!turn && where === enemyDeck && enemyCost.textContent >= data.cost && !(enemyFieldData.indexOf(card) > -1)){
                enemyFieldData.push(card);
                enemyField.append(card);

                var idx = enemyDeckData.indexOf(card);
                enemyDeckData.splice(idx, 1);
                enemyCost.textContent -= data.cost
            }
        });
        console.log(myFieldData);
        //NOTE 
        //필드에 있는 카드들에 클릭 이벤트 붙이기
        myFieldData.forEach(function(card){
            card.addEventListener('click', function(){
                myFieldData.forEach(function(card){
                    card.classList.remove('selected');
                })
                if(turn){
                    //내 필드에 있는 카드를 클릭했는 데,
                    //내 턴이면 테두리 그려질 수 있게 selected 클래스 추가
                    card.classList.add("selected");
                } else {
                    //내 필드에 있는 카드를 클릭했는 데,
                    //내 턴이 아니면? 공격받은 거니까 체력을 깍기
                    var selectedCard = document.querySelector('.selected'); //상대방이 선택한 카드
                    var cardAtt = card.querySelector('.card-attack'); //상대방이 클릭한 내 카드의 공격력
                    var cardHp = card.querySelector('.card-hp'); //상대방이 클릭한 내 카드의 체력
                    var selectedCardAtt = selectedCard.querySelector('.card-attack'); //상대방이 선택한 카드의 공격력
                    var selectedCardHp = selectedCard.querySelector('.card-hp'); //상대방이 선택한 카드의 체력
                    
                    console.log(cardHp);
                    //NOTE 
                    //한 번 공격한 카드들은 공격하지 못하게 하기
                    if(!selectedCard.classList.contains('turn-over')){
                        if(cardHp.textContent <= selectedCardAtt.textContent){
                            selectedCardHp.textContent -= cardAtt.textContent;
                            console.log(cardHp.textContent, selectedCardAtt.textContent);
                            card.remove();
                        }
                        if (selectedCardHp.textContent <= cardAtt.textContent) {
                            cardHp.textContent -= selectedCardAtt.textContent;
                            selectedCard.remove();
                        }
                        selectedCard.classList.add('turn-over'); 
                    } else {
                        return;
                    }
                }
            })
        })

        enemyFieldData.forEach(function(card){
            card.addEventListener('click', function(){
                enemyFieldData.forEach(function(card){
                    card.classList.remove('selected');
                })
                if(!turn){
                    card.classList.add("selected");
                } else {
                    var selectedCard = document.querySelector('.selected');
                    var cardAtt = card.querySelector('.card-attack');
                    var cardHp = card.querySelector('.card-hp');
                    var selectedCardAtt = selectedCard.querySelector('.card-attack');
                    var selectedCardHp = selectedCard.querySelector('.card-hp');
                    console.log(cardHp.textContent);
                    // console.log(cardHp, cardAtt);
                    // console.log(cardHp <= cardAtt);
                    if(!selectedCard.classList.contains('turn-over')){
                        if(cardHp.textContent <= selectedCardAtt.textContent){
                            selectedCardHp.textContent -= cardAtt.textContent;
                            card.remove();
                        }
                        if (selectedCardHp.textContent <= cardAtt.textContent) {
                            cardHp.textContent -= selectedCardAtt.textContent;
                            selectedCard.remove();
                        }
                        selectedCard.classList.add('turn-over');
                    } else {
                        return;
                    }
                }
            })
        })
        where.append(cloneCard);
    }
})
