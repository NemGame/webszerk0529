export function $(selector) { return document.querySelector(selector); }
export function $$(selector) { return [...document.querySelectorAll(selector)]; }
export function $id(id) { return document.getElementById(id); }
export function $class(className) { return document.getElementsByClassName(className)[0]; }
export function $$class(className) { return [...document.getElementsByClassName(className)]; }
