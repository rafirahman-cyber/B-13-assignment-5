const api = "https://phi-lab-server.vercel.app/api/v1/lab";
let allIssues = [];

// --- Login Logic ---
document.getElementById('login-btn').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        loadIssues();
    } else {
        alert("Invalid password! Use admin / admin123");
    }
});