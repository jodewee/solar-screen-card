[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · **🇫🇷 Français** · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Une carte Lovelace pour Home Assistant permettant de piloter des screens solaires (et autres stores/volets, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Fenêtre visuelle** : la toile du screen suit la position réelle.
- **Glisser** : faites glisser dans la fenêtre jusqu'à la hauteur souhaitée ; relâcher = `cover.set_cover_position`.
- **Boutons** : monter / stop / descendre (actifs uniquement si votre cover le prend en charge).
- **Boutons rapides** : positions au choix (par ex. Ouvert, 50 %, Fermé).
- **Indication du soleil** : ciel jour/nuit via `sun.sun` ; avec l'orientation de la fenêtre, la carte indique quand le soleil donne réellement dessus.
- **Capteurs supplémentaires** : par ex. lux, température intérieure ou vent, sous forme de pastilles en bas.
- Éditeur visuel, compatible avec la vue Sections, suit votre thème HA, disponible en 10 langues.

## Installation

### Marketplace / HACS (recommandé)
1. Ouvrez **Paramètres → Marketplace** (ou HACS sur les anciennes versions).
2. Recherchez **Solar Screen Card**.
3. Installez la carte et rechargez le navigateur.

### Marketplace / HACS : dépôt personnalisé (solution de repli)
Vous ne trouvez pas la carte via la recherche (par ex. parce qu'elle n'est pas encore dans le catalogue) ? Ajoutez le dépôt vous-même :
1. Ouvrez **Paramètres → Marketplace** (ou HACS) → **Ajouter via un lien / Dépôts personnalisés**.
2. Ajoutez `https://github.com/jodewee/solar-screen-card` avec le type **Dashboard / Lovelace**.
3. Installez **Solar Screen Card** et rechargez le navigateur.

### Manuel
1. Copiez `solar-screen-card.js` dans `/config/www/`.
2. Ajoutez une ressource (**Paramètres → Tableaux de bord → ⋮ → Ressources**) :
   `/local/solar-screen-card.js?v=2026.11.17.2`, type **Module JavaScript**.

## Configuration

```yaml
type: custom:solar-screen-card
entity: cover.screen_cuisine
name: Screen cuisine
moving_entity: sensor.screen_cuisine_moving   # optionnel
window_azimuth: 180        # la fenêtre est orientée plein sud
window_fov: 100            # le soleil compte comme « sur la fenêtre » à ±50°
percent_mode: closed       # afficher « % fermé » au lieu de « % ouvert »
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_exterieur
  - entity: sensor.temperature_cuisine
    name: Intérieur
```

| Option | Défaut | Description |
|---|---|---|
| `entity` | **obligatoire** | L'entité `cover` du screen |
| `name` | friendly name | Nom affiché en haut |
| `icon` | `mdi:blinds` | Icône personnalisée |
| `moving_entity` | – | Capteur signalant le mouvement (`up`/`down`/`opening`/`closing`), par ex. de Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Boutons rapides en position % ouvert (convention HA : 100 = ouvert) |
| `percent_mode` | `open` | `open` ou `closed` : manière d'afficher le pourcentage |
| `step` | `5` | Arrondi en % lors du glissement |
| `show_sun` | `true` | Afficher le ciel et le soleil |
| `sun_entity` | `sun.sun` | Entité soleil |
| `window_azimuth` | – | Direction vers laquelle la fenêtre est orientée (N=0, E=90, S=180, O=270) |
| `window_fov` | `90` | Largeur en degrés dans laquelle le soleil donne sur la fenêtre |
| `info_entities` | – | Liste de capteurs supplémentaires (chaîne ou `{entity, name, icon}`) |
| `window_background` | `sky` | Ce que l'on voit par la fenêtre : `sky` (ciel, jour/nuit), `color` (couleur unie), `image` (photo) ou `transparent` (fond de la carte) |
| `window_color` | – | Couleur derrière la vitre avec `window_background: color` : `[r, g, b]` ou couleur CSS |
| `window_image` | – | Photo derrière la vitre avec `window_background: image` (téléversement via l'éditeur) |
| `window_image_url` | – | Ou une URL vers la photo, par ex. `/local/jardin.jpg` (prioritaire sur `window_image`) |
| `window_opacity` | `100` | Opacité du ciel/de la vue en % (0 = vous voyez le fond de la carte à travers la vitre) |
| `window_night_dim` | `true` | Assombrir votre couleur/photo quand le soleil est couché |
| `background_color` | thème | Couleur de fond : `[r, g, b]` ou une couleur CSS (`"#20303a"`) |
| `background_image` | – | Image : téléversement via l'éditeur, ou une URL comme `/local/screen.jpg` |
| `background_opacity` | `100` | Opacité du fond en % (0 = transparent). Le contenu reste entièrement visible |
| `background_blur` | `0` | Flou (px) de ce qui se trouve derrière la carte, pour un effet « verre » |

### Fond de la fenêtre

Dans l'éditeur visuel, la section **Fond de la fenêtre** est ouverte par défaut. Sous **Que voit-on par la fenêtre ?**, choisissez :

- **Ciel (par défaut)** : ciel bleu le jour, ciel sombre la nuit (avec `show_sun`).
- **Couleur unie** : un sélecteur de couleur apparaît.
- **Photo / image** : téléversez une photo (par ex. votre vraie vue) ou saisissez une URL comme `/local/jardin.jpg`.
- **Transparent** : vous voyez le fond de la carte à travers la vitre.

Avec une couleur ou une photo, vous réglez aussi l'opacité et l'assombrissement nocturne. Le soleil continue (en option) de briller par-dessus.

```yaml
window_background: image
window_image_url: /local/vue_cuisine.jpg
window_opacity: 90
window_night_dim: true
```

Les anciennes configurations avec uniquement `window_color` ou `window_image` continuent de fonctionner : la carte choisit elle-même le bon mode.

### Fond de la carte

Dans l'éditeur, tout se trouve sous **Fond de la carte** : choisissez une couleur, téléversez une image, et réglez l'opacité et le flou.

```yaml
# Carte « verre » transparente
background_opacity: 30
background_blur: 8

# Votre propre photo en fond
background_image: /local/cuisine.jpg
background_opacity: 60
```

Les couleurs se modifient via les variables de thème : `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Langues

La carte et l'éditeur visuel suivent la langue de Home Assistant : anglais, néerlandais, français, allemand, polonais, suédois, danois, norvégien (bokmål), espagnol et italien. Les autres langues basculent sur l'anglais. Les améliorations de traduction sont les bienvenues via une pull request.

## Licence
MIT
