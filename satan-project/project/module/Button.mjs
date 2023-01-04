//create a button that will short every carte by date
export function createButton(bName, bDate, parent, element) {

    //create a button for the 1st day
    let button_day = document.createElement("button");
    button_day.classList.add(
        bDate,
        "button_1");
    button_day.textContent = bName;
    parent.appendChild(button_day);
    button_day.style.display = "block"

    //create a event to display the right day
    button_day.addEventListener("click", () => {
        for (let elem of element.children) {
            elem.style.display = "none"
            if (elem.classList.contains(bDate)) {
                elem.style.display = "flex"
            }
        }
    })
}