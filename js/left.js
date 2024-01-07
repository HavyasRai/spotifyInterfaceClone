let playingSongData = new Array();
let SideBarImage = document.getElementById('m-bars-img');
let SideBarRange = document.getElementById('m-range');
let SideBarSName = document.getElementById('m-s-name');
let playBtn = document.getElementById('fa-play');
let topListCards = document.getElementsByClassName('list-content');
let song;



playBtn.onclick = () => {
    if (playBtn.classList.contains('fa-pause')) {
        song.pause();
        playBtn.setAttribute("class", 'fa-solid fa-play');
    }
    else if (playBtn.classList.contains('fa-play')) {
        song.play();
        playBtn.setAttribute("class", 'fa-solid fa-pause');
    }
};
window.onkeydown = (e) => {
    console.log(e.key);
    if (e.key == ' ') {
        playBtn.click();
    }
};


const UpdateMusicBar = () => {
    let songlink = localStorage.getItem("songdata").split(",")[0];
    let imglink = localStorage.getItem("songdata").split(",")[1];
    SideBarImage.src = imglink;


    let songduration = 0.00;
    let audio = document.createElement("audio");
    audio.src = songlink;
    let barUpdateinterval;
    audio.onloadedmetadata = () => {
        songduration = audio.duration;
        songduration = Number.parseFloat(songduration / 60).toFixed(2);
        barUpdateinterval = setInterval(updateBar, 100);
    };

    const updateBar = () => {
        SideBarRange.value = (song.currentTime / song.duration) * 100;
    };
    SideBarRange.oninput = () => {
        clearInterval(barUpdateinterval);
        let newTime = (SideBarRange.value / 100) * song.duration;
        song.currentTime = newTime;
        barUpdateinterval = setInterval(updateBar, 100);
    };

    SideBarSName.innerHTML = playingSongData.name;

};
const playSong = (data) => {
    playingSongData = data;
    let songlink = data.downloadUrl[2].link;
    let image = data.image[2].link;
    if (song)
        song.pause();
    song = new Audio(songlink);
    song.play();
    let songdata = new Array();
    songdata.push(songlink);
    songdata.push(image);
    localStorage.setItem("songdata", songdata);
    UpdateMusicBar();
    playBtn.setAttribute('class', 'fa-solid fa-pause');
};


// sidecard

topListCards = [...topListCards];
topListCards.forEach((e) => {
    e.addEventListener("click", (e) => {
        search.value = e.target.innerText;
        Runfetch();
    });
});