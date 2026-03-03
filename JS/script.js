/* Side Nav */
document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggleBtn");
    const sidebar = document.getElementById("sidebar");

    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("collapsed");
    });
});

/* Account dropdown */
const accountBtn = document.getElementById("accountBtn");

accountBtn.addEventListener("click", function(e){
    e.stopPropagation();
    this.classList.toggle("active");
});

document.addEventListener("click", function(){
    accountBtn.classList.remove("active");
});

/* Play music */
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".music-card");
    const audio = document.getElementById("audioPlayer");

    const playerTitle = document.querySelector(".song-title");
    const playerArtist = document.querySelector(".song-artist");
    const playerCover = document.querySelector(".cover");

    const mainPlayBtn = document.querySelector(".play-btn");
    const mainPlayIcon = document.querySelector(".play-btn i");

    const progressBar = document.querySelector(".progress-bar");
    const currentTimeEl = document.querySelector(".current-time");
    const durationEl = document.querySelector(".duration");

    const volumeBar = document.querySelector(".volume-bar");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    let currentIndex = -1;

    const songs = Array.from(cards).map(card => ({
        title: card.dataset.title,
        artist: card.dataset.artist,
        cover: card.dataset.cover,
        audio: card.dataset.audio,
        element: card
    }));

    function loadSong(index) {
        const song = songs[index];

        audio.src = song.audio;
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;
        playerCover.src = song.cover;

        currentIndex = index;
    }

    function playSong() {
        audio.play();
    }

    function pauseSong() {
        audio.pause();
    }

    function updateIcons() {
        if (audio.paused) {
            mainPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
        } else {
            mainPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
        }
    }

    function updateCardIcons() {
    cards.forEach((card, index) => {
        const icon = card.querySelector(".play-hover-btn i");

        if (index === currentIndex && !audio.paused) {
            icon.classList.remove("bi-play-fill");
            icon.classList.add("bi-pause-fill");
        } else {
            icon.classList.remove("bi-pause-fill");
            icon.classList.add("bi-play-fill");
        }
    });
}

    // Card click
    cards.forEach((card, index) => {
        const btn = card.querySelector(".play-hover-btn");

        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            if (currentIndex === index) {
                audio.paused ? playSong() : pauseSong();
                return;
            }

            loadSong(index);
            playSong();
            updateCardIcons();
        });
    });

    // Main play button
    mainPlayBtn.addEventListener("click", function () {
        if (!audio.src) return;
        audio.paused ? playSong() : pauseSong();
    });

    // Next
    nextBtn.addEventListener("click", function () {
        if (currentIndex < songs.length - 1) {
            loadSong(currentIndex + 1);
        } else {
            loadSong(0);
        }
        playSong();
    });

    // Previous
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            loadSong(currentIndex - 1);
        } else {
            loadSong(songs.length - 1);
        }
        playSong();
    });

    // Progress bar update
    audio.addEventListener("timeupdate", function () {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progressPercent;

            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    // Seek
    progressBar.addEventListener("input", function () {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Volume
    volumeBar.addEventListener("input", function () {
        audio.volume = volumeBar.value / 100;
    });

    // Sync icons
    audio.addEventListener("play", function () {
    updateIcons();
    updateCardIcons();
    });

    audio.addEventListener("pause", function () {
        updateIcons();
        updateCardIcons();
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    }

});