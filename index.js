import{extension_settings}from'../../../extensions.js';
import{extension_settings as _0x23a0c0}from'../../../extensions.js';
import{saveSettingsDebounced}from'../../../../script.js';
import{extension_settings as _0x3aeb7e}from'../../../extensions.js';
import{saveSettingsDebounced as _0x5e0673,eventSource}from'../../../../script.js';
import{extension_settings as _0x45be53}from'../../../extensions.js';
import{extension_settings as _0x274574}from'../../../extensions.js';
import{extension_settings as _0xf1e997}from'../../../extensions.js';
import{extension_settings as _0x14a64c}from'../../../extensions.js';
import{extension_settings as _0x5eb01c}from'../../../extensions.js';
import{extension_settings as _0x5180da}from'../../../extensions.js';
import{saveSettingsDebounced as _0x4038e0}from'../../../../script.js';
import{getContext}from'../../../st-context.js';
import{extension_settings as _0x16125b}from'../../../extensions.js';
import{saveSettingsDebounced as _0x34ec4c}from'../../../../script.js';
import{extension_settings as _0x535b22}from'../../../extensions.js';
import{saveSettingsDebounced as _0x4052ac}from'../../../../script.js';
import{extension_settings as _0x124155}from'../../../extensions.js';
import{saveSettingsDebounced as _0x36b4d5}from'../../../../script.js';
import{extension_settings as _0xc0ddb1}from'../../../extensions.js';
import{saveSettingsDebounced as _0x570111}from'../../../../script.js';
import{extension_settings as _0x50fcf5}from'../../../extensions.js';
import{extension_settings as _0x47abc1}from'../../../extensions.js';
import{extension_settings as _0x2c50e5}from'../../../extensions.js';
import{eventSource as _0xfa907c}from'../../../../script.js';
import{extension_settings as _0x3f05a2}from'../../../extensions.js';
import{extension_settings as _0x30ff25}from'../../../extensions.js';
import{extension_settings as _0x28471d}from'../../../extensions.js';
import{saveSettingsDebounced as _0x4cf328,eventSource as _0x16ac59}from'../../../../script.js';
import{extension_settings as _0x3993b1}from'../../../extensions.js';
import{extension_settings as _0x16aff3}from'../../../extensions.js';
import{saveSettingsDebounced as _0x5e972b,eventSource as _0x213931}from'../../../../script.js';
import{eventSource as _0x20b424,event_types,chat}from'../../../../script.js';
import{extension_settings as _0x215f1d}from'../../../extensions.js';
import{getContext as _0x57372f}from'../../../st-context.js';
import{extension_settings as _0x3d47b6}from'../../../extensions.js';
import{extension_settings as _0x4b89b6,extensionTypes as _0x3860f6}from'../../../extensions.js';
import{saveSettingsDebounced as _0x3fdc87,eventSource as _0x570776,event_types as _0x5d3453}from'../../../../script.js';
import{getContext as _0x5e841f}from'../../../st-context.js';
import{extension_settings as _0x53867d}from'../../../extensions.js';
import{saveSettingsDebounced as _0x82700b}from'../../../../script.js';
import{extension_settings as _0x288fb0}from'../../../extensions.js';
import{saveSettingsDebounced as _0x4e4861}from'../../../../script.js';
import{extension_settings as _0xd4d12f}from'../../../extensions.js';
import{eventSource as _0x13b4df,saveSettingsDebounced as _0x4d40aa}from'../../../../script.js';
import{extension_settings as _0x3a57fb}from'../../../extensions.js';
import{saveSettingsDebounced as _0x384402}from'../../../../script.js';
import{extension_settings as _0x59e0a7}from'../../../extensions.js';
import{saveSettingsDebounced as _0x40c355,eventSource as _0x2ef8ff}from'../../../../script.js';
import{extension_settings as _0x556224}from'../../../extensions.js';
import{saveSettingsDebounced as _0x1fea7f,eventSource as _0x388a6b}from'../../../../script.js';
import{extension_settings as _0x16b4f7}from'../../../extensions.js';
import{saveSettingsDebounced as _0x75ec29}from'../../../../script.js';
import{extension_settings as _0x37b05a}from'../../../extensions.js';
import{saveSettingsDebounced as _0x3a1393}from'../../../../script.js';
import{extension_settings as _0x459ad4}from'../../../extensions.js';
import{saveSettingsDebounced as _0x20b5cd}from'../../../../script.js';
import{extension_settings as _0x3d800e}from'../../../extensions.js';
import{extension_settings as _0x37bab2}from'../../../extensions.js';
import{saveSettingsDebounced as _0x2f01bc}from'../../../../script.js';
import{saveSettingsDebounced as _0x49350d}from'../../../../script.js';
import{extension_settings as _0x359b39}from'../../../extensions.js';
import{extension_settings as _0x35baca,extensionTypes}from'../../../extensions.js';
import{eventSource as _0x5ace75,settings as _0x50d3d2,saveSettingsDebounced as _0x2dc50e}from'../../../../script.js';
import{extension_settings as _0x42d02d}from'../../../extensions.js';
import{getContext as _0x2740f8}from'../../../st-context.js';
import{extension_settings as _0x14c2db}from'../../../extensions.js';
import{eventSource as _0x31bde3}from'../../../../script.js';
import{extension_settings as _0x4d46a1}from'../../../extensions.js';
import{saveSettingsDebounced as _0x46e5e9}from'../../../../script.js';
import{extension_settings as _0x1137a1}from'../../../extensions.js';

// ========== 【新增部分从这里开始】 ==========
import { playLocalTTS } from './utils/local-dispatch.js';

// 因为后面的代码是压缩混淆过的，我们直接在外面挂一个监听器来拦截处理，不需要去改后面那些乱码代码
eventSource.on('ttsGenerate', async (data) => {
    try {
        // 如果用户选择的是本地引擎
        if (data.ttsEngine === 'local' || data.engine === 'local') {
            await playLocalTTS(data.text || data.message, data.speakerName || data.character);
            data.preventDefault && data.preventDefault();
        }
    } catch (e) {
        console.error('本地TTS拦截出错:', e);
    }
});
// ========== 【新增部分到此结束】 ==========
