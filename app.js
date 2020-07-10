const goals = JSON.parse(localStorage.getItem("goals")) || [];
const goalForm = document.querySelector(".goal-form");
const goalInput = document.querySelector(".goal-input");
const monthAndYearHead = document.querySelector(".month-and-year");
const tableDiv = document.querySelector(".all-tables-div"); //Main container having all the tables
let selectedColor = ""; //This contains the presently selected color by the user
const instrucHead = document.querySelector(".instruc-head"); //This is the sentence that is visible only when
//the user first enters the app

const clearBtn = document.querySelector(".clear-btn");

if (goals.length !== 0) {
  instrucHead.classList.add("none-display");
  clearBtn.classList.remove("none-display");
}

//store numbers with specific colors in local storage
const greenIds = JSON.parse(localStorage.getItem("green")) || [];
const purpleIds = JSON.parse(localStorage.getItem("purple")) || [];
const redIds = JSON.parse(localStorage.getItem("red")) || [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = new Date(2020, 06, 31);
let currentMonth = months[today.getMonth()].toString();
let currentYear = today.getFullYear().toString();

monthAndYearHead.innerHTML =
  "<p>" + currentMonth + " " + " " + currentYear + "</p>";

//Get the first and thee last days of the present month
let firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();

//Get number of days in the present month
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let numOfDaysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());

//To create already existent calendars
goals.forEach((goal) => {
  createAndShowCalendar(goal);
});

greenIds.forEach((id) => {
  document.getElementById(id).classList.add("green");
});

purpleIds.forEach((id) => {
  document.getElementById(id).classList.add("purple");
});

redIds.forEach((id) => {
  document.getElementById(id).classList.add("red");
});

//Dealing with the input:
//If it is empty, pass an alert. Else append the goal to the goals array
goalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (goalInput.value === "") {
    alert(
      "This progress tracker will be much more beneficial to you if you have a goal in mind. Don't worry, it doesn't have to be a long term goal. Short term goals work fine too😊 Go ahead and enter one ! "
    );
  } else {
    goals.push(goalInput.value);
    localStorage.setItem("goals", JSON.stringify(goals));

    createAndShowCalendar(goalInput.value);
    instrucHead.classList.add("none-display");
    clearBtn.classList.remove("none-display");
  }
  goalInput.value = "";
});

function createAndShowCalendar(goal) {
  let container = document.createElement("div");
  container.setAttribute("class", "table-container" + " " + goal); //Each calendar will be put inside a container of its own
  //This container should contain goal-para and a table of class calendar
  let goalPara = document.createElement("p");
  goalPara.setAttribute("class", "goal-para");
  goalPara.innerHTML = "<p><strong>Goal : </strong>" + goal + "</p>"; //This goal comes from the argument of this function

  container.appendChild(goalPara);

  //Creating the table
  let calendar = document.createElement("table");
  calendar.setAttribute("class", "calendar");

  let tHead = document.createElement("thead");
  let tHeadRow = document.createElement("tr");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (i = 0; i < days.length; i++) {
    let th = document.createElement("th");
    th.setAttribute("class", "day");
    th.innerHTML = days[i];
    tHeadRow.appendChild(th);
  }

  tHead.appendChild(tHeadRow);
  calendar.appendChild(tHead);

  let tBody = document.createElement("tbody");
  tBody.setAttribute("class", "calendar-body");

  let date = 1;
  for (let i = 0; i < 6; i++) {
    // create a table row
    let row = document.createElement("tr");
    // create individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        cell.setAttribute("class", "calendar-cell");

        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > numOfDaysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.setAttribute("class", "calendar-cell" + " " + goal);

        let cellText = document.createTextNode(date);
        cell.setAttribute("id", date + goal);
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;

        cell.addEventListener("click", () => {
          document.getElementById(cell.id).classList.add(selectedColor);
          if (selectedColor === "green") {
            greenIds.push(cell.id); //For local storage
            localStorage.setItem("green", JSON.stringify(greenIds));
          } else if (selectedColor === "purple") {
            purpleIds.push(cell.id); //For local storage
            localStorage.setItem("purple", JSON.stringify(purpleIds));
          } else if (selectedColor === "red") {
            redIds.push(cell.id); //For local storage
            localStorage.setItem("red", JSON.stringify(redIds));
          }
        });
      }
    }
    tBody.appendChild(row); // appending each row into calendar body
    calendar.appendChild(tBody);
    container.appendChild(calendar);
    tableDiv.appendChild(container);
    //creating the color box below each table
  }

  let colorsDiv = document.createElement("div");
  colorsDiv.setAttribute("class", "colors-div");

  let greenBox = document.createElement("div");
  greenBox.setAttribute("class", "color-box green" + " " + goal);
  colorsDiv.appendChild(greenBox);

  let purpleBox = document.createElement("div");
  purpleBox.setAttribute("class", "color-box purple" + " " + goal);
  colorsDiv.appendChild(purpleBox);

  let redBox = document.createElement("div");
  redBox.setAttribute("class", "color-box red" + " " + goal);
  colorsDiv.appendChild(redBox);
  container.appendChild(colorsDiv);

  //Changing the value of the selectedColor variable based on which color got clicked

  greenBox.addEventListener("click", () => {
    selectedColor = "green";
  });

  purpleBox.addEventListener("click", () => {
    selectedColor = "purple";
  });

  redBox.addEventListener("click", () => {
    selectedColor = "red";
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("goals");
    localStorage.removeItem("green");
    localStorage.removeItem("purple");
    localStorage.removeItem("red");
    tableDiv.classList.add("none-display");
    instrucHead.classList.remove("none-display");
    clearBtn.classList.add("none-display");
  });
} // Here is the end of the createAndShowCalendar function
