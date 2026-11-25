function handleCSVUpload(event) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    const csvText = e.target.result;

    document.getElementById(
  'planner-results'
).innerHTML = `
  <div class="bg-slate-900 border border-slate-700 rounded-xl p-5">
    <h3 class="text-xl font-bold text-cyan-400">
      🧠 Analyzing CSV...
    </h3>

    <p class="mt-3 text-slate-400">
      Please wait while AI analyzes your spending.
    </p>
  </div>
`;

    analyzeSpending(csvText);

  };

  reader.readAsText(
  file,
  "Shift_JIS"
);


}

async function analyzeSpending(csvText) {

  try {

const response = await fetch(
  "https://sony-planner-ai.hironakajoe1.workers.dev/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
body: JSON.stringify({
  csv: csvText,
  salary: MONTHLY_SALARY,

  aiProvider:
    document.getElementById("ai-provider").value,

  gearGoal:
    Number(
      document.getElementById("gear-goal").value
    ) || 0,

  currentSavings:
    Number(
      document.getElementById("current-savings").value
    ) || 0,

  monthlySavings:
    Number(
      document.getElementById("monthly-savings").value
    ) || 0,

  selectedCamera:
    document.getElementById(
      "camera-selector"
    ).selectedOptions[0]?.text,

  selectedLens:
    document.getElementById(
      "lens-selector"
    ).selectedOptions[0]?.text
})
  }
);
    
    if (!response.ok) {
      
const errorBody = await response.text();

throw new Error(
  `API Error ${response.status}: ${errorBody}`
);
    }

    const result =
      await response.json();

const displayedIncome =
  Number(result.income) > 0
    ? Number(result.income)
    : MONTHLY_SALARY;

console.log(
  JSON.stringify(result, null, 2)
);

document.getElementById(
"planner-results"
).innerHTML = `
    
<div class="bg-slate-900 border border-slate-700 rounded-xl p-5">

  <h3 class="text-2xl font-bold text-cyan-400 mb-5">
    🧠 AI Financial Analysis
  </h3>

  <div class="grid md:grid-cols-3 gap-4 mb-6">

    <div class="bg-slate-950 rounded-xl p-4 border border-slate-700">
      <div class="text-slate-400 text-sm">
        Income
      </div>

      <div class="text-2xl font-bold text-green-400">
        ¥${displayedIncome.toLocaleString()}
      </div>
    </div>

    <div class="bg-slate-950 rounded-xl p-4 border border-slate-700">
      <div class="text-slate-400 text-sm">
        Expenses
      </div>

      <div class="text-2xl font-bold text-red-400">
        ¥${(result.expenses || 0).toLocaleString()}
      </div>
    </div>

    <div class="bg-slate-950 rounded-xl p-4 border border-slate-700">
      <div class="text-slate-400 text-sm">
        Balance
      </div>

      <div class="text-2xl font-bold text-blue-400">
        ¥${(result.balance || 0).toLocaleString()}
      </div>
    </div>

  </div>

<div class="bg-slate-950 rounded-xl p-4 border border-slate-700 mb-6">

  <h4 class="text-lg font-bold text-cyan-400 mb-3">
    📊 Spending Analysis
  </h4>

  <div class="grid md:grid-cols-2 gap-4 items-center">

    <div class="flex justify-center">
      <div style="width:120px;height:120px;">
        <canvas id="spendingChart"></canvas>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-bold text-yellow-400 mb-3">
  📂 Expense Breakdown
</h4>

<div class="space-y-3">

${(result.categories || []).map(category => `

<details class="bg-slate-900 rounded-lg p-3">

<summary class="cursor-pointer font-bold text-cyan-400">

  ${category.name}
  •
  ¥${category.total.toLocaleString()}

</summary>

  <div class="mt-3 space-y-2">

    ${(category.transactions || []).map(t => `

      <div class="flex justify-between">

        <span>${t.merchant}</span>

        <span>
          ¥${t.amount.toLocaleString()}
        </span>

      </div>

    `).join("")}

  </div>

</details>

`).join("")}

</div>

    </div>

  </div>

</div>
  <div class="bg-slate-950 rounded-xl p-4 border border-slate-700">
    <h4 class="text-lg font-bold text-purple-400 mb-3">
      🧠 AI Advice
    </h4>

    <p>
      ${result.advice || "No advice available."}
    </p>
  </div>

  <div class="bg-slate-950 rounded-xl p-4 border border-slate-700 mt-4">
  <h4 class="text-lg font-bold text-green-400 mb-3">
    📷 Sony Gear Roadmap
  </h4>

  <p>
    ${result.gearPlan || "No gear plan available."}
  </p>
</div>

</div>

`;

if (spendingChart) {
  spendingChart.destroy();
}

if (spendingChart) {
  spendingChart.destroy();
}

const chartCanvas =
  document.getElementById("spendingChart");

if (!chartCanvas) return;

spendingChart = new Chart(
  chartCanvas,

  {
    type: "doughnut",
    data: {
      labels: (result.categories || []).map(c => c.name),
      datasets: [{
        data: (result.categories || []).map(c => c.total)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 0
      },
      cutout: '75%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
);

} catch (error) {
 
console.error(error);
 
document.getElementById(
"planner-results"
).innerHTML = `
<div class="bg-red-900 p-5 rounded-xl">
${error.message}
</div>
`;
}
 
}