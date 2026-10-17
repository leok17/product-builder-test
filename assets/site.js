// 사이트 공통 스크립트: 테마 토글, 토스트, 로또 공 색상
(function () {
  const themeBtn = document.getElementById("theme");
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    if (!themeBtn) return;
    const dark = t === "dark";
    themeBtn.querySelector(".icon").textContent = dark ? "☀️" : "🌙";
    themeBtn.querySelector(".text").textContent = dark ? "라이트 모드" : "다크 모드";
    themeBtn.setAttribute("aria-pressed", dark);
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    });
  }
  applyTheme(document.documentElement.dataset.theme);
})();

function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 1600);
}

const colorClass = n => n <= 10 ? "c1" : n <= 20 ? "c2" : n <= 30 ? "c3" : n <= 40 ? "c4" : "c5";

// 암호학적 난수로 0 이상 max 미만의 정수를 균일하게 뽑기 (모듈로 편향 제거)
function randInt(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % max;
}
