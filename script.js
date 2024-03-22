currentDay = document.getElementById("currentDay");
hourRows = document.getElementsByClassName("row");
saveButtons = Array.prototype.slice.call( document.getElementsByClassName("btn") );;

function start () {
  currentDay.textContent = getCurrentDate();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  saveButtons.forEach(b => {
    b.addEventListener("click", function(){
      //console.log(`${b.parentElement.children[0].innerHTML} textArea pressed`);
      localStorage.setItem(b.parentElement.id, b.parentElement.children[1].value);
      //console.log(b.parentElement.children[1].value);
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
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
