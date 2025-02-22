document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessageElement = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const usernameInput = document.getElementById('Email address');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        
        if (username === "") {
            displayError("Please enter your Email address");
            return;
        }
        if (password === "") {
            displayError("Please enter your password");
            return;
        }

       
        fetch('https://67b57c8fa9acbdb38ed28d18.mockapi.io/api/b1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                displayError(data.message || "Error logging in.Please try again");
            }
        })
        .catch(error => {
            console.error('Error sending request', error);
            displayError("Error communicating with the server, please try again ");
        });
    });

    function displayError(message)
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}
);

