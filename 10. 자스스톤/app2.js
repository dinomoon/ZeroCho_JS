//리팩토링 한 후(기능: 카드 만들고 뽑고 턴넘기기 까지.. 공격X)
window.addEventListener('load', function(){
    var enemy = {
        hero: document.querySelector('.enemy-hero'),
        deck: document.querySelector('.enemy-deck'),
        field: document.querySelector('.enemy-field'),
        cost: document.querySelector('.enemy-field-wrapper .cost'),
        deckData: [],
        fieldData: [],
        heroData: null,
        selectCard: null,
        selectCardData: null,
    }
    
    var my = {
        hero: document.querySelector('.my-hero'),
        deck: document.querySelector('.my-deck'),
        field: document.querySelector('.my-field'),
        cost: document.querySelector('.my-field-wrapper .cost'),
        deckData: [],
        fieldData: [],
        heroData: null,
        selectCard: null,
        selectCardData: null,
    }

    var turn = true;
    var turnBtn = document.querySelector('.turn-btn');
    turnBtn.addEventListener('click', function(){
        turn = !turn;
        if(turn){ //내 턴으로 넘어왔을 때
            my.cost.textContent = 10;
            //턴 넘어갈 때 selected랑 turn-over 삭제
            enemy.field.querySelectorAll('.card').forEach(function(card){
                card.classList.remove('selected');
                card.classList.remove('turn-over');
            })
            var hero = enemy.hero.querySelector('.card');
            hero.classList.remove('selected');
            hero.classList.remove('turn-over');
            //턴이 넘어왔을 때, 덱에 카드를 5개로 채우기
            var deckLength = my.deckData.length;
            makeMyDeck(5-deckLength);
        } else {
            enemy.cost.textContent = 10;
            //턴 넘어갈 때 selected랑 turn-over 삭제
            my.field.querySelectorAll('.card').forEach(function(card){
                card.classList.remove('selected');
                card.classList.remove('turn-over');
            })
            var hero = my.hero.querySelector('.card');
            hero.classList.remove('selected');
            hero.classList.remove('turn-over');
            //턴이 넘어왔을 때, 덱에 카드를 5개로 채우기
            var deckLength = enemy.deckData.length;
            makeEnemyDeck(5-deckLength);
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
        cloneNode.addEventListener('click', function(e){
            if(turn){ //내 턴일 때
                if(!data.mine && my.selectCard && enemy.deckData.indexOf(data)===-1) {
                    if(my.selectCardData.hero){
                        my.heroData.hp -= data.att;
                        my.hero.querySelector('.card-hp').textContent -= data.att;
                    } else {
                        var idx = my.fieldData.indexOf(my.selectCardData);
                        my.fieldData[idx].hp -= data.att;
                        if(my.fieldData[idx].hp <= 0){
                            my.fieldData.splice(idx, 1);
                            resetScreen(true);
                        } else {
                            var myCardHp = my.selectCard.querySelector('.card-hp');
                            myCardHp.textContent -= data.att;
                        }
                    }
                    
                    data.hp -= my.selectCardData.att;
                    if(data.hp <= 0){
                        var idx = enemy.fieldData.indexOf(data);
                        enemy.fieldData.splice(idx, 1);
                    }
                    resetScreen(false);
                    my.selectCard.classList.remove('selected');
                    my.selectCard.classList.add('turn-over');
                    my.selectCard = null;
                    my.selectCardData = null;
                    return;
                } else if (!data.mine) {
                    return;
                }
                if(data.field){
                    cloneNode.parentNode.parentNode.querySelectorAll('.card').forEach(function(card){
                        card.classList.remove('selected');
                    })
                    cloneNode.classList.add('selected');
                    my.selectCard = cloneNode;
                    my.selectCardData = data;
                } else {
                    deckToField(data, turn);
                }
            } else { //상대방 턴일 때
                if(data.mine && enemy.selectCard && my.deckData.indexOf(data)===-1){ //상대방 턴인 데 내 카드를 클릭했을 때
                    if(enemy.selectCardData.hero){
                        enemy.heroData.hp -= data.att;
                        enemy.hero.querySelector('.card-hp').textContent -= data.att;
                    } else {
                        var idx = enemy.fieldData.indexOf(enemy.selectCardData);
                        enemy.fieldData[idx].hp -= data.att;
                        if(enemy.fieldData[idx].hp <= 0){
                            enemy.fieldData.splice(idx, 1);
                            resetScreen(false);
                        } else {
                            var enemyCardHp = enemy.selectCard.querySelector('.card-hp');
                            enemyCardHp.textContent -= data.att;
                        }
                    }
                
                    data.hp -= enemy.selectCardData.att;
                    if(data.hp <= 0){
                        var idx = my.fieldData.indexOf(data);
                        my.fieldData.splice(idx, 1);
                    }
                    resetScreen(true);

                    enemy.selectCard.classList.remove('selected');
                    enemy.selectCard.classList.add('turn-over');
                    enemy.selectCard = null;
                    enemy.selectCardData = null;
                    return;
                } else if(data.mine){
                    return;
                }
                if(data.field){
                    cloneNode.parentNode.parentNode.querySelectorAll('.card').forEach(function(card){
                        card.classList.remove('selected');
                    })
                    cloneNode.classList.add('selected');
                    enemy.selectCard = cloneNode;
                    enemy.selectCardData = data;
                } else {
                    deckToField(data, turn);
                }
            }
        })
        dom.append(cloneNode);
    }
    function deckToField(data, myTurn){
        var object = myTurn ? my : enemy;
        var cost = Number(object.cost.textContent);
        if(cost < data.cost){
            return;
        } else {
            object.cost.textContent -= data.cost;
        }
        var idx = object.deckData.indexOf(data);
        object.deckData.splice(idx, 1);
        object.fieldData.push(data);
        object.deck.innerHTML = '';
        object.field.innerHTML = '';
        object.fieldData.forEach(function(data){
            cardDomConect(data, object.field);
        });
        object.deckData.forEach(function(data){
            cardDomConect(data, object.deck);
        })
        data.field = true;
    }
    function resetScreen(where){
        var object = where ? my : enemy;
        object.hero.innerHTML = '';
        cardDomConect(object.heroData, object.hero, true);

        object.field.innerHTML = '';
        object.fieldData.forEach(function(card){
            cardDomConect(card, object.field, false);
        })
    }

    function makeEnemyDeck(count){
        for(var i=0; i<count; i++){
            enemy.deckData.push(cardFactory(false, false));
        }
        enemy.deck.innerHTML = '';
        enemy.deckData.forEach(function(card){
            cardDomConect(card, enemy.deck, false);
        });
    }
    function makeMyDeck(count){
        for(var i=0; i<count; i++){
            my.deckData.push(cardFactory(false, true));
        }
        my.deck.innerHTML = '';
        my.deckData.forEach(function(card){
            cardDomConect(card, my.deck, false);
        });
    }
    function makeEnemyHero(){
        enemy.heroData = cardFactory(true, false);
        cardDomConect(enemy.heroData, enemy.hero, true);
    }
    function makeMyHero(){
        my.heroData = cardFactory(true, true);
        cardDomConect(my.heroData, my.hero, true);
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
            this.cost = 0;
            this.field = true;
            this.hero = true;
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
