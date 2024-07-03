(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function n(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = n(e);
    fetch(e.href, r);
  }
})();
const f = "https://witzapi.de/api/joke";
async function v() {
  return (await (await fetch(f)).json())[0].text;
}
const d = "jokes";
function c() {
  return JSON.parse(localStorage.getItem(d)) || [];
}
function k(t) {
  if (c().find((s) => s === t)) {
    alert("Witz wurde bereits gespeichert!");
    return;
  }
  const n = [t, ...c()];
  localStorage.setItem(d, JSON.stringify(n));
}
function m(t) {
  const o = c();
  o.splice(t, 1), localStorage.setItem(d, JSON.stringify(o));
}
const p = document.querySelector(".current-joke__text"),
  g = document.querySelector(".current-joke__generate"),
  u = document.querySelector(".current-joke__save"),
  J = document.querySelector(".saved-jokes__list");
let i = "";
async function S() {
  const t = await v();
  console.log(t),
    i || u.classList.remove("current-joke__save--disabled"),
    (i = t),
    (p.innerText = t);
}
function _() {
  i && (k(i), l());
}
function h(t) {
  m(t), l();
}
window.removeSavedJoke = h;
function l() {
  const t = c();
  let o = "";
  t.forEach((n, s) => {
    o += `
        <div class="saved-joke" ">
            <div class="saved-joke__text" >
                ${n}
            </div>
            <button class="saved-joke__remove" onclick="removeSavedJoke(${s})">
                <svg
                    class="saved-joke__remove-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                    />
                </svg>
            </button>
      </div>
        `;
  }),
    o || (o = "<em>Noch keine Witze gespeichert.</em>"),
    (J.innerHTML = o);
}
g.addEventListener("click", S);
u.addEventListener("click", _);
l();
