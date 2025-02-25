const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cPass = document.getElementById("confPassword").value;
});

if (password !== confirmPassword) {
  alert("The passwoid is not correct! try again.");
  return;
}

try {
  const response = await fetch(
    "https://67b57c8fa9acbdb38ed28d18.mockapi.io/api/b1/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Try again please!");
  }

  const data = await response.json();
  console.log("Login successful:", data);
} catch (error) {
  console.error("error:", error);
  alert("Try again please!");
}
