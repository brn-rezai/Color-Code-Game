const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await signUp(username, password);
});

async function signUp(username, password) {
  try {
    const response = await fetch(
      "https://67b57c8fa9acbdb38ed28d18.mockapi.io/api/b1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Try again please!");
    }

    const data = await response.json();
    document.getElementById("message").innerText = "Well done!";

    // console.log(data);

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
}
