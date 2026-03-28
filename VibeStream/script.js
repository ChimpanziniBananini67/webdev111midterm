//palaylist
var playlist = [
    {file: "walangmakapa.mp3", cover: "hev.png", title: "Walang Makapa", artist: "Hev Abi"},
    {file: "Materyal.mp3", cover: "shan.jpg", title: "Materyal", artist: "Shantidope"},
    {file: "abaga.mp3", cover: "nio.png", title: "ABA GINOONG NAPUPUNO NG SWAG", artist: "NIO"},
    {file: "MINAHALAGAD.mp3", cover: "hv.jpg", title: "MINAHALAGAD", artist: "Because, Hev Abi"},
    {file: "badbad.mp3", cover: "bad.jpg", title: "badbad", artist: "Wagwan Bolo, Raf-L, DIM MAC"},
    {file: "mau.mp3", cover: "mau.jpg", title: "Mau", artist: "Shanti Dope"},
    {file: "timogmagulo.mp3", cover: "m2m.jpg", title: "WELCOME2TIMOGMAGULO", artist: "Hev Abi"}
];

var currentIndex = 0;

//elements
var audio = document.getElementById("audioPlayer");
var currentTimeDisplay = document.getElementById("current-time");
var totalTimeDisplay = document.getElementById("total-time");
var volumeSlider = document.getElementById("volumeSlider");
var volumeIcon = document.getElementById("volumeIcon");

//volslide
volumeSlider.addEventListener("input", function() {
    audio.volume = this.value;
    if (this.value == 0) volumeIcon.innerText = "🔇";
    else if (this.value < 0.5) volumeIcon.innerText = "🔈";
    else if (this.value < 0.8) volumeIcon.innerText = "🔉";
    else volumeIcon.innerText = "🔊";
});

volumeIcon.addEventListener("click", function() {
    if (audio.volume > 0) {
        audio.dataset.prevVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = audio.dataset.prevVolume || 1;
        volumeSlider.value = audio.volume;
    }
    volumeSlider.dispatchEvent(new Event("input"));
});

//songselect
function selectSong(file, cover, title, artist) {
    audio.src = file;
    document.getElementById("player-cover").src = cover;
    document.getElementById("player-title").innerText = title;
    document.getElementById("player-artist").innerText = artist;

    // update currentIndex
    currentIndex = playlist.findIndex(s => s.file === file);

    audio.play();
}

/*playnpause*/
function playAudio() { audio.play(); }
function pauseAudio() { audio.pause(); }

/nextprevsong*/
function nextSong() {
    currentIndex++;
    if (currentIndex >= playlist.length) currentIndex = 0;
    var s = playlist[currentIndex];
    selectSong(s.file, s.cover, s.title, s.artist);
}

function prevSong() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = playlist.length - 1;
    var s = playlist[currentIndex];
    selectSong(s.file, s.cover, s.title, s.artist);
}

/*timedisplay*/
audio.addEventListener('loadedmetadata', function() {
    totalTimeDisplay.innerText = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', function() {
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
});

/*timeformat*/
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    if (secs < 10) secs = '0' + secs;
    return minutes + ':' + secs;
}