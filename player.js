var player;
var intv;
var slider;
var xmlDoc;

function loadXML() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "songs.xml", true);
    xhttp.send();
}

function myFunction(xml) {
    xmlDoc = xml.responseXML;
    var elementsArray = xmlDoc.getElementsByTagName("composition");

    var length = elementsArray.length;
    var output = "<table>";
    for(var i=0; i < length; i++) {
        
        var title = elementsArray[i].getElementsByTagName('title')[0].firstChild.nodeValue;
        var composer = elementsArray[i].getElementsByTagName('composer')[0].firstChild.nodeValue;
        var time = elementsArray[i].getElementsByTagName('time')[0].firstChild.nodeValue;
        var filename = elementsArray[i].getElementsByTagName('filename')[0].firstChild.nodeValue;
        output += "<tr>";
        output += ("<td onclick='songSelect(\"" + filename + "\")'>" + title + " By : " + composer + "</td>");
        output += "</tr>"
        //console.log(title + " " + composer + " " + time + " " + filename);
    }
    output += "</table>"
    document.getElementById("musicList").innerHTML = output;
}

function songSelect(fileName) {
    document.getElementById('player').src = fileName;
    console.log(fileName);
    playMusic();
}

//init
//
//////////////////////////////
window.onload = function() {
    document.getElementById('btnPlay').addEventListener('click', playMusic, false);
    document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
    document.getElementById('btnStop').addEventListener('click', stopMusic, false);

    document.getElementById('btnVolUp').addEventListener('click', volUp, false);
    document.getElementById('btnVolDown').addEventListener('click', volDown, false);

    player = document.getElementById('player');
    slider = document.getElementById('sliderTime');

    slider.addEventListener('change', reposition, false);
    loadXML();
}

function reposition() {
    player.currentTime = slider.value;
}

    //Music Play Functions
//
//////////////////////////////

function playMusic() {
    player.play();
    intv = setInterval(update, 100);
    slider.max = player.duration;
}

function millisToMins(seconds) {
    var numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numSeconds = (((seconds % 31536000) % 86400) % 3600) % 60;

    if(numSeconds >= 10 ) {
        return "Time Elapsed: " + numMinutes + ":" + Math.round(numSeconds);
    } else {
        return "Time Elapsed: " + numMinutes + ":0" + Math.round(numSeconds);
    }
}

function update() {
    slider.value = player.currentTime;
    document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
    
}

function pauseMusic() {
    player.pause();
    clearInterval(intv);
}

function stopMusic() {
    player.pause();
    player.currentTime = 0;
    clearInterval(intv);
}

    //Volume Controls
//0.0 to 1.0
//////////////////////////////
function volUp() {
    if(player.volume < 1) {
        player.volume += 0.1;
        console.log(player.volume);
    } else {
        player.volume = 1;
    }
}

function volDown() {
    if(player.volume > 0) {
        player.volume -= 0.1;
        console.log(player.volume);
    } else {
        player.volume = 0;
    }
}