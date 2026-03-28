let users = JSON.parse(localStorage.getItem("users") || "{}");

//register
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function(e) {
        e.preventDefault();
        let username = document.getElementById("newUsername").value.trim();
        let password = document.getElementById("newPassword").value.trim();
        if (!username || !password) return;
        if (users[username]) {
            document.getElementById("message").textContent = "Username already exists!";
            document.getElementById("message").style.color = "red";
            return;
        }
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", username);
        window.location.href = "home.html";
    });
}

//login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        if (users[username] && users[username] === password) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "home.html";
        } else {
            document.getElementById("message").textContent = "Invalid username or password!";
            document.getElementById("message").style.color = "red";
        }
    });
}
