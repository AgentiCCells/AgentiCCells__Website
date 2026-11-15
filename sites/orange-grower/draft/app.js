(function () {
  "use strict";
  var F = window.FARM, L = "en", step = 1, $ = function (s) { return document.querySelector(s); };
  var t = function (o) { return o[L]; };
  var eur = function (n) { return new Intl.NumberFormat(L === "pt" ? "pt-PT" : "en-GB", { style: "currency", currency: "EUR" }).format(n); };
  var qty = {};

  function setLang(l) {
    L = l; document.documentElement.lang = l;
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.set === l)); });
    try { history.replaceState(null, "", "#" + l); } catch (e) {}
    render();
  }

  function days() {
    var out = [], d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + 2);
    while (out.length < 6) { if (F.deliveryDays.indexOf(d.getDay()) > -1) out.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return out;
  }

  function render() {
    $("#notice").textContent = t(F.notice);
    $("#ver").textContent = F.version;
    $("#varieties").innerHTML = F.varieties.map(function (v) {
      return '<div class="variety"><strong>' + v.name + '</strong><br><span class="price">' + eur(v.price) + ' / kg</span> · ' + eur(v.price * F.crateKg) + ' / ' + (L === "pt" ? "caixa" : "crate") + '<br>' + t(v) + '</div>';
    }).join("");
    $("#lines").innerHTML = F.varieties.map(function (v) {
      return '<div class="row"><div><label for="q-' + v.id + '">' + v.name + ' (' + eur(v.price * F.crateKg) + ' / ' + (L === "pt" ? "caixa" : "crate") + ')</label></div>' +
        '<input id="q-' + v.id + '" type="number" min="0" max="200" step="1" inputmode="numeric" value="' + (qty[v.id] || 0) + '"></div>';
    }).join("");
    F.varieties.forEach(function (v) {
      $("#q-" + v.id).addEventListener("input", function (e) {
        var n = Math.max(0, Math.min(200, Math.floor(Number(e.target.value) || 0))); qty[v.id] = n; $("#to2").disabled = crates() === 0;
      });
    });
    $("#to2").disabled = crates() === 0;
    var z = $("#zone"), zv = z.value || "A";
    z.innerHTML = F.zones.map(function (x) { return '<option value="' + x.id + '">' + t(x) + '</option>'; }).join(""); z.value = zv;
    var dsel = $("#day"), dv = dsel.value;
    dsel.innerHTML = days().map(function (d, i) {
      return '<option value="' + i + '">' + new Intl.DateTimeFormat(L === "pt" ? "pt-PT" : "en-GB", { weekday: "long", day: "numeric", month: "long" }).format(d) + '</option>';
    }).join(""); if (dv) dsel.value = dv;
    if (step >= 3) showQuote();
    if (step === 4) showDone(window.__order);
  }

  function crates() { return F.varieties.reduce(function (s, v) { return s + (qty[v.id] || 0); }, 0); }

  function quote() {
    var n = crates(), zone = F.zones.filter(function (z) { return z.id === $("#zone").value; })[0];
    var lines = F.varieties.filter(function (v) { return qty[v.id] > 0; }).map(function (v) {
      return { name: v.name, crates: qty[v.id], sub: qty[v.id] * F.crateKg * v.price };
    });
    var goods = lines.reduce(function (s, l) { return s + l.sub; }, 0);
    var disc = n >= F.bulkFrom ? goods * F.bulkDiscount : 0;
    var del = zone.base === 0 && zone.perCrate === 0 ? 0 : (zone.freeFrom && n >= zone.freeFrom ? 0 : zone.base + zone.perCrate * n);
    return { n: n, lines: lines, goods: goods, disc: disc, del: del, zone: zone, total: goods - disc + del };
  }

  function showQuote() {
    var q = quote(), row = function (a, b, c) { return '<tr' + (c ? ' class="' + c + '"' : '') + '><td>' + a + '</td><td>' + b + '</td></tr>'; };
    var h = q.lines.map(function (l) { return row(l.name + ' × ' + l.crates + ' (' + l.crates * F.crateKg + ' kg)', eur(l.sub)); }).join("");
    h += row(L === "pt" ? "Laranjas" : "Oranges", eur(q.goods));
    if (q.disc) h += row(L === "pt" ? "Desconto por quantidade (" + F.bulkFrom + "+ caixas, 5%)" : "Quantity discount (" + F.bulkFrom + "+ crates, 5%)", "-" + eur(q.disc));
    h += row((L === "pt" ? "Entrega: " : "Delivery: ") + t(q.zone), q.del === 0 ? (L === "pt" ? "grátis" : "free") : eur(q.del));
    h += row(L === "pt" ? "Total (sem IVA, inventado)" : "Total (before VAT, invented)", eur(q.total), "total");
    $("#quote").innerHTML = h;
  }

  function go(n) {
    step = n;
    document.querySelectorAll("[data-step]").forEach(function (el) { el.classList.toggle("hidden", Number(el.dataset.step) !== n); });
    document.querySelectorAll("#steps li").forEach(function (li, i) { li.classList.toggle("on", i === n - 1); });
    if (n === 3) { showQuote(); $("#ok").checked = false; $("#send").disabled = true; }
    $("#order").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showDone(o) {
    if (!o) return;
    var day = days()[Number(o.day)];
    var when = new Intl.DateTimeFormat(L === "pt" ? "pt-PT" : "en-GB", { weekday: "long", day: "numeric", month: "long" }).format(day);
    $("#done").innerHTML = '<p><span class="stamp">' + (L === "pt" ? "SIMULAÇÃO" : "SIMULATION") + '</span></p>' +
      '<h3>' + (L === "pt" ? "Pedido de encomenda (a fingir) criado" : "Order request (pretend) created") + '</h3>' +
      '<p>' + (L === "pt" ? "Número: " : "Number: ") + '<strong>' + o.id + '</strong><br>' + (L === "pt" ? "Total: " : "Total: ") + '<strong>' + eur(o.total) + '</strong><br>' +
      (L === "pt" ? "Entrega prevista: " : "Planned delivery: ") + when + '</p>' +
      '<p>' + (L === "pt" ? "Nada foi enviado. Não há email, servidor nem pagamento. Se isto fosse real, o agricultor responderia a confirmar." : "Nothing was sent. There is no email, server or payment. If this were real, the farmer would reply to confirm.") + '</p>' +
      '<p><button type="button" class="btn alt" id="again">' + (L === "pt" ? "Começar outra" : "Start another") + '</button></p>';
    $("#again").addEventListener("click", function () { qty = {}; window.__order = null; $("#biz").value = ""; render(); go(1); });
  }

  document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.set); }); });
  $("#to2").addEventListener("click", function () { go(2); });
  $("#to3").addEventListener("click", function () { go(3); });
  document.querySelectorAll("[data-back]").forEach(function (b) { b.addEventListener("click", function () { go(Number(b.dataset.back)); }); });
  $("#ok").addEventListener("change", function (e) { $("#send").disabled = !e.target.checked; });
  $("#send").addEventListener("click", function () {
    var q = quote();
    window.__order = { id: "LARANJA-" + Math.random().toString(36).slice(2, 6).toUpperCase(), total: q.total, day: $("#day").value };
    go(4); showDone(window.__order);
  });
  $("#form").addEventListener("submit", function (e) { e.preventDefault(); });
  var h = location.hash.replace("#", "");
  setLang(h === "pt" || (!h && /^pt/i.test(navigator.language)) ? "pt" : "en");
})();
