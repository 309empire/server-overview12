async function fetchWidget() {
    try {
        const response = await fetch('/api/widget');
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching widget:', error);
    }
}

function updateUI(data) {
    document.getElementById('server-name').textContent = data.name;
    document.getElementById('online-count').textContent = data.presence_count;

    const rolesContainer = document.getElementById('roles-display');
    if (rolesContainer && data.channels) {
        rolesContainer.innerHTML = '';
        const displayItems = data.channels.slice(0, 5); 
        displayItems.forEach(channel => {
            const pill = document.createElement('span');
            pill.className = 'role-pill';
            pill.textContent = `# ${channel.name}`;
            rolesContainer.appendChild(pill);
        });
    }

    const grid = document.getElementById('member-grid');
    grid.innerHTML = '';
    data.members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <img src="${member.avatar_url}" alt="${member.username}" class="avatar">
            <span class="username">${member.username}</span>
        `;
        grid.appendChild(card);
    });
}

fetchWidget();
setInterval(fetchWidget, 30000);