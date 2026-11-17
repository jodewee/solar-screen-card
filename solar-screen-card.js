/*! solar-screen-card | MIT | https://github.com/jodewee/solar-screen-card */
const SSC_VERSION = "2026.11.17.2";

const SSC_I18N = {
  nl: {
    open: "Open", closed: "Dicht", opening: "Gaat open", closing: "Gaat dicht",
    unavailable: "Niet beschikbaar", pct_open: "% open", pct_closed: "% dicht",
    sun_on: "Zon op het raam", sun_off: "Geen directe zon", night: "Zon onder",
    up: "Omhoog", down: "Omlaag", stop: "Stop", not_found: "Entiteit niet gevonden",
    sec_window: "Achtergrond raam", sec_card: "Achtergrond kaart",
    opt_sky: "Lucht (standaard, dag/nacht)", opt_color: "Effen kleur", opt_image: "Foto / afbeelding", opt_transparent: "Transparant (kaartachtergrond)",
    desc: "Bedien je solar-screens/rolluiken met een visueel raam, sleepbediening, snelknoppen en zon-indicatie.",
    labels: {
      entity: "Screen (cover)", name: "Naam", icon: "Icoon", moving_entity: "Beweging-sensor (optioneel)",
      window_azimuth: "Oriëntatie raam (°)", window_fov: "Zonhoek raam (°)", sun_entity: "Zon-entiteit",
      percent_mode: "Percentage tonen als", presets: "Snelknoppen (positie % open)", step: "Stapgrootte slepen (%)",
      info_entities: "Extra sensoren", show_sun: "Zon tonen",
      background_color: "Achtergrondkleur", background_image: "Achtergrondafbeelding (upload)",
      background_opacity: "Dekking achtergrond (%)", background_blur: "Vervaging achter kaart (px)",
      window_background: "Wat zie je door het raam?",
      window_color: "Kleur achter het raam", window_image: "Foto uploaden", window_image_url: "…of URL van de foto",
      window_opacity: "Dekking raam (%)", window_night_dim: "Donkerder maken 's nachts",
    },
    helpers: {
      window_azimuth: "Richting waarin het raam kijkt: N=0, O=90, Z=180, W=270. Leeg = geen zon-detectie.",
      background_opacity: "0% = volledig transparant, 100% = volledig dekkend. Geldt enkel voor de achtergrond, niet voor de inhoud.",
      background_blur: "Vervaagt wat achter de kaart zit (handig bij een transparante kaart op een dashboard-achtergrond).",
      background_image: "Upload een afbeelding, of zet in YAML een URL zoals /local/screen.jpg.",
      window_background: "Kies de achtergrond achter het glas. Bij 'Effen kleur' of 'Foto' verschijnen hieronder extra velden.",
      window_color: "Vervangt de blauwe lucht achter het glas door een effen kleur.",
      window_image: "Bv. een foto van je echte uitzicht.",
      window_image_url: "Alternatief voor uploaden, bv. /local/tuin.jpg. Heeft voorrang op de upload.",
      window_opacity: "Transparantie van de lucht/het uitzicht. 0% = je ziet de kaartachtergrond door het glas.",
      window_night_dim: "Dimt de eigen kleur/foto wanneer de zon onder is.",
    },
  },
  en: {
    open: "Open", closed: "Closed", opening: "Opening", closing: "Closing",
    unavailable: "Unavailable", pct_open: "% open", pct_closed: "% closed",
    sun_on: "Sun on the window", sun_off: "No direct sun", night: "Sun is down",
    up: "Up", down: "Down", stop: "Stop", not_found: "Entity not found",
    sec_window: "Window background", sec_card: "Card background",
    opt_sky: "Sky (default, day/night)", opt_color: "Solid color", opt_image: "Photo / image", opt_transparent: "Transparent (card background)",
    desc: "Control your solar screens/blinds with a visual window, drag control, quick buttons and sun indication.",
    labels: {
      entity: "Screen (cover)", name: "Name", icon: "Icon", moving_entity: "Movement sensor (optional)",
      window_azimuth: "Window orientation (°)", window_fov: "Window sun angle (°)", sun_entity: "Sun entity",
      percent_mode: "Show percentage as", presets: "Quick buttons (position % open)", step: "Drag step (%)",
      info_entities: "Extra sensors", show_sun: "Show sun",
      background_color: "Background color", background_image: "Background image (upload)",
      background_opacity: "Background opacity (%)", background_blur: "Blur behind card (px)",
      window_background: "What do you see through the window?",
      window_color: "Color behind the window", window_image: "Upload photo", window_image_url: "…or photo URL",
      window_opacity: "Window opacity (%)", window_night_dim: "Darken at night",
    },
    helpers: {
      window_azimuth: "Direction the window faces: N=0, E=90, S=180, W=270. Empty = no sun detection.",
      background_opacity: "0% = fully transparent, 100% = fully opaque. Applies only to the background, not the content.",
      background_blur: "Blurs what is behind the card (useful for a transparent card on a dashboard background).",
      background_image: "Upload an image, or set a URL in YAML such as /local/screen.jpg.",
      window_background: "Choose the background behind the glass. With 'Solid color' or 'Photo', extra fields appear below.",
      window_color: "Replaces the blue sky behind the glass with a solid color.",
      window_image: "E.g. a photo of your real view.",
      window_image_url: "Alternative to uploading, e.g. /local/garden.jpg. Takes precedence over the upload.",
      window_opacity: "Transparency of the sky/view. 0% = you see the card background through the glass.",
      window_night_dim: "Dims your own color/photo when the sun is down.",
    },
  },
  fr: {
    open: "Ouvert", closed: "Fermé", opening: "Ouverture", closing: "Fermeture",
    unavailable: "Indisponible", pct_open: "% ouvert", pct_closed: "% fermé",
    sun_on: "Soleil sur la fenêtre", sun_off: "Pas de soleil direct", night: "Soleil couché",
    up: "Monter", down: "Descendre", stop: "Stop", not_found: "Entité introuvable",
    sec_window: "Fond de la fenêtre", sec_card: "Fond de la carte",
    opt_sky: "Ciel (par défaut, jour/nuit)", opt_color: "Couleur unie", opt_image: "Photo / image", opt_transparent: "Transparent (fond de la carte)",
    desc: "Pilotez vos screens/volets avec une fenêtre visuelle, un contrôle par glissement, des boutons rapides et une indication du soleil.",
    labels: {
      entity: "Store (cover)", name: "Nom", icon: "Icône", moving_entity: "Capteur de mouvement (optionnel)",
      window_azimuth: "Orientation de la fenêtre (°)", window_fov: "Angle solaire de la fenêtre (°)", sun_entity: "Entité soleil",
      percent_mode: "Afficher le pourcentage en", presets: "Boutons rapides (position % ouvert)", step: "Pas de glissement (%)",
      info_entities: "Capteurs supplémentaires", show_sun: "Afficher le soleil",
      background_color: "Couleur de fond", background_image: "Image de fond (téléversement)",
      background_opacity: "Opacité du fond (%)", background_blur: "Flou derrière la carte (px)",
      window_background: "Que voit-on par la fenêtre ?",
      window_color: "Couleur derrière la fenêtre", window_image: "Téléverser une photo", window_image_url: "…ou URL de la photo",
      window_opacity: "Opacité de la fenêtre (%)", window_night_dim: "Assombrir la nuit",
    },
    helpers: {
      window_azimuth: "Direction vers laquelle la fenêtre est orientée : N=0, E=90, S=180, O=270. Vide = pas de détection du soleil.",
      background_opacity: "0 % = entièrement transparent, 100 % = entièrement opaque. S'applique uniquement au fond, pas au contenu.",
      background_blur: "Floute ce qui se trouve derrière la carte (utile pour une carte transparente sur un fond de tableau de bord).",
      background_image: "Téléversez une image, ou indiquez en YAML une URL comme /local/screen.jpg.",
      window_background: "Choisissez le fond derrière la vitre. Avec « Couleur unie » ou « Photo », des champs supplémentaires apparaissent ci-dessous.",
      window_color: "Remplace le ciel bleu derrière la vitre par une couleur unie.",
      window_image: "Par ex. une photo de votre vraie vue.",
      window_image_url: "Alternative au téléversement, par ex. /local/jardin.jpg. Prioritaire sur le téléversement.",
      window_opacity: "Transparence du ciel/de la vue. 0 % = vous voyez le fond de la carte à travers la vitre.",
      window_night_dim: "Assombrit votre couleur/photo quand le soleil est couché.",
    },
  },
  de: {
    open: "Offen", closed: "Geschlossen", opening: "Öffnet", closing: "Schließt",
    unavailable: "Nicht verfügbar", pct_open: "% offen", pct_closed: "% geschlossen",
    sun_on: "Sonne auf dem Fenster", sun_off: "Keine direkte Sonne", night: "Sonne untergegangen",
    up: "Hoch", down: "Runter", stop: "Stopp", not_found: "Entität nicht gefunden",
    sec_window: "Fensterhintergrund", sec_card: "Kartenhintergrund",
    opt_sky: "Himmel (Standard, Tag/Nacht)", opt_color: "Einfarbig", opt_image: "Foto / Bild", opt_transparent: "Transparent (Kartenhintergrund)",
    desc: "Steuere deine Markisen/Rollläden mit einem visuellen Fenster, Ziehbedienung, Schnelltasten und Sonnenanzeige.",
    labels: {
      entity: "Beschattung (cover)", name: "Name", icon: "Symbol", moving_entity: "Bewegungssensor (optional)",
      window_azimuth: "Fensterausrichtung (°)", window_fov: "Sonnenwinkel Fenster (°)", sun_entity: "Sonnen-Entität",
      percent_mode: "Prozent anzeigen als", presets: "Schnelltasten (Position % offen)", step: "Schrittweite beim Ziehen (%)",
      info_entities: "Zusätzliche Sensoren", show_sun: "Sonne anzeigen",
      background_color: "Hintergrundfarbe", background_image: "Hintergrundbild (Upload)",
      background_opacity: "Deckkraft Hintergrund (%)", background_blur: "Unschärfe hinter der Karte (px)",
      window_background: "Was sieht man durch das Fenster?",
      window_color: "Farbe hinter dem Fenster", window_image: "Foto hochladen", window_image_url: "…oder URL des Fotos",
      window_opacity: "Deckkraft Fenster (%)", window_night_dim: "Nachts abdunkeln",
    },
    helpers: {
      window_azimuth: "Richtung, in die das Fenster zeigt: N=0, O=90, S=180, W=270. Leer = keine Sonnenerkennung.",
      background_opacity: "0 % = vollständig transparent, 100 % = vollständig deckend. Gilt nur für den Hintergrund, nicht für den Inhalt.",
      background_blur: "Macht unscharf, was hinter der Karte liegt (praktisch für eine transparente Karte auf einem Dashboard-Hintergrund).",
      background_image: "Lade ein Bild hoch oder gib in YAML eine URL wie /local/screen.jpg an.",
      window_background: "Wähle den Hintergrund hinter dem Glas. Bei „Einfarbig“ oder „Foto“ erscheinen unten zusätzliche Felder.",
      window_color: "Ersetzt den blauen Himmel hinter dem Glas durch eine einfarbige Fläche.",
      window_image: "Z. B. ein Foto deiner echten Aussicht.",
      window_image_url: "Alternative zum Hochladen, z. B. /local/garten.jpg. Hat Vorrang vor dem Upload.",
      window_opacity: "Transparenz des Himmels/der Aussicht. 0 % = du siehst den Kartenhintergrund durch das Glas.",
      window_night_dim: "Dunkelt deine eigene Farbe/dein Foto ab, wenn die Sonne untergegangen ist.",
    },
  },
  pl: {
    open: "Otwarte", closed: "Zamknięte", opening: "Otwieranie", closing: "Zamykanie",
    unavailable: "Niedostępne", pct_open: "% otwarte", pct_closed: "% zamknięte",
    sun_on: "Słońce na oknie", sun_off: "Brak bezpośredniego słońca", night: "Słońce zaszło",
    up: "W górę", down: "W dół", stop: "Stop", not_found: "Nie znaleziono encji",
    sec_window: "Tło okna", sec_card: "Tło karty",
    opt_sky: "Niebo (domyślnie, dzień/noc)", opt_color: "Jednolity kolor", opt_image: "Zdjęcie / obraz", opt_transparent: "Przezroczyste (tło karty)",
    desc: "Steruj roletami zewnętrznymi/żaluzjami za pomocą wizualnego okna, przeciągania, szybkich przycisków i wskaźnika słońca.",
    labels: {
      entity: "Roleta (cover)", name: "Nazwa", icon: "Ikona", moving_entity: "Czujnik ruchu (opcjonalnie)",
      window_azimuth: "Orientacja okna (°)", window_fov: "Kąt słońca okna (°)", sun_entity: "Encja słońca",
      percent_mode: "Pokaż procent jako", presets: "Szybkie przyciski (pozycja % otwarcia)", step: "Krok przeciągania (%)",
      info_entities: "Dodatkowe czujniki", show_sun: "Pokaż słońce",
      background_color: "Kolor tła", background_image: "Obraz tła (przesyłanie)",
      background_opacity: "Krycie tła (%)", background_blur: "Rozmycie za kartą (px)",
      window_background: "Co widać przez okno?",
      window_color: "Kolor za oknem", window_image: "Prześlij zdjęcie", window_image_url: "…lub URL zdjęcia",
      window_opacity: "Krycie okna (%)", window_night_dim: "Przyciemniaj w nocy",
    },
    helpers: {
      window_azimuth: "Kierunek, w którym skierowane jest okno: północ=0, wschód=90, południe=180, zachód=270. Puste = brak wykrywania słońca.",
      background_opacity: "0% = całkowicie przezroczyste, 100% = całkowicie kryjące. Dotyczy tylko tła, nie zawartości.",
      background_blur: "Rozmywa to, co znajduje się za kartą (przydatne dla przezroczystej karty na tle pulpitu).",
      background_image: "Prześlij obraz lub podaj w YAML adres URL, np. /local/screen.jpg.",
      window_background: "Wybierz tło za szybą. Przy „Jednolity kolor” lub „Zdjęcie” poniżej pojawią się dodatkowe pola.",
      window_color: "Zastępuje niebieskie niebo za szybą jednolitym kolorem.",
      window_image: "Np. zdjęcie prawdziwego widoku z okna.",
      window_image_url: "Alternatywa dla przesyłania, np. /local/ogrod.jpg. Ma pierwszeństwo przed przesłanym plikiem.",
      window_opacity: "Przezroczystość nieba/widoku. 0% = przez szybę widać tło karty.",
      window_night_dim: "Przyciemnia własny kolor/zdjęcie, gdy słońce zajdzie.",
    },
  },
  sv: {
    open: "Öppen", closed: "Stängd", opening: "Öppnas", closing: "Stängs",
    unavailable: "Ej tillgänglig", pct_open: "% öppen", pct_closed: "% stängd",
    sun_on: "Sol på fönstret", sun_off: "Ingen direkt sol", night: "Solen har gått ner",
    up: "Upp", down: "Ner", stop: "Stopp", not_found: "Entiteten hittades inte",
    sec_window: "Fönsterbakgrund", sec_card: "Kortbakgrund",
    opt_sky: "Himmel (standard, dag/natt)", opt_color: "Enfärgad", opt_image: "Foto / bild", opt_transparent: "Genomskinlig (kortets bakgrund)",
    desc: "Styr dina markiser/rullgardiner med ett visuellt fönster, dragstyrning, snabbknappar och solindikering.",
    labels: {
      entity: "Markis/rullgardin (cover)", name: "Namn", icon: "Ikon", moving_entity: "Rörelsesensor (valfri)",
      window_azimuth: "Fönstrets riktning (°)", window_fov: "Solvinkel fönster (°)", sun_entity: "Solentitet",
      percent_mode: "Visa procent som", presets: "Snabbknappar (position % öppen)", step: "Steg vid dragning (%)",
      info_entities: "Extra sensorer", show_sun: "Visa sol",
      background_color: "Bakgrundsfärg", background_image: "Bakgrundsbild (uppladdning)",
      background_opacity: "Bakgrundens opacitet (%)", background_blur: "Oskärpa bakom kortet (px)",
      window_background: "Vad ser du genom fönstret?",
      window_color: "Färg bakom fönstret", window_image: "Ladda upp foto", window_image_url: "…eller URL till fotot",
      window_opacity: "Fönstrets opacitet (%)", window_night_dim: "Mörka ner på natten",
    },
    helpers: {
      window_azimuth: "Riktning som fönstret vetter mot: N=0, Ö=90, S=180, V=270. Tomt = ingen soldetektering.",
      background_opacity: "0 % = helt genomskinlig, 100 % = helt täckande. Gäller bara bakgrunden, inte innehållet.",
      background_blur: "Gör det som ligger bakom kortet suddigt (praktiskt för ett genomskinligt kort på en instrumentpanelsbakgrund).",
      background_image: "Ladda upp en bild eller ange i YAML en URL som /local/screen.jpg.",
      window_background: "Välj bakgrund bakom glaset. Med ”Enfärgad” eller ”Foto” visas fler fält nedan.",
      window_color: "Ersätter den blå himlen bakom glaset med en enfärgad yta.",
      window_image: "T.ex. ett foto av din riktiga utsikt.",
      window_image_url: "Alternativ till uppladdning, t.ex. /local/tradgard.jpg. Har företräde framför uppladdningen.",
      window_opacity: "Genomskinlighet för himlen/utsikten. 0 % = du ser kortets bakgrund genom glaset.",
      window_night_dim: "Mörkar ner din egen färg/ditt foto när solen har gått ner.",
    },
  },
  da: {
    open: "Åben", closed: "Lukket", opening: "Åbner", closing: "Lukker",
    unavailable: "Ikke tilgængelig", pct_open: "% åben", pct_closed: "% lukket",
    sun_on: "Sol på vinduet", sun_off: "Ingen direkte sol", night: "Solen er gået ned",
    up: "Op", down: "Ned", stop: "Stop", not_found: "Entitet ikke fundet",
    sec_window: "Vinduesbaggrund", sec_card: "Kortbaggrund",
    opt_sky: "Himmel (standard, dag/nat)", opt_color: "Ensfarvet", opt_image: "Foto / billede", opt_transparent: "Gennemsigtig (kortets baggrund)",
    desc: "Styr dine screens/rullegardiner med et visuelt vindue, trækstyring, hurtigknapper og solindikator.",
    labels: {
      entity: "Screen/rullegardin (cover)", name: "Navn", icon: "Ikon", moving_entity: "Bevægelsessensor (valgfri)",
      window_azimuth: "Vinduets retning (°)", window_fov: "Solvinkel vindue (°)", sun_entity: "Sol-entitet",
      percent_mode: "Vis procent som", presets: "Hurtigknapper (position % åben)", step: "Trin ved træk (%)",
      info_entities: "Ekstra sensorer", show_sun: "Vis sol",
      background_color: "Baggrundsfarve", background_image: "Baggrundsbillede (upload)",
      background_opacity: "Baggrundens dækkevne (%)", background_blur: "Sløring bag kortet (px)",
      window_background: "Hvad ser du gennem vinduet?",
      window_color: "Farve bag vinduet", window_image: "Upload foto", window_image_url: "…eller URL til foto",
      window_opacity: "Vinduets dækkevne (%)", window_night_dim: "Gør mørkere om natten",
    },
    helpers: {
      window_azimuth: "Retning vinduet vender mod: N=0, Ø=90, S=180, V=270. Tom = ingen solregistrering.",
      background_opacity: "0 % = helt gennemsigtig, 100 % = helt dækkende. Gælder kun baggrunden, ikke indholdet.",
      background_blur: "Slører det, der ligger bag kortet (praktisk til et gennemsigtigt kort på en dashboard-baggrund).",
      background_image: "Upload et billede, eller angiv i YAML en URL som /local/screen.jpg.",
      window_background: "Vælg baggrunden bag glasset. Ved »Ensfarvet« eller »Foto« vises ekstra felter nedenfor.",
      window_color: "Erstatter den blå himmel bag glasset med en ensfarvet flade.",
      window_image: "F.eks. et foto af din rigtige udsigt.",
      window_image_url: "Alternativ til upload, f.eks. /local/have.jpg. Har forrang for uploadet.",
      window_opacity: "Gennemsigtighed for himlen/udsigten. 0 % = du ser kortets baggrund gennem glasset.",
      window_night_dim: "Gør din egen farve/dit foto mørkere, når solen er gået ned.",
    },
  },
  nb: {
    open: "Åpen", closed: "Lukket", opening: "Åpner", closing: "Lukker",
    unavailable: "Utilgjengelig", pct_open: "% åpen", pct_closed: "% lukket",
    sun_on: "Sol på vinduet", sun_off: "Ingen direkte sol", night: "Solen har gått ned",
    up: "Opp", down: "Ned", stop: "Stopp", not_found: "Fant ikke entiteten",
    sec_window: "Vindusbakgrunn", sec_card: "Kortbakgrunn",
    opt_sky: "Himmel (standard, dag/natt)", opt_color: "Ensfarget", opt_image: "Foto / bilde", opt_transparent: "Gjennomsiktig (kortets bakgrunn)",
    desc: "Styr screens/rullegardiner med et visuelt vindu, drastyring, hurtigknapper og solindikator.",
    labels: {
      entity: "Screen/rullegardin (cover)", name: "Navn", icon: "Ikon", moving_entity: "Bevegelsessensor (valgfri)",
      window_azimuth: "Vinduets retning (°)", window_fov: "Solvinkel vindu (°)", sun_entity: "Sol-entitet",
      percent_mode: "Vis prosent som", presets: "Hurtigknapper (posisjon % åpen)", step: "Steg ved draging (%)",
      info_entities: "Ekstra sensorer", show_sun: "Vis sol",
      background_color: "Bakgrunnsfarge", background_image: "Bakgrunnsbilde (opplasting)",
      background_opacity: "Bakgrunnens dekkevne (%)", background_blur: "Uskarphet bak kortet (px)",
      window_background: "Hva ser du gjennom vinduet?",
      window_color: "Farge bak vinduet", window_image: "Last opp bilde", window_image_url: "…eller URL til bildet",
      window_opacity: "Vinduets dekkevne (%)", window_night_dim: "Gjør mørkere om natten",
    },
    helpers: {
      window_azimuth: "Retningen vinduet vender mot: N=0, Ø=90, S=180, V=270. Tomt = ingen solregistrering.",
      background_opacity: "0 % = helt gjennomsiktig, 100 % = helt dekkende. Gjelder bare bakgrunnen, ikke innholdet.",
      background_blur: "Gjør det som ligger bak kortet uskarpt (nyttig for et gjennomsiktig kort på en dashbord-bakgrunn).",
      background_image: "Last opp et bilde, eller angi i YAML en URL som /local/screen.jpg.",
      window_background: "Velg bakgrunnen bak glasset. Med «Ensfarget» eller «Foto» vises flere felt nedenfor.",
      window_color: "Erstatter den blå himmelen bak glasset med en ensfarget flate.",
      window_image: "F.eks. et bilde av den ekte utsikten din.",
      window_image_url: "Alternativ til opplasting, f.eks. /local/hage.jpg. Har forrang foran opplastingen.",
      window_opacity: "Gjennomsiktighet for himmelen/utsikten. 0 % = du ser kortets bakgrunn gjennom glasset.",
      window_night_dim: "Gjør din egen farge/ditt bilde mørkere når solen har gått ned.",
    },
  },
  es: {
    open: "Abierto", closed: "Cerrado", opening: "Abriendo", closing: "Cerrando",
    unavailable: "No disponible", pct_open: "% abierto", pct_closed: "% cerrado",
    sun_on: "Sol en la ventana", sun_off: "Sin sol directo", night: "Sol puesto",
    up: "Subir", down: "Bajar", stop: "Parar", not_found: "Entidad no encontrada",
    sec_window: "Fondo de la ventana", sec_card: "Fondo de la tarjeta",
    opt_sky: "Cielo (predeterminado, día/noche)", opt_color: "Color sólido", opt_image: "Foto / imagen", opt_transparent: "Transparente (fondo de la tarjeta)",
    desc: "Controla tus estores/persianas con una ventana visual, control por arrastre, botones rápidos e indicación del sol.",
    labels: {
      entity: "Estor (cover)", name: "Nombre", icon: "Icono", moving_entity: "Sensor de movimiento (opcional)",
      window_azimuth: "Orientación de la ventana (°)", window_fov: "Ángulo solar de la ventana (°)", sun_entity: "Entidad del sol",
      percent_mode: "Mostrar porcentaje como", presets: "Botones rápidos (posición % abierto)", step: "Paso al arrastrar (%)",
      info_entities: "Sensores adicionales", show_sun: "Mostrar sol",
      background_color: "Color de fondo", background_image: "Imagen de fondo (subir)",
      background_opacity: "Opacidad del fondo (%)", background_blur: "Desenfoque detrás de la tarjeta (px)",
      window_background: "¿Qué se ve por la ventana?",
      window_color: "Color detrás de la ventana", window_image: "Subir foto", window_image_url: "…o URL de la foto",
      window_opacity: "Opacidad de la ventana (%)", window_night_dim: "Oscurecer de noche",
    },
    helpers: {
      window_azimuth: "Dirección hacia la que mira la ventana: N=0, E=90, S=180, O=270. Vacío = sin detección del sol.",
      background_opacity: "0 % = totalmente transparente, 100 % = totalmente opaco. Solo afecta al fondo, no al contenido.",
      background_blur: "Desenfoca lo que hay detrás de la tarjeta (útil para una tarjeta transparente sobre un fondo de panel).",
      background_image: "Sube una imagen o indica en YAML una URL como /local/screen.jpg.",
      window_background: "Elige el fondo detrás del cristal. Con «Color sólido» o «Foto» aparecen campos adicionales abajo.",
      window_color: "Sustituye el cielo azul detrás del cristal por un color sólido.",
      window_image: "P. ej. una foto de tu vista real.",
      window_image_url: "Alternativa a subir, p. ej. /local/jardin.jpg. Tiene prioridad sobre la subida.",
      window_opacity: "Transparencia del cielo/la vista. 0 % = ves el fondo de la tarjeta a través del cristal.",
      window_night_dim: "Oscurece tu color/foto cuando el sol se ha puesto.",
    },
  },
  it: {
    open: "Aperto", closed: "Chiuso", opening: "In apertura", closing: "In chiusura",
    unavailable: "Non disponibile", pct_open: "% aperto", pct_closed: "% chiuso",
    sun_on: "Sole sulla finestra", sun_off: "Nessun sole diretto", night: "Sole tramontato",
    up: "Su", down: "Giù", stop: "Stop", not_found: "Entità non trovata",
    sec_window: "Sfondo finestra", sec_card: "Sfondo scheda",
    opt_sky: "Cielo (predefinito, giorno/notte)", opt_color: "Tinta unita", opt_image: "Foto / immagine", opt_transparent: "Trasparente (sfondo della scheda)",
    desc: "Controlla le tue tende solari/tapparelle con una finestra visiva, trascinamento, pulsanti rapidi e indicazione del sole.",
    labels: {
      entity: "Tenda (cover)", name: "Nome", icon: "Icona", moving_entity: "Sensore di movimento (opzionale)",
      window_azimuth: "Orientamento finestra (°)", window_fov: "Angolo solare finestra (°)", sun_entity: "Entità sole",
      percent_mode: "Mostra percentuale come", presets: "Pulsanti rapidi (posizione % aperto)", step: "Passo di trascinamento (%)",
      info_entities: "Sensori aggiuntivi", show_sun: "Mostra sole",
      background_color: "Colore di sfondo", background_image: "Immagine di sfondo (caricamento)",
      background_opacity: "Opacità sfondo (%)", background_blur: "Sfocatura dietro la scheda (px)",
      window_background: "Cosa si vede dalla finestra?",
      window_color: "Colore dietro la finestra", window_image: "Carica foto", window_image_url: "…o URL della foto",
      window_opacity: "Opacità finestra (%)", window_night_dim: "Scurisci di notte",
    },
    helpers: {
      window_azimuth: "Direzione verso cui guarda la finestra: N=0, E=90, S=180, O=270. Vuoto = nessun rilevamento del sole.",
      background_opacity: "0% = completamente trasparente, 100% = completamente opaco. Vale solo per lo sfondo, non per il contenuto.",
      background_blur: "Sfoca ciò che si trova dietro la scheda (utile per una scheda trasparente su uno sfondo della dashboard).",
      background_image: "Carica un'immagine o imposta in YAML un URL come /local/screen.jpg.",
      window_background: "Scegli lo sfondo dietro il vetro. Con «Tinta unita» o «Foto» compaiono altri campi qui sotto.",
      window_color: "Sostituisce il cielo azzurro dietro il vetro con una tinta unita.",
      window_image: "Ad es. una foto della tua vista reale.",
      window_image_url: "Alternativa al caricamento, ad es. /local/giardino.jpg. Ha la precedenza sul caricamento.",
      window_opacity: "Trasparenza del cielo/della vista. 0% = vedi lo sfondo della scheda attraverso il vetro.",
      window_night_dim: "Scurisce il tuo colore/la tua foto quando il sole è tramontato.",
    },
  },
};

// Taal bepalen uit HA (hass.locale), met fallback naar de browser. Noors: no/nn → nb.
const SSC_LANG_ALIAS = { no: "nb", nn: "nb" };
const sscLang = (hass) => {
  let raw = hass?.locale?.language || hass?.language;
  if (!raw) {
    try { raw = JSON.parse(localStorage.getItem("selectedLanguage") || "null"); } catch (e) { raw = null; }
  }
  raw = String(raw || navigator.language || "en").toLowerCase();
  const base = raw.split("-")[0];
  const lang = SSC_LANG_ALIAS[base] || base;
  return SSC_I18N[lang] ? lang : "en";
};
const sscT = (hass, key) => SSC_I18N[sscLang(hass)][key] ?? SSC_I18N.en[key] ?? key;

const F_OPEN = 1, F_CLOSE = 2, F_SETPOS = 4, F_STOP = 8;

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const SSC_WINDOW_MODES = ["sky", "color", "image", "transparent"];
// Achtergrond van het raam: expliciet via window_background, anders afgeleid uit oudere opties.
const sscWindowMode = (c) => {
  if (SSC_WINDOW_MODES.includes(c.window_background)) return c.window_background;
  if (c.window_image || c.window_image_url) return "image";
  if (c.window_color) return "color";
  return "sky";
};

class SolarScreenCard extends HTMLElement {
  static getConfigElement() { return document.createElement("solar-screen-card-editor"); }

  static getStubConfig(hass) {
    const cover = Object.keys(hass.states).find((e) => e.startsWith("cover."));
    return { entity: cover || "", presets: [0, 50, 100] };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error("Please define a cover entity");
    if (!String(config.entity).startsWith("cover.")) throw new Error("Entity must be a cover");
    this._config = {
      sun_entity: "sun.sun",
      window_fov: 90,
      show_sun: true,
      percent_mode: "open",
      step: 5,
      presets: [0, 50, 100],
      ...config,
    };
    this._config.presets = (this._config.presets || []).map(Number).filter((n) => !isNaN(n));
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    const lang = sscLang(hass);
    if (this._lang && this._lang !== lang) this._built = false;
    this._lang = lang;
    this._hass = hass;
    this._render();
  }

  getCardSize() { return 5; }
  getGridOptions() { return { columns: 6, rows: "auto", min_columns: 4, min_rows: 4 }; }

  _t(key) { return sscT(this._hass, key); }

  _fmtPct(pos) {
    if (this._config.percent_mode === "closed") return `${100 - pos}${this._t("pct_closed")}`;
    return `${pos}${this._t("pct_open")}`;
  }

  _build() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>${SolarScreenCard.styles}</style>
      <ha-card>
        <div class="bg" id="bg" hidden></div>
        <div class="head">
          <div class="icon-wrap"><ha-icon id="icon" icon="mdi:blinds"></ha-icon></div>
          <div class="titles">
            <div class="name" id="name"></div>
            <div class="status" id="status"></div>
          </div>
          <div class="sunbadge" id="sunbadge" hidden><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
        </div>
        <div class="body">
          <div class="window" id="window" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100">
            <div class="sky" id="sky"></div>
            <div class="sun" id="sun"></div>
            <div class="mullion"></div>
            <div class="fabric" id="fabric"><div class="bar"></div></div>
            <div class="bubble" id="bubble"></div>
          </div>
          <div class="side">
            <div class="pct" id="pct"></div>
            <div class="buttons">
              <button id="up" title=""><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button id="stop" title=""><ha-icon icon="mdi:stop"></ha-icon></button>
              <button id="down" title=""><ha-icon icon="mdi:arrow-down"></ha-icon></button>
            </div>
          </div>
        </div>
        <div class="presets" id="presets"></div>
        <div class="info" id="info"></div>
      </ha-card>`;
    const $ = (id) => this.shadowRoot.getElementById(id);
    this._el = {
      icon: $("icon"), name: $("name"), status: $("status"), sunbadge: $("sunbadge"),
      win: $("window"), sky: $("sky"), sun: $("sun"), fabric: $("fabric"), bubble: $("bubble"),
      pct: $("pct"), up: $("up"), stop: $("stop"), down: $("down"),
      presets: $("presets"), info: $("info"), bg: $("bg"), card: this.shadowRoot.querySelector("ha-card"),
    };
    this._el.up.title = this._t("up");
    this._el.stop.title = this._t("stop");
    this._el.down.title = this._t("down");
    this._el.up.addEventListener("click", () => this._call("open_cover"));
    this._el.down.addEventListener("click", () => this._call("close_cover"));
    this._el.stop.addEventListener("click", () => { this._target = null; this._call("stop_cover"); });
    this._el.name.addEventListener("click", () => this._moreInfo(this._config.entity));
    this._el.icon.parentElement.addEventListener("click", () => this._moreInfo(this._config.entity));
    this._bindDrag();

    this._el.presets.innerHTML = this._config.presets.map((p) => {
      const p2 = clamp(Math.round(p), 0, 100);
      const label = p2 === 100 ? this._t("open") : p2 === 0 ? this._t("closed") : this._fmtPct(p2).replace(/ .*/, "") ;
      return `<button class="chip" data-pos="${p2}">${esc(label)}</button>`;
    }).join("");
    this._el.presets.hidden = !this._config.presets.length;
    this._el.presets.querySelectorAll(".chip").forEach((b) =>
      b.addEventListener("click", () => this._setPos(Number(b.dataset.pos))));

    this._applyBackground();
    this._applyWindowBackground();
    this._built = true;
  }

  _applyBackground() {
    const c = this._config, card = this._el.card, bg = this._el.bg;
    let col = c.background_color;
    if (Array.isArray(col)) col = col.length >= 3 ? `rgb(${col.slice(0, 3).join(",")})` : null;
    let img = c.background_image;
    if (img && typeof img === "object") img = img.url || img.media_content_id || null;
    const hasOp = c.background_opacity !== undefined && c.background_opacity !== null && c.background_opacity !== "";
    const op = hasOp ? clamp(Number(c.background_opacity), 0, 100) : 100;
    const blur = clamp(Number(c.background_blur) || 0, 0, 40);
    const custom = !!(col || img || op !== 100 || blur);
    card.classList.toggle("custom-bg", custom);
    bg.hidden = !custom;
    const filter = blur ? `blur(${blur}px)` : "";
    card.style.backdropFilter = filter;
    card.style.webkitBackdropFilter = filter;
    if (!custom) return;
    bg.style.backgroundColor = col || "var(--ha-card-background, var(--card-background-color, #fff))";
    bg.style.backgroundImage = img ? `url("${String(img).replace(/["\\()]/g, (m) => encodeURIComponent(m))}")` : "none";
    bg.style.opacity = String(op / 100);
  }

  _applyWindowBackground() {
    const c = this._config, sky = this._el.sky;
    const mode = sscWindowMode(c);
    let col = c.window_color;
    if (Array.isArray(col)) col = col.length >= 3 ? `rgb(${col.slice(0, 3).join(",")})` : null;
    else if (typeof col !== "string" || !col.trim()) col = null;
    let img = c.window_image_url || c.window_image;
    if (img && typeof img === "object") img = img.url || img.media_content_id || null;
    const hasOp = c.window_opacity !== undefined && c.window_opacity !== null && c.window_opacity !== "";
    const op = hasOp ? clamp(Number(c.window_opacity), 0, 100) : 100;
    const custom = mode !== "sky";
    const imgCss = (u) => `url("${String(u).replace(/["\\()]/g, (m) => encodeURIComponent(m))}")`;
    sky.classList.toggle("custom", custom);
    sky.classList.toggle("nodim", c.window_night_dim === false);
    if (mode === "color") {
      sky.style.backgroundColor = col || "#2b3a45";
      sky.style.backgroundImage = "none";
    } else if (mode === "image") {
      sky.style.backgroundColor = col || "#2b3a45";
      sky.style.backgroundImage = img ? imgCss(img) : "none";
    } else if (mode === "transparent") {
      sky.style.backgroundColor = "transparent";
      sky.style.backgroundImage = "none";
    } else {
      sky.style.backgroundColor = "";
      sky.style.backgroundImage = "";
    }
    sky.style.opacity = mode === "transparent" ? "1" : String(op / 100);
  }

  _bindDrag() {
    const win = this._el.win;
    const posFromEvent = (ev) => {
      const r = win.getBoundingClientRect();
      const cover = clamp((ev.clientY - r.top) / r.height, 0, 1);
      const step = Number(this._config.step) || 1;
      return clamp(Math.round((100 - cover * 100) / step) * step, 0, 100);
    };
    win.addEventListener("pointerdown", (ev) => {
      if (!this._canSetPos()) return;
      ev.preventDefault();
      win.setPointerCapture(ev.pointerId);
      this._dragging = true;
      this._preview = posFromEvent(ev);
      this._update();
    });
    win.addEventListener("pointermove", (ev) => {
      if (!this._dragging) return;
      this._preview = posFromEvent(ev);
      this._update();
    });
    const end = (ev) => {
      if (!this._dragging) return;
      this._dragging = false;
      const p = this._preview;
      this._preview = null;
      if (ev.type !== "pointercancel" && p != null) this._setPos(p);
      else this._update();
    };
    win.addEventListener("pointerup", end);
    win.addEventListener("pointercancel", end);
    win.addEventListener("keydown", (ev) => {
      if (!this._canSetPos()) return;
      const step = Number(this._config.step) || 5;
      const cur = this._target ?? this._pos();
      let p = null;
      if (ev.key === "ArrowUp" || ev.key === "ArrowRight") p = cur + step;
      if (ev.key === "ArrowDown" || ev.key === "ArrowLeft") p = cur - step;
      if (ev.key === "Home") p = 100;
      if (ev.key === "End") p = 0;
      if (p == null) return;
      ev.preventDefault();
      this._setPos(clamp(p, 0, 100));
    });
  }

  _stateObj() { return this._hass?.states[this._config.entity]; }
  _features() { return Number(this._stateObj()?.attributes?.supported_features || 0); }
  _canSetPos() { return (this._features() & F_SETPOS) && this._available(); }
  _available() { const s = this._stateObj(); return s && s.state !== "unavailable" && s.state !== "unknown"; }

  _pos() {
    const s = this._stateObj();
    if (!s) return 0;
    const p = s.attributes.current_position;
    if (p != null) return Number(p);
    return s.state === "closed" ? 0 : 100;
  }

  _movement() {
    const s = this._stateObj();
    if (s?.state === "opening" || s?.state === "closing") return s.state;
    const m = this._config.moving_entity && this._hass.states[this._config.moving_entity]?.state;
    if (!m) return null;
    const v = m.toLowerCase();
    if (["up", "opening", "open"].includes(v)) return "opening";
    if (["down", "closing", "close"].includes(v)) return "closing";
    return null;
  }

  _sunInfo() {
    const sun = this._hass.states[this._config.sun_entity];
    if (!sun) return null;
    const el = Number(sun.attributes.elevation);
    const az = Number(sun.attributes.azimuth);
    const up = sun.state === "above_horizon" || el > 0;
    let onWindow = null;
    const wa = this._config.window_azimuth;
    if (wa !== undefined && wa !== null && wa !== "" && !isNaN(az)) {
      const diff = Math.abs(((az - Number(wa) + 540) % 360) - 180);
      onWindow = up && el > 0 && diff <= Number(this._config.window_fov || 90) / 2;
    }
    return { up, el, az, onWindow };
  }

  _call(service, data = {}) {
    this._hass.callService("cover", service, { entity_id: this._config.entity, ...data });
  }

  _setPos(pos) {
    if (!this._canSetPos()) {
      if (pos >= 100) this._call("open_cover");
      else if (pos <= 0) this._call("close_cover");
      return;
    }
    this._target = pos;
    clearTimeout(this._targetTimer);
    this._targetTimer = setTimeout(() => { this._target = null; this._update(); }, 90000);
    this._call("set_cover_position", { position: pos });
    this._update();
  }

  _moreInfo(entityId) {
    const ev = new Event("hass-more-info", { bubbles: true, composed: true });
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._built) this._build();
    this._update();
  }

  _update() {
    const e = this._el, c = this._config, s = this._stateObj();
    if (!s) {
      e.name.textContent = c.name || c.entity;
      e.status.textContent = this._t("not_found");
      this.shadowRoot.querySelector("ha-card").classList.add("na");
      return;
    }
    const avail = this._available();
    const pos = this._pos();
    if (this._target != null && Math.abs(this._target - pos) <= 1) { this._target = null; clearTimeout(this._targetTimer); }
    const shown = this._preview ?? this._target ?? pos;
    const moving = this._movement();
    const f = this._features();

    this.shadowRoot.querySelector("ha-card").classList.toggle("na", !avail);
    e.name.textContent = c.name || s.attributes.friendly_name || c.entity;

    let status;
    if (!avail) status = this._t("unavailable");
    else if (moving) status = this._t(moving) + (this._target != null ? ` → ${this._fmtPct(this._target)}` : "");
    else if (pos >= 100) status = this._t("open");
    else if (pos <= 0) status = this._t("closed");
    else status = this._fmtPct(pos);
    e.status.textContent = status;

    e.icon.setAttribute("icon", c.icon || (pos >= 100 ? "mdi:blinds-open" : "mdi:blinds"));
    e.icon.parentElement.classList.toggle("active", pos < 100);

    // Window visual
    e.fabric.style.height = `${100 - shown}%`;
    e.fabric.classList.toggle("anim", !this._dragging);
    e.win.classList.toggle("moving", !!moving);
    e.win.classList.toggle("disabled", !this._canSetPos());
    e.win.setAttribute("aria-valuenow", String(shown));
    e.win.setAttribute("aria-label", e.name.textContent);

    const showBubble = this._preview != null || (this._target != null && this._target !== pos);
    e.bubble.hidden = !showBubble;
    if (showBubble) {
      e.bubble.textContent = this._fmtPct(shown);
      e.bubble.style.top = `calc(${clamp(100 - shown, 6, 94)}% - 12px)`;
    }

    e.pct.textContent = c.percent_mode === "closed" ? `${100 - shown}%` : `${shown}%`;
    e.pct.title = this._fmtPct(shown);

    // Sun
    const sun = c.show_sun ? this._sunInfo() : null;
    // Night: default sky switches gradient (only with show_sun); a custom color/photo gets dimmed
    const sunNow = sun || this._sunInfo();
    const isNight = !!sunNow && !sunNow.up;
    e.sky.classList.toggle("night", isNight && (c.show_sun || e.sky.classList.contains("custom")));
    e.sun.hidden = !sun || !sun.up;
    if (sun && sun.up) {
      const elev = clamp(isNaN(sun.el) ? 30 : sun.el, 0, 70);
      e.sun.style.top = `${clamp(70 - elev, 8, 70)}%`;
      e.sun.classList.toggle("strong", sun.onWindow === true);
    }
    e.sunbadge.hidden = !(sun && sun.onWindow);
    if (sun) {
      e.sunbadge.title = !sun.up ? this._t("night") : sun.onWindow ? this._t("sun_on") : this._t("sun_off");
    }

    // Buttons
    e.up.disabled = !avail || !(f & F_OPEN) || (pos >= 100 && !moving);
    e.down.disabled = !avail || !(f & F_CLOSE) || (pos <= 0 && !moving);
    e.stop.disabled = !avail || !(f & F_STOP);
    e.stop.classList.toggle("hl", !!moving);
    e.presets.querySelectorAll(".chip").forEach((b) => {
      const p = Number(b.dataset.pos);
      b.disabled = !avail;
      b.classList.toggle("on", Math.abs(p - (this._target ?? pos)) <= 2);
    });

    this._renderInfo();
  }

  _renderInfo() {
    const list = this._config.info_entities || [];
    const e = this._el.info;
    e.hidden = !list.length;
    if (!list.length) return;
    const html = list.map((ent) => {
      const id = typeof ent === "string" ? ent : ent.entity;
      const st = this._hass.states[id];
      if (!st) return "";
      const val = this._hass.formatEntityState ? this._hass.formatEntityState(st)
        : `${st.state}${st.attributes.unit_of_measurement ? " " + st.attributes.unit_of_measurement : ""}`;
      const name = (typeof ent === "object" && ent.name) || st.attributes.friendly_name || id;
      const icon = (typeof ent === "object" && ent.icon) || st.attributes.icon || "";
      return `<div class="inf" data-e="${esc(id)}" title="${esc(name)}">` +
        (icon ? `<ha-icon icon="${esc(icon)}"></ha-icon>` : `<ha-state-icon></ha-state-icon>`) +
        `<span class="v">${esc(val)}</span><span class="n">${esc(name)}</span></div>`;
    }).join("");
    if (html !== this._infoHtml) {
      this._infoHtml = html;
      e.innerHTML = html;
      e.querySelectorAll(".inf").forEach((d) => {
        const si = d.querySelector("ha-state-icon");
        if (si) { si.hass = this._hass; si.stateObj = this._hass.states[d.dataset.e]; }
        d.addEventListener("click", () => this._moreInfo(d.dataset.e));
      });
    }
  }
}

SolarScreenCard.styles = `
  :host { display: block; }
  ha-card { padding: 16px; display: flex; flex-direction: column; gap: 14px; height: 100%; box-sizing: border-box; position: relative; }
  ha-card.custom-bg { background: transparent; overflow: hidden; }
  ha-card > :not(.bg) { position: relative; z-index: 1; }
  .bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: inherit;
    background-size: cover; background-position: center; background-repeat: no-repeat; }
  .bg[hidden] { display: none; }
  ha-card.na .body, ha-card.na .presets { opacity: .45; }
  .head { display: flex; align-items: center; gap: 12px; }
  .icon-wrap { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; cursor: pointer;
    background: rgba(var(--rgb-secondary-text-color, 114,114,114), .12); color: var(--secondary-text-color); flex: none; transition: .3s; }
  .icon-wrap.active { background: rgba(var(--rgb-amber-color, 255,193,7), .2); color: var(--amber-color, #ffc107); }
  .titles { flex: 1; min-width: 0; }
  .name { font-weight: 500; font-size: 15px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
  .status { font-size: 13px; color: var(--secondary-text-color); }
  .sunbadge { color: var(--amber-color, #ffc107); display: flex; animation: glow 3s ease-in-out infinite; }
  .sunbadge[hidden], .sun[hidden], .bubble[hidden], .presets[hidden], .info[hidden] { display: none; }
  @keyframes glow { 50% { opacity: .55; } }

  .body { display: flex; gap: 16px; align-items: stretch; }
  .window { position: relative; flex: 1; min-height: 170px; border-radius: 10px; overflow: hidden; cursor: ns-resize;
    touch-action: none; outline: none; user-select: none; -webkit-user-select: none;
    border: 5px solid var(--ssc-frame, rgba(var(--rgb-primary-text-color, 33,33,33), .18)); box-sizing: border-box; }
  .window:focus-visible { box-shadow: 0 0 0 2px var(--primary-color); }
  .window.disabled { cursor: default; }
  .sky { position: absolute; inset: 0; background: linear-gradient(180deg, #7ec3f0 0%, #bfe3fa 65%, #e8f4e0 100%); transition: background 1s; }
  .sky.night { background: linear-gradient(180deg, #0f1c3a 0%, #24365f 70%, #31415f 100%); }
  .sky.custom { background-size: cover; background-position: center; background-repeat: no-repeat; }
  .sky::after { content: ""; position: absolute; inset: 0; background: rgba(8, 16, 40, .6); opacity: 0; transition: opacity 1s; }
  .sky.custom.night:not(.nodim)::after { opacity: 1; }
  .sun { position: absolute; right: 18%; z-index: 1; width: 26px; height: 26px; border-radius: 50%; background: #ffd34d;
    box-shadow: 0 0 14px 4px rgba(255, 205, 60, .55); transition: top 1s; }
  .sun.strong { box-shadow: 0 0 26px 12px rgba(255, 190, 40, .75); }
  .mullion { z-index: 1; position: absolute; top: 0; bottom: 0; left: 50%; width: 4px; margin-left: -2px;
    background: var(--ssc-frame, rgba(var(--rgb-primary-text-color, 33,33,33), .18)); }
  .fabric { z-index: 2; position: absolute; left: 0; right: 0; top: 0; height: 0;
    background-color: var(--ssc-fabric, #3d4248);
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),
                      repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px);
    opacity: .9; box-shadow: 0 3px 8px rgba(0,0,0,.25); }
  .fabric.anim { transition: height .6s ease; }
  .bar { position: absolute; left: -2px; right: -2px; bottom: -3px; height: 7px; border-radius: 3px; background: var(--ssc-bar, #8a9099); }
  .window.moving .fabric { animation: shimmer 1s linear infinite; }
  @keyframes shimmer { 50% { opacity: .75; } }
  .bubble { z-index: 3; position: absolute; left: 50%; transform: translateX(-50%); padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;
    background: var(--primary-color); color: var(--text-primary-color, #fff); pointer-events: none; white-space: nowrap; }

  .side { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 8px; }
  .pct { font-size: 24px; font-weight: 600; color: var(--primary-text-color); line-height: 1; padding-top: 2px; }
  .buttons { display: flex; flex-direction: column; gap: 8px; }
  button { font: inherit; border: none; cursor: pointer; color: var(--primary-text-color);
    background: rgba(var(--rgb-primary-text-color, 33,33,33), .06); transition: background .2s, color .2s; }
  button:hover:not(:disabled) { background: rgba(var(--rgb-primary-color, 3,169,244), .15); }
  button:disabled { opacity: .35; cursor: default; }
  .buttons button { width: 44px; height: 40px; border-radius: 12px; display: grid; place-items: center; }
  .buttons button.hl { background: var(--primary-color); color: var(--text-primary-color, #fff); }
  .presets { display: flex; gap: 8px; flex-wrap: wrap; }
  .chip { flex: 1; min-width: 56px; padding: 8px 10px; border-radius: 18px; font-size: 13px; font-weight: 500; }
  .chip.on { background: rgba(var(--rgb-primary-color, 3,169,244), .2); color: var(--primary-color); }
  .info { display: flex; gap: 8px; flex-wrap: wrap; border-top: 1px solid var(--divider-color); padding-top: 12px; }
  .inf { display: flex; align-items: center; gap: 6px; padding: 4px 10px 4px 6px; border-radius: 16px; cursor: pointer; font-size: 13px;
    background: rgba(var(--rgb-primary-text-color, 33,33,33), .05); color: var(--primary-text-color); --mdc-icon-size: 18px; }
  .inf ha-icon, .inf ha-state-icon { color: var(--secondary-text-color); }
  .inf .v { font-weight: 600; }
  .inf .n { color: var(--secondary-text-color); max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

customElements.define("solar-screen-card", SolarScreenCard);

/* ---------- Visual editor ---------- */
class SolarScreenCardEditor extends HTMLElement {
  setConfig(config) { this._config = config; this._renderForm(); }
  set hass(hass) {
    const langChanged = this._lang !== sscLang(hass);
    this._hass = hass;
    this._lang = sscLang(hass);
    if (this._form && !langChanged) this._form.hass = hass; else this._renderForm();
  }

  _tr() { return SSC_I18N[sscLang(this._hass)]; }

  _schema() {
    const t = this._tr();
    const pct = [0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100].map((v) => ({ value: String(v), label: `${v}%` }));
    return [
      { name: "entity", required: true, selector: { entity: { domain: "cover" } } },
      { type: "grid", name: "", schema: [
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
      ] },
      { name: "moving_entity", selector: { entity: { domain: "sensor" } } },
      { name: "presets", selector: { select: { multiple: true, mode: "list", options: pct } } },
      { type: "grid", name: "", schema: [
        { name: "percent_mode", selector: { select: { mode: "dropdown", options: [
          { value: "open", label: t.pct_open.trim() }, { value: "closed", label: t.pct_closed.trim() }] } } },
        { name: "step", selector: { number: { min: 1, max: 25, mode: "box" } } },
      ] },
      { name: "show_sun", selector: { boolean: {} } },
      { type: "grid", name: "", schema: [
        { name: "window_azimuth", selector: { number: { min: 0, max: 359, mode: "box", unit_of_measurement: "°" } } },
        { name: "window_fov", selector: { number: { min: 10, max: 180, mode: "box", unit_of_measurement: "°" } } },
      ] },
      { name: "info_entities", selector: { entity: { multiple: true } } },
      { type: "expandable", name: "", title: t.sec_window, icon: "mdi:window-closed-variant", flatten: true, expanded: true,
        schema: this._windowSchema() },
      { type: "expandable", name: "", title: t.sec_card, icon: "mdi:palette", flatten: true, schema: [
        { name: "background_color", selector: { color_rgb: {} } },
        { name: "background_image", selector: { image: {} } },
        { name: "background_opacity", selector: { number: { min: 0, max: 100, step: 5, mode: "slider", unit_of_measurement: "%" } } },
        { name: "background_blur", selector: { number: { min: 0, max: 20, step: 1, mode: "slider", unit_of_measurement: "px" } } },
      ] },
    ];
  }

  _windowSchema() {
    const mode = sscWindowMode(this._config || {});
    const t = this._tr();
    const s = [
      { name: "window_background", selector: { select: { mode: "dropdown", options: [
        { value: "sky", label: t.opt_sky },
        { value: "color", label: t.opt_color },
        { value: "image", label: t.opt_image },
        { value: "transparent", label: t.opt_transparent },
      ] } } },
    ];
    if (mode === "color") s.push({ name: "window_color", selector: { color_rgb: {} } });
    if (mode === "image") {
      s.push({ name: "window_image", selector: { image: {} } });
      s.push({ name: "window_image_url", selector: { text: {} } });
    }
    if (mode === "color" || mode === "image") {
      s.push({ name: "window_opacity", selector: { number: { min: 0, max: 100, step: 5, mode: "slider", unit_of_measurement: "%" } } });
      s.push({ name: "window_night_dim", selector: { boolean: {} } });
    }
    return s;
  }

  _renderForm() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => this._tr().labels[s.name] || SSC_I18N.en.labels[s.name] || s.name;
      this._form.computeHelper = (s) => this._tr().helpers[s.name] || SSC_I18N.en.helpers[s.name];
      this._form.addEventListener("value-changed", (ev) => {
        const cfg = { ...ev.detail.value };
        if (Array.isArray(cfg.presets)) cfg.presets = cfg.presets.map(Number).sort((a, b) => b - a);
        Object.keys(cfg).forEach((k) => (cfg[k] === "" || cfg[k] === undefined || cfg[k] === null) && delete cfg[k]);
        // Standaardwaarde niet in YAML wegschrijven als er geen eigen raam-achtergrond is
        if (cfg.window_background === "sky" && !this._config?.window_background) delete cfg.window_background;
        const modeChanged = sscWindowMode(cfg) !== sscWindowMode(this._config || {});
        this._config = cfg;
        if (modeChanged) this._renderForm();
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    const data = { show_sun: true, percent_mode: "open", step: 5, window_fov: 90, background_opacity: 100, background_blur: 0, window_opacity: 100, window_night_dim: true, ...this._config };
    data.window_background = sscWindowMode(this._config);
    if (Array.isArray(data.presets)) data.presets = data.presets.map(String);
    this._form.hass = this._hass;
    this._form.data = data;
    this._form.schema = this._schema();
  }
}
customElements.define("solar-screen-card-editor", SolarScreenCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "solar-screen-card",
  name: "Solar Screen Card",
  description: sscT(null, "desc"),
  preview: true,
  documentationURL: "https://github.com/jodewee/solar-screen-card",
});

console.info(`%c SOLAR-SCREEN-CARD %c v${SSC_VERSION} `, "background:#f9a825;color:#000;font-weight:700", "background:#3d4248;color:#fff");