import { $, $$, $id, $class, $$class } from "./pre.js";

const clockDOM = $id("clock");
const mainDOM = $class("main");

class CardData {
    constructor(public name: string, public description: string, public imageUrl: string) {}
    CreateDOM() {
        const cardDOM = document.createElement("div");
        cardDOM.className = "card";
        const img = document.createElement("img");
        img.src = this.imageUrl;
        const name = document.createElement("h3");
        name.textContent = this.name;
        const button = document.createElement("button");
        button.textContent = "Bemutatkozás";
        const span = document.createElement("span");
        span.textContent = "↓";
        button.appendChild(span);
        const p = document.createElement("p");
        p.textContent = this.description;

        button.onclick = () => {
            if (p.style.height && p.style.height !== '0px') {
                p.style.height = '0px';
                span.style.transform = "rotate(0deg)";
            } else {
                p.style.height = p.scrollHeight + 'px';
                span.style.transform = "rotate(-180deg)";
            }
            p.toggleAttribute("open");
        }

        cardDOM.appendChild(img);
        cardDOM.appendChild(name);
        cardDOM.appendChild(button);
        cardDOM.appendChild(p);
        return cardDOM;
    }
}

const people = [
    new CardData("Ákos", "Programozás", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"),
    new CardData("Bobi", "Programozás", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"),
    new CardData("András", "Programozás", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"),
]

people.forEach(x => mainDOM?.appendChild(x.CreateDOM()));

function ClockTick() {
    if (!clockDOM) return;
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    clockDOM.textContent = `${hours}:${minutes}:${seconds}`;
    setTimeout(ClockTick, 1000);
}



ClockTick();