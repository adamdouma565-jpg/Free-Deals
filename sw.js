const CACHE = "free-loot-v2";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// الصفحة نفسها: الشبكة أولًا ثم النسخة المخزنة. الأخبار (من نطاقات أخرى) لا تُخزَّن.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match("./index.html")))
  );
});

const TXT = {ar:{n:"🎁 عروض جديدة: ",t:"⏰ ينتهي قريبًا",b:"ينتهي خلال أقل من ساعة: "},en:{n:"🎁 New offers: ",t:"⏰ Ending soon",b:"Ends in under an hour: "}};
const getJ = async k => { const r = await (await caches.open("fl-data")).match(k); return r ? r.json() : null; };
const putJ = async (k, v) => (await caches.open("fl-data")).put(k, new Response(JSON.stringify(v)));
const clean = s => (s || "").replace(/\s*giveaway$/i, "");

async function check() {
  const cfg = await getJ("cfg"); if (!cfg || !(cfg.notif.new || cfg.notif.rem)) return;
  let list; try { list = await (await fetch("https://www.gamerpower.com/api/giveaways")).json(); } catch (e) { return; }
  if (!Array.isArray(list)) return;
  const x = TXT[cfg.lang] || TXT.en, seen = await getJ("seen"), ids = list.map(o => o.id);
  if (seen && cfg.notif.new) {
    const fresh = list.filter(o => !seen.includes(o.id));
    if (fresh.length) await self.registration.showNotification(fresh.length === 1 ? "🎁 " + clean(fresh[0].title) : x.n + fresh.length, {body: fresh.slice(0, 3).map(o => clean(o.title)).join("، "), tag: "fl-new", icon: "icon-192.png", badge: "icon-192.png", data: {url: "./"}});
  }
  await putJ("seen", ids);
  if (cfg.notif.rem) {
    const rem = (await getJ("rem")) || [];
    for (const o of list) {
      if (!cfg.favs.includes(o.id) || cfg.done.includes(o.id) || rem.includes(o.id)) continue;
      const ms = new Date(String(o.end_date || "").replace(" ", "T") + "Z") - Date.now();
      if (ms > 0 && ms <= 3600000) { rem.push(o.id); await self.registration.showNotification(x.t, {body: x.b + clean(o.title), tag: "fl-rem-" + o.id, icon: "icon-192.png", badge: "icon-192.png", data: {url: "./"}}); }
    }
    await putJ("rem", rem);
  }
}
self.addEventListener("periodicsync", e => { if (e.tag === "fl-check") e.waitUntil(check()); });
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type: "window", includeUncontrolled: true}).then(l => l.length ? l[0].focus() : clients.openWindow("./")));
});
