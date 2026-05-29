import { $id, $class } from "./pre.js";
const clockDOM = $id("clock");
const mainDOM = $class("main");
class CardData {
    name;
    description;
    imageUrl;
    constructor(name, description, imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    CreateDOM() {
        const cardDOM = document.createElement("div");
        cardDOM.className = "card";
        const img = document.createElement("img");
        img.src = this.imageUrl;
        const name = document.createElement("h3");
        name.textContent = this.name;
        const button = document.createElement("button");
        button.textContent = "+";
        const p = document.createElement("p");
        p.textContent = this.description;
        button.onclick = () => {
            if (p.style.height && p.style.height !== '0px') {
                p.style.height = '0px';
            }
            else {
                p.style.height = p.scrollHeight + 'px';
            }
            p.toggleAttribute("open");
        };
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
];
people.forEach(x => mainDOM?.appendChild(x.CreateDOM()));
function ClockTick() {
    if (!clockDOM)
        return;
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    clockDOM.textContent = `${hours}:${minutes}:${seconds}`;
    setTimeout(ClockTick, 1000);
}
ClockTick();
