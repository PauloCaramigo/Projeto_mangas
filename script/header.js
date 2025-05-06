const menu = document.getElementById("menuAccount");
const dropdown = document.getElementById("dropdownMenuAccount");

menu.addEventListener("click", function (event) {
    dropdown.toggleAttribute("hidden");
});

document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.setAttribute("hidden", true);
    }
});