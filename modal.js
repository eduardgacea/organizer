'use strict';

import { root } from "./index.js";

class Modal {

    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id_mask = `modal-${new Date().getTime().toString()}`;
        this.hide = this.hide.bind(this);
    }

    show() {
        // modal elements
        const modalElement = document.createElement('div');
        const modalElement_title = document.createElement('div');
        const modalElement_body = document.createElement('div');
        const modalElement_btn = document.createElement('button');
        const modalElement_backdrop = document.createElement('div');
        // modal elements classes and ids
        modalElement.classList.add('modal', this.id_mask);
        modalElement_title.classList.add('modal-title');
        modalElement_body.classList.add('modal-body');
        modalElement_btn.classList.add('modal-btn', 'btn');
        modalElement_backdrop.classList.add('modal-backdrop', this.id_mask);
        // modal content
        modalElement_title.textContent = this.title;
        modalElement_body.innerHTML = this.body; 
        modalElement_btn.textContent = 'OK';   
        // event listeners
        modalElement_btn.addEventListener('click', this.hide);
        modalElement_backdrop.addEventListener('click', this.hide);
        // appends
        modalElement.append(modalElement_title);
        modalElement.append(modalElement_body);
        modalElement.append(modalElement_btn);
        root.append(modalElement_backdrop);
        root.append(modalElement);
    }

    hide() {
        const elementsToRemove = document.querySelectorAll(`.${this.id_mask}`);
        for(const element of elementsToRemove) element.remove();
    }    

}

export { Modal }