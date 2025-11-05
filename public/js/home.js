function $(selector) {
    return document.querySelector(selector);
}

$("#keySearch").addEventListener("submit", validateKeyword);

function validateKeyword() {
    let word = $("input[name=keyword]").value;
    if (word.length < 3) {
        $("#error").textContent = "ERROR: keyword must be longer than 2 characters";
        event.preventDefault(); // prevents submission of form
    }
    else {
        $("#error").textContent = "";
    }
}