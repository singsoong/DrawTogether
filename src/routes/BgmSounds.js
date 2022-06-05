import { useEffect } from 'react'
import { Howl } from 'howler';
import {finalVolume} from "../components/volume";


function useSound(src,fadeoutTime = 0) {
    let sound;
    const volume=finalVolume;
    const soundStop = () => sound.stop();
    const soundPlay = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
        sound.play();
    }

    useEffect(() => {
        soundPlay(src);
        sound.on('play', () => {
            const fadeouttime = fadeoutTime;
            setTimeout(() => sound.fade(volume, fadeouttime), (sound.duration() - sound.seek()) * 1000 - fadeouttime);
        });
        return soundStop;
    }, []);
}

export default useSound;