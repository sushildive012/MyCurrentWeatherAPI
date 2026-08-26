![Weather API App](assets/banner_title.svg)

- A weather lookup app built with **HTML, CSS, and vanilla JavaScript**
- city name → live coordinates → live current Weather, via two chained OpenWeatherMap API calls.

🔗 **Live Demo:** [Click here to see](https://sushildive012.github.io/MyCurrentWeatherAPI/)
<!--![Preview](assets/preview.png) -->

---

![Features](assets/banner_features.svg)
- 🔗 **Two-step API chain** — Geocoding API resolves city name → lat/lon, then that feeds the Weather API for the actual forecast
- 🧹 Input sanitized before the request — trims stray spaces, strips empty tokens from `"city, , state"` style input
- 🚫 Duplicate-search guard — re-searching the same city already on screen skips the API call entirely
- ⚠️ Explicit handling per failure mode: empty input, too-short input, 401 (bad key), non-200 responses, rate-limit (429), and network drops all show a distinct message
- 🎨 Dynamic weather icon fetched from OpenWeatherMap's icon CDN

![Tech Stack](assets/banner_tech.svg)
`HTML5` · `CSS3` (`clamp()`, responsive order swap on mobile) · `Vanilla JS` (`async/await`, `fetch`, destructuring)

![What I Learned](assets/banner_learned.svg)
- **Chaining dependent async calls** — the second API call literally cannot run without the first one's result, so I learned to `return null` early at every failure point and check it before continuing, instead of letting `undefined` cascade into a crash
- **Destructuring nested API responses** — `const { name, main: { temp, humidity }, weather } = data` to pull exactly what's needed out of a deep JSON shape in one line
- **Distinguishing failure types** — a 401 (bad key), a 404 (city not found), and a dropped connection all need different user-facing messages, not one generic "error" catch-all
- **Guard clauses over nested if/else** — every validation step returns early instead of wrapping the rest of the function in another `if` block

![Run Locally](assets/banner_run.svg)
```bash
git clone https://github.com/sushildive012/MyCurrentWeatherAPI.git
cd MyCurrentWeatherAPI
cp config.js
# add your OpenWeatherMap API key to config.js
# open index.html in your browser
```

![Structure](assets/banner_structure.svg)
```
├── index.html
├── style.css
├── script.js
├── config.js  ← in config.js add your API key
├── weatherDataExample.json
└── .gitignore         
```

> Requires a free API key from [OpenWeatherMap](https://openweathermap.org/api).
