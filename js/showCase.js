const audioContainer = document.querySelector(".audio-container");
const muteBtn = document.querySelector("#volume");
const reloadBtn = document.querySelector("#reload");
const playBtn = document.querySelector("#play");
const expandBtn = document.querySelector("#expand");
const title = document.querySelector("#title");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

//Song Titles
const songs = ["hey", "summer", "ukulele"];

//Keep track of songs
let songIndex = 2;

//Initially load songs into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
}

//Mute function
function muteAudio() {
  audioContainer.classList.add("mute");
  muteBtn.querySelector("i.fas").classList.remove("fa-volume-up");
  muteBtn.querySelector("i.fas").classList.add("fa-volume-mute");

  let currentAudio = document.getElementById("audio");
  currentAudio.muted = true;
}

function unMuteAudio() {
  audioContainer.classList.remove("mute");
  muteBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
  muteBtn.querySelector("i.fas").classList.add("fa-volume-up");

  let currentAudio = document.getElementById("audio");
  currentAudio.muted = false;
}

//play/pause function
function playAudio() {
  audioContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseAudio() {
  audioContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

//expand function
function fullScreen() {
  audioContainer.classList.add("full-screen");
  expandBtn.querySelector("i.fas").classList.remove("fa-compress");
  expandBtn.querySelector("i.fas").classList.add("fa-expand");
}

function compressScreen() {
  audioContainer.classList.remove("full-screen");
  expandBtn.querySelector("i.fas").classList.remove("fa-expand");
  expandBtn.querySelector("i.fas").classList.add("fa-compress");
}

function updateProgress(e) {
  //   console.log(e.srcElement.currentTime);
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  //   console.log(width);
  const clickX = e.offsetX;
  //   console.log(clickX);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//muteBtn
muteBtn.addEventListener("click", () => {
  const isMute = audioContainer.classList.contains("mute");
  if (isMute) {
    unMuteAudio();
  } else {
    muteAudio();
  }
});

//play/pause Btn
playBtn.addEventListener("click", () => {
  const isPlaying = audioContainer.classList.contains("play");

  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

//fullscreen
expandBtn.addEventListener("click", () => {
  const isFullScreen = audioContainer.classList.contains("full-screen");
  if (isFullScreen) {
    compressScreen();
  } else {
    fullScreen();
  }
});

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

//flip page

var pages = document.getElementsByClassName("page");
for (var i = 0; i < pages.length; i++) {
  var page = pages[i];
  if (i % 2 === 0) {
    page.style.zIndex = pages.length - i;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  for (var i = 0; i < pages.length; i++) {
    //Or var page = pages[i];
    pages[i].pageNum = i + 1;
    pages[i].onclick = function () {
      if (this.pageNum % 2 === 0) {
        this.classList.remove("flipped");
        this.previousElementSibling.classList.remove("flipped");
      } else {
        this.classList.add("flipped");
        this.nextElementSibling.classList.add("flipped");
      }
    };
  }
});
