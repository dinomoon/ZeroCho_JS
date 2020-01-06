window.addEventListener('load', function(){
    var enemyDeck = document.querySelector('.enemy-deck');
    var enemyField = document.querySelector('.enemy-field');
    var enemyHero = document.querySelector('.enemy-hero');
    var enemyCost = document.querySelector('.enemy-hero .cost');
    var enemyDeckData = [];
    var enemyFieldData = [];

    var myDeck = document.querySelector('.my-deck');
    var myField = document.querySelector('.my-field');
    var myHero = document.querySelector('.my-hero');
    var myCost = document.querySelector('.my-hero .cost');
    var myDeckData = [];
    var myFieldData = [];

    function Card(){
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }

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

    makeMyDeck(5);
    makeEnemyDeck(5);
    function cardDomConnect(data, where){
        var template = document.querySelector('template');
        var cloneCard = document.importNode(template.content, true);
        var info = cloneCard.querySelectorAll('span');
        info[0].textContent = data.cost;
        info[1].textContent = data.att;
        info[2].textContent = data.hp;
        
        where.append(cloneCard);
    }
})