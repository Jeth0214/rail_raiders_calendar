

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const nextBtn = document.querySelectorAll(".next-btn");

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



const renderCalendar = (slots) => {
    const date = new Date(currentYear, currentMonth, 1);
    let firstDayofMonth = date.getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        // liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        let date = `${currentYear}-${currentMonth}-${lastDateofLastMonth - i + 1}`;
        let formattedDate = formatDate(date);
        let slotThisDay = getSlotsPerDate(slots, formattedDate);
        let slotsStartTime = getSlotsStartTime(slotThisDay);
        console.log(`slots for ${formattedDate}`, slotThisDay);


        // console.log(formattedDate);
        // let slotThisDay = getSlotsPerDate(slots, formattedDate)
        // console.log(`slots for ${date}`, slots)

        if ((new Date(date.toString()) > new Date(new Date().toString())) || (formatDate(new Date(date)) == formatDate(new Date()))) {
            liTag += `<li class="inactive">
                   <span > ${lastDateofLastMonth - i + 1} </span>
                    <div class="slots">`;
            slotsStartTime.forEach(time => {
                liTag += `
                     <div class="slot">
                        <p><span class="slot__hour">${time}</span> Ride the Tracks of Yates Country</p>
                      </div>

                `;
            });
            liTag += `
                </div>
                </li>
            `;


        } else {
            liTag += `<li class="inactive">
                    <span > ${lastDateofLastMonth - i + 1} </span>
                </li>`;
        }
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";

        let date = `${currentYear}-${currentMonth + 1}-${i}`;
        let formattedDate = formatDate(date);
        //   console.log(formattedDate);
        let slotThisDay = getSlotsPerDate(slots, formattedDate)
        console.log(`slots for ${formattedDate}`, slotThisDay);
        let slotsStartTime = getSlotsStartTime(slotThisDay);
        //  console.log(`startTime for ${date}`, slotsStartTime);



        if ((new Date(date.toString()) > new Date(new Date().toString())) || (formatDate(new Date(date)) == formatDate(new Date()))) {
            liTag += `<li class="">
                   <span class=${isToday}> ${i} </span>
                    <div class="slots">`;
            slotsStartTime.forEach(time => {
                liTag += `
                     <div class="slot">
                        <p><span class="slot__hour">${time}</span> Ride the Tracks of Yates Country</p>
                      </div>

                `;
            });
            liTag += `
                </div>
                </li>
            `;


        } else {
            liTag += `<li class="">
                    ${i}
                </li>`;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        let date = `${currentYear}-${currentMonth + 2}-${i + 1}`;
        let formattedDate = formatDate(date);
        // console.log(formattedDate);
        let slotThisDay = getSlotsPerDate(slots, formattedDate);
        console.log(`slot for this day ${formattedDate}`, slotThisDay);
        let slotsStartTime = getSlotsStartTime(slotThisDay);

        if ((new Date(date.toString()) > new Date(new Date().toString())) || (formatDate(new Date(date)) == formatDate(new Date()))) {
            liTag += `<li class="inactive">
                   <span > ${i - lastDayofMonth + 1} </span>
                    <div class="slots">`;
            slotsStartTime.forEach(time => {
                liTag += `
                     <div class="slot">
                        <p><span class="slot__hour">${time}</span> Ride the Tracks of Yates Country</p>
                      </div>

                `;
            });
            liTag += `
                </div>
                </li>
            `;


        } else {
            liTag += `<li class="inactive">
                    <span > ${i - lastDayofMonth + 1} </span>
                </li>`;
        }
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
};

//renderCalendar();

nextBtn.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = currentMonth + 1;

        if (currentMonth < 0 || currentMonth > 11) {
            currentYear = icon.id === "prev" ? currentYear - 1 : currentYear + 1;
            currentMonth = currentMonth < 0 ? 11 : 0;
        }

        getSlotsAndShow();
    });
});

//format the date to 'yyyy-dd-mm'
function formatDate(dateToFormat) {
    let date = new Date(dateToFormat);
    let year = date.getFullYear();
    let month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let formattedDate = `${year}-${month}-${day}`;
    // console.log('formatted date: ' + formattedDate)
    return formattedDate;
}

getSlotsAndShow();

function getSlotsAndShow() {

    let startDate = formatDate(new Date());
    // max slots
    let max = 1680;
    let api = `https://www.supersaas.com/api/free/674910.json?from=${startDate}%2006:00:00&api_key=6UIfknUBAUHF8vzUDnBdLg&length=18&maxresults=${max}`;
    let slots;
    fetch(api).then(response => response.json())
        .then(response => {
            slots = response.slots;
            //let slotThisDay = getSlotsPerDate(allSlots, startDate)
            console.log(slots);
            // console.log(response.slots);
            //console.log('slot this date', slotThisDay);
            // let startTimes = getSlotsStartTime(slotThisDay);
            renderCalendar(slots);
        })
        .catch(error => console.log('Error', error));
}


function getSlotsPerDate(slots, date) {
    let slotThisDate = slots.filter(slot => { return date === formatDate(new Date(slot.start)) })
    //console.log(`slots this date ${date}`, slotThisDate);
    return slotThisDate;
    //console.log('slots', allSlots);
}

function getSlotsPerStartTime(slots, startTime) {
    let slotsFromStartTime = slots.filter(slot => { return new Date(slot.start).getHours() === startTime })
    console.log(`slotsFromStartTime of ${startTime}`, slotsFromStartTime);
    //return slotsFromStartTime;
}

function getSlotsStartTime(slots) {
    let allStartTimes = slots.map(slot => { return new Date(slot.start).getHours() });
    let formattedStartTime = allStartTimes.map(time => { return formatTime(time) })
    let setStartTimes = [...new Set(formattedStartTime)]
    // console.log(`All Start Time`, allStartTimes);
    // console.log(`filterd Start Time`, setStartTimes);
    return setStartTimes
}

function formatTime(timeSlot) {
    const hour = timeSlot % 24;
    return (hour % 12 || 12) + (hour < 12 ? "am" : "pm");
}


