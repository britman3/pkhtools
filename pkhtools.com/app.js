// ── PKH Tools Hub — app.js ──

// Banner config — update these when changing the announcement
const BANNER_ENABLED = true;
const BANNER_VERSION = 'v1';

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('notice-banner');
  const dismissBtn = document.getElementById('banner-dismiss');

  if (!banner || !BANNER_ENABLED) return;

  const storageKey = `pkh-banner-dismissed-${BANNER_VERSION}`;

  // Check if already dismissed
  if (localStorage.getItem(storageKey)) {
    banner.remove();
    return;
  }

  // Show banner
  banner.style.display = 'flex';

  // Dismiss handler
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 150);
      localStorage.setItem(storageKey, 'true');
    });
  }
});
