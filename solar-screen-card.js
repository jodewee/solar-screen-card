/*! solar-screen-card | MIT | https://github.com/jodewee/solar-screen-card */
const SSC_VERSION = "2026.11.13.2";

const SSC_I18N = {
  nl: {
    open: "Open", closed: "Dicht", opening: "Gaat open", closing: "Gaat dicht",
    unavailable: "Niet beschikbaar", pct_open: "% open", pct_closed: "% dicht",
    sun_on: "Zon op het raam", sun_off: "Geen directe zon", night: "Zon onder",
    up: "Omhoog", down: "Omlaag", stop: "Stop", not_found: "Entiteit niet gevonden",
  },
  en: {
    open: "Open", closed: "Closed", opening: "Opening", closing: "Closing",
    unavailable: "Unavailable", pct_open: "% open", pct_closed: "% closed",
    sun_on: "Sun on the window", sun_off: "No direct sun", night: "Sun is down",
    up: "Up", down: "Down", stop: "Stop", not_found: "Entity not found",
  },
};

const F_OPEN = 1, F_CLOSE = 2, F_SETPOS = 4, F_STOP = 8;

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

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
    this._hass = hass;
    this._render();
  }

  getCardSize() { return 5; }
  getGridOptions() { return { columns: 6, rows: "auto", min_columns: 4, min_rows: 4 }; }

  _t(key) {
    const lang = (this._hass?.locale?.language || this._hass?.language || "en").split("-")[0];
    return (SSC_I18N[lang] || SSC_I18N.en)[key] || SSC_I18N.en[key] || key;
  }

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
            <div class="sky" id="sky"><div class="sun" id="sun"></div></div>
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
    e.sky.classList.toggle("night", !!sun && !sun.up);
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
  .sun { position: absolute; right: 18%; width: 26px; height: 26px; border-radius: 50%; background: #ffd34d;
    box-shadow: 0 0 14px 4px rgba(255, 205, 60, .55); transition: top 1s; }
  .sun.strong { box-shadow: 0 0 26px 12px rgba(255, 190, 40, .75); }
  .mullion { position: absolute; top: 0; bottom: 0; left: 50%; width: 4px; margin-left: -2px;
    background: var(--ssc-frame, rgba(var(--rgb-primary-text-color, 33,33,33), .18)); }
  .fabric { position: absolute; left: 0; right: 0; top: 0; height: 0;
    background-color: var(--ssc-fabric, #3d4248);
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),
                      repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px);
    opacity: .9; box-shadow: 0 3px 8px rgba(0,0,0,.25); }
  .fabric.anim { transition: height .6s ease; }
  .bar { position: absolute; left: -2px; right: -2px; bottom: -3px; height: 7px; border-radius: 3px; background: var(--ssc-bar, #8a9099); }
  .window.moving .fabric { animation: shimmer 1s linear infinite; }
  @keyframes shimmer { 50% { opacity: .75; } }
  .bubble { position: absolute; left: 50%; transform: translateX(-50%); padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;
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
const SSC_LABELS = {
  entity: "Screen (cover)", name: "Naam", icon: "Icoon", moving_entity: "Beweging-sensor (optioneel)",
  window_azimuth: "Oriëntatie raam (°)", window_fov: "Zonhoek raam (°)", sun_entity: "Zon-entiteit",
  percent_mode: "Percentage tonen als", presets: "Snelknoppen (positie % open)", step: "Stapgrootte slepen (%)",
  info_entities: "Extra sensoren", show_sun: "Zon tonen",
  background_color: "Achtergrondkleur", background_image: "Achtergrondafbeelding (upload)",
  background_opacity: "Dekking achtergrond (%)", background_blur: "Vervaging achter kaart (px)",
};

class SolarScreenCardEditor extends HTMLElement {
  setConfig(config) { this._config = config; this._renderForm(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._renderForm(); }

  _schema() {
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
          { value: "open", label: "% open" }, { value: "closed", label: "% dicht" }] } } },
        { name: "step", selector: { number: { min: 1, max: 25, mode: "box" } } },
      ] },
      { name: "show_sun", selector: { boolean: {} } },
      { type: "grid", name: "", schema: [
        { name: "window_azimuth", selector: { number: { min: 0, max: 359, mode: "box", unit_of_measurement: "°" } } },
        { name: "window_fov", selector: { number: { min: 10, max: 180, mode: "box", unit_of_measurement: "°" } } },
      ] },
      { name: "info_entities", selector: { entity: { multiple: true } } },
      { type: "expandable", name: "", title: "Achtergrond", icon: "mdi:palette", flatten: true, schema: [
        { name: "background_color", selector: { color_rgb: {} } },
        { name: "background_image", selector: { image: {} } },
        { name: "background_opacity", selector: { number: { min: 0, max: 100, step: 5, mode: "slider", unit_of_measurement: "%" } } },
        { name: "background_blur", selector: { number: { min: 0, max: 20, step: 1, mode: "slider", unit_of_measurement: "px" } } },
      ] },
    ];
  }

  _renderForm() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => SSC_LABELS[s.name] || s.name;
      this._form.computeHelper = (s) => ({
        window_azimuth: "Richting waarin het raam kijkt: N=0, O=90, Z=180, W=270. Leeg = geen zon-detectie.",
        background_opacity: "0% = volledig transparant, 100% = volledig dekkend. Geldt enkel voor de achtergrond, niet voor de inhoud.",
        background_blur: "Vervaagt wat achter de kaart zit (handig bij een transparante kaart op een dashboard-achtergrond).",
        background_image: "Upload een afbeelding, of zet in YAML een URL zoals /local/screen.jpg.",
      })[s.name];
      this._form.addEventListener("value-changed", (ev) => {
        const cfg = { ...ev.detail.value };
        if (Array.isArray(cfg.presets)) cfg.presets = cfg.presets.map(Number).sort((a, b) => b - a);
        Object.keys(cfg).forEach((k) => (cfg[k] === "" || cfg[k] === undefined) && delete cfg[k]);
        this._config = cfg;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    const data = { show_sun: true, percent_mode: "open", step: 5, window_fov: 90, background_opacity: 100, background_blur: 0, ...this._config };
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
  description: "Bedien je solar-screens/rolluiken met een visueel raam, sleepbediening, snelknoppen en zon-indicatie.",
  preview: true,
  documentationURL: "https://github.com/jodewee/solar-screen-card",
});

console.info(`%c SOLAR-SCREEN-CARD %c v${SSC_VERSION} `, "background:#f9a825;color:#000;font-weight:700", "background:#3d4248;color:#fff");
