[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · [🇵🇱 Polski](https://github.com/jodewee/solar-screen-card/blob/main/README.pl.md) · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · **🇪🇸 Español** · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Una tarjeta Lovelace para Home Assistant para controlar estores solares (y otras persianas/toldos, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Ventana visual**: la tela del estor se mueve con la posición real.
- **Arrastrar**: arrastra dentro de la ventana hasta la altura deseada; al soltar = `cover.set_cover_position`.
- **Botones**: subir / parar / bajar (solo activos si tu cover lo admite).
- **Botones rápidos**: posiciones a elegir (p. ej. Abierto, 50 %, Cerrado).
- **Indicación del sol**: cielo de día/noche mediante `sun.sun`; con la orientación de la ventana, la tarjeta muestra cuándo le da realmente el sol.
- **Sensores adicionales**: p. ej. lux, temperatura interior o viento como chips en la parte inferior.
- Editor visual, preparada para la vista de secciones, sigue tu tema de HA, disponible en 10 idiomas.

## Instalación

### Marketplace / HACS (recomendado)
1. Abre **Ajustes → Marketplace** (o HACS en versiones antiguas).
2. Busca **Solar Screen Card**.
3. Instala la tarjeta y recarga el navegador.

### Marketplace / HACS: repositorio personalizado (alternativa)
¿No encuentras la tarjeta con la búsqueda (p. ej. porque aún no está en el catálogo)? Añade el repositorio tú mismo:
1. Abre **Ajustes → Marketplace** (o HACS) → **Añadir mediante enlace / Repositorios personalizados**.
2. Añade `https://github.com/jodewee/solar-screen-card` con el tipo **Dashboard / Lovelace**.
3. Instala **Solar Screen Card** y recarga el navegador.

### Manual
1. Copia `solar-screen-card.js` en `/config/www/`.
2. Añade un recurso (**Ajustes → Paneles de control → ⋮ → Recursos**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, tipo **Módulo JavaScript**.

## Configuración

```yaml
type: custom:solar-screen-card
entity: cover.estor_cocina
name: Estor cocina
moving_entity: sensor.estor_cocina_moving   # opcional
window_azimuth: 180        # la ventana da al sur
window_fov: 100            # el sol cuenta como «en la ventana» dentro de ±50°
percent_mode: closed       # mostrar «% cerrado» en lugar de «% abierto»
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_exterior
  - entity: sensor.temperatura_cocina
    name: Interior
```

| Opción | Predeterminado | Descripción |
|---|---|---|
| `entity` | **obligatorio** | La entidad `cover` del estor |
| `name` | friendly name | Nombre en la parte superior |
| `icon` | `mdi:blinds` | Icono propio |
| `moving_entity` | – | Sensor que informa del movimiento (`up`/`down`/`opening`/`closing`), p. ej. de Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Botones rápidos como posición en % abierto (convención de HA: 100 = abierto) |
| `percent_mode` | `open` | `open` o `closed`: cómo se muestra el porcentaje |
| `step` | `5` | Redondeo en % al arrastrar |
| `show_sun` | `true` | Mostrar cielo y sol |
| `sun_entity` | `sun.sun` | Entidad del sol |
| `window_azimuth` | – | Dirección hacia la que mira la ventana (N=0, E=90, S=180, O=270) |
| `window_fov` | `90` | Anchura en grados dentro de la cual el sol da en la ventana |
| `info_entities` | – | Lista de sensores adicionales (texto o `{entity, name, icon}`) |
| `window_background` | `sky` | Lo que se ve por la ventana: `sky` (cielo, día/noche), `color` (color sólido), `image` (foto) o `transparent` (fondo de la tarjeta) |
| `window_color` | – | Color detrás del cristal con `window_background: color`: `[r, g, b]` o color CSS |
| `window_image` | – | Foto detrás del cristal con `window_background: image` (se sube desde el editor) |
| `window_image_url` | – | O una URL a la foto, p. ej. `/local/jardin.jpg` (tiene prioridad sobre `window_image`) |
| `window_opacity` | `100` | Opacidad del cielo/la vista en % (0 = ves el fondo de la tarjeta a través del cristal) |
| `window_night_dim` | `true` | Oscurecer tu color/foto cuando el sol se ha puesto |
| `background_color` | tema | Color de fondo: `[r, g, b]` o un color CSS (`"#20303a"`) |
| `background_image` | – | Imagen: súbela desde el editor o usa una URL como `/local/screen.jpg` |
| `background_opacity` | `100` | Opacidad del fondo en % (0 = transparente). El contenido sigue totalmente visible |
| `background_blur` | `0` | Desenfoque (px) de lo que hay detrás de la tarjeta, para un efecto «cristal» |

### Fondo de la ventana

En el editor visual, la sección **Fondo de la ventana** está abierta por defecto. En **¿Qué se ve por la ventana?** elige:

- **Cielo (predeterminado)**: cielo azul de día, cielo oscuro de noche (con `show_sun`).
- **Color sólido**: aparece un selector de color.
- **Foto / imagen**: sube una foto (p. ej. tu vista real) o introduce una URL como `/local/jardin.jpg`.
- **Transparente**: ves el fondo de la tarjeta a través del cristal.

Con un color o una foto también ajustas la opacidad y si se oscurece de noche. El sol (opcionalmente) sigue brillando por encima.

```yaml
window_background: image
window_image_url: /local/vista_cocina.jpg
window_opacity: 90
window_night_dim: true
```

Las configuraciones antiguas con solo `window_color` o `window_image` siguen funcionando: la tarjeta elige sola el modo correcto.

### Fondo de la tarjeta

En el editor todo está en **Fondo de la tarjeta**: elige un color, sube una imagen y ajusta la opacidad y el desenfoque.

```yaml
# Tarjeta «cristal» transparente
background_opacity: 30
background_blur: 8

# Tu propia foto como fondo
background_image: /local/cocina.jpg
background_opacity: 60
```

Los colores se pueden cambiar mediante variables de tema: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Idiomas

La tarjeta y el editor visual siguen el idioma de Home Assistant: inglés, neerlandés, francés, alemán, polaco, sueco, danés, noruego (bokmål), español e italiano. Los demás idiomas recurren al inglés. Las mejoras de traducción son bienvenidas mediante una pull request.

## Licencia
MIT
