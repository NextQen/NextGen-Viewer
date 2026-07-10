function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let videoId = extractVideoID(url);
    let container = document.getElementById('videoContainer');
    let unmuteBtn = document.getElementById('unmuteBtn');
    
    container.innerHTML = '';
    unmuteBtn.style.display = 'none'; // Pehle button hide rahega

    if (!videoId) {
        alert("Sahi YouTube link enter karein!");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please kam se kam 1 tab zaroor enter karein!");
        return;
    }

    // Loop chala kar advanced iframes generate karna
    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        
        // enablejsapi=1 lagaya hai taaki hum JavaScript se volume control kar sakein
        wrapper.innerHTML = `
            <iframe id="yt-frame-${i}" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }

    // Videos load hone ke baad Volume button dikhayein
    if(count > 0) {
        unmuteBtn.style.display = 'inline-block';
    }
}

// Ek sath saare tab ka volume open karne ka logic
function unmuteAllVideos() {
    let iframes = document.querySelectorAll('.video-wrapper iframe');
    
    iframes.forEach(iframe => {
        // YouTube Player API command send kar rahe hain unmute aur volume set karne ke liye
        iframe.contentWindow.postMessage('{"event":"command","func":"unmute","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[50]}', '*'); // Volume 50% par open hoga
    });
    
    alert("Saare tabs ka volume open kar diya gaya hai! (Bot activity bypass mode active)");
}

function extractVideoID(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
