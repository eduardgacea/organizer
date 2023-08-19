'use strict';

import { getCalendar, renderCalendar } from "./calendar-utils.js";
import { Modal } from './modal.js';
import { capitalize } from "./utils.js";

export const root = document.getElementById('root');

const calendar = getCalendar(2023);
renderCalendar(calendar, root);

const dayElements = document.querySelectorAll('.day-element');
for(const dayElement of dayElements) {
    dayElement.addEventListener('click', e => {
        const [monthIndex , dayIndex] = e.target.id.split('-');
        const clickedDay = calendar[monthIndex][dayIndex];
        const modal = new Modal(`${capitalize(clickedDay.day)}, ${clickedDay.date} ${capitalize(clickedDay.month)} ${clickedDay.year}`, `You clicked on this day. Now what?`);
        modal.show();
    } )
}