[🇬🇧 English](https://github.com/jodewee/solar-screen-card/blob/main/README.md) · [🇳🇱 Nederlands](https://github.com/jodewee/solar-screen-card/blob/main/README.nl.md) · [🇫🇷 Français](https://github.com/jodewee/solar-screen-card/blob/main/README.fr.md) · [🇩🇪 Deutsch](https://github.com/jodewee/solar-screen-card/blob/main/README.de.md) · **🇵🇱 Polski** · [🇸🇪 Svenska](https://github.com/jodewee/solar-screen-card/blob/main/README.sv.md) · [🇩🇰 Dansk](https://github.com/jodewee/solar-screen-card/blob/main/README.da.md) · [🇳🇴 Norsk](https://github.com/jodewee/solar-screen-card/blob/main/README.nb.md) · [🇪🇸 Español](https://github.com/jodewee/solar-screen-card/blob/main/README.es.md) · [🇮🇹 Italiano](https://github.com/jodewee/solar-screen-card/blob/main/README.it.md)

# Solar Screen Card

Karta Lovelace dla Home Assistant do sterowania roletami zewnętrznymi typu screen (oraz innymi roletami/żaluzjami, `cover.*`).

![Solar Screen Card](images/screenshot.png)

- **Wizualne okno**: tkanina rolety przesuwa się zgodnie z rzeczywistą pozycją.
- **Przeciąganie**: przeciągnij w oknie na żądaną wysokość, puszczenie = `cover.set_cover_position`.
- **Przyciski**: w górę / stop / w dół (aktywne tylko, jeśli Twoja encja cover to obsługuje).
- **Szybkie przyciski**: dowolnie wybrane pozycje (np. Otwarte, 50%, Zamknięte).
- **Wskaźnik słońca**: niebo dzień/noc na podstawie `sun.sun`; po podaniu orientacji okna karta pokazuje, kiedy słońce faktycznie na nie świeci.
- **Dodatkowe czujniki**: np. lux, temperatura wewnątrz lub wiatr jako chipy na dole.
- Edytor wizualny, gotowa na widok sekcji, dopasowuje się do motywu HA, dostępna w 10 językach.

## Instalacja

### Marketplace / HACS (zalecane)
1. Otwórz **Ustawienia → Marketplace** (lub HACS w starszych wersjach).
2. Wyszukaj **Solar Screen Card**.
3. Zainstaluj kartę i odśwież przeglądarkę.

### Marketplace / HACS: własne repozytorium (alternatywa)
Nie możesz znaleźć karty przez wyszukiwanie (np. dlatego, że nie ma jej jeszcze w katalogu)? Dodaj repozytorium samodzielnie:
1. Otwórz **Ustawienia → Marketplace** (lub HACS) → **Dodaj przez link / Własne repozytoria**.
2. Dodaj `https://github.com/jodewee/solar-screen-card` jako typ **Dashboard / Lovelace**.
3. Zainstaluj **Solar Screen Card** i odśwież przeglądarkę.

### Ręcznie
1. Skopiuj `solar-screen-card.js` do `/config/www/`.
2. Dodaj zasób (**Ustawienia → Dashboardy → ⋮ → Zasoby**):
   `/local/solar-screen-card.js?v=2026.11.17.2`, typ **Moduł JavaScript**.

## Konfiguracja

```yaml
type: custom:solar-screen-card
entity: cover.roleta_kuchnia
name: Roleta kuchnia
moving_entity: sensor.roleta_kuchnia_moving   # opcjonalnie
window_azimuth: 180        # okno skierowane na południe
window_fov: 100            # słońce liczy się jako „na oknie” w zakresie ±50°
percent_mode: closed       # pokazuj „% zamknięte” zamiast „% otwarte”
presets: [100, 50, 20, 0]
info_entities:
  - sensor.lux_zewnatrz
  - entity: sensor.temperatura_kuchnia
    name: Wewnątrz
```

| Opcja | Domyślnie | Opis |
|---|---|---|
| `entity` | **wymagane** | Encja `cover` rolety |
| `name` | friendly name | Nazwa u góry |
| `icon` | `mdi:blinds` | Własna ikona |
| `moving_entity` | – | Czujnik zgłaszający ruch (`up`/`down`/`opening`/`closing`), np. z Zigbee2MQTT |
| `presets` | `[0, 50, 100]` | Szybkie przyciski jako pozycja w % otwarcia (konwencja HA: 100 = otwarte) |
| `percent_mode` | `open` | `open` lub `closed`: sposób wyświetlania procentu |
| `step` | `5` | Zaokrąglenie w % podczas przeciągania |
| `show_sun` | `true` | Pokaż niebo i słońce |
| `sun_entity` | `sun.sun` | Encja słońca |
| `window_azimuth` | – | Kierunek, w którym skierowane jest okno (północ=0, wschód=90, południe=180, zachód=270) |
| `window_fov` | `90` | Szerokość w stopniach, w której słońce świeci na okno |
| `info_entities` | – | Lista dodatkowych czujników (tekst lub `{entity, name, icon}`) |
| `window_background` | `sky` | Co widać przez okno: `sky` (niebo, dzień/noc), `color` (jednolity kolor), `image` (zdjęcie) lub `transparent` (tło karty) |
| `window_color` | – | Kolor za szybą przy `window_background: color`: `[r, g, b]` lub kolor CSS |
| `window_image` | – | Zdjęcie za szybą przy `window_background: image` (przesyłane przez edytor) |
| `window_image_url` | – | Lub URL zdjęcia, np. `/local/ogrod.jpg` (ma pierwszeństwo przed `window_image`) |
| `window_opacity` | `100` | Krycie nieba/widoku w % (0 = przez szybę widać tło karty) |
| `window_night_dim` | `true` | Przyciemniaj własny kolor/zdjęcie, gdy słońce zajdzie |
| `background_color` | motyw | Kolor tła: `[r, g, b]` lub kolor CSS (`"#20303a"`) |
| `background_image` | – | Obraz: przesyłany przez edytor lub URL, np. `/local/screen.jpg` |
| `background_opacity` | `100` | Krycie tła w % (0 = przezroczyste). Zawartość pozostaje w pełni widoczna |
| `background_blur` | `0` | Rozmycie (px) tego, co jest za kartą, dla efektu „szkła” |

### Tło okna

W edytorze wizualnym sekcja **Tło okna** jest domyślnie rozwinięta. W polu **Co widać przez okno?** wybierz:

- **Niebo (domyślnie)**: niebieskie niebo w dzień, ciemne w nocy (z `show_sun`).
- **Jednolity kolor**: pojawia się selektor koloru.
- **Zdjęcie / obraz**: prześlij zdjęcie (np. prawdziwy widok z okna) lub wpisz URL, np. `/local/ogrod.jpg`.
- **Przezroczyste**: przez szybę widać tło karty.

Przy kolorze lub zdjęciu ustawiasz też krycie oraz przyciemnianie w nocy. Słońce (opcjonalnie) nadal świeci na wierzchu.

```yaml
window_background: image
window_image_url: /local/widok_kuchnia.jpg
window_opacity: 90
window_night_dim: true
```

Starsze konfiguracje zawierające tylko `window_color` lub `window_image` nadal działają: karta sama wybiera właściwy tryb.

### Tło karty

W edytorze wszystko znajduje się w sekcji **Tło karty**: wybierz kolor, prześlij obraz oraz ustaw krycie i rozmycie.

```yaml
# Przezroczysta karta „szklana”
background_opacity: 30
background_blur: 8

# Własne zdjęcie jako tło
background_image: /local/kuchnia.jpg
background_opacity: 60
```

Kolory można zmienić za pomocą zmiennych motywu: `--ssc-fabric`, `--ssc-bar`, `--ssc-frame`.

## Języki

Karta i edytor wizualny używają języka ustawionego w Home Assistant: angielski, niderlandzki, francuski, niemiecki, polski, szwedzki, duński, norweski (bokmål), hiszpański i włoski. Pozostałe języki korzystają z angielskiego. Poprawki tłumaczeń są mile widziane w formie pull requesta.

## Licencja
MIT
