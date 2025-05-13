const socket = io('http://localhost:3001');

function notifyViewedMovie(title) {
    socket.emit('viewedMovie', { title });
}

socket.on('userViewed', (data) => {
    const feed = document.getElementById('live-feed');
    const item = document.createElement('div');
    item.textContent = `🎬 Хтось щойно переглянув: ${data.title}`;
    feed.prepend(item);
});

console.log('✅ socket.js підключено');
