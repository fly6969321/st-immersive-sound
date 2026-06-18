import { requestLocalTTS } from './local-tts.js';
// 根据实际路径调整引入，通常 SillyTavern 扩展都在这个相对层级
import { extension_settings } from '../../../../extensions.js';
import { extensionName } from './config.js';
import * as playback from './playback.js'; 
import { getCache, setCache } from './tts-cache.js'; 

export async function playLocalTTS(text, speakerName) {
    const settings = extension_settings[extensionName]?.localTTS || {};
    
    const opts = {
        baseUrl: settings.baseUrl || 'http://127.0.0.1:753',
        voice: settings.voice || '',
        token: settings.token || '',
        format: settings.format || 'wav'
    };

    const cacheKey = `local_${text}_${opts.voice}`;
    let cachedBlob = null;
    try { cachedBlob = getCache(cacheKey); } catch(e) {}

    if (cachedBlob) {
        try { await playback.playAudioBlob(cachedBlob, 'voice', speakerName); } catch(e) {}
        return;
    }

    try {
        const { blob } = await requestLocalTTS(text, opts);
        try { setCache(cacheKey, blob); } catch(e) {}
        await playback.playAudioBlob(blob, 'voice', speakerName);
    } catch (e) {
        console.error('[LocalTTS] 生成或播放失败:', e.message);
    }
}
