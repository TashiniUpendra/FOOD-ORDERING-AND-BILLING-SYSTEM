document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let confirmPass = document.getElementById("confirmPassword").value;

    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    if (name === "" || email === "" || pass === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Signup successful! (Demo Mode)");

    // Redirect to login page
    window.location.href = "login.html";
});
