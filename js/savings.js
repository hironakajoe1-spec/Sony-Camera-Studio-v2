function calculateSavings() {

  const goal =
    Number(document.getElementById('gear-goal')?.value || 0);

  const current =
    Number(document.getElementById('current-savings')?.value || 0);

  const monthly =
    Number(document.getElementById('monthly-savings')?.value || 0);

  const remaining = Math.max(goal - current, 0);

  const months =
    monthly > 0
      ? Math.ceil(remaining / monthly)
      : 0;

  const container =
    document.getElementById('savings-results');

  if (!container) return;

  container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700 rounded-xl p-5">

      <h3 class="text-xl font-bold text-cyan-400 mb-4">
        Savings Progress
      </h3>

      <div class="mb-3">
        Remaining: ¥${remaining.toLocaleString()}
      </div>

      <div>
        Estimated Months: ${months}
      </div>

    </div>
  `;
}