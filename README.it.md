[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · **🇮🇹 Italiano**

# Solar Screen Card

Una scheda Lovelace per Home Assistant per controllare tende solari (e altre tapparelle/tende, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Finestra visiva**: il telo segue la posizione reale.
- **Trascinamento**: trascina nella finestra fino all'altezza desiderata; rilascio = `cover.set_cover_position`.
- **Pulsanti**: su / stop / giù (attivi solo se il tuo cover lo supporta).
- **Pulsanti rapidi**: posizioni a scelta (ad es. Aperto, 50%, Chiuso).
- **Indicazione del sole**: cielo giorno/notte tramite `sun.sun`; con l'orientamento della finestra la scheda mostra quando il sole la colpisce davvero.
- **Sensori aggiuntivi**: ad es. lux, temperatura interna o vento come chip in basso.
- Editor visivo, pronta per la vista a sezioni, segue il tuo tema HA, disponibile in 10 lingue.

## Installazione

### Marketplace / HACS (consigliato)
1. Apri **Impostazioni → Marketplace** (o HACS nelle versioni precedenti).
2. Cerca **Solar Screen Card**.
3. Installa la scheda e ricarica il browser.

### Marketplace / HACS: repository personalizzato (alternativa)
Non trovi la scheda con la ricerca (ad es. perché non è ancora nel catalogo)? Aggiungi tu stesso il repository:
1. Apri **Impostazioni → Marketplace** (o HACS) → **Aggiungi tramite link / Repository personalizzati**.
2. Aggiungi `https://github.com/jodewee/solar-screen-card` con il tipo **Dashboard / Lovelace**.
3. Installa **Solar Screen Card** e ricarica il browser.

### Manuale
1. Copia `solar-screen-card.js` in `/config/www/`.
2. Aggiungi una risorsa (**Impostazioni → Plance → ⋮ → Risorse**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, tipo **Modulo JavaScript**.

## Configurazione

```yaml
type: custom:solar-screen-card
entity: cover.tenda_cucina
name: Tenda cucina
moving_entity: sensor.tenda_cucina_moving   # opzionale
window_azimuth: 180        # la finestra guarda a sud
window_fov: 100            # il sole conta come «sulla finestra» entro ±50°
percent_mode: closed       # mostra «% chiuso» invece di «% aperto»
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_esterno
  - entity: sensor.temperatura_cucina
    name: Interno
```

| Opzione | Predefinito | Descrizione |
|---|---|---|
| `entity` | **obbligatorio** | L'entità `cover` della tenda |
| `name` | friendly name | Nome in alto |
| `icon` | `mdi:blinds` | Icona personalizzata |
| `moving_entity` | – | Sensore che segnala il movimento (`up`/`down`/`opening`/`closing`), ad es. da Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Pulsanti rapidi come posizione in % aperto (convenzione HA: 100 = aperto) |
| `percent_mode` | `open` | `open` o `closed`: come viene mostrata la percentuale |
| `step` | `5` | Arrotondamento in % durante il trascinamento |
| `show_sun` | `true` | Mostra cielo e sole |
| `sun_entity` | `sun.sun` | Entità sole |
| `window_azimuth` | – | Direzione verso cui guarda la finestra (N=0, E=90, S=180, O=270) |
| `window_fov` | `90` | Ampiezza in gradi entro cui il sole colpisce la finestra |
| `info_entities` | – | Elenco di sensori aggiuntivi (stringa o `{entity, name, icon}`) |
| `window_background` | `sky` | Cosa si vede dalla finestra: `sky` (cielo, giorno/notte), `color` (tinta unita), `image` (foto) o `transparent` (sfondo della scheda) |
| `window_color` | – | Colore dietro il vetro con `window_background: color`: `[r, g, b]` o colore CSS |
| `window_image` | – | Foto dietro il vetro con `window_background: image` (caricamento tramite l'editor) |
| `window_image_url` | – | Oppure un URL della foto, ad es. `/local/giardino.jpg` (ha la precedenza su `window_image`) |
| `window_opacity` | `100` | Opacità di cielo/vista in % (0 = vedi lo sfondo della scheda attraverso il vetro) |
| `window_night_dim` | `true` | Scurisci il tuo colore/la tua foto quando il sole è tramontato |
| `background_color` | tema | Colore di sfondo: `[r, g, b]` o un colore CSS (`"#20303a"`) |
| `background_image` | – | Immagine: caricamento tramite l'editor, o un URL come `/local/screen.jpg` |
| `background_opacity` | `100` | Opacità dello sfondo in % (0 = trasparente). Il contenuto resta completamente visibile |
| `background_blur` | `0` | Sfocatura (px) di ciò che si trova dietro la scheda, per un effetto «vetro» |

### Sfondo della finestra

Nell'editor visivo la sezione **Sfondo finestra** è aperta per impostazione predefinita. In **Cosa si vede dalla finestra?** scegli:

- **Cielo (predefinito)**: cielo azzurro di giorno, cielo scuro di notte (con `show_sun`).
- **Tinta unita**: compare un selettore di colore.
- **Foto / immagine**: carica una foto (ad es. la tua vista reale) o inserisci un URL come `/local/giardino.jpg`.
- **Trasparente**: vedi lo sfondo della scheda attraverso il vetro.

Con colore o foto imposti anche l'opacità e se scurire di notte. Il sole (opzionalmente) continua a splendere sopra.

```yaml
window_background: image
window_image_url: /local/vista_cucina.jpg
window_opacity: 90
window_night_dim: true
```

Le configurazioni precedenti con solo `window_color` o `window_image` continuano a funzionare: la scheda sceglie da sola la modalità giusta.

### Sfondo della scheda

Nell'editor trovi tutto in **Sfondo scheda**: scegli un colore, carica un'immagine e imposta opacità e sfocatura.

```yaml
# Scheda «vetro» trasparente
background_opacity: 30
background_blur: 8

# La tua foto come sfondo
background_image: /local/cucina.jpg
background_opacity: 60
```

I colori si possono modificare tramite le variabili del tema: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Lingue

La scheda e l'editor visivo seguono la lingua di Home Assistant: inglese, olandese, francese, tedesco, polacco, svedese, danese, norvegese (bokmål), spagnolo e italiano. Le altre lingue ripiegano sull'inglese. I miglioramenti alle traduzioni sono benvenuti tramite una pull request.

## Licenza
MIT
