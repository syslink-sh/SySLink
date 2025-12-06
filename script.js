const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'mocha';
htmlEl.setAttribute('data-theme', savedTheme);
if (themeToggle) themeToggle.addEventListener('click', () => {
    const cur = htmlEl.getAttribute('data-theme');
    const next = cur === 'mocha' ? 'latte' : 'mocha';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

const timeDisplay = document.getElementById('local-time');
const dateDisplay = document.getElementById('local-date');
const timeFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', hour12: false });
const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', month: 'short', day: 'numeric' });
function updateTime() {
    if (timeDisplay) timeDisplay.textContent = timeFmt.format(new Date());
    if (dateDisplay) dateDisplay.textContent = dateFmt.format(new Date());
}
updateTime();
setInterval(updateTime, 60_000);

// discord (lanyard) - simple and robust
const DISCORD_ID = '1423516175161098371';
const REST_API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;
let discordState = { discord_user: { username: 'syslink.sh', avatar: null }, discord_status: 'offline', activities: [] };

const avatarEl = document.getElementById('discord-avatar');
const usernameEl = document.getElementById('discord-username');
const statusEl = document.getElementById('discord-status');
const activityEl = document.getElementById('discord-activity');

function setFavicon(url) {
    try {
        document.querySelectorAll('link[rel~="icon"]').forEach(n => n.parentNode && n.parentNode.removeChild(n));
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = url;
        document.head.appendChild(link);
        const apple = document.createElement('link');
        apple.rel = 'apple-touch-icon';
        apple.href = url;
        document.head.appendChild(apple);
    } catch (e) {
        console.error('Failed to set favicon', e);
    }
}

let ws = null;
let reconnectMs = 1000;
const MAX_RECONNECT = 30000;

async function initDiscord() {
    try {
        const res = await fetch(REST_API_URL);
        const data = await res.json();
        if (data && data.success) {
            discordState = data.data;
            renderDiscordUI();
            connectLanyardWS();
        } else {
            console.error('Lanyard:', data && data.error);
            if (activityEl) activityEl.textContent = 'No presence';
            if (statusEl) statusEl.className = 'status-indicator offline';
        }
    } catch (err) {
        console.error('Fetch error', err);
        if (activityEl) activityEl.textContent = 'API Error';
    }
}

function connectLanyardWS() {
    if (ws) ws.close();
    ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onopen = () => {
        reconnectMs = 1000;
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
    };

    ws.onmessage = (ev) => {
        try {
            const msg = JSON.parse(ev.data);
            const { t, d } = msg;
            if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
                discordState = { ...discordState, ...d };
                renderDiscordUI();
            }
        } catch (e) { /* ignore bad msg */ }
    };

    ws.onerror = (e) => { console.error('WS error', e); ws.close(); };

    ws.onclose = () => {
        setTimeout(connectLanyardWS, reconnectMs);
        reconnectMs = Math.min(MAX_RECONNECT, reconnectMs * 2);
    };
}

function renderDiscordUI() {
    const { discord_user, discord_status, activities } = discordState || {};
    if (discord_user && discord_user.avatar && avatarEl) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discord_user.avatar}.png?size=128`;
        if (avatarEl.src !== avatarUrl) avatarEl.src = avatarUrl;
        // set page favicon to the avatar
        setFavicon(avatarUrl);
    }
    if (discord_user && discord_user.username && usernameEl) usernameEl.textContent = discord_user.username;
    if (statusEl) statusEl.className = 'status-indicator ' + (discord_status || 'offline');

    const custom = (activities || []).find(a => a.type === 4 && a.state);
    const game = (activities || []).find(a => a.type === 0 && a.name);
    if (activityEl) {
        if (custom) activityEl.textContent = custom.state;
        else if (game) activityEl.textContent = `Playing ${game.name}`;
        else activityEl.textContent = 'Chilling';
    }
}

initDiscord();

const cards = Array.from(document.querySelectorAll('.card'));
let raf = null;
let lastMouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
    lastMouse.x = e.clientX; lastMouse.y = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
        cards.forEach(card => {
            const r = card.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = lastMouse.x - cx;
            const dy = lastMouse.y - cy;
            if (Math.abs(dx) < 500 && Math.abs(dy) < 500) {
                const rx = (cy - lastMouse.y) / 30 * 0.05;
                const ry = (lastMouse.x - cx) / 30 * 0.05;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            } else {
                card.style.transform = 'none';
            }
        });
        raf = null;
    });
});

document.addEventListener('mouseleave', () => cards.forEach(c => c.style.transform = 'none'));
