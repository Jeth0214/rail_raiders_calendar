
class ShowSlots {
    date;
    constructor(date) {
        this.date = date
    }
    getAvailableSlots = async () => {
        // get all slots from today and give a max number of slots
        let today = formatDate(new Date());
        // console.log(today)

        try {
            const req = await fetch(
                `https://www.supersaas.com/api/free/674910.json?from=${today}%2008:00:00&api_key=6UIfknUBAUHF8vzUDnBdLg&length=18&maxresults=120`);
            const res = await req.json();
            //console.log('response ', res);
            return res.slots;
        } catch (err) {
            console.error(`ERROR: ${err.message}`);
        }
    }


    async getSlotsPerDate() {
        const allSlots = await this.getAvailableSlots();
        let slotThisDate = allSlots.filter(slot => { return this.date === formatDate(new Date(slot.start)) })
        return slotThisDate;
        //console.log('slots', allSlots);
        // console.log(`slots this date ${this.date}`, slotThisDate);
    }

    async getSlotsPerTenAm() {
        const slots = await this.getSlotsPerDate();

        let slotThisDate = slots.filter(slot => { return new Date(slot.start).getHours() === 10 })
        // console.log(slotThisDate);
        return slotThisDate
    }

}

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const nextBtn = document.querySelectorAll(".next-btn");

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();




const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



const renderCalendar = () => {
    const date = new Date(currentYear, currentMonth, 1);
    let firstDayofMonth = date.getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";
        let date = `${currentYear}-${currentMonth + 1}-${i}`;
        let slots = new ShowSlots(formatDate(new Date(date))).getSlotsPerTenAm();
        // console.log(slots.then(res => { console.log(res) }));
        liTag += `<li class="${isToday}">
                    ${i}
                </li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive"">${i - lastDayofMonth + 1}
             <div class="slots">
                <div class="slot">
                    <p><span class="slot__hour">10am</span> Ride the Tracks of Yates Country</p>
                </div>
                <div class="slot">
                    <p><span class="slot__hour">1pm</span> Ride the Tracks of Yates Country</p>
                </div>
                <div class="slot">
                    <p><span class="slot__hour">15pm</span> Ride the Tracks of Yates Country</p>
                </div>
            </div>
        </li>`
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

nextBtn.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = currentMonth + 1;

        if (currentMonth < 0 || currentMonth > 11) {
            currentYear = icon.id === "prev" ? currentYear - 1 : currentYear + 1;
            currentMonth = currentMonth < 0 ? 11 : 0;
        }

        renderCalendar();
    });
});

//format the date to 'yyyy-dd-mm'
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let formattedDate = `${year}-${month}-${day}`;
    // console.log('formatted date: ' + formattedDate)
    return formattedDate;
}







new ShowSlots().getAvailableSlots();
new ShowSlots().getSlotsPerDate();

