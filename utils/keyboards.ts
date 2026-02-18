import { Keyboard } from "grammy";

/**
 * Create a custom keyboard from an array of values string or number
 * @param arr The array of values to construct the keyboard from
 * @returns Keyboard
 */
export function keyboardFromArray(arr: Array<string | number>): Keyboard {
    const keyboard = new Keyboard();
    for (let i = 0; i < arr.length; i++) {
        keyboard.text(arr[i].toString()).row();
    }
    return keyboard;
}