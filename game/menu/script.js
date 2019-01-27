function hideButtons(){
    var ButtonStartElem = document.getElementById('ButtonStart');
    var ButtonSelectElem = document.getElementById('ButtonSelect');
    var Level1Elem = document.getElementById('Level1');
    var Level2Elem = document.getElementById('Level2');
    var Level3Elem = document.getElementById('Level3');
    var Level4Elem = document.getElementById('Level4');
    var Level5Elem = document.getElementById('Level5');
    var BackElem = document.getElementById('Back');

    if(ButtonStartElem.style.display === "block"){
      ButtonStartElem.style.display = "none";
      Level1Elem.style.display = "block";
      Level2Elem.style.display = "block";
      Level3Elem.style.display = "block";
      Level4Elem.style.display = "block";
      Level5Elem.style.display = "block";
      ButtonSelectElem.style.display = "none";
      BackElem.style.display = "block";
    }
    else{
      ButtonStartElem.style.display = "block";
      Level1Elem.style.display = "none";
      Level2Elem.style.display = "none";
      Level3Elem.style.display = "none";
      Level4Elem.style.display = "none";
      Level5Elem.style.display = "none";
    }
}

function showButtons() {
  var BackElem = document.getElementById('Back');
  var ButtonStartElem = document.getElementById('ButtonStart');
  var ButtonSelectElem = document.getElementById('ButtonSelect');
  var Level1Elem = document.getElementById('Level1');
  var Level2Elem = document.getElementById('Level2');
  var Level3Elem = document.getElementById('Level3');
  var Level4Elem = document.getElementById('Level4');
  var Level5Elem = document.getElementById('Level5');
  if(BackElem.style.display === "block"){
    ButtonStartElem.style.display = "block";
    Level1Elem.style.display = "none";
    Level2Elem.style.display = "none";
    Level3Elem.style.display = "none";
    Level4Elem.style.display = "none";
    Level5Elem.style.display = "none";
    ButtonSelectElem.style.display = "block";
    BackElem.style.display = "none";

  }
  else{
    BackElem.style.display = "none";
    Level1Elem.style.display = "block";
    Level2Elem.style.display = "block";
    Level3Elem.style.display = "block";
    Level4Elem.style.display = "block";
    Level5Elem.style.display = "block";
  }
}

function playGame(n) {
    console.log("test");
    window.location.replace(`http://${window.location.host}/level-${n}`);
}