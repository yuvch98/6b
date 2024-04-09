let game = null;
let myTimer;
let firstName;
let secondName;
let Suits = {
    Clubs: 1,
    Diamonds: 2,
    Hearts: 3,
    Spades: 4
}

function Card(number, suit) {
    this.number = number;
    this.suit = suit;
}

function Player(name) {
    this.name = name;
    this.cards = [];
}

function Game(name1, name2) {
    this.player1 = new Player(name1);
    this.player2 = new Player(name2);

    this.cashierStack = [];
    this.trashStack = [];
    this.activePlayer = this.player1;
    this.deal = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 13; j++) {
                this.cashierStack.push(new Card(j + 1, Suits[Object.keys(Suits)[i]]));
            }
        }
        this.cashierStack.push(new Card(14, 3));
        this.cashierStack.push(new Card(14,1));
        let currentIndex = this.cashierStack.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cashierStack[currentIndex], this.cashierStack[randomIndex]] = [
                this.cashierStack[randomIndex], this.cashierStack[currentIndex]];
        }
        for (var i = 0; i < 13; i++) {
            this.player1.cards.push(this.cashierStack.pop());
            this.player2.cards.push(this.cashierStack.pop());
        }
        this.trashStack.push(this.cashierStack.pop());
    }
}

function Insert() {
    if (localStorage.getItem("game", JSON.stringify(game)) != null) {
        let you = JSON.parse(localStorage.getItem("game", JSON.stringify(game)));
        game = you;
        if (game.player1.name == document.getElementById("name1").value && game.player2.name == document.getElementById("name2").value) {
            if (game.player1.cards.length == 14) {
                game.activePlayer = game.player1;
            }
            else {
                game.activePlayer = game.player2;
            }
            var node = document.getElementById("container");
            node.innerHTML = "";
            createTable();
            return;
        }
 
    }
    firstName = document.getElementById("name1").value;
    secondName = document.getElementById("name2").value;
    if (firstName == "" || secondName == "") {
        alert("Please fill The 2 Name Fields");
        return;
    }
    game = new Game(firstName, secondName);
    game.deal();
    startGame();
}
function startGame() {
    document.getElementById("opening").style.display = "none";
    this.createTable();
}
function btnClick() {
    game = null;
    game = new Game(firstName, secondName);
    game.deal();
    document.getElementById("div1").style.display = "none";
    createTable();
}
function createTable() {
    localStorage.setItem("game", JSON.stringify(game))
    let sum = 0;
    let s = game.player1.cards[0].suit;
    for (var i = 0; i < game.player1.cards.length; i++) {
        if (game.player1.cards[i].suit == s&&game.player1.cards[i].number!=14) {
            sum++;
        }
    }
    for (var i = 0; i < game.player1.cards.length; i++) {
        if (game.player1.cards[i].number==14) {
            sum++;
        }
    }
    if (sum == 13) {
        var node = document.getElementById("container");
        node.innerHTML = "";
        let h1 = document.createElement('h1');
        h1.innerHTML = game.player1.name + " Win The Game !!!!!"
        let win = document.createElement('div');
        let btn = document.createElement('input');
        btn.type = "button";
        btn.value = "Click To Restart";
        btn.onclick = btnClick;
        let div1 = document.createElement('div');
        div1.id = "div1";
        div1.append(h1);
        div1.append(btn);
        node.append(div1);
        return;
    }
    let sum1 = 0;
    s = game.player2.cards[0].suit;
    for (var i = 0; i < game.player2.cards.length; i++) {
        if (game.player2.cards[i].suit == s&&game.player2.cards[i].number!=14) {
            sum1++;
        }
    }
    for (var i = 0; i < game.player2.cards.length; i++) {
        if (game.player2.cards[i].number==14) {
            sum1++;
        }
    }
    if (sum1 == 13) {
        var node = document.getElementById("container");
        node.innerHTML = "";
        let h1 = document.createElement('h1');
        h1.innerHTML = game.player2.name + " Win The Game !!!!!"
        let win = document.createElement('div');
        let btn = document.createElement('input');
        btn.type = "button";
        btn.value = "Click To Restart";
        btn.onclick = btnClick;
        let div1 = document.createElement('div');
        div1.id = "div1";
        div1.append(h1);
        div1.append(btn);
        node.append(div1);
        return;

    }
    if (sum != 13) {
        document.body.style.backgroundImage = "url('images/table1.jpg')";
        let container = document.getElementById("container");
        let plr1div = document.createElement('div');
        let plr2div = document.createElement('div');
        game.player1.cards
        plr1div.id = "player1div";
        plr2div.id = "player2div";
        let plr1h1 = document.createElement('h1');
        plr1h1.id = "player1h1";
        plr1h1.innerHTML = game.player1.name + " Cards :";
        plr1div.append(plr1h1);
        let imgs = [];
        for (var i = 0; i < game.player1.cards.length; i++) {
            let img = document.createElement('img');
           if (game.player1.cards[i].number==14) {
            if (game.player1.cards[i].suit==1) {
                img.src = "images/black_joker.png";
            }
            else{
                img.src = "images/red_joker.png";
            }
           }
           else{
            img.src = "images/" + game.player1.cards[i].number + "_of_" + Object.keys(Suits)[game.player1.cards[i].suit - 1].toLowerCase() + ".png";
           }
           
            img.id = String(game.player1.cards[i].number) + String(Suits[Object.keys(Suits)[game.player1.cards[i].suit - 1]]);
            imgs.push(img);
        }
        for (var i = 0; i < imgs.length; i++) {
            plr1div.append(imgs[i]);
        }
      
        let plr2h1 = document.createElement('h1');
        plr2h1.id = "player2h1";
        plr2h1.innerHTML = game.player2.name + " Cards :";
        plr2div.append(plr2h1);
        imgs = [];
        for (var i = 0; i < game.player2.cards.length; i++) {
            let img = document.createElement('img');
            img.src = "images/back@2x.png";
            img.id = String(game.player2.cards[i].number) + String(Suits[Object.keys(Suits)[game.player2.cards[i].suit - 1]]);
            imgs.push(img);

        }
        for (var i = 0; i < imgs.length; i++) {
            plr2div.append(imgs[i]);
        }
        container.append(plr1div);
        container.append(plr2div);
        let cashierDiv = document.createElement('div');
        if (game.activePlayer == game.player1) {

        cashierDiv.onclick = pickCashier;
        }
        let casherh1 = document.createElement('h1');
        casherh1.innerHTML = "Casiher Stack";
        let cashImg = document.createElement('img');
        cashImg.src = "images/back@2x.png";
        cashierDiv.append(casherh1);
        cashierDiv.append(cashImg);
        container.append(cashierDiv);
        if (game.trashStack.length != 0) {
            let trashDiv = document.createElement('div');
            if (game.activePlayer == game.player1) {
            trashDiv.onclick = pickTrash;
            }
            let trashrh1 = document.createElement('h1');
            trashrh1.innerHTML = "Trash Stack";
            let trashImg = document.createElement('img');
            if (game.trashStack[game.trashStack.length-1].number==14) {
                if (game.trashStack[game.trashStack.length-1].suit==1) {
                    trashImg.src = "images/black_joker.png";
                }
                else{
                    trashImg.src = "images/red_joker.png";
                }
            }
            else{
                trashImg.src = "images/" + game.trashStack[game.trashStack.length - 1].number + "_of_" + Object.keys(Suits)[(game.trashStack[game.trashStack.length - 1].suit) - 1].toLowerCase() + ".png";
            }
            
            trashDiv.append(trashrh1);
            trashDiv.append(trashImg);
            container.append(trashDiv);
        }
        
        if (game.activePlayer == game.player1) {
                for (var i = 0; i < document.getElementById("player1div").querySelectorAll('img').length; i++) {
                    document.getElementById("player1div").querySelectorAll('img')[i].onclick = LostCard;

                }

            document.getElementById("player1h1").style.backgroundColor = "green";
            document.getElementById("player2h1").style.backgroundColor = "none";
            let p = document.createElement('p');
            p.id = "p";
            let counter = 0;
            document.getElementById("player1div").append(p);
            clearInterval(myTimer);
            function clock() {
                myTimer = setInterval(myClock, 1000);
                var c = 10; 
                function myClock() {
                    c--;
                    var seconds = c  
                    p.innerHTML ="You Have More "+c+" Seconds";
                    if (c == 0) {
                        clearInterval(myTimer);
                        if (game.player1.cards.length==13) {
                            pickCashier();
                            clearInterval(myTimer);
                            var node = document.getElementById("container");
                            node.innerHTML = "";
                            c = 10;
                            localStorage.setItem("game", JSON.stringify(game))
                            createTable();
                            return;
                        }
                            game.trashStack.push(game.player1.cards.pop());
                            var node = document.getElementById("container");
                            node.innerHTML = "";
                        game.activePlayer = game.player2;
                        localStorage.setItem("game", JSON.stringify(game))
                            createTable();
                            clearInterval(myTimer);
                            return;
                        
                    
                    }
                }
            }

            clock();
        }
        else {
            document.getElementById("player2h1").style.backgroundColor = "green";
            document.getElementById("player1h1").style.backgroundColor = "none";
            computerPlay();
        }
        
    }
}
function startTimer() {
    let div = document.getElementById("player1div");
    let p = document.createElement('p');
    p.id = "p";
    div.append(p);
    for (var i = 0; i < 5; i++) {
        setTimeout(function () {
            p.innerText = i;
        })
    }
}

function pickCashier() {

    if (game.cashierStack.length == 0) {
        alert("the cashier stack is empty , But The Trash Card Are Relevante");
        let currentIndex = game.trashStack.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [game.trashStack[currentIndex], game.trashStack[randomIndex]] = [
                game.trashStack[randomIndex], game.trashStack[currentIndex]];
        }
        return;
    }

    let activePlayer = game.activePlayer;
    if (activePlayer.cards.length == 14) {
        alert("you must remove 1 of your cards!");
        return;
    }
    activePlayer.cards.push(game.cashierStack.pop());
    if (activePlayer == game.player1) {
        game.player1.cards = activePlayer.cards;
    }
    else {
        game.player2.cards = activePlayer.cards;
    }
    var node = document.getElementById("container");
    node.innerHTML = "";
    localStorage.setItem("game", JSON.stringify(game))
    createTable();

   
  
}
function computerPlay(){
    let counter=0;
    let counters=[];

    for (let i = 1;i<5; i++) {
         for (let j = 0; j <game.player2.cards.length; j++) {
            if (game.player2.cards[j].number!=14) {
                if (game.player2.cards[j].suit==i) {
                    counter++;
                 }
            }
           }
           counters.push(counter);
           counter=0;
    }
    let max=0;
    let maxSuit=0;
    for (let i = 0; i < counters.length; i++) {
    if (counters[i]>max) {
        max=counters[i];
        maxSuit=i+1;
    }
}

        console.log("sadasd");
        if(game.player2.cards.length == 13){
            if (game.trashStack[game.trashStack.length-1].suit==maxSuit||game.trashStack[game.trashStack.length-1].number==14) {
               
                setTimeout(pickTrash,3000);
            }
            else {
               setTimeout(pickCashier,3000);
            }
        }
    
    let x = 0;
    setTimeout(function () {
        if (game.player2.cards.length == 14) {
            for (let i = 0; i < game.player2.cards.length; i++) {
                console.log(game.player2.cards);
                if (game.player2.cards[i].suit != maxSuit || game.player2.cards[i].number != 14) {
                    x = x + 1;
                    let card = game.player2.cards[i];
                    game.player2.cards.splice(i, 1);
                    game.trashStack.push(card);
                    console.log(game.trashStack);

                }
                if (x != 0) {
                    var node = document.getElementById("container");
                    node.innerHTML = "";
                    console.log(x);
                    game.activePlayer = game.player1;
                    localStorage.setItem("game", JSON.stringify(game))
                    createTable();
                    return;
                }

            }
       
    }
    }, 4000);
}
function pickTrash() {
    if (game.trashStack.length == 0) {
        alert("the Trash stack is empty");
        return;
    }

    let activePlayer = game.activePlayer;
    if (activePlayer.cards.length == 14) {
        alert("you must remove 1 of your cards!");
        return;
    }
    activePlayer.cards.push(game.trashStack.pop());
    if (activePlayer == game.player1) {
        game.player1.cards = activePlayer.cards;
    }
    else {
        game.player2.cards = activePlayer.cards;
    }
    var node = document.getElementById("container");
    node.innerHTML = "";
    localStorage.setItem("game", JSON.stringify(game))
    createTable();

    if (game.activePlayer.name == game.player1.name) {
        for (var i = 0; i < document.getElementById("player1div").querySelectorAll('img').length; i++) {
            document.getElementById("player1div").querySelectorAll('img')[i].onclick = LostCard;

        }
    }
 
}
function LostCard() {
    let id = this.id;
    let card = new Card(Math.floor(id / 10), Math.floor(id % 10));
    
    let ac = game.activePlayer;
    let index = 0;
    if (ac.cards.length==14) {
        game.trashStack.push(card);
        if (ac == game.player1) {
            for (var i = 0; i < game.player1.cards.length; i++) {
                if (card.number == game.player1.cards[i].number && card.suit == game.player1.cards[i].suit) {
                    index = i;
                }
            }
            game.player1.cards.splice(index, 1);
            game.activePlayer = game.player2;
        }
        else {
            console.log(game.player2.cards);
            console.log(card);
            for (var j = 0; j < game.player2.cards.length; j++) {
                if (card.number == game.player2.cards[j].number && card.suit == game.player2.cards[j].suit) {
                    index = j;
                }
            }
    
            game.player2.cards.splice(index, 1);
            game.activePlayer = game.player1;
        }
        
    }
    else{
        alert("Pick a Card First!");
    }
    var node = document.getElementById("container");
    node.innerHTML = "";
    localStorage.setItem("game", JSON.stringify(game))
    createTable();

}