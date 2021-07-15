console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("addTxt");
  if (addTitle.value == "" || addTxt.value == "") {
    return alert("Please add Note Title and Details")
}
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title" style="color: red;">Note ${index + 1}</h5>
                        <h3 class="card-title" style="color: black;"> ${element.title} </h3>
                        <h3 style="color:black;">--------------------------------------</h3>
                        <p class="card-text"> ${element.text}</p>
                        
                    </div>
                    <div>
                    <form>
                   
                    <button id="${index}"onclick="deleteNote(this.id)" class="card-title" style="color: black;">Delete Note</button>
                    <button id="${index}"onclick="editNote(this.id)" class="card-title" style="color: black;">Edit Note</button>
                    
                    </form>
        
                </div>



            </div>`;
  });
  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    

  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
let confirmDel = confirm("Delete this note?");
if (confirmDel == true) {
    

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

const alarmSubmit = document.getElementById('alarmSubmit');

// Add an event listener to the submit button
alarmSubmit.addEventListener('click', setAlarm);

var audio = document.getElementById("myAudio"); 

// function to play the alarm ring tone
var flag=0;
function check()
{
  alert("Your details has been saved!");
  flag=1;
}
function ringBell() {
    audio.play();
    if(flag==1)
    {
      sendMail();
    }
}

// This function will run whenever alarm is set from the UI

function setAlarm(e) {
  alert("Your alarm has been set. If you want to set more alarm then Enter input Again!!");
   e.preventDefault();
    const alarm = document.getElementById('alarm');
    alarmDate = new Date(alarm.value);
   
    console.log(`Setting Alarm for ${alarmDate}...`);
    now = new Date();
 
        let timeToAlarm = alarmDate- now;
        console.log(timeToAlarm);
        if(timeToAlarm>=0){
            setTimeout(() => {
                console.log("Ringing now")
              ringBell();
              
            }, timeToAlarm);
        }
      
     
}

function stopAudio()
{
    audio.pause();
}

// for mail  sending
function sendMail() {
  var sender=Form.sender.value
  var pswd=Form.pswd.value
  
  var mesg=Form.Message.value;
  
  Email.send({ 
  Host: "smtp.gmail.com", 
  Username: sender, 
  Password:pswd, 
  To: sender, 
  From: sender, 
  Subject: "Notification from magic note!",
  Body: mesg, 
  }).then(function (message) { 
  
  console.log(message);
  }); 
  }
// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("addTxt");

    if (addTitle.value !== "" ||addTxt.value !== "") {
      return alert("Please clear the form before editing a note")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
      addTxt.value = element.text;
    })
    notesObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}