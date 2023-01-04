//create a img
export function createImg(clname, image, parent) {
    let img = document.createElement('img');
    img.classList.add(clname);
    img.setAttribute("src", image);
    parent.appendChild(img)
}