function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let container = document.getElementById('videoContainer');
    
    // Container ko reset karein
    container.innerHTML = '';

    // Solid Video ID Extractor
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1].split("?")[0];
    }

    if (!videoId || videoId.length !== 11) {
        alert("Sahi YouTube link enter karein! Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please tabs ki sankhya enter karein!");
        return;
    }

    if (count > 25) {
        alert("Performance ke liye ek baar mein max 25 tabs hi chalayein!");
        return;
    }

    // Saare tabs load honge fully multi-view aur auto-loop optimization ke sath
    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        wrapper.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }
}
