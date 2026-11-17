[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · **🇸🇪 Svenska** · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Ett Lovelace-kort för Home Assistant för att styra solskydd/screens (och andra rullgardiner/markiser, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Visuellt fönster**: väven följer den verkliga positionen.
- **Dra**: dra i fönstret till önskad höjd, släpp = `cover.set_cover_position`.
- **Knappar**: upp / stopp / ner (endast aktiva om din cover stöder det).
- **Snabbknappar**: valfria positioner (t.ex. Öppen, 50 %, Stängd).
- **Solindikering**: dag-/natthimmel via `sun.sun`; med fönstrets riktning visar kortet när solen faktiskt lyser på det.
- **Extra sensorer**: t.ex. lux, inomhustemperatur eller vind som chips längst ner.
- Visuell redigerare, redo för sektionsvyn, följer ditt HA-tema, finns på 10 språk.

## Installation

### Marketplace / HACS (rekommenderas)
1. Öppna **Inställningar → Marketplace** (eller HACS i äldre versioner).
2. Sök efter **Solar Screen Card**.
3. Installera kortet och ladda om webbläsaren.

### Marketplace / HACS: anpassat repository (reservalternativ)
Hittar du inte kortet via sökningen (t.ex. för att det inte finns i katalogen än)? Lägg då till repositoryt själv:
1. Öppna **Inställningar → Marketplace** (eller HACS) → **Lägg till via länk / Anpassade repositories**.
2. Lägg till `https://github.com/jodewee/solar-screen-card` med typen **Dashboard / Lovelace**.
3. Installera **Solar Screen Card** och ladda om webbläsaren.

### Manuellt
1. Kopiera `solar-screen-card.js` till `/config/www/`.
2. Lägg till en resurs (**Inställningar → Instrumentpaneler → ⋮ → Resurser**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, typ **JavaScript-modul**.

## Konfiguration

```yaml
type: custom:solar-screen-card
entity: cover.markis_kok
name: Markis kök
moving_entity: sensor.markis_kok_moving   # valfri
window_azimuth: 180        # fönstret vetter mot söder
window_fov: 100            # solen räknas som "på fönstret" inom ±50°
percent_mode: closed       # visa "% stängd" i stället för "% öppen"
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_ute
  - entity: sensor.temperatur_kok
    name: Inne
```

| Alternativ | Standard | Beskrivning |
|---|---|---|
| `entity` | **obligatorisk** | Skärmens `cover`-entitet |
| `name` | friendly name | Namn överst |
| `icon` | `mdi:blinds` | Egen ikon |
| `moving_entity` | – | Sensor som rapporterar rörelse (`up`/`down`/`opening`/`closing`), t.ex. från Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Snabbknappar som position i % öppen (HA-konvention: 100 = öppen) |
| `percent_mode` | `open` | `open` eller `closed`: hur procenten visas |
| `step` | `5` | Avrundning i % vid dragning |
| `show_sun` | `true` | Visa himmel och sol |
| `sun_entity` | `sun.sun` | Solentitet |
| `window_azimuth` | – | Riktning som fönstret vetter mot (N=0, Ö=90, S=180, V=270) |
| `window_fov` | `90` | Bredd i grader inom vilken solen lyser på fönstret |
| `info_entities` | – | Lista med extra sensorer (sträng eller `{entity, name, icon}`) |
| `window_background` | `sky` | Vad du ser genom fönstret: `sky` (himmel, dag/natt), `color` (enfärgad), `image` (foto) eller `transparent` (kortets bakgrund) |
| `window_color` | – | Färg bakom glaset med `window_background: color`: `[r, g, b]` eller CSS-färg |
| `window_image` | – | Foto bakom glaset med `window_background: image` (ladda upp via redigeraren) |
| `window_image_url` | – | Eller en URL till fotot, t.ex. `/local/tradgard.jpg` (har företräde framför `window_image`) |
| `window_opacity` | `100` | Opacitet för himmel/utsikt i % (0 = du ser kortets bakgrund genom glaset) |
| `window_night_dim` | `true` | Mörka ner egen färg/eget foto när solen har gått ner |
| `background_color` | tema | Bakgrundsfärg: `[r, g, b]` eller en CSS-färg (`"#20303a"`) |
| `background_image` | – | Bild: ladda upp via redigeraren, eller en URL som `/local/screen.jpg` |
| `background_opacity` | `100` | Bakgrundens opacitet i % (0 = genomskinlig). Innehållet förblir fullt synligt |
| `background_blur` | `0` | Oskärpa (px) för det som ligger bakom kortet, för en "glas"-effekt |

### Fönsterbakgrund

I den visuella redigeraren är sektionen **Fönsterbakgrund** öppen som standard. Välj under **Vad ser du genom fönstret?**:

- **Himmel (standard)**: blå himmel på dagen, mörk himmel på natten (med `show_sun`).
- **Enfärgad**: en färgväljare visas.
- **Foto / bild**: ladda upp ett foto (t.ex. din riktiga utsikt) eller ange en URL som `/local/tradgard.jpg`.
- **Genomskinlig**: du ser kortets bakgrund genom glaset.

Med färg eller foto ställer du också in opaciteten och om den ska mörkas ner på natten. Solen lyser (valfritt) fortfarande ovanpå.

```yaml
window_background: image
window_image_url: /local/utsikt_kok.jpg
window_opacity: 90
window_night_dim: true
```

Äldre konfigurationer med bara `window_color` eller `window_image` fungerar fortfarande: kortet väljer själv rätt läge.

### Kortbakgrund

I redigeraren finns allt under **Kortbakgrund**: välj en färg, ladda upp en bild och ställ in opacitet och oskärpa.

```yaml
# Genomskinligt "glas"-kort
background_opacity: 30
background_blur: 8

# Eget foto som bakgrund
background_image: /local/kok.jpg
background_opacity: 60
```

Färger kan ändras via temavariabler: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Språk

Kortet och den visuella redigeraren följer språket i Home Assistant: engelska, nederländska, franska, tyska, polska, svenska, danska, norska (bokmål), spanska och italienska. Andra språk faller tillbaka på engelska. Förbättringar av en översättning välkomnas via en pull request.

## Licens
MIT
