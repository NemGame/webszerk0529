export function $(selector:string): HTMLElement|null {return document.querySelector(selector);}
export function $$(selector:string): HTMLElement[]|null {return [...document.querySelectorAll(selector)] as HTMLElement[];}
export function $id(id:string): HTMLElement|null {return document.getElementById(id);}
export function $class(className:string): HTMLElement|null {return document.getElementsByClassName(className)[0] as HTMLElement|null;}
export function $$class(className:string): HTMLElement[]|null {return [...document.getElementsByClassName(className)] as HTMLElement[];}