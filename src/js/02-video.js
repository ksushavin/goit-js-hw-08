import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveVideoplayerCurrentTime, 1000));

function saveVideoplayerCurrentTime({ seconds }) {
    localStorage.setItem("videoplayer-current-time", seconds);
    // console.log("currentTime:", seconds);
}

const videoplayerSavedTime = localStorage.getItem("videoplayer-current-time");
console.log(videoplayerSavedTime);

// Відтворення відео зі збереженної позиції
player.setCurrentTime(videoplayerSavedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


