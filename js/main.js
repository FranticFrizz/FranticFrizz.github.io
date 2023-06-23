var boardRow = 5;
var boardCol = 3;

Element.prototype.remove = function() { this.parentElement.removeChild(this); }
NodeList.prototype.remove = function() { for (var i = this.length - 1; i >= 0; i--) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]); }
HTMLCollection.prototype.remove = function() { for (var i = this.length - 1; i >= 0; i--) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]); }

function shrinker(test) {

    var divs = document.getElementsByClassName("sidemenu");
    for (var i = 0; i < divs.length; i = i + 1) $(divs[i]).slideUp("slow");

    if ($(test).css("display") === "none") $(test).slideDown("slow");
    else $(test).slideUp("slow");
        
    var sliders = document.getElementsByClassName('SliderPopUp');
    for (var i = 0; i < sliders.length; i++) sliders[i].classList.remove("show");
    
}


function toggleSidebar() {

    if (!$(this).data('clicked')) {

        document.getElementById("sidebar").style.left = "-195px";

        var sliders = document.getElementsByClassName('SliderPopUp');

        for (var i = 0; i < sliders.length; i++) sliders[i].classList.remove("show");

        $(this).click(function() { $(this).data('clicked', true); });

        document.getElementsByClassName("closebtn")[0].innerHTML = '&gt;'

    } else {

        document.getElementById("sidebar").style.left = "0px";

        $(this).click(function() { $(this).data('clicked', false); });

        document.getElementsByClassName("closebtn")[0].innerHTML = '&lt;'

    }

}

function save() { chesstable.saveSettings(); }

function pauseGame() {

    if (!$("#mainChessBoard").hasClass('blur')){

        $("#pauseButton").html('CONTINUE');
        $("#mainChessBoard").addClass('blur');

    } else {

        $("#pauseButton").html('PAUSE');
        $("#mainChessBoard").removeClass('blur');

    }

    chesstable.pauseTimer();

}





var chesstable = new Chessboard(boardRow, boardCol);

var timerSlider = document.getElementById("Timer");
var timerValue = document.getElementById("TimerLength");
timerValue.innerHTML = timerSlider.value + "min";
timerSlider.oninput = function () { timerValue.innerHTML = this.value + "min"; }

var increaseSlider = document.getElementById("TimerIncrease");
var increaseValue = document.getElementById("IncreaseAmount");
increaseValue.innerHTML = increaseSlider.value + "s";
increaseSlider.oninput = function () { increaseValue.innerHTML = this.value + "s"; }

$("#TimerLength").click(function () { document.getElementById('TimerSlider').classList.toggle("show"); });

$("#IncreaseAmount").click(function () { document.getElementById('IncreaseSlider').classList.toggle("show"); });





function boardResize() {

    var winWidth = $(window).width();
    var winHeight = $(window).height();

    if ((winHeight - 376) * 3 >= winWidth * 5) {

        $('#mainChessBoard').width(winWidth * 0.9);
        $('#mainChessBoard').height(winWidth * 0.9 / 3 * 5);
        $('.square').width(winWidth * 0.9 / 3 - 4.01);
        $('.square').height(winWidth * 0.9 / 3 - 4.01);
        $('.piece').width(winWidth * 0.9 / 3 - 4.01);
        $('.piece').height(winWidth * 0.9 / 3 - 4.01);

    } else {

        $('#mainChessBoard').width((winHeight - 376) * 0.9 / 5 * 3);
        $('#mainChessBoard').height((winHeight - 376) * 0.9);
        $('.square').width((winHeight - 376) * 0.9 / 5 - 4.01);
        $('.square').height((winHeight - 376) * 0.9 / 5 - 4.01);
        $('.piece').width((winHeight - 376) * 0.9 / 5 - 4.01);
        $('.piece').height((winHeight - 376) * 0.9 / 5 - 4.01);

    }

}

window.onload = (event) => {

    document.getElementById("sidebar").style.left = "0px";
    boardResize();
    $.ajax({
        url: 'https://hidden-chess-proxy-19df82248288.herokuapp.com/http://52.79.61.17:8080/test',
        type: 'GET',
        async: true,
        complete: function (data) {
            if (data.status == 200) document.getElementById("sStatusText").innerHTML = "Server Status: OK";
            else document.getElementById("sStatusText").innerHTML = "Server Status: OFFLINE";
        }
    });

};

$(window).resize(function(){boardResize();});

