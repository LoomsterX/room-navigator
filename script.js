const layout = document.querySelector(".layout");

function deselect() {
  selected = null;
  layout.classList.remove("has-selection");
  document.querySelectorAll(".room").forEach(g => g.classList.remove("selected"));
  if (list) list.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", "false"));
  panel.innerHTML = "";
}

const ROOMS = [
  {
    id: "lagring", name: "Lagring", type: "Lager", utility: true,
    use: "Lagring av hygieneprodukter.",
    gear: ["Såpe", "Dopapir"],
    shape: {rect: [810, 560, 180, 62]}
  }, {
    id: "printer", name: "Printerrom", type: "Lager og printerrom", utility: true,
    use: "Utskrift og lagring.",
    gear: ["Printer", "Sesongpynt", "Rollups etc."],
    shape: {rect: [518, 455, 57, 167]}, vertical: true
  },
  {
    id: "frigg", name: "Frigg", type: "Stillerom", cap: "1", bookable: true,
    use: "Fokusarbeid og digitale møter når du trenger å sitte alene.",
    gear: ["Skjerm", "Dockingstasjon", "Webkamera"],
    lore: "Odins hustru og dronningen i Åsgard. Frigg vet alles skjebne, men forteller den aldri til noen – et passende navn på et stille rom.",
    shape: {rect: [205, 340, 88, 66]}
  },
  {
    id: "hugin", name: "Hugin", type: "Teamrom", cap: "1", bookable: false,
    use: "Drop-in-plass for én person.",
    gear: ["Bord og stol"],
    lore: "En av Odins to ravner, og navnet betyr «tanke». Hugin og Munin flyr ut over verden hver dag og kommer tilbake med nytt. De er en duo, akkurat som de to like rommene.",
    shape: {rect: [296, 340, 52, 66]}, vertical: true
  },
  {
    id: "munin", name: "Munin", type: "Teamrom", cap: "1", bookable: false,
    use: "Drop-in-plass for én person.",
    gear: ["Bord og stol"],
    lore: "Odins andre ravn, og navnet betyr «minne». Sammen med Hugin danner den en duo – derfor er de to like rommene oppkalt etter ravnene.",
    shape: {rect: [351, 340, 54, 66]}, vertical: true
  },
  {
    id: "midgard", name: "Midgard", type: "Stillerom", cap: "1", bookable: true,
    use: "Fokusarbeid og digitale møter når du trenger å sitte alene.",
    gear: ["Skjerm", "Dockingstasjon", "Webkamera"],
    lore: "Menneskenes verden, plassert midt blant de ni verdenene og omringet av Midgardsormen.",
    shape: {rect: [408, 340, 107, 66]}
  },
  {
    id: "yggdrasil", name: "Yggdrasil", type: "Møterom", cap: "8", bookable: true,
    use: "Møter for opptil åtte personer, også hybride møter.",
    gear: ["Skjerm", "Videokonferanse", "Whiteboard"],
    lore: "Verdenstreet. Et veldig asketre med greiner og røtter som binder sammen alle de ni verdenene.",
    shape: {rect: [518, 268, 152, 138]}
  },
  {
    id: "heimdall", name: "Heimdall", type: "Prosjektrom", cap: "4", bookable: true,
    use: "Arbeidsrom for prosjektteam, med fire faste arbeidsplasser.",
    gear: ["Skjerm", "4 kontorplasser med 49\" skjerm"],
    lore: "Gudenes vokter ved Bifrost-broen. Han trenger mindre søvn enn en fugl, ser hundre mil i mørket og hører gresset gro.",
    shape: {rect: [673, 268, 157, 138]}
  },
  {
    id: "nidavellir", name: "Nidavellir", type: "Kreativ og sosial sone", cap: "8", bookable: false,
    use: "Workshops, idémyldring, uformelt samarbeid og sosialt samvær. Sonen er åpen mot gangen.",
    gear: ["Skjerm", "Bord", "Dart", "Kreativt utstyr"],
    lore: "Dvergenes rike, knyttet til gruver, smier og verksteder. Her ble gudenes skatter smidd – også Tors hammer.",
    shape: {rect: [833, 268, 160, 138]}
  },
  {
    id: "eir", name: "Eir", type: "Hvilerom", cap: "1", bookable: false,
    use: "Et rolig sted for hvile og pause.",
    gear: ["Stol"],
    lore: "Helbredelsens gudinne.",
    shape: {rect: [360, 462, 105, 78]}
  },
  {
    id: "mimir", name: "Mimir", type: "Lite møterom", cap: "3", bookable: true,
    use: "Korte samtaler og møter i liten gruppe.",
    gear: ["Bord og stoler"],
    lore: "En skikkelse kjent for sin visdom og kunnskap. Odin ofret et øye for å drikke av Mimes brønn.",
    shape: {rect: [360, 543, 105, 79]}
  },
  {
    id: "valhall", name: "Valhall", type: "Kantine og sosial sone", cap: "20–30", bookable: true,
    use: "Lunsj, fellesmøter, fest og feiring – og gaming. Området omfatter både kjøkkensonen og det åpne arealet mellom Sleipnir og Folkvang.",
    gear: ["Kjøkken", "Lerret og projektor", "Sofagruppe", "TV", "PS5", "Nintendo Switch", "Sjakk", "Brettspill"],
    lore: "Odins hall, stedet for fest og feiring. Halvparten av de falne drar til Valhall, resten til Frøya i Folkvang.",
    shape: {poly: "578,455 810,455 810,622 990,622 990,675 750,675 750,815 522,815 522,622 578,622"},
    label: [690, 545]
  },
  {
    id: "sleipnir", name: "Sleipnir", type: "Møterom", cap: "8", bookable: true,
    use: "Møter for opptil åtte personer, også hybride møter.",
    gear: ["Skjerm", "Videokonferanse", "Whiteboard"],
    lore: "Odins åttebeinte hest, den raskeste av alle hester. Den kan løpe over både land, hav og luft.",
    shape: {rect: [360, 676, 160, 139]}
  },
  {
    id: "folkvang", name: "Folkvang", type: "Prosjektrom", cap: "4", bookable: true,
    use: "Arbeidsrom for prosjektteam, med fire faste arbeidsplasser.",
    gear: ["Skjerm", "4 kontorplasser med 49\" skjerm"],
    lore: "Frøyas jorder. Halvparten av de falne havner her, resten i Valhall.",
    shape: {rect: [752, 678, 153, 137]}
  },
  {
    id: "norne", name: "Norne", type: "Lite møterom", cap: "3", bookable: true,
    use: "Små møter og samtaler.",
    gear: ["Skjerm", "Bord og stoler"],
    lore: "Skjebnegudinnene Urd, Verdande og Skuld, som spinner skjebnetrådene ved foten av Yggdrasil.",
    shape: {rect: [910, 712, 80, 103]}
  },
  {
    id: "asgard", name: "Asgard", type: "Lite møterom", cap: "4", bookable: true,
    use: "Små møter for opptil fire personer.",
    gear: ["Skjerm", "Whiteboard", "Bord og stoler"],
    lore: "Stedet gudene bygget for seg selv i Midgard, menneskenes rike.",
    shape: {rect: [1088, 468, 95, 95]}
  }
];

const RUNEMAP = {a: "ᚨ", b: "ᛒ", c: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", h: "ᚺ", i: "ᛁ", j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ", n: "ᚾ", o: "ᛟ", p: "ᛈ", q: "ᚲ", r: "ᚱ", s: "ᛊ", t: "ᛏ", u: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᚲᛊ", y: "ᛁ", z: "ᛉ", "æ": "ᚨ", "ø": "ᛟ", "å": "ᚨ"};
const toRunes = s => [...s.toLowerCase()].map(c => RUNEMAP[c] ?? (c === " " ? " " : "")).join("");
const capText = c => c === "1" ? "1 person" : c + " personer";

const NS = "http://www.w3.org/2000/svg";
const roomsG = document.getElementById("rooms");
const panel = document.getElementById("panel");
const list = document.getElementById("list");
let selected = null;
let filter = "all";

function el(tag, attrs = {}, text) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text != null) e.textContent = text;
  return e;
}

ROOMS.forEach(r => {
  const g = el("g", {
    class: "room " + (r.utility ? "utility" : r.bookable ? "bookable" : "notbookable"),
    tabindex: "0", role: "button", "data-id": r.id,
    "aria-label": r.utility ? `${r.name}, ${r.type.toLowerCase()}` : `${r.name}, ${r.type.toLowerCase()}, ${capText(r.cap)}, ${r.bookable ? "kan bookes" : "kan ikke bookes"}`
  });
  let cx, cy, w, h;
  if (r.shape.rect) {
    const [x, y, rw, rh] = r.shape.rect;
    g.appendChild(el("rect", {class: "shape", x, y, width: rw, height: rh}));
    cx = x + rw / 2; cy = y + rh / 2; w = rw; h = rh;
  } else {
    g.appendChild(el("polygon", {class: "shape", points: r.shape.poly}));
    [cx, cy] = r.label; w = 230; h = 160;
  }
  if (r.vertical) {
    g.appendChild(el("text", {class: "name", x: cx, y: cy + 5, "text-anchor": "middle", "font-size": 15, transform: `rotate(-90 ${cx} ${cy})`}, r.name));
  } else {
    const big = w > 140 && h > 100;
    const fs = r.id === "valhall" ? 34 : big ? 24 : 17;
    g.appendChild(el("text", {class: "name", x: cx, y: cy + (h > 90 ? -2 : 5), "text-anchor": "middle", "font-size": fs}, r.name));
    if (h > 90) {
      g.appendChild(el("text", {class: "rune", x: cx, y: cy + 18, "text-anchor": "middle"}, toRunes(r.name)));
      g.appendChild(el("text", {class: "cap", x: cx, y: cy + 38, "text-anchor": "middle"}, capText(r.cap)));
    }
  }
  g.addEventListener("click", () => select(r.id));
  g.addEventListener("keydown", e => {if (e.key === "Enter" || e.key === " ") {e.preventDefault(); select(r.id);} });
  roomsG.appendChild(g);

  const li = document.createElement("li");
  li.dataset.id = r.id;
  const b = document.createElement("button");
  b.type = "button";
  if (r.utility) b.className = "ut"; else if (!r.bookable) b.className = "nb";
  b.innerHTML = `<span class="rn"></span><span class="rm"></span>`;
  b.querySelector(".rn").textContent = r.name;
  b.querySelector(".rm").textContent = r.utility ? "Fellesrom" : `${capText(r.cap)} · ${r.bookable ? "kan bookes" : "ikke bookbart"}`;
  b.addEventListener("click", () => {select(r.id); if (window.innerWidth <= 980) panel.scrollIntoView({behavior: "smooth", block: "start"});});
  li.appendChild(b);
  list.appendChild(li);
});

document.addEventListener("keydown", e => {if (e.key === "Escape" && selected) deselect();});

function select(id) {
  if (selected === id) {deselect(); return;}
  layout.classList.add("has-selection");
  selected = id;
  const r = ROOMS.find(x => x.id === id);
  document.querySelectorAll(".room").forEach(g => g.classList.toggle("selected", g.dataset.id === id));
  list.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", b.parentElement.dataset.id === id ? "true" : "false"));

  if (r.utility) {
    panel.innerHTML = `<h2></h2><p class="type"></p><h3>Brukes til</h3><p class="f-use"></p><h3>Utstyr</h3><ul class="gear"></ul>`;
    panel.querySelector("h2").textContent = r.name;
    panel.querySelector(".type").textContent = r.type;
    panel.querySelector(".f-use").textContent = r.use;
    const ul = panel.querySelector(".gear");
    r.gear.forEach(gItem => {const li = document.createElement("li"); li.textContent = gItem; ul.appendChild(li);});
    return;
  }
  panel.innerHTML = `
<h2></h2>
<span class="runes" aria-hidden="true"></span>
<p class="type"></p>
<div class="facts">
  <div class="fact"><b class="f-cap"></b><small>Kapasitet</small></div>
  <div class="fact ${r.bookable ? "yes" : "no"}"><b>${r.bookable ? "Ja" : "Nei"}</b><small>${r.bookable ? "Kan bookes" : "Kan ikke bookes"}</small></div>
</div>
<h3>Brukes til</h3>
<p class="f-use"></p>
<h3>Utstyr</h3>
<ul class="gear"></ul>
<div class="lore"><h3>Bakgrunnen for navnet</h3><p class="f-lore"></p></div>`;
  panel.querySelector("h2").textContent = r.name;
  panel.querySelector(".runes").textContent = toRunes(r.name);
  panel.querySelector(".type").textContent = r.type;
  panel.querySelector(".f-cap").textContent = capText(r.cap);
  panel.querySelector(".f-use").textContent = r.use;
  panel.querySelector(".f-lore").textContent = r.lore;
  const ul = panel.querySelector(".gear");
  r.gear.forEach(gItem => {const li = document.createElement("li"); li.textContent = gItem; ul.appendChild(li);});
}

function applyFilter() {
  ROOMS.forEach(r => {
    const hide =
      filter === "utility" ? !r.utility :
        r.utility ? filter !== "all" :
          (filter === "yes" && !r.bookable) || (filter === "no" && r.bookable);
    document.querySelector(`.room[data-id="${r.id}"]`).classList.toggle("dimmed", hide);
    list.querySelector(`li[data-id="${r.id}"]`).classList.toggle("dimmed", hide);
  });
}
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    document.querySelectorAll(".filters button").forEach(b => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    applyFilter();
  });
});
