/**
 * Drop Taste - Background Service Worker
 * Handles CORS-bypass fetching, API communications, and cross-tab capture coordination.
 */

const API_BASE = 'http://localhost:3847/api/v1';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'PING') {
    sendResponse({ status: 'ok' });
    return true;
  }

  if (message.action === 'CAPTURE_PAGE') {
    handleCapturePage(message.payload)
      .then((res) => sendResponse({ success: true, data: res }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'CAPTURE_COMPONENT') {
    handleCaptureComponent(message.payload)
      .then((res) => sendResponse({ success: true, data: res }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'CAPTURE_IMAGE') {
    handleCaptureImage(message.payload)
      .then((res) => sendResponse({ success: true, data: res }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

async function handleCapturePage(payload: any) {
  const response = await fetch(`${API_BASE}/captures/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to save page: ${response.statusText}`);
  }
  return await response.json();
}

async function handleCaptureComponent(payload: any) {
  const response = await fetch(`${API_BASE}/captures/element`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, type: 'component' }),
  });
  if (!response.ok) {
    throw new Error(`Failed to save component: ${response.statusText}`);
  }
  return await response.json();
}

async function handleCaptureImage(payload: any) {
  // 1. In background worker, fetch the image to bypass CORS limitations
  let base64Data = payload.imageUrl;
  try {
    const imgFetch = await fetch(payload.imageUrl);
    if (imgFetch.ok) {
      const blob = await imgFetch.blob();
      const reader = new FileReader();
      base64Data = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    }
  } catch (err) {
    console.warn('[Drop Taste] Falling back to remote imageUrl due to fetch error:', err);
  }

  // 2. Post to Drop Taste API
  const response = await fetch(`${API_BASE}/captures/element`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'image',
      metadata: payload.metadata,
      imageUrl: base64Data,
      mimeType: payload.mimeType || 'image/png',
      fileSizeBytes: payload.fileSizeBytes || 0,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save image reference: ${response.statusText}`);
  }
  return await response.json();
}
