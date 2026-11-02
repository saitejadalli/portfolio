// Contact email shown on the page.
const CONTACT_EMAIL = "saiteja.dalli@myemail.indwes.edu";

(function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  if (CONTACT_EMAIL) {
    const b = document.getElementById("emailBtn");
    b.href = "mailto:" + CONTACT_EMAIL;
    b.hidden = false;
  }

  const NS = "http://www.w3.org/2000/svg";
  const el = (n, a = {}, t) => {
    const e = document.createElementNS(NS, n);
    for (const k in a) e.setAttribute(k, a[k]);
    if (t !== undefined) e.textContent = t;
    return e;
  };

  // Horizontal bar chart. highlight = index of the bar to emphasise (or -1).
  function bars(opts) {
    const { rows, fmt, highlight = -1, max, labelW = 190 } = opts;
    const rowH = 30, W = 640, padR = 70;
    const H = rows.length * rowH + 10;
    const m = max || Math.max(...rows.map(r => r[1]));
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": opts.alt });
    rows.forEach((r, i) => {
      const y = i * rowH + 4;
      const w = (r[1] / m) * (W - labelW - padR);
      svg.appendChild(el("text", { x: labelW - 10, y: y + 17, "text-anchor": "end", class: "c-label" }, r[0]));
      const rect = el("rect", { x: labelW, y: y + 3, width: Math.max(w, 1), height: 18, rx: 2, class: i === highlight ? "c-hi" : "c-bar" });
      rect.appendChild(el("title", {}, `${r[0]}: ${fmt(r[1])}`));
      svg.appendChild(rect);
      svg.appendChild(el("text", { x: labelW + w + 8, y: y + 17, class: "c-val" }, fmt(r[1])));
    });
    svg.appendChild(el("line", { x1: labelW, x2: labelW, y1: 0, y2: H, class: "c-axis" }));
    return svg;
  }

  const pct = v => v.toFixed(1) + "%";
  const num = v => v.toLocaleString("en-US");

  const charts = {
    churnContract: {
      title: "Churn rate by contract type",
      note: "Month-to-month customers churn at 15 times the rate of two-year customers.",
      svg: () => bars({ rows: [["Month-to-month", 42.7], ["One year", 11.3], ["Two year", 2.8]], fmt: pct, highlight: 0, max: 50, alt: "Bar chart of churn rate by contract: month-to-month 42.7%, one year 11.3%, two year 2.8%." })
    },
    churnTenure: {
      title: "Churn rate by months as a customer",
      note: "Nearly half of customers in their first year leave.",
      svg: () => bars({ rows: [["0–12 months", 47.4], ["13–24 months", 28.7], ["25–48 months", 20.4], ["49–72 months", 9.5]], fmt: pct, highlight: 0, max: 50, alt: "Bar chart of churn by tenure: 47.4%, 28.7%, 20.4% and 9.5%." })
    },
    salesMargin: {
      title: "Estimated gross margin by payment method",
      note: "Bank transfer sales earn four points less than cash. Company average is 14.3%.",
      svg: () => bars({ rows: [["Cash", 16.2], ["Credit card", 14.7], ["Bank transfer", 12.2]], fmt: pct, highlight: 2, max: 20, alt: "Gross margin by payment method: cash 16.2%, credit card 14.7%, bank transfer 12.2%." })
    },
    salesDiscount: {
      title: "Average order value by discount band",
      note: "Deeper discounts do not produce bigger orders (correlation 0.023).",
      svg: () => bars({ rows: [["0–5%", 5190], ["6–10%", 4693], ["11–15%", 4933], ["16–20%", 5000], ["21–25%", 5226], ["26–30%", 5027]], fmt: num, max: 6000, alt: "Average order value is roughly flat across discount bands, between 4,693 and 5,226." })
    },
    cricketRuns: {
      title: "Top 10 ODI run scorers, 2002–2023",
      note: "Runs in the dataset. Strike rates range from 78.8 (Tamim Iqbal) to 101.2 (AB de Villiers).",
      svg: () => bars({ rows: [["V Kohli", 13027], ["KC Sangakkara", 11701], ["MS Dhoni", 10310], ["RG Sharma", 9961], ["AB de Villiers", 9435], ["TM Dilshan", 9212], ["LRPL Taylor", 8198], ["DPMD Jayawardene", 8154], ["Tamim Iqbal", 7965], ["HM Amla", 7875]], fmt: num, highlight: 0, max: 15000, alt: "Top ten run scorers led by V Kohli with 13,027 runs." })
    },
    cricketWins: {
      title: "Match wins, top eight teams",
      note: "Wins from match information; no-result matches are not counted as wins.",
      svg: () => bars({ rows: [["India", 290], ["Australia", 275], ["Sri Lanka", 214], ["South Africa", 212], ["England", 209], ["Pakistan", 199], ["New Zealand", 184], ["West Indies", 136]], fmt: num, highlight: 0, max: 340, alt: "Match wins: India 290, Australia 275, Sri Lanka 214, South Africa 212, England 209, Pakistan 199, New Zealand 184, West Indies 136." })
    },
    studentBands: {
      title: "Mean exam score by attendance band",
      note: "A 5.81-point gap between the lowest and highest bands. This is an observational comparison, not a causal estimate.",
      svg: () => bars({ rows: [["60–70% attendance", 64.33], ["71–80%", 66.43], ["81–90%", 68.34], ["91–100%", 70.14]], fmt: v => v.toFixed(2), highlight: 3, max: 80, alt: "Mean exam score rises from 64.33 to 70.14 across four attendance bands." })
    },
    studentHeat: {
      title: "Mean exam score by attendance band and parental involvement",
      note: "In every attendance band, higher parental involvement goes with a higher mean score. This is association, not proof of cause.",
      svg: () => {
        const bands = ["60–70%", "71–80%", "81–90%", "91–100%"];
        const cols = ["Low", "Medium", "High"];
        const v = [[63.2, 64.3, 65.2], [65.7, 66.3, 67.3], [67.3, 68.3, 69.1], [69.2, 70.0, 71.1]];
        const lo = 63, hi = 71.5, x0 = 110, cw = 120, ch = 38, y0 = 28;
        const svg = el("svg", { viewBox: `0 0 ${x0 + cw * 3 + 10} ${y0 + ch * 4 + 30}`, role: "img", "aria-label": "Heatmap of mean exam score by attendance and parental involvement, from 63.2 to 71.1." });
        cols.forEach((c, j) => svg.appendChild(el("text", { x: x0 + cw * j + cw / 2, y: 18, "text-anchor": "middle", class: "c-label" }, c)));
        bands.forEach((b, i) => {
          svg.appendChild(el("text", { x: x0 - 10, y: y0 + ch * i + 24, "text-anchor": "end", class: "c-label" }, b));
          cols.forEach((c, j) => {
            const t = (v[i][j] - lo) / (hi - lo);
            const r = el("rect", { x: x0 + cw * j + 1, y: y0 + ch * i + 1, width: cw - 2, height: ch - 2, fill: `rgba(29,95,184,${(0.1 + t * 0.9).toFixed(2)})` });
            r.appendChild(el("title", {}, `${b}, ${c} involvement: ${v[i][j]}`));
            svg.appendChild(r);
            svg.appendChild(el("text", { x: x0 + cw * j + cw / 2, y: y0 + ch * i + 24, "text-anchor": "middle", class: "c-cell-t", fill: t > 0.5 ? "#fff" : "#10202F" }, v[i][j].toFixed(1)));
          });
        });
        svg.appendChild(el("text", { x: x0 + cw * 1.5, y: y0 + ch * 4 + 22, "text-anchor": "middle", class: "c-label" }, "Parental involvement"));
        return svg;
      }
    }
  };

  document.querySelectorAll("figure[data-chart]").forEach(f => {
    const c = charts[f.dataset.chart];
    if (!c) return;
    const cap = document.createElement("figcaption");
    cap.textContent = c.title;
    const small = document.createElement("small");
    small.textContent = c.note;
    cap.appendChild(small);
    f.appendChild(cap);
    f.appendChild(c.svg());
  });
})();
