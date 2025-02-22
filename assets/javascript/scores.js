document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("tbody");
  const btnLowestScores = document.querySelector(".score-btn");

  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://67b57c8fa9acbdb38ed28d18.mockapi.io/api/b1/users"
      );
      let users = await response.json();

      return users.filter((user) => user.id !== undefined);
    } catch (error) {
      console.error("error:", error);
      return [];
    }
  }

  function renderTable(users) {
    tableBody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${user.name}</td>
                  <td>${user.score}</td>
              `;
      tableBody.appendChild(row);
    });
  }

  async function showTopScores() {
    const users = await fetchUsers();
    const topUsers = users.sort((a, b) => b.score - a.score).slice(0, 10);
    renderTable(topUsers);
  }

  async function showLowestScores() {
    const users = await fetchUsers();
    const lowestUsers = users
      .sort((a, b) => a.score - b.score)
      .slice(0, 10)
      .sort((a, b) => b.score - a.score);
    renderTable(lowestUsers);
  }

  btnLowestScores.addEventListener("click", showLowestScores);

  showTopScores();
});
