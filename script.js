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



// --- Fetch Issues ---
async function loadIssues(searchQuery = '') {
    const loader = document.getElementById('loader');
    const container = document.getElementById('issues-container');
    
    loader.classList.remove('hidden');
    container.innerHTML = '';

    try {
        let url = searchQuery 
            ? `${api}/issues/search?q=${searchQuery}` 
            : `${api}/issues`;

        const res = await fetch(url);
        const data = await res.json();
        allIssues = data.data || data; 
        
        displayIssues(allIssues);
    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        loader.classList.add('hidden');
    }
}