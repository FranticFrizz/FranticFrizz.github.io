var Chessboard = class Chessboard {
    constructor(boardRow, boardCol) {
        this.letters = "abcdefgh";
        this.height = boardRow * 100;
        this.width = boardCol * 100;
        this.row = boardRow;
        this.col = boardCol;
        this.playingVS = 'vsai';


        this.initialPos = {
            "white": {
                "queen": ["a1"],
                "king": ["b1"],
                "pawn": ["c1"],
                "bishop": ["a2"],
                "rook": ["c2"]
            }, "black": {
                "queen": ["a5"],
                "king": ["b5"],
                "pawn": ["c5"],
                "bishop": ["a4"],
                "rook": ["c4"]
            }
        };

        var self = this;
        self.clicked_piece;
        self.terminalT = document.getElementById("TerminalText");
        self.prepPiece = 0;
        self.currentTurn = 'white';
        self.gamestate = 'play';
        self.timerLength = document.getElementById("Timer").value * 1000 * 60;
        self.whiteTimer = self.timerLength;
        self.blackTimer = self.timerLength;
        self.timerIncrease = document.getElementById("TimerIncrease").value * 1000;

        self.difficulty = document.getElementById("StyledSelect").options[document.getElementById("StyledSelect").selectedIndex].value;
        self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' is starting';
        this.sq_borderwidth = 2;


        this.createBoard();


    }
    saveSettings() {
        self.timerLength = document.getElementById("Timer").value * 1000 * 60;
        self.timerIncrease = document.getElementById("TimerIncrease").value * 1000;
        self.difficulty = document.getElementById("StyledSelect").options[document.getElementById("StyledSelect").selectedIndex].value;
        console.log("Settings saved. " + self.timerLength + " " + self.timerIncrease + " " + self.difficulty);

    }
    startTimer() {
        self = this;

        self.ongoing = setInterval(function () {
            var timer;

            if (self.currentTurn == 'white') {
                timer = 'whiteTimer';
            }
            if (self.currentTurn == 'black') {
                timer = 'blackTimer';
            }

            var hours = Math.floor((self[timer] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((self[timer] % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((self[timer] % (1000 * 60)) / 1000);

            if (seconds.toString().length == 1) {
                seconds = "0" + seconds;
            }
            if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
            }
            if (hours.toString().length == 1) {
                hours = "0" + hours;
            }

            document.getElementById("timerWindow").innerHTML = hours + ":" + minutes + ":" + seconds;

            if (self[timer] <= 0) {
                clearInterval(self.ongoing);
                self.terminalT.innerHTML = "Your time has ended. Game lost.";
                self.currentTurn = 'none';
            }
            if (self.gamestate == 'play') {
                self[timer] = self[timer] - 1000;
            }


        }, 1000);
    }
    pauseTimer() {
        if (self.gamestate == 'play') self.gamestate = 'paused';
        else if (self.gamestate == 'pause') self.gamestate = 'play';
    }
    newGame() {
        self = this

        document.getElementsByClassName("piece").remove();

        self.playingVS = $("input[type=radio][name=ngame]:checked").val();
        self.currentTurn = $("input[type=radio][name=nside]:checked").val();
        if (self.ongoing)
             clearInterval(self.ongoing);
        $('#timerWindow').removeClass('blackTimer');
        self.whiteTimer = self.timerLength;
        self.blackTimer = self.timerLength;
        self.terminalT.innerHTML = 'put king piece';
        self.gamestate = 'prep';
        this.startTimer();
        
        boardResize();
        
    }
    createBoard() {

        for (var i = 0; i < this.row * this.col; i++) {

            var square = document.createElement("div");
            square.classList.add('square');

            square.classList.add('unselectable');

            square.onclick = this.handleSquareClick;
            square.id = this.letters[i % this.col] + (this.row - parseInt(i / this.col));
       
            square.style.backgroundColor = i
                % 2 == 0 ? 'white' : '#c0c0c0';
            square.setAttribute("color", i
                % 2 == 0 ? 'white' : 'black');

            document.getElementById("mainChessBoard").appendChild(square);
            var number = document.createTextNode(square.id);

        }
        this.addPieces(this.initialPos);
        document.getElementById("mainChessBoard").style.display = 'block';
        self.currentTurn = 'None';
        self.gamestate = 'paused';
        document.getElementById("timerWindow").innerHTML = "00:00:00";
        this.terminalT.innerHTML = 'Welcome to HIDDENCHESS!<br>Please start a new game.'

    }

    addPieces(positions) { //Add pieces to board, positions of pieces as argument

        var wpawn = "img/pawn.png";
        var bpawn = "img/hidden.png";
        var wrook = "img/rook.png";
        var brook = "img/hidden.png";
        var wbishop = "img/bishop.png";
        var bbishop = "img/hidden.png";
        var wqueen = "img/mine.png";
        var bqueen = "img/hidden.png";
        var wking = "img/king.png";
        var bking = "img/hidden.png";

        var white_pawns = positions.white.pawn;
        var black_pawns = positions.black.pawn;
        var white_rooks = positions.white.rook;
        var black_rooks = positions.black.rook;
        var white_bishops = positions.white.bishop;
        var black_bishops = positions.black.bishop;
        var white_queen = positions.white.queen;
        var black_queen = positions.black.queen;
        var white_king = positions.white.king;
        var black_king = positions.black.king;

        var pawn_prior = 4;
        var rook_prior = 3;
        var bishop_prior = 2;
        var queen_prior = 1;
        var king_prior = 5;

        for (var x = 0; x < this.row; x++) {
            for (var i = 0; i < this.col; i++) {

                var id = this.letters[i] + (x + 1);
                var elem = document.createElement("img");

                if (white_pawns.indexOf(id) > -1) {
                    elem.setAttribute("src", wpawn);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "pawn");
                    elem.setAttribute("prior", pawn_prior);
                }
                else if (black_pawns.indexOf(id) > -1) {
                    elem.setAttribute("src", bpawn);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "pawn");
                    elem.setAttribute("prior", pawn_prior);
                }
                else if (white_rooks.indexOf(id) > -1) {
                    elem.setAttribute("src", wrook);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "rook");
                    elem.setAttribute("prior", rook_prior);
                }
                else if (black_rooks.indexOf(id) > -1) {
                    elem.setAttribute("src", brook);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "rook");
                    elem.setAttribute("prior", rook_prior);
                }
                else if (black_bishops.indexOf(id) > -1) {
                    elem.setAttribute("src", bbishop);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "bishop");
                    elem.setAttribute("prior", bishop_prior);
                }
                else if (white_bishops.indexOf(id) > -1) {
                    elem.setAttribute("src", wbishop);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "bishop");
                    elem.setAttribute("prior", bishop_prior);
                }
                else if (white_queen.indexOf(id) > -1) {
                    elem.setAttribute("src", wqueen);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "queen");
                    elem.setAttribute("prior", queen_prior);
                }
                else if (black_queen.indexOf(id) > -1) {
                    elem.setAttribute("src", bqueen);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "queen");
                    elem.setAttribute("prior", queen_prior);
                }
                else if (white_king.indexOf(id) > -1) {
                    elem.setAttribute("src", wking);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "king");
                    elem.setAttribute("prior", king_prior);
                }
                else if (black_king.indexOf(id) > -1) {
                    elem.setAttribute("src", bking);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "king");
                    elem.setAttribute("prior", king_prior);
                }
                else {
                    continue;
                }

                elem.className = "piece unselectable";
                elem.style.height = Number(document.getElementById("mainChessBoard").style.height.slice(0, -2)) / this.row - (2 * this.sq_borderwidth) + 'px';
                elem.style.width = Number(document.getElementById("mainChessBoard").style.width.slice(0, -2)) / this.col - (2 * this.sq_borderwidth) + 'px';

                var hmm = document.getElementById(id);
                hmm.appendChild(elem);

            }
        }
        //
    }


 
    handleSquareClick(e) {

        if (self.gamestate == 'prep') {
            if (!e.target.classList.contains('piece') && Number(e.target.getAttribute('id').slice(1)) <= 2) {
                switch(self.prepPiece) {
                    case 0:
                    var pos = {
                        "white": {
                            "queen": [""],
                            "king": [e.target.getAttribute('id')],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }, "black": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }
                    };
                    self.addPieces(pos);
                    self.prepPiece = 1;
                    self.terminalT.innerHTML = 'put rook piece';
                    break;
                    
                    case 1:
                    var pos = {
                        "white": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [e.target.getAttribute('id')]
                        }, "black": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }
                    };
                    self.addPieces(pos);
                    self.prepPiece = 2;
                    self.terminalT.innerHTML = 'put bishop piece';
                    break;
                    
                    case 2:
                    var pos = {
                        "white": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [e.target.getAttribute('id')],
                            "rook": [""]
                        }, "black": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }
                    };
                    self.addPieces(pos);
                    self.prepPiece = 3;
                    self.terminalT.innerHTML = 'put pawn piece';
                    break;
                    
                    case 3:
                    var pos = {
                        "white": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [e.target.getAttribute('id')],
                            "bishop": [""],
                            "rook": [""]
                        }, "black": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }
                    };
                    self.addPieces(pos);
                    self.prepPiece = 4;
                    self.terminalT.innerHTML = 'put mine piece';
                    break;
                    
                    case 4:
                    var pos = {
                        "white": {
                            "queen": [e.target.getAttribute('id')],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }, "black": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }
                    };
                    self.addPieces(pos);
                    self.prepPiece = 5;
                    self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' is starting';
                    var opTerritory = ["a5", "b5", "c5", "a4", "b4", "c4"]; /////////////////////////////////////////////////////////////////
                    var rArr = Array.from({length:6}, (v, i) => i);
                    rArr.sort(() => Math.random() - 0.5);
                    var pos = {
                        "white": {
                            "queen": [""],
                            "king": [""],
                            "pawn": [""],
                            "bishop": [""],
                            "rook": [""]
                        }, "black": {
                            "queen": [opTerritory[rArr[4]]],
                            "king": [opTerritory[rArr[0]]],
                            "pawn": [opTerritory[rArr[3]]],
                            "bishop": [opTerritory[rArr[2]]],
                            "rook": [opTerritory[rArr[1]]]
                        }
                    };
                    self.addPieces(pos);
                    self.gamestate = 'play';
                    if (self.currentTurn == "black") self.computerMove();
                }
                
            }
            return;
        }

        if (e.target == self.clicked_piece) {
            self.elementMoveEnd();
            self.clicked_piece = null;
            return;
        }

        if (e.target.classList.contains('piece') && e.target.getAttribute('side') == self.currentTurn) {
            self.elementMoveEnd();
            e.target.parentElement.classList.add('legal');
            self.clicked_piece = e.target;
            self.isLegalMove(e.target.parentElement, false);
        }

        else if (e.target.classList.contains('legal') || e.target.parentElement.classList.contains('legal')) {
                var isAlive = 1;
                if (e.target.classList.contains('piece') ) {
                    if (self.clicked_piece.getAttribute("side") != e.target.getAttribute("side")) {
                        if (e.target.getAttribute("type") != "queen") {
                            e.target.parentElement.appendChild(self.clicked_piece);
                            e.target.remove();
                        }
                        else {
                            self.clicked_piece.remove();
                        }

                        self.elementMoveEnd();

                        var pieces = document.getElementsByClassName("piece");
                        isAlive = 0;

                        for (var i = 0; i < pieces.length; i++) {

                            if (pieces[i].getAttribute("side") != self.currentTurn && pieces[i].getAttribute("type") == "king") {
                                isAlive++;
                            }
                        }

                        if (isAlive == 0) {
                            self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' Player Win!<br>Game Set.'
                            if (self.ongoing) clearInterval(self.ongoing);
                        }

                    }
                }
                else {
                    e.target.appendChild(self.clicked_piece);
                  
                    self.elementMoveEnd();
                }
                if (isAlive) {
                    if (self.clicked_piece.getAttribute("side") == 'white') {
                        self.whiteTimer = self.whiteTimer + self.timerIncrease;
                        self.currentTurn = 'black';
                        $('#timerWindow').addClass('blackTimer');
                    }
                    else {
                        self.blackTimer = self.blackTimer + self.timerIncrease;
                        self.currentTurn = 'white';
                        $('#timerWindow').removeClass('blackTimer');
                    }
                }
                else {
                    $('#timerWindow').removeClass('blackTimer');
                }
                self.clicked_piece = null;
                if (isAlive) self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' TURN';
                if (isAlive && self.playingVS == 'vsai' && self.currentTurn == 'black'){
                    self.computerMove();
                }


            }
            else {
                console.log('Opposite turn piece or empty square clicked withot legal class.');
            }
        

    }

    elementMoveEnd(e) {
        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) {

            squares[i].classList.remove("legal");
        }
    }

    markElement() {
        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) {

            if (squares[i].classList.contains('legal')) {
                squares[i].classList.remove("legal");
                squares[i].classList.add('marked');
            }
        }
    }

    unmarkElement() {
        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) {

            if (squares[i].classList.contains('marked')) {
                squares[i].classList.remove("marked");
            }
        }
    }

    isLegalMove(e, checkMovement) {

        var startPosition;

        var new_horiz;
        var new_vert;
        var new_pos;




        self = this;

        var piece_type = e.children[0].getAttribute("type");
        var side = e.children[0].getAttribute("side");
        if (self.gamestate != 'play') {
            return;
        }
        if (e.children[0].getAttribute("side") != self.currentTurn && !checkMovement) {
            return;
        }
        var current = e.id.match(/[a-zA-Z]+|[0-9]+/g);
        var horizontal = current[0];
        var vertical = current[1];

        var loop_enabler = true;


        var i = 1;

        self.skipup = false;
        self.skipdown = false;
        self.skipright = false;
        self.skipleft = false;

        self.skiprightup = false;
        self.skiprightdown = false;
        self.skipleftdown = false;
        self.skipleftup = false;


        var checkMove = function (ce, cposition) {

            if (cposition != null && !cposition.hasChildNodes()) {

                cposition.classList.add('legal');

                return false;
            }
            if (cposition != null && cposition.hasChildNodes()) {

                if ((cposition.children[0].getAttribute("side") != ce.children[0].getAttribute("side") && ce.children[0].getAttribute("type") != "queen") || checkMovement) {
                    cposition.classList.add('legal');


                }
                return true; 
            }
            return false;
        }

        var changeCoord = function (horizontal, vertical, moveset, i, skip, type) {


            switch (moveset) {

                case 1:
                    new_vert = parseInt(vertical) + i;
                    new_pos = horizontal + new_vert; //Position, i amount squares upwards
                    break;

                case 2:
                    new_vert = parseInt(vertical) - i;
                    new_pos = horizontal + new_vert; //Position, i amount squares downwards
                    break;

                case 3:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_pos = new_horiz + vertical; //Position, i amount squares right
                    break;

                case 4:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_pos = new_horiz + vertical; //Position, i amount squares left
                    break;

                case 5:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_vert = parseInt(vertical) + i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares rightup
                    break;

                case 6:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_vert = parseInt(vertical) - i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares rightdown
                    break;

                case 7:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_vert = parseInt(vertical) - i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares leftdown
                    break;

                case 8:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_vert = parseInt(vertical) + i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares leftup
                    break;


            }
            var position = document.getElementById(new_pos);
            if (position == null || checkMove(e, position)) {
                self[skip] = true;
            }
        }

        var rook_func = function () {

            do {

                if (!self.skipup) {

                    changeCoord(horizontal, vertical, 1, i, 'skipup', 'rook');
                }

                if (!self.skipdown) {

                    changeCoord(horizontal, vertical, 2, i, 'skipdown', 'rook');
                }

                if (!self.skipright) {

                    changeCoord(horizontal, vertical, 3, i, 'skipright', 'rook');
                }
                if (!self.skipleft) {

                    changeCoord(horizontal, vertical, 4, i, 'skipleft', 'rook');
                }


                if (self.skipdown && self.skipleft && self.skipright && self.skipup) {
                    break;
                }

                i++;
            } while (loop_enabler);
        }

        var bishop_func = function () {

            do {

                if (!self.skiprightup) {

                    changeCoord(horizontal, vertical, 5, i, 'skiprightup', 'bishop');
                }

                if (!self.skiprightdown) {

                    changeCoord(horizontal, vertical, 6, i, 'skiprightdown', 'bishop');
                }

                if (!self.skipleftdown) {

                    changeCoord(horizontal, vertical, 7, i, 'skipleftdown', 'bishop');
                }
                if (!self.skipleftup) {

                    changeCoord(horizontal, vertical, 8, i, 'skipleftup', 'bishop');
                }
                if (self.skiprightup && self.skiprightdown && self.skipleftdown && self.skipleftup) {
                    break;
                }

                i++;

            } while (loop_enabler);

        }
        if (piece_type == "rook") {
            loop_enabler = false;
            rook_func();
        }
        if (piece_type == "bishop") {
            loop_enabler = false;
            bishop_func();
        }
        if (piece_type == "queen" || piece_type == "king" || piece_type == "pawn") {
            loop_enabler = false;
            rook_func();
            i = 1;
            bishop_func();
        }



    }
    generateJSON() { //Generates JSON file from current positions of the board

        var positions = {
            white: {
            },
            black: {
            }
        }
        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) {

            if (squares[i].hasChildNodes()) {
                var type = squares[i].children[0].getAttribute("type");

                if (squares[i].children[0].getAttribute("side") == 'white') {
                    if (!([type] in positions.white)) {
                        positions.white[type] = [squares[i].id];
                    }
                    else {
                        positions.white[type].push(squares[i].id);
                    }
                }
                else if (squares[i].children[0].getAttribute("side") == 'black') {
                    if (!([type] in positions.black)) {
                        positions.black[type] = [squares[i].id];
                    }
                    else {
                        positions.black[type].push(squares[i].id);
                    }
                }
                else {
                    console.log('Should not happen.');
                }

            }


        }

        var boardJSON = JSON.stringify(positions);
        console.log(boardJSON);
        localStorage.setItem("testJSON", boardJSON);
        return boardJSON;

    }

    computerMove() {
        // var player_data = this.generateJSON();

        if (self.currentTurn == 'white') return;

        setTimeout(function() {

        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) {
            if (squares[i].children[0] !== null && squares[i].children[0] !== undefined) {
                if (squares[i].children[0].getAttribute("side") == 'white' && squares[i].children[0].getAttribute("type") != 'queen') self.isLegalMove(squares[i], true);
            }
        }

        self.markElement();

        var ind = Array.from(Array(self.row * self.col).keys()).sort(() => Math.random() - 0.5);
        var ind2;
        var lastS;
        var lastE;
        var lastPrior = -10;
        var ranS;
        var ranE;
        var ranSelected = 0;

        for (var i = 0; i < squares.length; i++) {

            if (squares[ind[i]].children[0] !== null && squares[ind[i]].children[0] !== undefined) {

                if (squares[ind[i]].children[0].getAttribute("side") == 'black') {

                    //squares[ind[i]].children[0].click();
                    self.isLegalMove(squares[ind[i]], false);
                    ind2 = Array.from(Array(self.row * self.col).keys()).sort(() => Math.random() - 0.5);

                    for (var j = 0; j < squares.length; j++) {

                        if (ind[i] == ind2[j]) continue;

                        if (squares[ind2[j]].children[0] == null || squares[ind2[j]].children[0] == undefined) {

                            if (squares[ind2[j]].classList.contains("legal")) {

                                if (ranSelected == 0) {
                                    ranS = squares[ind[i]].getAttribute("id");
                                    ranE = squares[ind2[j]].getAttribute("id");
                                    ranSelected = 1;
                                }

                                if (lastPrior < 0 && !squares[ind2[j]].classList.contains("marked")) {
                                    lastS = squares[ind[i]].getAttribute("id");
                                    lastE = squares[ind2[j]].getAttribute("id");
                                    lastPrior = 0;
                                }

                            }

                        } else {

                            if (squares[ind2[j]].classList.contains("legal") && squares[ind2[j]].children[0].getAttribute("side") == 'white') {

                                if (ranSelected == 0) {
                                    ranS = squares[ind[i]].getAttribute("id");
                                    ranE = squares[ind2[j]].getAttribute("id");
                                    ranSelected = 1;
                                }

                                if (squares[ind2[j]].children[0].getAttribute("prior") - squares[ind[i]].children[0].getAttribute("prior") > lastPrior) {
                                    lastS = squares[ind[i]].getAttribute("id");
                                    lastE = squares[ind2[j]].getAttribute("id");
                                    lastPrior = squares[ind2[j]].children[0].getAttribute("prior") - squares[ind[i]].children[0].getAttribute("prior");
                                }

                            }

                        }

                    }
                    self.elementMoveEnd();

                }

            }

        }

        self.unmarkElement();

        if (Math.random() < self.difficulty) {
            document.getElementById(lastS).children[0].click();
            if (document.getElementById(lastE).children[0] == null || document.getElementById(lastE).children[0] == undefined) document.getElementById(lastE).click();
            else document.getElementById(lastE).children[0].click();
        }
        else {
            document.getElementById(ranS).children[0].click();
            if (document.getElementById(ranE).children[0] == null || document.getElementById(ranE).children[0] == undefined) document.getElementById(ranE).click();
            else document.getElementById(ranE).children[0].click();
        }

        }, 500);
        
        

        fetch("http://52.79.61.17:8080/users/chess", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "asdsfasdf",
  }),
}).then((response) => console.log(response.json()));

    }

}