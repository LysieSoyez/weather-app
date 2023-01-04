//create a p
export function createP(clname, text, parent) {
    let para = document.createElement('p');
    para.classList.add(clname);
    para.textContent = text;
    parent.appendChild(para);
}