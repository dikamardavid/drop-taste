/**
 * Drop Taste - Popup Controller
 */

const btnCapturePage = document.getElementById('btnCapturePage');
const btnCaptureElement = document.getElementById('btnCaptureElement');
const statusMsg = document.getElementById('statusMsg');

function setStatus(text: string, isError = false) {
  if (!statusMsg) return;
  statusMsg.style.display = 'block';
  statusMsg.style.color = isError ? '#EF4444' : '#10B981';
  statusMsg.textContent = text;
}

btnCapturePage?.addEventListener('click', async () => {
  setStatus('Scanning full page...');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus('No active tab found', true);
    return;
  }

  // Ask content script for full page snapshot
  chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_FULL_PAGE' }, async (response) => {
    if (!response?.metadata) {
      setStatus('Could not extract page data', true);
      return;
    }

    setStatus('Saving to Drop Taste Library...');
    chrome.runtime.sendMessage(
      {
        action: 'CAPTURE_PAGE',
        payload: response,
      },
      (saveRes) => {
        if (saveRes?.success) {
          setStatus('✅ Full page saved! Ready to Copy to Figma.');
          setTimeout(() => window.close(), 1800);
        } else {
          setStatus(`Save failed: ${saveRes?.error || 'Unknown'}`, true);
        }
      }
    );
  });
});

btnCaptureElement?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus('No active tab found', true);
    return;
  }

  // Activate hover inspector on host tab
  chrome.tabs.sendMessage(tab.id, { action: 'START_INSPECTOR' }, () => {
    window.close(); // Close popup so user can hover over page elements
  });
});
