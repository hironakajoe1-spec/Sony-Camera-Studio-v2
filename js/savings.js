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

 function initGearSavings() {
      updateGearList();
    }

    function selectGear(name, price) {

      document.getElementById(
        'gear-goal'
      ).value = price;

    }

    function updateGearList() {

      document.getElementById(
        'camera-selector'
      ).innerHTML = `
      
  <option value="">
    -- No Camera --
  </option>
` + camerasData.map(camera => `
  <option value="${camera.id}">
    ${camera.name}
  </option>
`).join('');

      document.getElementById(
        'lens-selector'
      ).innerHTML = `
  <option value="">
    -- No Lens --
  </option>
` + lensesData.map(lens => `
  <option value="${lens.id}">
    ${lens.name}
  </option>
`).join('');

      selectGearFromDropdown();
    }

    function selectGearFromDropdown() {

      const source =
        document.getElementById("price-source").value;

      const cameraId =
        document.getElementById("camera-selector").value;

      const lensId =
        document.getElementById("lens-selector").value;

      const camera =
        camerasData.find(c => c.id === cameraId);

      const lens =
        lensesData.find(l => l.id === lensId);

      if (!camera && !lens) {

        document.getElementById("gear-preview").innerHTML = `
      <div class="text-center text-slate-400">
        Select a camera and/or lens
      </div>
    `;

        document.getElementById("gear-goal").value = 0;

        return;
      }

      const cameraPrice =
        camera ? camera.prices[source] : 0;

      const lensPrice =
        lens ? lens.prices[source] : 0;

      const totalPrice =
        cameraPrice + lensPrice;

      document.getElementById("gear-preview").innerHTML = `

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

  ${camera ? `
  <div class="flex justify-center">

    <div class="w-96 bg-slate-950 border border-slate-700 rounded-xl p-4 text-center">

<img
  src="${camera.image}"
  alt="${camera.name}"
  class="w-full h-40 object-contain mb-3"
>

<h3 class="text-xl font-bold text-white mb-2">
${camera.name}
</h3>

     <div class="text-green-400 font-bold text-lg">
¥${cameraPrice.toLocaleString()}
</div>

    </div>

  </div>
  ` : ""}

  ${lens ? `
  <div class="flex justify-center">

    <div class="w-96 bg-slate-950 border border-slate-700 rounded-xl p-4 text-center">

      <img
        src="${lens.image}"
        alt="${lens.name}"
       class="w-full h-40 object-contain mb-3"
>

<h3 class="text-xl font-bold text-white mb-2">
${lens.name}
</h3>

      <div class="text-green-400 font-bold text-lg">
      ¥${lensPrice.toLocaleString()}
</div>

    </div>

  </div>
  ` : ""}

</div>

<div class="mt-6 text-center">

  <div class="text-slate-400 text-lg">
    Total Selected Gear Price
  </div>

  <div class="text-4xl font-bold text-cyan-400 mt-2">
    ¥${totalPrice.toLocaleString()}
  </div>

</div>

`;
    }

    let spendingChart = null;

    let selectedStudioCameras = [];

    let selectedLenses = [];

    const MAX_CAMERAS = 4;
    const MAX_LENSES = 4;

   
    // --- CAMERA STUDIO FUNCTIONS ---
    function resetCameraStudio() {

      selectedStudioCameras = [];

      document.getElementById(
        'use-case-selector'
      ).value = '';

      initCameraStudio();

    }

       function saveSavingsData() {

      const data = {

        gearGoal:
          document.getElementById('gear-goal').value,

        currentSavings:
          document.getElementById('current-savings').value,

        monthlySavings:
          document.getElementById('monthly-savings').value,

        monthlySpending:
          document.getElementById('monthly-spending').value

      };

      localStorage.setItem(
        'gearSavingsData',
        JSON.stringify(data)
      );

    }

    function loadSavingsData() {

      const saved =
        localStorage.getItem(
          'gearSavingsData'
        );

      if (!saved) return;

      const data =
        JSON.parse(saved);

      document.getElementById(
        'gear-goal'
      ).value =
        data.gearGoal || '';

      document.getElementById(
        'current-savings'
      ).value =
        data.currentSavings || '';

      document.getElementById(
        'monthly-savings'
      ).value =
        data.monthlySavings || '';

      document.getElementById(
        'monthly-spending'
      ).value =
        data.monthlySpending || '';
    }