
export default class InteractiveImageButton {
    constructor(config) { 
        this.image = config.image || '';
        this.class = config.class || '';
        this.title = config.title || ''; 
        this.click = config.click || null;
        this.style = config.style || '';
        console.log(this);
    }

    DomElement() { 
        const button = document.createElement('button');
        button.className = `class="${this.class} interactive-image-button"`;
        if (this.click !== null) { 
            button.addEventListener("click", this.click);
        }
        if (this.style !== '' || this.image !== '') {
            let style = "";
            if (this.image !== '') { 
                style += `background-image:url(${this.image}); `;
            }
            if (this.style !== '') { 
                style += this.style;
            }
            button.style = style;
        }
       
        if (this.title) { 
            button.innerText = this.title;
        }

        return button;
    }

    append(ParentDomElement) { 
        if (ParentDomElement !== undefined && ParentDomElement !== null && ParentDomElement.append !== undefined) {
            ParentDomElement.append(this.DomElement());
        }
    }
}
