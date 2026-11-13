# Solar Screen Card

Een Home Assistant Lovelace-kaart om solar-screens (en andere rolluiken/screens, `cover.*`) te bedienen.

- **Visueel raam**: het screendoek zakt mee met de echte positie.
- **Slepen**: sleep in het raam naar de gewenste hoogte, loslaten = `cover.set_cover_position`.
- **Knoppen**: omhoog / stop / omlaag (alleen actief als je cover het ondersteunt).
- **Snelknoppen**: zelf te kiezen posities (bv. Open, 50%, Dicht).
- **Zon-indicatie**: dag/nacht-lucht via `sun.sun`; met de oriëntatie van het raam toont de kaart wanneer de zon er echt op staat.
- **Extra sensoren**: bv. lux, binnentemperatuur of wind als chips onderaan.
- Visuele editor, sections-view-ready, volgt je HA-thema, Nederlands/Engels.

## Installatie

### Marketplace / HACS (aangepaste repository)
1. Open **Instellingen → Marketplace** (of HACS op oudere versies) → **Toevoegen via link / Custom repositories**.
2. Voeg `https://github.com/jodewee/solar-screen-card` toe als type **Dashboard / Lovelace**.
3. Installeer **Solar Screen Card** en herlaad de browser.

### Handmatig
1. Kopieer `solar-screen-card.js` naar `/config/www/`.
2. Voeg een resource toe (**Instellingen → Dashboards → ⋮ → Resources**):
   `/local/solar-screen-card.js?v=1.0.0`, type **JavaScript module**.

## Configuratie

```yaml
type: custom:solar-screen-card
entity: cover.screen_keuken
name: Screen keuken
moving_entity: sensor.screen_keuken_moving   # optioneel
window_azimuth: 180        # raam kijkt naar het zuiden
window_fov: 100            # zon telt als "op het raam" binnen ±50°
percent_mode: closed       # toon "% dicht" i.p.v. "% open"
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_buiten
  - entity: sensor.temperatuur_keuken
    name: Binnen
```

| Optie | Standaard | Uitleg |
|---|---|---|
| `entity` | **verplicht** | De `cover`-entiteit van het screen |
| `name` | friendly name | Naam bovenaan |
| `icon` | `mdi:blinds` | Eigen icoon |
| `moving_entity` | – | Sensor die beweging meldt (`up`/`down`/`opening`/`closing`), bv. van Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Snelknoppen als positie in % open (HA-conventie: 100 = open) |
| `percent_mode` | `open` | `open` of `closed`: hoe het percentage getoond wordt |
| `step` | `5` | Afronding in % bij slepen |
| `show_sun` | `true` | Lucht en zon tonen |
| `sun_entity` | `sun.sun` | Zon-entiteit |
| `window_azimuth` | – | Richting waarin het raam kijkt (N=0, O=90, Z=180, W=270) |
| `window_fov` | `90` | Breedte in graden waarin de zon op het raam staat |
| `info_entities` | – | Lijst met extra sensoren (string of `{entity, name, icon}`) |

Kleuren aanpassen kan via thema-variabelen: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Licentie
MIT
