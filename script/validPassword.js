function validatePassword() {
    // Adiciona um evento de foco ao campo de senha
        
    const inputLowercase = document.getElementById("lowercase");
    const inputUppercase = document.getElementById("uppercase");
    const inputNumber = document.getElementById("number");
    const inputSpecial = document.getElementById("special");
    const inputLength = document.getElementById("length");

    const password = document.getElementById("accountPassword").value;

    // Regex para validar a senha (mínimo 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número).
    const az = /[a-z]/;
    const AZ = /[A-Z]/;
    const num = /[0-9]/;
    const special = /[\*\!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_\{\|\}~]/;
    const minLength = /.{8,}/;

    if (az.test(password)) { 
        inputLowercase.setAttribute("style", "color: green;");
    } else {
        inputLowercase.setAttribute("style", "color: red;");
    }
    if (AZ.test(password)) { 
        inputUppercase.setAttribute("style", "color: green;");
    } else {
        inputUppercase.setAttribute("style", "color: red;");
    }
    if (num.test(password)) { 
        inputNumber.setAttribute("style", "color: green;");
    } else {
        inputNumber.setAttribute("style", "color: red;");
    }
    if (special.test(password)) { 
        inputSpecial.setAttribute("style", "color: green;"); 
    } else {
        inputSpecial.setAttribute("style", "color: red;");
    }
    if (minLength.test(password)) {
        inputLength.setAttribute("style", "color: green;");
    } else {
        inputLength.setAttribute("style", "color: red;");
    }
}

inputPassword = document.getElementById("accountPassword");
inputPassword.addEventListener("focus", function() {
    document.getElementById("passwordRequirements").style.display = "block";
});

inputPassword.addEventListener("blur", function() {
    document.getElementById("passwordRequirements").style.display = "none";
});