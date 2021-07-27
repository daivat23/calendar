let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/////////////////
function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}
function addEvent(date){
  clicked = date;
  newEventModal.style.display = 'block';
  backDrop.style.display = 'block';
}
function showEvent(date){
  // events = events.filter(e => e.date !== clicked);
  // localStorage.setItem('events', JSON.stringify(events));
  clicked = date;
  
  const eventForDay = events.find(e => e.date === clicked);
  const ti = events.filter(e => e.date === clicked);
  let text1 = " ";
  if (eventForDay) {
    //document.getElementById('eventText').innerText = eventForDay.title;
    ti.forEach(v => {
      text1 += v.title + "/";
      document.getElementById('eventText').innerText = text1;
    });
    //document.getElementById('eventText').innerText = text1;
    deleteEventModal.style.display = 'block';
  }else{
    document.getElementById('eventText').innerText = "Event Not Present";
    deleteEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}
var monthArray = new Array();
monthArray[0] = "january";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";
var sel = document.createElement("select");
sel.id = "month";
sel.name = "month";
for(m = 0; m <= 11; m++) {
var optn = document.createElement("option");
optn.text = monthArray[m];
optn.value = (m);
sel.appendChild(optn);
}
document.getElementById("sell").appendChild(sel);
///////////year//////////
var sal = document.createElement("select");
//sal.onchange = function(){show()};
sal.id = "year";
sal.name = "year";
for( y = 2000; y <= 2025; y++) {
  var optn = document.createElement("option");
  optn.text = y;
  optn.value = y;
  sal.appendChild(optn);
  }
  document.getElementById("sell").appendChild(sal);

 
function load() {
  //////////////
  const dt = new Date();
  let selectmonth = document.getElementById("month");
    let selectyear = document.getElementById("year");
    let year = selectyear.value;
    let month = selectmonth.value;
    let d = new Date(year, month);
    let day = d.getDate();
  let firstDayOfMonth = new Date(year, month, 1);
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  calendar.innerHTML = '';
  let text = `${month}/${day}/${year}`;
  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    let daySquare = document.createElement('div');
    daySquare.classList.add('day');
    

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.setAttribute('onclick',document.getElementById('txt').value = text);
      let btn = document.createElement('button');
      btn.innerHTML = 'Add';
      btn.id = 'button1';
      //btn.onclick = openModal(dayString);
      let btn1 = document.createElement('button');
      btn1.innerHTML = 'View';
      btn1.id = 'button2';
      daySquare.appendChild(btn);
      daySquare.appendChild(btn1);
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

    //   if (eventForDay) {
    //     const eventDiv = document.createElement('div');
    //     eventDiv.classList.add('event');
    //     eventDiv.innerText = eventForDay.title;
    //     daySquare.appendChild(eventDiv);
    //   }
      //daySquare.addEventListener('click', () => openModal(dayString));
      btn.addEventListener('click', () => addEvent(dayString));
      btn1.addEventListener('click', () => showEvent(dayString));
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);    
  }
}
///////////////////////
function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}
//////////////////////////
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  }
  else {
    eventTitleInput.classList.add('error');
  }
}
///////////////////////
function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);

document.getElementById("btn").addEventListener("click", load)
load();
