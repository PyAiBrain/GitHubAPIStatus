const apiUrl = "https://www.githubstatus.com/api/v2/status.json";
const statusBox = document.getElementById("status-box");
const lastUpdated = document.getElementById("last-updated");
const themeToggle = document.getElementById("theme-toggle");

// Fetch GitHub API status
async function fetchStatus() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { status, page } = data;

        // Update status
        statusBox.textContent = `Status: ${status.description}`;
        statusBox.className = `status-box ${status.indicator || "none"}`;

        // Update last updated time
        const updatedTime = new Date(page.updated_at).toLocaleString();
        lastUpdated.textContent = `Letztes Update: ${updatedTime}`;
    } catch (error) {
        statusBox.textContent = "Fehler beim Laden des Status.";
        statusBox.className = "status-box";
        console.error(error);
    }
}

// Toggle Dark/Light Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark")
        ? "Light Mode"
        : "Dark Mode";
});

// Initial load
fetchStatus();

// Refresh every 60 seconds
setInterval(fetchStatus, 60000);