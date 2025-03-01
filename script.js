console.log("welcome to spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "FE!N" ,filepath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Trance" ,filepath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Moonlight" ,filepath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Fuck Love" ,filepath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Jhol" ,filepath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Timeless" ,filepath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Starboy" ,filepath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Cry For Me" ,filepath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Around Me" ,filepath: "songs/9.mp3", coverPath: "covers/9.jpg"},

]
songItems.forEach((element , i)=>{
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();
// handle play/pause
masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})
// listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.querySelector('.mastersongname').innerHTML = songs[songIndex].songName;
    });
});

document.getElementById('next').addEventListener('click',()=>{
        if(songIndex>=9){
            songIndex = 0;
        }else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        document.querySelector('.mastersongname').innerHTML = songs[songIndex].songName;
})

document.getElementById('previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex = 0;
        }else{
            songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        document.querySelector('.mastersongname').innerHTML = songs[songIndex].songName;
})

let volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = '0';
volumeSlider.max = '1';
volumeSlider.step = '0.01';
volumeSlider.value = audioElement.volume;
volumeSlider.id = 'volumeSlider';
document.querySelector('.bottom').appendChild(volumeSlider);

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
});

