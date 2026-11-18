export function recordAction(title,data) {
  try { const events=JSON.parse(sessionStorage.getItem('kiko-project-work')||'[]');
    sessionStorage.setItem('kiko-project-work',JSON.stringify([{title,data,time:new Date().toLocaleTimeString('ru-RU')},...events].slice(0,30)));
    window.dispatchEvent(new Event('kiko-project-work'));
  } catch {}
}
