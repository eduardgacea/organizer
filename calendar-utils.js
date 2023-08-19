'use strict';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const getCalendar = function(year){
    const now = new Date();
    const today = new Date(year, now.getMonth(), now.getDate());
    const calendar = [];
    for(let i = 0 ; i < 12 ; i++) {
        calendar.push([]);
    }
    const dayCount = year % 4 ? 365 : 366;
    for(let i = 1 ; i <= dayCount ; i++) {
        const dayDateObject = new Date(year, 0, i);
        calendar[dayDateObject.getMonth()].push({
            year,
            month: months[dayDateObject.getMonth()],
            date: dayDateObject.getDate(),
            day: weekdays[dayDateObject.getDay()],
            isBooked: false,
            isToday: dayDateObject.getTime() === today.getTime() ? true : false,
        })
    }
    return calendar;
}

const renderMonth = function(month, calendarBody) {
    // month element
    const monthName = month[0].month
    const monthNr = months.indexOf(monthName);
    const monthElement = document.createElement('div');
    const offset = weekdays.indexOf(month[0].day) + 1;
    monthElement.id = `month-${monthNr}`;
    monthElement.classList.add('month');
    // month element title
    const monthElement_title = document.createElement('div');
    monthElement_title.classList.add('month-title', 'text');
    monthElement_title.textContent = `${monthName}`.toLocaleUpperCase();
    monthElement.append(monthElement_title);
    // month element body
    const monthElement_body = document.createElement('div');
    monthElement_body.classList.add('month-body');
    for(const [index, weekday] of weekdays.entries()) {
        const headerElement = document.createElement('div');
        headerElement.classList.add('header-element', 'text');
        headerElement.textContent = weekday.substring(0, 3).toLocaleUpperCase();
        if(index === 0 || index === 6) headerElement.style = `color: red;`;
        monthElement_body.append(headerElement);
    }
    if(offset > 1){
        const offsetElement = document.createElement('div');
        offsetElement.classList.add('offset-element');
        offsetElement.style = `grid-column: 1 / ${offset};`;
        monthElement_body.append(offsetElement);
    }
    for(const day of month) {
        const dayElement = document.createElement('div');
        const dayId = `${months.indexOf(day.month)}-${day.date-1}`;
        dayElement.id = dayId;
        dayElement.classList.add('day-element', 'text');
        dayElement.textContent = day.date;
        if(day.day === 'sunday' || day.day === 'saturday') dayElement.style = `color: red;`;
        if(day.isToday) dayElement.classList.add('today')
        monthElement_body.append(dayElement);
    }
    monthElement.append(monthElement_body);
    // append month to calendar
    calendarBody.append(monthElement);
}

const renderCalendar = function(calendarData, parentElement) {
    const calendarElement = document.createElement('div');
    const calendarElement_title = document.createElement('div');
    const calendarElement_body = document.createElement('div');
    const calendarYear = calendarData[0][0].year;
    calendarElement.id = 'calendar';
    calendarElement_title.id = 'calendar-title';
    calendarElement_title.classList.add('text');
    calendarElement_title.textContent = `${calendarYear}`;
    calendarElement_body.id = 'calendar-body';
    for(const month of calendarData) {
        renderMonth(month, calendarElement_body, calendarData);
    }
    calendarElement.append(calendarElement_title);
    calendarElement.append(calendarElement_body)
    parentElement.append(calendarElement);
}

export {getCalendar, renderCalendar};