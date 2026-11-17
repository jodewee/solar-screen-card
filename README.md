**🇬🇧 English** · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

A Home Assistant Lovelace card to control solar screens (and other blinds/shutters, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Visual window**: the screen fabric moves with the real position.
- **Drag**: drag inside the window to the desired height; release = `cover.set_cover_position`.
- **Buttons**: up / stop / down (only active if your cover supports it).
- **Quick buttons**: positions of your choice (e.g. Open, 50%, Closed).
- **Sun indication**: day/night sky via `sun.sun`; with the window orientation the card shows when the sun is actually on it.
- **Extra sensors**: e.g. lux, indoor temperature or wind as chips at the bottom.
- Visual editor, sections-view ready, follows your HA theme, available in 10 languages.

## Installation

### Marketplace / HACS (recommended)
1. Open **Settings → Marketplace** (or HACS on older versions).
2. Search for **Solar Screen Card**.
3. Install the card and reload your browser.

### Marketplace / HACS: custom repository (fallback)
Can't find the card by searching (e.g. because it isn't in the catalog yet)? Add the repository yourself:
1. Open **Settings → Marketplace** (or HACS) → **Add via link / Custom repositories**.
2. Add `https://github.com/jodewee/solar-screen-card` as type **Dashboard / Lovelace**.
3. Install **Solar Screen Card** and reload your browser.

### Manual
1. Copy `solar-screen-card.js` to `/config/www/`.
2. Add a resource (**Settings → Dashboards → ⋮ → Resources**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, type **JavaScript module**.

## Configuration

```yaml
type: custom:solar-screen-card
entity: cover.kitchen_screen
name: Kitchen screen
moving_entity: sensor.kitchen_screen_moving   # optional
window_azimuth: 180        # window faces south
window_fov: 100            # sun counts as "on the window" within ±50°
percent_mode: closed       # show "% closed" instead of "% open"
presets: [100, 50, 20, 0]
info_entities:
  - sensor.outdoor_lux
  - entity: sensor.kitchen_temperature
    name: Indoor
```

| Option | Default | Description |
|---|---|---|
| `entity` | **required** | The `cover` entity of the screen |
| `name` | friendly name | Name at the top |
| `icon` | `mdi:blinds` | Custom icon |
| `moving_entity` | – | Sensor that reports movement (`up`/`down`/`opening`/`closing`), e.g. from Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Quick buttons as position in % open (HA convention: 100 = open) |
| `percent_mode` | `open` | `open` or `closed`: how the percentage is shown |
| `step` | `5` | Rounding in % while dragging |
| `show_sun` | `true` | Show sky and sun |
| `sun_entity` | `sun.sun` | Sun entity |
| `window_azimuth` | – | Direction the window faces (N=0, E=90, S=180, W=270) |
| `window_fov` | `90` | Width in degrees within which the sun is on the window |
| `info_entities` | – | List of extra sensors (string or `{entity, name, icon}`) |
| `window_background` | `sky` | What you see through the window: `sky` (day/night), `color` (solid color), `image` (photo) or `transparent` (card background) |
| `window_color` | – | Color behind the glass with `window_background: color`: `[r, g, b]` or CSS color |
| `window_image` | – | Photo behind the glass with `window_background: image` (upload via the editor) |
| `window_image_url` | – | Or a URL to the photo, e.g. `/local/garden.jpg` (takes precedence over `window_image`) |
| `window_opacity` | `100` | Opacity of sky/view in % (0 = you look through the glass at the card background) |
| `window_night_dim` | `true` | Darken your own color/photo when the sun is down |
| `background_color` | theme | Background color: `[r, g, b]` or a CSS color (`"#20303a"`) |
| `background_image` | – | Image: upload via the editor, or a URL such as `/local/screen.jpg` |
| `background_opacity` | `100` | Background opacity in % (0 = transparent). The content stays fully visible |
| `background_blur` | `0` | Blur (px) of what is behind the card, for a "glass" effect |

### Window background

In the visual editor the **Window background** section is open by default. Under **What do you see through the window?** choose:

- **Sky (default)**: blue sky by day, dark sky at night (with `show_sun`).
- **Solid color**: a color picker appears.
- **Photo / image**: upload a photo (e.g. your real view) or enter a URL such as `/local/garden.jpg`.
- **Transparent**: you look through the glass at the card background.

With a color or photo you also set the opacity and whether it is dimmed at night. The sun (optionally) keeps shining over it.

```yaml
window_background: image
window_image_url: /local/kitchen_view.jpg
window_opacity: 90
window_night_dim: true
```

Older configurations with only `window_color` or `window_image` keep working: the card picks the right mode itself.

### Card background

In the editor everything is under **Card background**: pick a color, upload an image, and set opacity and blur.

```yaml
# Transparent "glass" card
background_opacity: 30
background_blur: 8

# Your own photo as background
background_image: /local/kitchen.jpg
background_opacity: 60
```

Colors can be changed via theme variables: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Languages

The card and the visual editor follow your Home Assistant language: English, Dutch, French, German, Polish, Swedish, Danish, Norwegian (Bokmål), Spanish and Italian. Other languages fall back to English. Improvements to a translation are welcome via a pull request.

## License
MIT
