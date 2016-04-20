var selectedMatchEmList;
var selectedValue1;
var selectedValue2;
var selectedButton1 = "";
var selectedButton2 = "";
var matches;
var point;
var Streak;

var path = "gameImgFiles/";
var defaultImg = "defaultIcon.png";
var cardAudio = "audio/card.wav";
var coinAudio = "audio/coin.wav";



function Gameinit() {
    point = 0;
    matches = 0;
    Streak = 1;
    document.getElementById("Point").innerHTML = "Point: " + point;
    document.getElementById("Matches").innerHTML = "Par: " + matches;
    document.getElementById("Streak").innerHTML = "Streak: " + Streak + "x Point";
    selectedValue1 = "";
    selectedValue2 = "";
    selectedButton1 = "";
    selectedButton2 = "";

    
    var matchEmList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png","11.png","12.png"];
    matchEmList = shuffle(matchEmList);
    selectedMatchEmList = [
        matchEmList[0],
        matchEmList[1],
        matchEmList[2],
        matchEmList[3],
        matchEmList[4],
        matchEmList[5],
        matchEmList[6],
        matchEmList[7],
        matchEmList[8],
        matchEmList[9],
        matchEmList[0],
        matchEmList[1],
        matchEmList[2],
        matchEmList[3],
        matchEmList[4],
        matchEmList[5],
        matchEmList[6],
        matchEmList[7],
        matchEmList[8],
        matchEmList[9]

    ];
    selectedMatchEmList = shuffle(selectedMatchEmList);
    var getMatchEmBtns = document.getElementsByClassName("MatchButtons");
    var getMathLength = getMatchEmBtns.length;
    for (var i = 0; i < getMathLength; i++) {
        getMatchEmBtns[i].addEventListener("click",MatchEmButton_OnClick,false);
        getMatchEmBtns[i].style.backgroundImage = "url('" + path + defaultImg + "')";
    }
   
};
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function MatchEmButton_OnClick() {
    var id = this.id;
    if (selectedButton1 === "" && selectedButton2 === "") {
        var firstButtonID = parseInt(id.substring(5, id.length));
        var cardSound1 = new Audio(cardAudio);
        cardSound1.play();
        document.getElementById(id).classList.add("flipped");
        setTimeout(function () {
            document.getElementById(id).classList.remove("flipped");
            document.getElementById(id).style.backgroundImage = "url('" + path + selectedMatchEmList[firstButtonID - 1] + "')";
        }, 350);
        
        
        selectedButton1 = id;
        selectedValue1 = selectedMatchEmList[firstButtonID - 1];
        document.getElementById(id).removeEventListener("click",MatchEmButton_OnClick);

    }else if (selectedButton2 === "") {
        var secondButtonID = parseInt(id.substring(5, id.length));
        var cardSound2 = new Audio(cardAudio);
        cardSound2.play();
        document.getElementById(id).classList.add("flipped");
        setTimeout(function () {
            document.getElementById(id).classList.remove("flipped");
            document.getElementById(id).style.backgroundImage = "url('" + path + selectedMatchEmList[secondButtonID - 1] + "')";
        }, 350);
        
        selectedButton2 = id;
        selectedValue2 = selectedMatchEmList[secondButtonID - 1];
        document.getElementById(id).removeEventListener("click", MatchEmButton_OnClick);
        if (selectedValue1 === selectedValue2) {
            setTimeout(function() {
                var coinSound = new Audio(coinAudio);
                coinSound.play();
            }, 700);
            matches++;
            point = point + (2 * Streak);
            Streak++;
            document.getElementById("Point").innerHTML = "Point: " + point;
            document.getElementById("Matches").innerHTML = "Par: " + matches;
            document.getElementById("Streak").innerHTML = "Streak: " + Streak + "x Point";
            selectedButton1 = "";
            selectedButton2 = "";
            selectedValue1 = "";
            selectedValue2 = "";
            if (matches === selectedMatchEmList.length / 2) {
                
                alert("Spillet er færdigt din score er: " + point);
            }
        } else {
            Streak = 1;
            point--;
            document.getElementById("Point").innerHTML = "Point: " + point;
            document.getElementById("Streak").innerHTML = "Streak: " + Streak + "x Point";
            
            var revertButton1 = selectedButton1;
            var revertButton2 = selectedButton2;
            var revertValue1 = selectedValue1;
            var revertValue2 = selectedValue2;
            selectedButton1 = "";
            selectedButton2 = "";
            selectedValue1 = "";
            selectedValue2 = "";
            setTimeout(function() {
                document.getElementById(revertButton1).addEventListener("click", MatchEmButton_OnClick, false);
                document.getElementById(revertButton2).addEventListener("click", MatchEmButton_OnClick, false);
                var cardSoundRevert1 = new Audio(cardAudio);
                cardSoundRevert1.play();
                var cardSoundRevert2 = new Audio(cardAudio);
                cardSoundRevert2.play();
                document.getElementById(revertButton1).classList.add("flippedBack");
                document.getElementById(revertButton2).classList.add("flippedBack");
                setTimeout(function() {
                    document.getElementById(revertButton1).classList.remove("flippedBack");
                    document.getElementById(revertButton2).classList.remove("flippedBack");
                    document.getElementById(revertButton1).style.backgroundImage = "url('" + path + defaultImg + "')";
                    document.getElementById(revertButton2).style.backgroundImage = "url('" + path + defaultImg + "')";
                    
                }, 350);
            }, 1000);
        }
    }
   
    
    
}