export const audio = (() => {

    const music = document.getElementById('button-music');
    let audio = null;


    // Function to handle window blur event
    const handleWindowBlur = () => {
        if (audio) {
            audio.pause(); // Pause audio when window loses focus
        }
    };

    // Function to handle window focus event
    const handleWindowFocus = () => {
        if (audio) {
            audio.play(); // Resume playing audio when window gains focus
        }
    };

    // Event listeners for window blur and focus events
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    const getAudio = () => {
        if (!audio) {
            audio = new Audio();
            audio.src = music.getAttribute('data-url');
            audio.load();
            audio.currentTime = 0;
            audio.autoplay = true;
            audio.muted = false;
            audio.loop = true;
            audio.volume = 0; // Start with volume set to 0
        }

        // Gradually increase volume
        const interval = setInterval(() => {
            if (audio.volume < 1) {
                audio.volume = Math.min(audio.volume + 0.1, 1); // Increase volume by 10% each time, but ensure it doesn't exceed 1
            } else {
                clearInterval(interval); // Stop increasing volume when it reaches 100%
            }
        }, 1000); // Adjust the interval time (in milliseconds) as needed

        return audio;
    };

    const button = (button) => {
        if (button.getAttribute('data-status') !== 'true') {
            button.setAttribute('data-status', 'true');
            getAudio().play();
            button.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
            return;
        }

        button.setAttribute('data-status', 'false');
        getAudio().pause();
        button.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    };

    const showButton = () => {
        music.style.display = 'block';
    };

    return {
        play: () => getAudio().play(),
        button,
        showButton,
    };
})();