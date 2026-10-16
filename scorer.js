/* Shared engine for questionnaire scorers.
   Scorer.build({ items:[{id, grp, name, hint, stack, opts:[[label, value], ...]}], compute:function(v){ return {val, det, note, warn}; } })
   v[id] = number, null (answered "not testable / not applicable") or undefined (not answered).
   Page needs: #items, #val, #det, #out, #copy, #reset, #msg. Extra inputs with class "extra" trigger recompute and are cleared on reset. */
var Scorer = (function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }
  function build(cfg) {
    var box = document.getElementById("items");
    cfg.items.forEach(function (it) {
      if (it.grp) { var g = document.createElement("div"); g.className = "grp"; g.textContent = it.grp; box.appendChild(g); }
      var d = document.createElement("div"); d.className = "q";
      var h = '<div class="name">' + esc(it.name) + (it.hint ? '<small>' + esc(it.hint) + '</small>' : '') + '</div><div class="seg' + (it.stack ? ' stack' : '') + '" role="radiogroup" aria-label="' + esc(it.name) + '">';
      it.opts.forEach(function (o, k) {
        var val = o[1] === null ? "na" : o[1];
        h += '<label><input type="radio" name="' + it.id + '" value="' + val + '" data-k="' + k + '"><span>' + esc(o[0]) + (o[1] !== null && !it.noPts ? '<b>' + o[1] + '</b>' : '') + '</span></label>';
      });
      d.innerHTML = h + '</div>'; box.appendChild(d);
    });
    function values() {
      var v = {};
      cfg.items.forEach(function (it) {
        var c = document.querySelector('input[name="' + it.id + '"]:checked');
        if (c) v[it.id] = c.value === "na" ? null : +c.value;
        if (c) v[it.id + "_label"] = it.opts[+c.getAttribute("data-k")][0];
      });
      return v;
    }
    function compute() {
      var r = cfg.compute(values());
      document.getElementById("val").textContent = r.val;
      var det = document.getElementById("det");
      det.textContent = r.det || "";
      det.className = "det" + (r.warn ? " warn" : "");
      document.getElementById("out").textContent = r.note;
    }
    document.addEventListener("change", compute);
    document.querySelectorAll(".extra").forEach(function (e) { e.addEventListener("input", compute); });
    document.getElementById("reset").addEventListener("click", function () {
      document.querySelectorAll('#items input[type=radio]').forEach(function (r) { r.checked = false; });
      document.querySelectorAll(".extra").forEach(function (e) { if (e.tagName === "SELECT") e.selectedIndex = 0; else e.value = ""; });
      document.getElementById("msg").hidden = true; compute();
    });
    document.getElementById("copy").addEventListener("click", function () {
      var el = document.getElementById("out"), msg = document.getElementById("msg");
      function sel() { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); msg.textContent = "Selected - press Ctrl+C"; msg.hidden = false; }
      try { navigator.clipboard.writeText(el.textContent).then(function () { msg.textContent = "Copied"; msg.hidden = false; }, sel); } catch (e) { sel(); }
    });
    compute();
    return { compute: compute };
  }
  function num(id) { var x = parseFloat(document.getElementById(id).value); return isNaN(x) ? null : x; }
  return { build: build, num: num };
})();
