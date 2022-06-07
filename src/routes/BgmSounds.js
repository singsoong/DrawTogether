import { useEffect } from 'react'
import { Howl } from 'howler';
import {finalVolume} from "../components/volume";


function useSound(src,fadeoutTime = 0) {
    let sound;
    const Volume=finalVolume;
    const soundStop = () => sound.stop();
    const soundPlay = (src) => {
        sound = new Howl({ src });
        sound.volume(Volume);
        sound.play();
    }

    useEffect(() => {
        soundPlay(src);
        sound.on('play', () => {
            const fadeouttime = fadeoutTime;
            setTimeout(() => sound.fade(Volume, fadeouttime), (sound.duration() - sound.seek()) * 1000 - fadeouttime);
        });
        return soundStop;
    }, []);
}

export default useSound;