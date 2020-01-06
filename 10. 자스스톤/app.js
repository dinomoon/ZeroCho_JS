// var rivalHero = document.getElementById('rival-hero');
// var rivalCost = document.getElementById('rival-cost');
// var rivalDeck = document.getElementById('rival-deck');
// var rivalField = document.getElementById('rival-field');
// var rivalHeroData;
// var rivalDeckData = [];
// var rivalFieldData = [];

var rival = {
    hero: document.getElementById('rival-hero'),
    cost: document.getElementById('rival-cost'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-field'),
    heroData: [],
    deckData: [],
    fieldData: [],
    selectCard: null,
    selectCardData: null,
};

// var myHero = document.getElementById('my-hero');
// var myCost = document.getElementById('my-cost')
// var myDeck = document.getElementById('my-deck');
// var myField = document.getElementById('my-field');
// var myHeroData;
// var myDeckData = [];
// var myFieldData = [];

var my = {
    hero: document.getElementById('my-hero'),
    cost: document.getElementById('my-cost'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-field'),
    heroData: [],
    deckData: [],
    fieldData: [],
    selectCard: null,
    selectCardData: null,
};

var turn = true;
var turnBtn = document.getElementById('turn-btn');

function deckToField(data, myturn){
    //NOTE
    //뭔가 신박한 방법..
    var object = myturn ? my : rival;
    var cost = Number(object.cost.textContent);
    if(cost < data.cost){ //남은 코스트가 뽑으려는 카드의 코스트보다 작으면 end리턴
        return 'end';
    }
    //덱에 있는 카드의 정보를 deckData에서 없애고 fieldData에 넣기
    var idx = object.deckData.indexOf(data);
    object.deckData.splice(idx, 1);
    object.fieldData.push(data);
    //정보가 바뀌었으니 화면 다시 그리기
    object.deck.innerHTML ='';
    object.field.innerHTML ='';
    object.deckData.forEach(function(data){
        cardDomConect(data, object.deck);
    });
    object.fieldData.forEach(function(data){
        cardDomConect(data, object.field);
    });
    data.field = true;
    object.cost.textContent = cost - data.cost;
}

function paintScreenAgain(myScreen){
    var object = myScreen ? my : rival;
    object.deck.innerHTML = '';
    object.field.innerHTML = '';
    object.hero.innerHTML = '';
    object.fieldData.forEach(function(data){
        cardDomConect(data, object.field);
    });
    object.deckData.forEach(function(data){
        cardDomConect(data, object.deck);
    });
    cardDomConect(object.heroData, object.hero, true);
}

//NOTE
//카드들을 만들고 클릭 이벤트 연결하기
function cardDomConect(data, dom, hero){
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if (hero){
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click', function(){
        if(turn){
            //내 턴인데 상대방 카드를 클릭했을 때;
            if(!data.mine){
                return;
            }
            if(!data.mine && my.selectCard){
                data.hp = data.hp - my.selectCardData.att;
                my.selectCardData.hp = my.selectCardData.hp - data.att;
                if(data.hp <= 0) {
                    var idx = rival.fieldData.indexOf(data);
                    if(idx > -1) { //하수인이 죽었을 때 
                        rival.fieldData.splice(idx, 1);
                    } else { //영웅이 죽었을 때
                        alert("승리!");
                        setting();
                    }
                }
                paintScreenAgain(false);
                my.selectCard.classList.remove('card-selected');
                my.selectCard.classList.add('card-turnover');
                my.selectCard = null;
                my.selectCardData = null;
                return;
            }
            if(data.field){ //클릭한 카드가 필드에 있는 카드일 때
                //카드 하나만 선택할 수 있게 모든 카드의 card-selected클래스 없애고 클릭 대상만 추가하기
                card.parentNode.querySelectorAll('.card').forEach(function(card){
                    card.classList.remove('card-selected');
                })
                card.classList.add('card-selected');
                my.selectCard = card;
                my.selectCardData = data;
            } else { //클릭한 카드가 덱에 있는 카드일 때
                if(deckToField(data, true) !== 'end')
                    makeMyDeck(1);
            }
        } else {
            //상대방이 내 카드를 클릭했을 때;
            if(card.classList.contains('card-turnover')){
                return;
            }
            if(data.mine && rival.selectCard){
                data.hp = data.hp - rival.selectCardData.att;
                rival.selectCardData.hp = rival.selectCardData.hp - data.att;
                if(data.hp <= 0) {
                    var idx = my.fieldData.indexOf(data);
                    if(idx > -1) { //하수인이 죽었을 때 
                        my.fieldData.splice(idx, 1);
                    } else { //영웅이 죽었을 때
                        alert("패배!");
                        setting();
                    }
                }
                paintScreenAgain(true);
                rival.selectCard.classList.remove('card-selected');
                rival.selectCard.classList.add('card-turnover');
                rival.selectCard = null;
                rival.selectCardData = null;
                return;
            }
            if(data.field){
                card.parentNode.querySelectorAll('.card').forEach(function(card){
                    card.classList.remove('card-selected');
                })
                card.classList.add('card-selected');
                rival.selectCard = card;
                rival.selectCardData = data;
            } else {
                if(deckToField(data, false) !== 'end')
                    makeRivalDeck(1);
            }
        }
    })
    dom.appendChild(card);
}
function makeRivalDeck(count){
    for(var i=0; i<count; i++){
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach(function(data){
        cardDomConect(data, rival.deck);
    })
}
function makeMyDeck(count){
    for(var i=0; i<count; i++){
        my.deckData.push(cardFactory(false, true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach(function(data){
        cardDomConect(data, my.deck);
    })
}
function makeRivalHero(){
    rival.heroData = cardFactory(true);
    cardDomConect(rival.heroData, rival.hero, true);
}
function makeMyHero(){
    my.heroData = cardFactory(true, true);
    cardDomConect(my.heroData, my.hero, true);
}
function setting(){
    makeRivalDeck(5);
    makeMyDeck(5);
    makeRivalHero();
    makeMyHero();
    paintScreenAgain(true);
    paintScreenAgain(false);
}
function Card(hero, myCard){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = 30;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if(myCard){
        this.mine = true;
    }
}

function cardFactory(hero, myCard){
    return new Card(hero, myCard);
}
setting();

turnBtn.addEventListener('click', function(){
    var object = turn ? my : rival;
    object.field.innerHTML = '';
    object.hero.innerHTML = '';
    object.fieldData.forEach(function(data){
        cardDomConect(data, object.field);
    });
    cardDomConect(object.heroData, object.hero, true);
    turn = !turn;
    if(turn){
        my.cost.textContent = 10;
    } else {
        rival.cost.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
})