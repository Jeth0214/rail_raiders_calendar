const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const nextBtn = document.querySelectorAll(".next-btn");

let currYear = new Date().getFullYear();
let currMonth = new Date().getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getAllAvailableSlots = async () => {
    try {
        const req = await fetch(
            "https://www.supersaas.com/api/free/674910.json?from=2023-04-27%2014:00:00&api_key=6UIfknUBAUHF8vzUDnBdLg&length=18&maxresults=120");
        const res = await req.json();
        console.log(res);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
    }
}



const renderCalendar = () => {
    const date = new Date(currYear, currMonth, 1);
    let firstDayofMonth = date.getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive" onclick="getAllAvailableSlots()">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" onclick="getAllAvailableSlots()">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive" onclick="getAllAvailableSlots()">${i - lastDayofMonth + 1}
            <h5>slots goes here</h5>
        </li>`
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

nextBtn.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            currYear = icon.id === "prev" ? currYear - 1 : currYear + 1;
            currMonth = currMonth < 0 ? 11 : 0;
        }

        renderCalendar();
    });
});


