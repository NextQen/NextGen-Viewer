function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let container = document.getElementById('videoContainer');
    let unmuteBtn = document.getElementById('unmuteBtn');
    
    container.innerHTML = '';
    if (unmuteBtn) unmuteBtn.style.display = 'none';

    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1].split("?")[0];
    }

    if (!videoId || videoId.length !== 11) {
        alert("Sahi YouTube link enter karein!");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please tabs enter karein!");
        return;
    }

    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        wrapper.innerHTML = `
            <iframe id="yt-frame-${i}" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }

    // Videos ke aate hi button block open ho jayega
    if (count > 0 && unmuteBtn) {
        unmuteBtn.style.display = 'inline-block';
    }
}

function unmuteAllVideos() {
    let iframes = document.querySelectorAll('.video-wrapper iframe');
    
    if (iframes.length === 0) {
        alert("Pehle videos load karein!");
        return;
    }

    iframes.forEach(iframe => {
        // PostMessage API commands jisse volume automatic open hoga 
        iframe.contentWindow.postMessage('{"event":"command","func":"unmute","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[50]}', '*');
    });
    
    alert("Saare tabs ka volume 50% par open kar diya gaya hai! Anti-bot mode active.");
}
