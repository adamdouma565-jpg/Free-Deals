# Free Loot · عروض مجانية

A bilingual (Arabic / English) progressive web app that tracks limited-time free games, DLC and in-game loot, plus PC store discounts. It is a static site, so it runs for free on GitHub Pages and can be packaged as an Android app with [PWABuilder](https://www.pwabuilder.com).

**Live site:** https://adamdouma565-jpg.github.io/Free-Deals/

## Features

- **Live offers** from Steam, Epic Games Store, GOG, Ubisoft, itch.io, Android, iOS and consoles
- **Countdown timers** on every offer, turning red in the last 24 hours
- **Filters and sorting:** by platform and type, and by popularity, ending soon, value or newest, plus search
- **Personal tracking:** save offers with ♡, mark them as claimed, and hide claimed ones
- **Details sheet** with description, claim instructions and sharing
- **Deals tab** with PC discounts (CheapShark) and a **Software tab** with links to free-software sites and official store pages
- **Notifications** (optional, floating 🔔 button): alert for new offers, and a reminder one hour before a saved offer ends
- **Calendar reminder:** one tap adds an offer's end time to your calendar with a one-hour alert
- **Arabic and English** with automatic right-to-left layout, dark and light themes
- **Works offline** with the last loaded offers

## Notifications: what to expect

This is a static site with no server, so it cannot push notifications to a closed app.

- Alerts are reliable while the app is open or recently used.
- In the background, Android and Chrome decide when periodic checks run, so alerts can be delayed or skipped.
- For a guaranteed reminder, use the **Remind me** button inside an offer to add it to your calendar.

## Data sources and credits

Offer data is provided by [GamerPower.com](https://www.gamerpower.com) (free API, attribution with an active link required) and [CheapShark.com](https://www.cheapshark.com) (deal links go through CheapShark's redirect page). Please keep these credits visible if you fork this project, and do not sell or claim the data as your own.

Game, store and brand names, logos and images belong to their owners. This project is independent and is not affiliated with or endorsed by Steam, Epic Games, GOG, Google or any other store.

## Privacy

The app has no accounts, ads or analytics and collects no personal data. Preferences, saved offers and cached offers stay on your device. See [privacy.html](privacy.html) for details.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `sw.js` | Service worker: offline cache, notifications, periodic checks |
| `manifest.json` | PWA manifest |
| `icon-192.png`, `icon-512.png` | App icons |
| `privacy.html` | Privacy policy and terms (Arabic and English) |

## Run and deploy

1. Fork or clone the repository.
2. Serve it over HTTPS, for example with **Settings → Pages → Deploy from a branch → `main` / root** on GitHub.
3. To build an Android app, enter the site URL at [pwabuilder.com](https://www.pwabuilder.com) and enable notification delegation in the Android options.
4. If you publish the Android app from a user site such as `username.github.io`, host `/.well-known/assetlinks.json` at that root. When you have several apps, keep all of their entries in the same array.

## Notes

- Offers are temporary and may be region-locked. Always check the price and conditions on the official store.
- The app does not sell or distribute games or keys; it only links to the original stores.
- Add a license file of your choice before accepting contributions.
