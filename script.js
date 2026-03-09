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



// --- Display Cards ---
function displayIssues(issues) {
    const container = document.getElementById('issues-container');
    document.getElementById('issue-count').innerText = `${issues.length} Issues`;
    
    container.innerHTML = issues.map(issue => `
        <div onclick="showDetail('${issue.id}')" class="bg-white p-5 rounded-lg border-t-4 shadow-sm hover:shadow-md cursor-pointer transition-all ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] uppercase font-bold px-2 py-1 bg-red-100 text-red-600 rounded">${issue.priority || 'Low'}</span>
                <span class="text-xs text-gray-400">#${issue.id}</span>
            </div>
            <h3 class="font-bold text-gray-800 line-clamp-1 mb-2">${issue.title}</h3>
            <p class="text-sm text-gray-500 line-clamp-2 mb-4">${issue.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded">BUG</span>
                <span class="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded">HELP WANTED</span>
            </div>
            <div class="border-t pt-3 flex justify-between items-center text-[11px] text-gray-400">
                <span>By ${issue.author}</span>
                <span>${issue.createdAt}</span>
            </div>
        </div>
    `).join('');
}