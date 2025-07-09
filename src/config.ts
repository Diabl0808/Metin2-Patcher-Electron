export const patchlistUrl = 'http://149.102.152.84/patch/files.json'
export const patchlistFolder = 'http://149.102.152.84/patch/files/'

export const enableSlider = false //if false the slider will be disabled

//if enableSlider is false the value of this variables is optional
export const patchSliderUrl = 'https://url/slider.json'
export const patchSliderImages = 'https://url/slider/'

/*
Karbust Localhost Debug URLs:

export const patchlistUrl = 'http://localhost:81/electron/files.json'
export const patchlistFolder = 'http://localhost:81/electron/files/'
export const patchSliderUrl = 'http://localhost:81/electron/slider.json'
export const patchSliderImages = 'http://localhost:81/electron/slider/'
 */

export const enableDiscordButton = true //if false the button will not be displayed.
export const discordUrl = 'https://discord.gg/kRapzeCZTr'

export const serverName = 'Olympo2'
export const binaryName = 'metin2client.exe'
export const configName = 'config.exe'
export const launchParameters = ['--something']

export const enableLocaleCfgUpdate = false //if true the locale.cfg will be updated when changing the language.
export const localeCfgPath = 'locale.cfg' //default place, if it's inside a folder, prepend the path of such folder.
/*
Example:
export const localeCfgPath = 'settings\\locale.cfg'

Don't put the backslashes in the beginning, and in the middle use 2.
 */
export const locales: Record<string, string> = {
    'de': '10002 1252 de',
    'es': '10002 1252 es',
    'en': '10002 1252 en',
    'fr': '10002 1252 fr',
    'pl': '10002 1250 pl',
    'pt': '10000 1252 pt',
    'ro': '10002 1250 ro',
    'tr': '10012 1254 tr'
}

/* NOT BEING USED
export const ServerUrl = 'https://karbust.me/'
export const ServerUrlForum = 'https://karbust.me/'
export const ServerUrlRegister = 'https://karbust.me/'
export const ServerUrlSupport = 'https://karbust.me/'
*/

export const debugFolder = 'C:\\Users\\Karbust\\Desktop\\tests'
