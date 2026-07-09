function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let videoId = extractVideoID(url);
    let container = document.getElementById('videoContainer');
    
    // Purane tabs ko saaf (clear) karna
    container.innerHTML = '';

    if (!videoId) {
        alert("Sahi YouTube link enter karein (e.g., https://www.youtube.com/watch?v=... ya https://youtu.be/...)");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please kam se kam 1 tab zaroor enter karein!");
        return;
    }

    if (count > 25) {
        alert("Performance issues se bachne ke liye ek baar mein max 25 tabs hi chalayein!");
        return;
    }

    // Loop chala kar dynamically video wrappers create karna
    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        
        // Premium Grid UI ke liye embed code (Autoplay + Mute enabled)
        wrapper.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }
}

// YouTube URL se 11 digit ki Video ID nikalne ka premium logic
function extractVideoID(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
