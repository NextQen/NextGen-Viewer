function addVideos() {
    let url = document.getElementById('ytLink').value;
    let count = document.getElementById('tabCount').value;
    let videoId = extractVideoID(url);
    let container = document.getElementById('videoContainer');
    
    container.innerHTML = '';

    if (videoId && count > 0) {
        for (let i = 0; i < count; i++) {
            let wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';
            wrapper.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
            `;
            container.appendChild(wrapper);
        }
    } else {
        alert("Please sahi YouTube link aur number of tabs enter karein!");
    }
}

function extractVideoID(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
