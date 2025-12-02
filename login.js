document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (email === "" || pass === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Login successful! (Demo Mode)");
    window.location.href = "index.html"; // redirect after login
});
