// @ts-nocheck
export class LocalTTSError extends Error {
  constructor(message, status = null, detail = null) {
    super(message);
    this.name = 'LocalTTSError';
    this.status = status;
    this.detail = detail;
  }
}

function normalizeBaseUrl(url) {
  return String(url || 'http://127.0.0.1:753').trim().replace(/\/+$/, '');
}

const DEFAULT_TIMEOUT_MS = 20000;

export async function requestLocalTTS(text, opts = {}) {
  const {
    baseUrl,
    voice,
    token,
    format = 'wav',
    timeout = DEFAULT_TIMEOUT_MS,
    signal,
  } = opts;

  if (!text || !String(text).trim()) throw new LocalTTSError('LocalTTS: 文本为空');
  if (!baseUrl) throw new LocalTTSError('LocalTTS: 未配置 baseUrl');

  const params = new URLSearchParams({ text });
  if (voice) params.set('voice', voice);
  const url = `${normalizeBaseUrl(baseUrl)}/tts?${params.toString()}`;

  const mime = format === 'mp3' ? 'audio/mpeg' : 'audio/wav';

  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), timeout);
  if (signal) {
    try { signal.addEventListener('abort', () => ctrl.abort(), { once: true }); } catch (_) {}
  }

  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let resp;
  try {
    resp = await fetch(url, { method: 'GET', headers, signal: ctrl.signal });
  } catch (e) {
    clearTimeout(tm);
    const isTimeout = e?.name === 'AbortError';
    throw new LocalTTSError(
      isTimeout ? `请求超时 (${timeout / 1000}s)` : `网络错误: ${e?.message || e}`,
      isTimeout ? 408 : null,
    );
  }
  clearTimeout(tm);

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new LocalTTSError(`HTTP ${resp.status}: ${errText.slice(0, 300)}`, resp.status, errText);
  }

  const buf = await resp.arrayBuffer();
  return { blob: new Blob([buf], { type: mime }), mime, format };
}
