// Contact email shown on the page.
const CONTACT_EMAIL = "saiteja.dalli@myemail.indwes.edu";

(function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  const b = document.getElementById("emailBtn");
  if (CONTACT_EMAIL && b) b.href = "mailto:" + CONTACT_EMAIL;


  const NS = "http://www.w3.org/2000/svg";
  const el = (n, a = {}, t) => {
    const e = document.createElementNS(NS, n);
    for (const k in a) e.setAttribute(k, a[k]);
    if (t !== undefined) e.textContent = t;
    return e;
  };
  const f = document.querySelector('figure[data-chart="activation"]');
  if (f) {
    const W = 560, H = 300, L = 40, R = 20, T = 16, B = 30;
    const X = x => L + (x + 4) / 8 * (W - L - R);
    const Y = y => T + (1.5 - y) / 3 * (H - T - B);
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Plot of three activation functions: ReLU, sigmoid and tanh, for inputs from minus 4 to 4." });
    [-1, 0, 1].forEach(v => svg.appendChild(el("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: "ax" })));
    svg.appendChild(el("line", { x1: X(0), x2: X(0), y1: T, y2: H - B, class: "ax" }));
    [-1, 0, 1].forEach(v => svg.appendChild(el("text", { x: L - 8, y: Y(v) + 4, "text-anchor": "end", class: "c-label" }, v)));
    [-4, -2, 0, 2, 4].forEach(v => svg.appendChild(el("text", { x: X(v), y: H - 10, "text-anchor": "middle", class: "c-label" }, v)));
    const fns = [
      ["ReLU", x => Math.max(0, x), "l-a", "", -3.7, 0.22],
      ["Sigmoid", x => 1 / (1 + Math.exp(-x)), "l-b dash", "dash", 3.2, 0.8],
      ["Tanh", x => Math.tanh(x), "l-c dot", "dot", -3.4, -0.75]
    ];
    fns.forEach(([n, fn, cls, , lx, ly]) => {
      let d = "";
      for (let x = -4; x <= 4.001; x += 0.05) {
        const y = Math.max(-1.5, Math.min(1.5, fn(x)));
        d += (d ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1);
      }
      svg.appendChild(el("path", { d, class: "curve " + cls }));
      svg.appendChild(el("text", { x: X(lx), y: Y(ly), class: "c-val" }, n));
    });
    const cap = document.createElement("figcaption");
    cap.textContent = "Three common activation functions";
    const small = document.createElement("small");
    small.textContent = "Each turns a node's input (horizontal) into an output (vertical). ReLU blocks negatives and passes positives unchanged (the plot is cut off at the top, but ReLU keeps rising); sigmoid squeezes to 0–1; tanh squeezes to −1 to 1.";
    cap.appendChild(small);
    f.appendChild(cap);
    f.appendChild(svg);
  }
})();
