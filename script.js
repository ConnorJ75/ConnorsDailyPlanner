currentDay = document.getElementById("currentDay");
hourRows = document.getElementsByClassName("row");
saveButtons = Array.prototype.slice.call( document.getElementsByClassName("btn") );;

function start () {
  currentDay.textContent = getCurrentDate();

  for (var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);
    if (key !== null && key.includes("hour-")){
      for (r of hourRows){
        if (r.id === key){
          r.children[1].value = localStorage.getItem(key);
        }
      }
    }
}

  saveButtons.forEach(b => {
    b.addEventListener("click", function(){
      localStorage.setItem(b.parentElement.id, b.parentElement.children[1].value);
    });
  });
 
  for (r of hourRows){
    ts = timeStatus(r.firstElementChild.innerHTML);

    if (ts === -1){
    r.className = "row time-block past";
    }
    else if(ts === 0){
      r.className = "row time-block present";
    }
    else{
      r.className = "row time-block future";
    }
  }
};

function getCurrentDate(){
  return new Date().toLocaleDateString();
}

function timeStatus(timeString){

  const cur = new Date();
  var curHour = cur.getHours();

  var AMPM = timeString.slice(-2);
  var hour = parseInt(timeString.slice(0,-2));
  
  if (AMPM === 'PM' && hour < 12){
    hour += 12;
  }

  if(curHour > hour){
    return -1;
  }
  if(curHour === hour){
    return 0;
  }
  if (curHour < hour){
    return 1;
  }
}
start();
