document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const userInfo = document.getElementById("user-info");
    const authLinks = document.getElementById("auth-links");
    const startGameBtn = document.getElementById("start-game-btn");

    if (user) {
        document.getElementById("username").textContent = user.username;
        document.getElementById("score").textContent = user.score || 0;
        userInfo.style.display = "block";
        authLinks.style.display = "none";
        startGameBtn.removeAttribute("disabled"); 
    } else {
        startGameBtn.setAttribute("disabled", "true"); 
    }

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("user");
        window.location.reload();
    });

    startGameBtn.addEventListener("click", function () {
        if (!user) {
            alert("Please sign in before starting the game.");
            window.location.href = "signin.html";
            return;
        }
        
        const difficulty = document.getElementById("difficulty-select").value;
        localStorage.setItem("gameDifficulty", difficulty);
        window.location.href = "game.html";
    });
});