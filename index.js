import { extension_settings, ModuleWorkerWrapper } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

// 引入我们的本地TTS模块
import { playLocalTTS } from './utils/local-dispatch.js';

// 默认设置
const defaultSettings = {
    enabled: false,
    ttsEngine: 'local',
    apiUrl: 'http://127.0.0.1:753'
};

function loadSettings() {
    extension_settings.stImmersiveSound = Object.assign({}, defaultSettings, extension_settings.stImmersiveSound);
}

// 初始化
jQuery(() => {
    loadSettings();
    
    // 在扩展面板添加一个简单的开关
    const html = `
    <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>沉浸式声音测试</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
            <div class="flex-container">
                <input type="checkbox" id="st_immersive_sound_enable" />
                <label for="st_immersive_sound_enable">启用本地TTS测试</label>
            </div>
            <button id="st_test_tts_btn">测试播放语音</button>
        </div>
    </div>`;
    
    $("#extensions_settings").append(html);
    
    // 绑定测试按钮
    $("#st_test_tts_btn").on('click', async () => {
        await playLocalTTS("这是一段本地语音测试。", "测试角色");
    });
});
