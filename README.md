![Sushil's Weather API](assets/banner_title.svg)

A weather lookup app built with **HTML, CSS, and vanilla JavaScript** — city name → coordinates → forecast, via two chained OpenWeatherMap API calls.

🔗 **Live Demo:** [Click here to see](https://sushildive012.github.io/MyCurrentWeatherAPI/)

<!--![Preview](assets/preview.png) -->

---

![Features](assets/banner_features.svg)

- Two-step API chain — Geocoding API resolves the city name, that result feeds the Weather API
- Input sanitized before the request — trims stray spaces, strips empty tokens from `"city, , state"` style input
- Re-searching the same city already on screen skips the API call
- Distinct message per failure case: empty input, input under 4 characters, bad/missing key (401), non-200 response, no matching location, city not found, network failure
- Dark radial-gradient UI, dynamic weather icon pulled from OpenWeatherMap's icon CDN

![Tech Stack](assets/banner_tech.svg)

- `HTML5`
- `CSS3` (`clamp()`, radial-gradient background, responsive order swap on mobile)
- `Vanilla JS` (`async/await`, `fetch`, destructuring)

![What I Learned](assets/banner_learned.svg)

- **Chaining dependent async calls** — the weather call can't run without the geocode call's result, so every failure point returns `null` early and gets checked before continuing
- **Destructuring nested API responses** — pulling `name`, `main.temp`, `main.humidity`, and `weather[0]` out of a deep JSON object in one line
- **Guard clauses over nested if/else** — each validation step exits early instead of wrapping the rest of the function in another `if`
- **Separating error types instead of one generic catch** — a bad key, a bad city, and a dropped connection each need a different message, not "Something went wrong"

![Run Locally](assets/banner_run.svg)

```bash
git clone https://github.com/sushildive012/MyCurrentWeatherAPI.git
cd MyCurrentWeatherAPI
# add your OpenWeatherMap key in config.js
# open index.html in your browser
```

![Structure](assets/banner_structure.svg)

```
├── index.html
├── style.css
├── script.js
├── config.js
```

> Requires a free API key from [OpenWeatherMap](https://openweathermap.org/api).
