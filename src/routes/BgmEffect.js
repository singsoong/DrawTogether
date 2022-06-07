import { Howl } from 'howler';
import {finalVolume} from "../components/volume";

function effectSound(src, volume = 1) {
    let sound;
    const soundInject = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
    }
    soundInject(src);
    return sound;
}

export default effectSound;
