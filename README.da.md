[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · **🇩🇰 Dansk** · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Et Lovelace-kort til Home Assistant til at styre solscreens (og andre rullegardiner/markiser, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Visuelt vindue**: dugen følger den faktiske position.
- **Træk**: træk i vinduet til den ønskede højde, slip = `cover.set_cover_position`.
- **Knapper**: op / stop / ned (kun aktive, hvis din cover understøtter det).
- **Hurtigknapper**: valgfrie positioner (f.eks. Åben, 50 %, Lukket).
- **Solindikator**: dag-/nathimmel via `sun.sun`; med vinduets retning viser kortet, hvornår solen faktisk skinner på det.
- **Ekstra sensorer**: f.eks. lux, indetemperatur eller vind som chips nederst.
- Visuel editor, klar til sektionsvisningen, følger dit HA-tema, findes på 10 sprog.

## Installation

### Marketplace / HACS (anbefalet)
1. Åbn **Indstillinger → Marketplace** (eller HACS i ældre versioner).
2. Søg efter **Solar Screen Card**.
3. Installer kortet, og genindlæs browseren.

### Marketplace / HACS: brugerdefineret repository (alternativ)
Kan du ikke finde kortet via søgning (f.eks. fordi det endnu ikke er i kataloget)? Så tilføj repositoryet selv:
1. Åbn **Indstillinger → Marketplace** (eller HACS) → **Tilføj via link / Brugerdefinerede repositories**.
2. Tilføj `https://github.com/jodewee/solar-screen-card` med typen **Dashboard / Lovelace**.
3. Installer **Solar Screen Card**, og genindlæs browseren.

### Manuelt
1. Kopiér `solar-screen-card.js` til `/config/www/`.
2. Tilføj en ressource (**Indstillinger → Dashboards → ⋮ → Ressourcer**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, type **JavaScript-modul**.

## Konfiguration

```yaml
type: custom:solar-screen-card
entity: cover.screen_koekken
name: Screen køkken
moving_entity: sensor.screen_koekken_moving   # valgfri
window_azimuth: 180        # vinduet vender mod syd
window_fov: 100            # solen tæller som "på vinduet" inden for ±50°
percent_mode: closed       # vis "% lukket" i stedet for "% åben"
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_ude
  - entity: sensor.temperatur_koekken
    name: Inde
```

| Indstilling | Standard | Beskrivelse |
|---|---|---|
| `entity` | **påkrævet** | Screenens `cover`-entitet |
| `name` | friendly name | Navn øverst |
| `icon` | `mdi:blinds` | Eget ikon |
| `moving_entity` | – | Sensor, der melder bevægelse (`up`/`down`/`opening`/`closing`), f.eks. fra Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Hurtigknapper som position i % åben (HA-konvention: 100 = åben) |
| `percent_mode` | `open` | `open` eller `closed`: hvordan procenten vises |
| `step` | `5` | Afrunding i % ved træk |
| `show_sun` | `true` | Vis himmel og sol |
| `sun_entity` | `sun.sun` | Sol-entitet |
| `window_azimuth` | – | Retning vinduet vender mod (N=0, Ø=90, S=180, V=270) |
| `window_fov` | `90` | Bredde i grader, inden for hvilken solen skinner på vinduet |
| `info_entities` | – | Liste over ekstra sensorer (tekst eller `{entity, name, icon}`) |
| `window_background` | `sky` | Hvad du ser gennem vinduet: `sky` (himmel, dag/nat), `color` (ensfarvet), `image` (foto) eller `transparent` (kortets baggrund) |
| `window_color` | – | Farve bag glasset ved `window_background: color`: `[r, g, b]` eller CSS-farve |
| `window_image` | – | Foto bag glasset ved `window_background: image` (upload via editoren) |
| `window_image_url` | – | Eller en URL til fotoet, f.eks. `/local/have.jpg` (har forrang for `window_image`) |
| `window_opacity` | `100` | Dækkevne for himmel/udsigt i % (0 = du ser kortets baggrund gennem glasset) |
| `window_night_dim` | `true` | Gør egen farve/eget foto mørkere, når solen er gået ned |
| `background_color` | tema | Baggrundsfarve: `[r, g, b]` eller en CSS-farve (`"#20303a"`) |
| `background_image` | – | Billede: upload via editoren, eller en URL som `/local/screen.jpg` |
| `background_opacity` | `100` | Baggrundens dækkevne i % (0 = gennemsigtig). Indholdet forbliver fuldt synligt |
| `background_blur` | `0` | Sløring (px) af det, der ligger bag kortet, for en "glas"-effekt |

### Vinduesbaggrund

I den visuelle editor er sektionen **Vinduesbaggrund** åben som standard. Vælg under **Hvad ser du gennem vinduet?**:

- **Himmel (standard)**: blå himmel om dagen, mørk himmel om natten (med `show_sun`).
- **Ensfarvet**: der vises en farvevælger.
- **Foto / billede**: upload et foto (f.eks. din rigtige udsigt), eller angiv en URL som `/local/have.jpg`.
- **Gennemsigtig**: du ser kortets baggrund gennem glasset.

Ved farve eller foto indstiller du også dækkevnen, og om den skal gøres mørkere om natten. Solen skinner (valgfrit) stadig ovenpå.

```yaml
window_background: image
window_image_url: /local/udsigt_koekken.jpg
window_opacity: 90
window_night_dim: true
```

Ældre konfigurationer med kun `window_color` eller `window_image` virker stadig: kortet vælger selv den rigtige tilstand.

### Kortbaggrund

I editoren finder du alt under **Kortbaggrund**: vælg en farve, upload et billede, og indstil dækkevne og sløring.

```yaml
# Gennemsigtigt "glas"-kort
background_opacity: 30
background_blur: 8

# Eget foto som baggrund
background_image: /local/koekken.jpg
background_opacity: 60
```

Farver kan ændres via temavariabler: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Sprog

Kortet og den visuelle editor følger sproget i Home Assistant: engelsk, hollandsk, fransk, tysk, polsk, svensk, dansk, norsk (bokmål), spansk og italiensk. Andre sprog falder tilbage til engelsk. Forbedringer af en oversættelse er velkomne via en pull request.

## Licens
MIT
