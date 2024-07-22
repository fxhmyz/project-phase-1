let songs = [];
let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const songTitle = document.getElementById("song-title");
const songList = document.getElementById('songList');

document.getElementById("play").addEventListener("click", playSong);
document.getElementById("pause").addEventListener("click", pauseSong);
document.getElementById("prev").addEventListener("click", prevSong);
document.getElementById("next").addEventListener("click", nextSong);

function loadSong(index) {
    audioSource.src = songs[index].url;
    audioPlayer.load();
    songTitle.textContent = songs[index].title;
}

function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function populateSongList() {
    songList.innerHTML = ''; // Clear existing song list
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(li);
    });
}

// Fetch songs from the JSON file
fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        songs = data.songs;
        loadSong(currentSongIndex);
        populateSongList();
    })
    .catch(error => console.error('Error fetching songs:', error));

// Load the first song on page load
document.addEventListener('DOMContentLoaded', () => {
    // No need to call loadSong here as it's done after fetch
});
