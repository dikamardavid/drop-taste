/**
 * Drop Taste - Hover Inspector Content Script
 * Injected in the host page with isolated Shadow DOM overlay.
 */

let isInspectorActive = false;
let hoveredElement: HTMLElement | null = null;
let shadowHost: HTMLElement | null = null;
let shadowRoot: ShadowRoot | null = null;
let highlightBox: HTMLElement | null = null;
let badgeBox: HTMLElement | null = null;

function initOverlay() {
  if (shadowHost) return;

  shadowHost = document.createElement('div');
  shadowHost.id = '__drop_taste_inspector_host__';
  shadowHost.style.position = 'fixed';
  shadowHost.style.top = '0';
  shadowHost.style.left = '0';
  shadowHost.style.width = '100vw';
  shadowHost.style.height = '100vh';
  shadowHost.style.pointerEvents = 'none';
  shadowHost.style.zIndex = '2147483647';

  shadowRoot = shadowHost.attachShadow({ mode: 'closed' });

  const style = document.createElement('style');
  style.textContent = `
    .dt-highlight {
      position: fixed;
      pointer-events: none;
      border: 2px solid #6366F1;
      background: rgba(99, 102, 241, 0.12);
      border-radius: 4px;
      transition: all 0.05s ease-out;
      display: none;
      box-sizing: border-box;
      z-index: 10000;
    }
    .dt-badge {
      position: absolute;
      top: -24px;
      left: 0;
      background: #0B0F17;
      color: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11px;
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 3px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .dt-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0B0F17;
      color: #F8FAFC;
      border: 1px solid #334155;
      padding: 12px 18px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: dtSlideIn 0.2s ease-out;
      z-index: 10002;
    }
    @keyframes dtSlideIn {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .dt-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(2px);
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
    }
    .dt-modal {
      background: #111827;
      color: #F9FAFB;
      width: 380px;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #374151;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    .dt-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dt-field {
      margin-bottom: 12px;
    }
    .dt-label {
      font-size: 12px;
      color: #9CA3AF;
      margin-bottom: 4px;
      display: block;
    }
    .dt-input, .dt-select {
      width: 100%;
      background: #1F2937;
      border: 1px solid #4B5563;
      color: #F9FAFB;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 13px;
      box-sizing: border-box;
    }
    .dt-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    .dt-btn {
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: none;
    }
    .dt-btn-secondary {
      background: #374151;
      color: #D1D5DB;
    }
    .dt-btn-primary {
      background: #6366F1;
      color: #FFFFFF;
    }
  `;
  shadowRoot.appendChild(style);

  highlightBox = document.createElement('div');
  highlightBox.className = 'dt-highlight';
  badgeBox = document.createElement('div');
  badgeBox.className = 'dt-badge';
  highlightBox.appendChild(badgeBox);
  shadowRoot.appendChild(highlightBox);

  document.body.appendChild(shadowHost);
}

function showToast(message: string, durationMs = 3500) {
  if (!shadowRoot) return;
  const toast = document.createElement('div');
  toast.className = 'dt-toast';
  toast.innerHTML = `<span>${message}</span>`;
  shadowRoot.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, durationMs);
}

function handleMouseMove(e: MouseEvent) {
  if (!isInspectorActive) return;
  const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (!target || target === shadowHost || target.id === '__drop_taste_inspector_host__') return;

  hoveredElement = target;
  const rect = target.getBoundingClientRect();

  if (highlightBox && badgeBox) {
    highlightBox.style.display = 'block';
    highlightBox.style.top = `${rect.top}px`;
    highlightBox.style.left = `${rect.left}px`;
    highlightBox.style.width = `${rect.width}px`;
    highlightBox.style.height = `${rect.height}px`;

    const isImage = isImageElement(target);
    const tag = target.tagName.toLowerCase();
    const typeLabel = isImage ? '🖼️ Image' : `<${tag}>`;
    badgeBox.textContent = `${typeLabel} ${Math.round(rect.width)} × ${Math.round(rect.height)}px`;
  }
}

function isImageElement(el: HTMLElement): boolean {
  if (el.tagName === 'IMG' || el.tagName === 'PICTURE' || el.tagName === 'SVG' || el.tagName === 'CANVAS') {
    return true;
  }
  const bg = window.getComputedStyle(el).backgroundImage;
  if (bg && bg !== 'none' && bg.includes('url(')) {
    return true;
  }
  return false;
}

function extractImageUrl(el: HTMLElement): string {
  if (el.tagName === 'IMG') {
    const img = el as HTMLImageElement;
    return img.currentSrc || img.src;
  }
  const bg = window.getComputedStyle(el).backgroundImage;
  if (bg && bg.includes('url(')) {
    const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
    if (match?.[1]) return match[1];
  }
  return '';
}

function handleClick(e: MouseEvent) {
  if (!isInspectorActive || !hoveredElement) return;
  e.preventDefault();
  e.stopPropagation();

  const el = hoveredElement;
  const rect = el.getBoundingClientRect();

  // Branch 1: Image element -> instant save & trigger Vision AI pipeline
  if (isImageElement(el)) {
    const imgUrl = extractImageUrl(el);
    if (!imgUrl) {
      showToast('⚠️ Could not resolve image source URL.');
      return;
    }

    showToast('🖼️ Saving Image Reference to Drop Taste Cloud Vision AI...');
    chrome.runtime.sendMessage(
      {
        action: 'CAPTURE_IMAGE',
        payload: {
          metadata: {
            url: window.location.href,
            siteName: document.title.split(/[-|–]/)[0]?.trim() || window.location.hostname,
            title: el.getAttribute('alt') || `${document.title} Graphic Asset`,
            category: 'Web Image Reference',
            tags: ['image', 'reference', window.location.hostname],
            dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
            capturedAt: new Date().toISOString(),
          },
          imageUrl: imgUrl,
          mimeType: 'image/png',
          fileSizeBytes: 0,
        },
      },
      (res) => {
        if (res?.success) {
          showToast('✅ Image Saved! Ready as reference for your AI Coding Agent.');
        } else {
          showToast(`❌ Error saving image: ${res?.error || 'Unknown error'}`);
        }
      }
    );

    stopInspector();
    return;
  }

  // Branch 2: Container / flexbox / component -> open capture modal
  openComponentModal(el);
}

function openComponentModal(el: HTMLElement) {
  stopInspector();
  if (!shadowRoot) return;

  const rect = el.getBoundingClientRect();
  const defaultTitle = el.querySelector('h1, h2, h3, h4, [role="heading"]')?.textContent?.trim() ||
    `${el.tagName.toLowerCase()} component`;

  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'dt-modal-backdrop';

  modalBackdrop.innerHTML = `
    <div class="dt-modal">
      <div class="dt-title">
        <span>Save to Drop Taste Library</span>
        <span style="font-size:12px;color:#9CA3AF;">${Math.round(rect.width)}x${Math.round(rect.height)}px</span>
      </div>
      <div class="dt-field">
        <label class="dt-label">Classification</label>
        <select class="dt-select" id="dtTargetKind">
          <option value="component">Component (Card, Nav, Hero, Button)</option>
          <option value="screen">Screen (Section / Full Flow)</option>
        </select>
      </div>
      <div class="dt-field">
        <label class="dt-label">Title</label>
        <input class="dt-input" id="dtTitle" value="${escapeHtml(defaultTitle)}" />
      </div>
      <div class="dt-field">
        <label class="dt-label">Category</label>
        <input class="dt-input" id="dtCategory" value="UI Component" />
      </div>
      <div class="dt-actions">
        <button class="dt-btn dt-btn-secondary" id="dtCancelBtn">Cancel</button>
        <button class="dt-btn dt-btn-primary" id="dtSaveBtn">Save Component</button>
      </div>
    </div>
  `;

  shadowRoot.appendChild(modalBackdrop);

  const cancelBtn = modalBackdrop.querySelector('#dtCancelBtn');
  const saveBtn = modalBackdrop.querySelector('#dtSaveBtn');
  const titleInput = modalBackdrop.querySelector('#dtTitle') as HTMLInputElement;
  const categoryInput = modalBackdrop.querySelector('#dtCategory') as HTMLInputElement;
  const targetKindSelect = modalBackdrop.querySelector('#dtTargetKind') as HTMLSelectElement;

  cancelBtn?.addEventListener('click', () => modalBackdrop.remove());

  saveBtn?.addEventListener('click', () => {
    const title = titleInput.value.trim() || 'Untitled Component';
    const category = categoryInput.value.trim() || 'UI Component';
    const targetKind = (targetKindSelect.value || 'component') as 'component' | 'screen';

    modalBackdrop.remove();
    showToast('🧩 Saving Component to Drop Taste Library...');

    const computed = window.getComputedStyle(el);
    const computedStyles = {
      display: computed.display,
      flexDirection: computed.flexDirection,
      gap: computed.gap,
      padding: computed.padding,
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
    };

    chrome.runtime.sendMessage(
      {
        action: 'CAPTURE_COMPONENT',
        payload: {
          targetKind,
          metadata: {
            url: window.location.href,
            siteName: document.title.split(/[-|–]/)[0]?.trim() || window.location.hostname,
            title,
            category,
            tags: ['component', targetKind, window.location.hostname],
            dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
            capturedAt: new Date().toISOString(),
          },
          domHtml: el.outerHTML,
          computedStyles,
        },
      },
      (res) => {
        if (res?.success) {
          showToast('✅ Component Saved! Ready to Copy to Figma.');
        } else {
          showToast(`❌ Error: ${res?.error || 'Save failed'}`);
        }
      }
    );
  });
}

function escapeHtml(str: string): string {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function startInspector() {
  initOverlay();
  isInspectorActive = true;
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('click', handleClick, true);
  showToast('🔍 Hover Inspector Active. Click any element to capture. (Esc to cancel)');
}

function stopInspector() {
  isInspectorActive = false;
  document.removeEventListener('mousemove', handleMouseMove, true);
  document.removeEventListener('click', handleClick, true);
  if (highlightBox) highlightBox.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isInspectorActive) {
    stopInspector();
    showToast('Inspector deactivated.');
  }
});

// Listen for commands from popup
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === 'START_INSPECTOR') {
    startInspector();
    sendResponse({ status: 'started' });
  } else if (msg.action === 'EXTRACT_FULL_PAGE') {
    // Extract full page DOM snapshot & computed metadata
    const fullHtml = document.documentElement.outerHTML;
    const bodyComputed = window.getComputedStyle(document.body);

    sendResponse({
      metadata: {
        url: window.location.href,
        siteName: document.title.split(/[-|–]/)[0]?.trim() || window.location.hostname,
        title: document.title || 'Untitled Web Page',
        category: 'Full Page',
        tags: ['page', 'full-page', window.location.hostname],
        dimensions: {
          width: window.innerWidth,
          height: Math.max(document.body.scrollHeight, window.innerHeight),
        },
        capturedAt: new Date().toISOString(),
      },
      domHtml: fullHtml,
      computedStyles: {
        backgroundColor: bodyComputed.backgroundColor,
        fontFamily: bodyComputed.fontFamily,
      },
    });
  }
  return true;
});
