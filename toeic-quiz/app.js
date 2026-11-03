(function () {
  "use strict";
  var KEY = "toeic-quiz-wrong";
  var $ = function (id) { return document.getElementById(id); };
  var cat = "all", list = [], idx = 0, correct = 0, answered = false;

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function show(id) { ["menu", "quiz", "result-view"].forEach(function (s) { $(s).hidden = s !== id; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function updateStats() { $("stats").textContent = "間違えた問題: " + load().length + " 問 / 全 " + QUESTIONS.length + " 問"; }

  function start() {
    var wrong = load(), pool;
    if (cat === "wrong") pool = QUESTIONS.filter(function (q) { return wrong.indexOf(q.q) >= 0; });
    else pool = QUESTIONS.filter(function (q) { return cat === "all" || q.cat === cat; });
    if (!pool.length) { $("stats").textContent = "該当する問題がありません。"; return; }
    list = shuffle(pool).slice(0, parseInt($("count").value, 10));
    idx = 0; correct = 0;
    show("quiz"); render();
  }

  function render() {
    var q = list[idx]; answered = false;
    $("progress").textContent = (idx + 1) + " / " + list.length;
    $("question").textContent = q.q;
    $("feedback").hidden = true;
    var box = $("options"); box.innerHTML = "";
    q.c.forEach(function (text, i) {
      var b = document.createElement("button");
      b.textContent = String.fromCharCode(65 + i) + ". " + text;
      b.onclick = function () { answer(i, b); };
      box.appendChild(b);
    });
  }

  function answer(i, btn) {
    if (answered) return; answered = true;
    var q = list[idx], btns = $("options").children, wrong = load();
    btns[q.a].classList.add("correct");
    if (i === q.a) { correct++; wrong = wrong.filter(function (w) { return w !== q.q; }); $("result").textContent = "正解!"; }
    else { btn.classList.add("wrong"); if (wrong.indexOf(q.q) < 0) wrong.push(q.q); $("result").textContent = "不正解"; }
    save(wrong);
    $("explain").textContent = q.e;
    $("next").textContent = idx + 1 < list.length ? "次へ" : "結果を見る";
    $("feedback").hidden = false;
  }

  $("next").onclick = function () {
    if (++idx < list.length) render();
    else { $("score").textContent = correct + " / " + list.length + " 問正解(" + Math.round(correct / list.length * 100) + "%)"; show("result-view"); }
  };
  $("catChoices").onclick = function (e) {
    var b = e.target.closest("button"); if (!b) return;
    cat = b.dataset.cat;
    Array.prototype.forEach.call(this.children, function (c) { c.classList.toggle("active", c === b); });
  };
  $("start").onclick = start;
  $("retry").onclick = start;
  $("back").onclick = function () { updateStats(); show("menu"); };
  updateStats();
})();
