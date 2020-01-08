//리팩토링 하기 전(기능: 카드 만들고 뽑고 턴넘기기 까지.. 공격X)
window.addEventListener('load', function(){
    var enemyDeck = document.querySelector('.enemy-deck');
    var enemyDeckData = [];
    var myDeck = document.querySelector('.my-deck');
    var myDeckData = [];
    var enemyField = document.querySelector('.enemy-field');
    var enemyFieldData = [];
    var myField = document.querySelector('.my-field');
    var myFieldData = [];

    var enemyHero = document.querySelector('.enemy-hero');
    var enemyHeroData;
    var myHero = document.querySelector('.my-hero');
    var myHeroData;
    var enemyCost = document.querySelector('.enemy-hero .cost');
    var myCost = document.querySelector('.my-hero .cost');

    var turn = true;
    var turnBtn = document.querySelector('.turn-btn');
    turnBtn.addEventListener('click', function(){
        turn = !turn;
        if(turn){
            myCost.textContent = 10;
        } else {
            enemyCost.textContent = 10;
        }
        document.querySelector('.enemy-field-wrapper').classList.toggle('turn');
        document.querySelector('.my-field-wrapper').classList.toggle('turn');
    })

    function cardDomConect(data, dom, hero){
        var template = document.querySelector('template');
        var cloneNode = document.importNode(template.content.childNodes[1], true);
        cloneNode.querySelector('.card-cost').textContent = data.cost;
        cloneNode.querySelector('.card-attack').textContent = data.att;
        cloneNode.querySelector('.card-hp').textContent = data.hp;
        if(hero){
            cloneNode.querySelector('.card-cost').style.display = 'none';
            var name = document.createElement('div');
            name.textContent = '영웅';
            cloneNode.append(name);
        }
        cloneNode.addEventListener('click', function(){
            if(turn){
                if(!data.mine || data.field){
                    return;
                }
                var cost = Number(myCost.textContent);
                if(cost < data.cost){
                    return;
                } else {
                    myCost.textContent -= data.cost;
                }
                var idx = myDeckData.indexOf(data);
                myDeckData.splice(idx, 1);
                myFieldData.push(data);
                myDeck.innerHTML = '';
                myField.innerHTML = '';
                myFieldData.forEach(function(data){
                    cardDomConect(data, myField);
                });
                myDeckData.forEach(function(data){
                    cardDomConect(data, myDeck);
                })
                data.field = true;
                makeMyDeck(1);
            } else {
                if(data.mine){
                    return;
                }
                var cost = Number(enemyCost.textContent);
                if(cost < data.cost){
                    return;
                } else {
                    enemyCost.textContent -= data.cost;
                }
                var idx = enemyDeckData.indexOf(data);
                enemyDeckData.splice(idx, 1);
                enemyFieldData.push(data);
                enemyDeck.innerHTML = '';
                enemyField.innerHTML = '';
                enemyFieldData.forEach(function(data){
                    cardDomConect(data, enemyField);
                });
                enemyDeckData.forEach(function(data){
                    cardDomConect(data, enemyDeck);
                })
            }
        })
        dom.append(cloneNode);
    }

    function makeEnemyDeck(count){
        for(var i=0; i<count; i++){
            enemyDeckData.push(cardFactory(false, false));
        }
        enemyDeckData.forEach(function(card){
            cardDomConect(card, enemyDeck, false);
        });
    }
    function makeMyDeck(count){
        for(var i=0; i<count; i++){
            myDeckData.push(cardFactory(false, true));
        }
        myDeck.innerHTML = '';
        myDeckData.forEach(function(card){
            cardDomConect(card, myDeck, false);
        });
    }
    function makeEnemyHero(){
        enemyHeroData = cardFactory(true, false);
        cardDomConect(enemyHeroData, enemyHero, true);
    }
    function makeMyHero(){
        myHeroData = cardFactory(true, true);
        cardDomConect(myHeroData, myHero, true);
    }
    function setting(){
        makeEnemyDeck(5);
        makeMyDeck(5);
        makeEnemyHero();
        makeMyHero();
    }


    function Card(hero, mine){
        if(hero){
            this.att = 1;
            this.hp = 30;
        } else {
            this.att = Math.ceil(Math.random()*5);
            this.hp = Math.ceil(Math.random()*5);
            this.cost = Math.floor((this.att + this.hp)/2);
        }
        if(mine) {
            this.mine = true
        }
    }
    function cardFactory(hero, mine){
        return new Card(hero, mine);
    }

    setting();
})
