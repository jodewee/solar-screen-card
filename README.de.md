[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · **🇩🇪 Deutsch** · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Eine Home-Assistant-Lovelace-Karte zur Steuerung von Sonnenschutz-Screens (und anderen Rollläden/Jalousien, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Visuelles Fenster**: der Behang bewegt sich mit der echten Position.
- **Ziehen**: im Fenster auf die gewünschte Höhe ziehen, loslassen = `cover.set_cover_position`.
- **Tasten**: hoch / stopp / runter (nur aktiv, wenn dein Cover es unterstützt).
- **Schnelltasten**: frei wählbare Positionen (z. B. Offen, 50 %, Geschlossen).
- **Sonnenanzeige**: Tag-/Nachthimmel über `sun.sun`; mit der Fensterausrichtung zeigt die Karte, wann die Sonne wirklich darauf scheint.
- **Zusätzliche Sensoren**: z. B. Lux, Innentemperatur oder Wind als Chips unten.
- Visueller Editor, bereit für die Abschnittsansicht, folgt deinem HA-Theme, in 10 Sprachen verfügbar.

## Installation

### Marketplace / HACS (empfohlen)
1. Öffne **Einstellungen → Marketplace** (oder HACS bei älteren Versionen).
2. Suche nach **Solar Screen Card**.
3. Installiere die Karte und lade den Browser neu.

### Marketplace / HACS: benutzerdefiniertes Repository (Fallback)
Findest du die Karte nicht über die Suche (z. B. weil sie noch nicht im Katalog ist)? Dann füge das Repository selbst hinzu:
1. Öffne **Einstellungen → Marketplace** (oder HACS) → **Über Link hinzufügen / Benutzerdefinierte Repositories**.
2. Füge `https://github.com/jodewee/solar-screen-card` mit dem Typ **Dashboard / Lovelace** hinzu.
3. Installiere **Solar Screen Card** und lade den Browser neu.

### Manuell
1. Kopiere `solar-screen-card.js` nach `/config/www/`.
2. Füge eine Ressource hinzu (**Einstellungen → Dashboards → ⋮ → Ressourcen**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, Typ **JavaScript-Modul**.

## Konfiguration

```yaml
type: custom:solar-screen-card
entity: cover.screen_kueche
name: Screen Küche
moving_entity: sensor.screen_kueche_moving   # optional
window_azimuth: 180        # Fenster zeigt nach Süden
window_fov: 100            # Sonne gilt innerhalb ±50° als „auf dem Fenster“
percent_mode: closed       # „% geschlossen“ statt „% offen“ anzeigen
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_aussen
  - entity: sensor.temperatur_kueche
    name: Innen
```

| Option | Standard | Beschreibung |
|---|---|---|
| `entity` | **erforderlich** | Die `cover`-Entität des Screens |
| `name` | Anzeigename | Name oben |
| `icon` | `mdi:blinds` | Eigenes Symbol |
| `moving_entity` | – | Sensor, der Bewegung meldet (`up`/`down`/`opening`/`closing`), z. B. von Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Schnelltasten als Position in % offen (HA-Konvention: 100 = offen) |
| `percent_mode` | `open` | `open` oder `closed`: wie der Prozentwert angezeigt wird |
| `step` | `5` | Rundung in % beim Ziehen |
| `show_sun` | `true` | Himmel und Sonne anzeigen |
| `sun_entity` | `sun.sun` | Sonnen-Entität |
| `window_azimuth` | – | Richtung, in die das Fenster zeigt (N=0, O=90, S=180, W=270) |
| `window_fov` | `90` | Breite in Grad, in der die Sonne auf das Fenster scheint |
| `info_entities` | – | Liste zusätzlicher Sensoren (String oder `{entity, name, icon}`) |
| `window_background` | `sky` | Was man durch das Fenster sieht: `sky` (Himmel, Tag/Nacht), `color` (einfarbig), `image` (Foto) oder `transparent` (Kartenhintergrund) |
| `window_color` | – | Farbe hinter dem Glas bei `window_background: color`: `[r, g, b]` oder CSS-Farbe |
| `window_image` | – | Foto hinter dem Glas bei `window_background: image` (Upload über den Editor) |
| `window_image_url` | – | Oder eine URL zum Foto, z. B. `/local/garten.jpg` (hat Vorrang vor `window_image`) |
| `window_opacity` | `100` | Deckkraft von Himmel/Aussicht in % (0 = du siehst durch das Glas den Kartenhintergrund) |
| `window_night_dim` | `true` | Eigene Farbe/eigenes Foto abdunkeln, wenn die Sonne untergegangen ist |
| `background_color` | Theme | Hintergrundfarbe: `[r, g, b]` oder eine CSS-Farbe (`"#20303a"`) |
| `background_image` | – | Bild: Upload über den Editor oder eine URL wie `/local/screen.jpg` |
| `background_opacity` | `100` | Deckkraft des Hintergrunds in % (0 = transparent). Der Inhalt bleibt voll sichtbar |
| `background_blur` | `0` | Unschärfe (px) dessen, was hinter der Karte liegt, für einen „Glas“-Effekt |

### Fensterhintergrund

Im visuellen Editor ist der Abschnitt **Fensterhintergrund** standardmäßig geöffnet. Wähle bei **Was sieht man durch das Fenster?**:

- **Himmel (Standard)**: blauer Himmel tagsüber, dunkler Himmel nachts (mit `show_sun`).
- **Einfarbig**: ein Farbwähler erscheint.
- **Foto / Bild**: lade ein Foto hoch (z. B. deine echte Aussicht) oder gib eine URL wie `/local/garten.jpg` ein.
- **Transparent**: du siehst durch das Glas den Kartenhintergrund.

Bei Farbe oder Foto stellst du auch die Deckkraft ein und ob nachts abgedunkelt wird. Die Sonne scheint (optional) weiterhin darüber.

```yaml
window_background: image
window_image_url: /local/aussicht_kueche.jpg
window_opacity: 90
window_night_dim: true
```

Ältere Konfigurationen mit nur `window_color` oder `window_image` funktionieren weiterhin: die Karte wählt dann selbst den passenden Modus.

### Kartenhintergrund

Im Editor findest du alles unter **Kartenhintergrund**: wähle eine Farbe, lade ein Bild hoch und stelle Deckkraft und Unschärfe ein.

```yaml
# Transparente „Glas“-Karte
background_opacity: 30
background_blur: 8

# Eigenes Foto als Hintergrund
background_image: /local/kueche.jpg
background_opacity: 60
```

Farben lassen sich über Theme-Variablen anpassen: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Sprachen

Die Karte und der visuelle Editor folgen der Sprache von Home Assistant: Englisch, Niederländisch, Französisch, Deutsch, Polnisch, Schwedisch, Dänisch, Norwegisch (Bokmål), Spanisch und Italienisch. Andere Sprachen fallen auf Englisch zurück. Verbesserungen an einer Übersetzung sind per Pull Request willkommen.

## Lizenz
MIT
