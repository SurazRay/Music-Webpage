let songs = document.querySelectorAll(".songs li");  //Accessing Song Lists on main tag
let playAll = document.querySelector("#play-all");   //Accessing the Play All button
let playBtn = document.querySelector("#play-pause");   //Accessing the main Play and pause button 
let backBtn = document.querySelector("#play-back");    //Accessing the Play backward button
let nextBtn = document.querySelector("#play-next");    //Accessing the Play forward button
let gif = document.querySelectorAll(".gif");           // Accessing the music playing gif to indicate which song is playing
let songLine = document.querySelector("#song-play-line");  //Accessing the song play line
let currentSongName = document.querySelector(".current-song-name");  //Accessing the current song name beside play button in footer
let currentSongCover = document.querySelector(".current-cover");   //Accessing the cover pic for current song

//For main play & pause  buttons

let currentSong = 0;
let trackPlay = true;

//Songs Names images and file paths

const songList = [
    { songName: "Khud Ko Tere Paas", filePath: "Khud Ko Tere.mp3", cover: "https://c.saavncdn.com/256/1920-Evil-Returns-Hindi-2012-20221213041144-500x500.jpg" },
    { songName: "Tum Hi Ho Bandhu", filePath: "Tum Hi Ho Bandhu.mp3", cover: "https://c.saavncdn.com/256/1920-Evil-Returns-Hindi-2012-20221213041144-500x500.jpg" },
    { songName: "Rain On Me", filePath: "Rain On Me.mp3", cover: "https://toppng.com/uploads/preview/15-music-notes-transpa-png-for-free-on-mbtskoudsalg-transparent-background-music-logo-11563333702cvrvtiehly.png" },
    { songName: "Majboor Tu Bhi Kahin", filePath: "Majboor Tu Bhi Kahin.mp3", cover: "https://c.saavncdn.com/256/1920-Evil-Returns-Hindi-2012-20221213041144-500x500.jpg" },
    { songName: "Dil Tu Hi Bata", filePath: "Dil Tu Hi Bataa Krrish.mp3", cover: "https://c.saavncdn.com/171/Krrish-3-Hindi-2013-500x500.jpg" },
    { songName: "Only Love Can Hurt Like This", filePath: "Only Love Can Hurt Like This .mp3", cover: "https://c.saavncdn.com/654/A-Perfect-Contradiction-2014-500x500.jpg" },
    { songName: "Careless Whisper", filePath: "George Michael - Careless Whisper.mp3", cover: "https://c.saavncdn.com/011/Ladies-Gentlemen-2011-500x500.jpg" },
    { songName: "Haseeno Ka Diwana", filePath: "Haseeno Ka Deewana.mp3", cover: "https://toppng.com/uploads/preview/15-music-notes-transpa-png-for-free-on-mbtskoudsalg-transparent-background-music-logo-11563333702cvrvtiehly.png" },
    { songName: "Uska Hi Banana", filePath: "Uska Hi Banana.mp3", cover: "https://c.saavncdn.com/256/1920-Evil-Returns-Hindi-2012-20221213041144-500x500.jpg" },
    { songName: "Can't Remember To Forget You", filePath: "Can't Remember To Forget You.mp3", cover: "https://toppng.com/uploads/preview/15-music-notes-transpa-png-for-free-on-mbtskoudsalg-transparent-background-music-logo-11563333702cvrvtiehly.png" },
];

//Changing the name and image of given songs

Array.from(songs).forEach((song, index) => {

    song.childNodes[0].src = songList[index].cover;                 //Photo 
    song.childNodes[2].innerText = songList[index].songName;       //name

    // Whenever any song from the list is clicked, they will play

    song.addEventListener("click", () => {

        playMusic(index);   //  5
    });
});

// Event Listener for Play All button to play the song

playAll.addEventListener("click", () => {

    playMusic(0);  // 5

});

//  Play & pause music function to play & pause music whenever main buttons pressed

// Assigning current Song

let songEl = new Audio(songList[currentSong].filePath);

function playMusic(songIndex) {           // 5 - Function Definition // 5

    // Updating song's index into currentSong variable so that Main Play buttons know current song

    currentSong = songIndex;
    // stopping previous song and assigning new song then playing it
    songEl.pause();
    songEl = new Audio(songList[songIndex].filePath);
    songEl.play();

    // Altering play button into pause button

    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");

    // Updating main button's iterator

    trackPlay = false;

    //Removing gif from all and adding to the current one

    gif.forEach((e) => { e.style.opacity = 0; });
    gif[songIndex].style.opacity = 1;

    //Updating current song name and cover in footer

    currentSongName.innerText = songList[songIndex].songName;
    currentSongCover.src = songList[songIndex].cover;

    // Updating the Song Play Line every 2 sec

    setInterval(() => {

        songLine.value = songEl.currentTime / songEl.duration * 100;

        // Updating new song when current one ends

        if (songLine.value == 100) {
            currentSong++;
            playMusic(currentSong);   //   5
        }
    }, 1000);

};

function pauseMusic() {     // 6

    songEl.pause();

    // Altering pause button into play button
    playBtn.classList.remove("fa-pause-circle");
    playBtn.classList.add("fa-play-circle");
    //Removing gif from all and adding to the current one
    gif.forEach((e) => { e.style.opacity = 0; })
};

//Main Play Button

playBtn.addEventListener("click", () => {
    if (trackPlay) {

        playMusic(currentSong);   // 5
        // trackPlay = false;

    } else {

        pauseMusic(currentSong);  // 6
        trackPlay = true;

    }

});

//forward button

nextBtn.addEventListener("click", () => {
    if (currentSong == 9) {
        currentSong = 0;
        playMusic(currentSong);  // 5
    } else {
        currentSong++;
        playMusic(currentSong);  // 5
    }

});

//Back button 

backBtn.addEventListener("click", () => {
    if (currentSong == 0) {
        currentSong = 9;
        playMusic(currentSong);   // 5
    } else {
        currentSong--;
        playMusic(currentSong);    // 5
    }

});

songLine.addEventListener("change", () => {

    songEl.currentTime = songLine.value * songEl.duration / 100;

});