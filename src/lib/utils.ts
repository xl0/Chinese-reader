import Pinyin from "pinyin-tone";

export function tone2accent(pinyin?: string) {
    console.log('tone2accent', pinyin);
    return pinyin ? Pinyin(pinyin.toLowerCase().trim()) : '';
}

export function tone2class(pinyn?: string) {
    console.log('tone2class', pinyn);
    if (!pinyn) return '';
    const tone = pinyn.trim().slice(-1);
    if (!isNaN(Number(tone))) {
        return `tone${tone}`;
    }
    return '';
}
