    function initCameraStudio() {

      const grid =
        document.getElementById(
          'camera-card-grid'
        );

      const priceSource =
        document.getElementById(
          'camera-price-source'
        )?.value || '';

      grid.innerHTML = camerasData.map(cam => `

<div class="
  bg-slate-900
  border
  border-slate-800
  rounded-xl
  p-4
  flex
  flex-col
  h-full
">

  <div class="flex flex-col items-center text-center w-full h-full">

    <div class="text-xs text-slate-400">
      ${cam.sensor.includes('Full-Frame')
          ? 'FULL FRAME'
          : 'APS-C'
        }
    </div>

<img
  src="${cam.image}"
  alt="${cam.name}"
  class="w-full h-40 object-contain mb-3"
>

<h3 class="text-lg font-bold text-white">
  ${cam.name}
</h3>
    ${priceSource
          ? `
        <div class="mt-2 font-bold text-green-400">
          ¥${cam.prices[priceSource].toLocaleString()}
        </div>
      `
          : ''
        }

    <div class="space-y-1 text-xs mt-1">
      <div>📸 ${cam.effectiveResolution}</div>
      <div>🎥 ${cam.video}</div>
      <div>⚖️ ${cam.weight}</div>
      <div>🧠 ${cam.processor}</div>
    </div>

    <button
      onclick="toggleStudioCamera('${cam.id}')"
      class="mt-auto px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm"
    >
      ${selectedStudioCameras.includes(cam.id)
          ? 'Remove from Compare'
          : 'Compare'
        }
    </button>

  </div>

</div>

`).join('');
      renderCameraComparison();
    }

function toggleStudioCamera(id) {

      const previousCount =
        selectedStudioCameras.length;

      if (
        !selectedStudioCameras.includes(id) &&
        selectedStudioCameras.length >= MAX_CAMERAS
      ) {
        alert(
          'You can compare up to 4 cameras at once.'
        );
        return;
      }

      if (selectedStudioCameras.includes(id)) {

        selectedStudioCameras =
          selectedStudioCameras.filter(
            camId => camId !== id
          );

      } else {

        selectedStudioCameras.push(id);

      }

      initCameraStudio();

      const useCase =
        document.getElementById(
          'use-case-selector'
        ).value;

      if (
        useCase !== '' &&
        selectedStudioCameras.length >= 2 &&
        selectedStudioCameras.length > previousCount
      ) {

        setTimeout(() => {

          document
            .getElementById(
              'camera-comparison-container'
            )
            .scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

        }, 100);

      }

    }

    function renderCameraComparison() {

      renderComparisonBasedOn();

      const wrapper =
        document.getElementById(
          'comparison-table-wrapper'
        );

      if (selectedStudioCameras.length === 0) {

        document.getElementById(
          'camera-comparison-container'
        ).style.display = 'none';

        return;
      } const activeCams =
        camerasData.filter(c =>
          selectedStudioCameras.includes(c.id)
        );

      document.getElementById(
        'quick-comparison-grid'
      ).innerHTML = `
<div class="grid md:grid-cols-2 gap-6 text-lg">

    ${activeCams.map(cam => `

      <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">

        <h3 class="text-3xl font-bold text-blue-400 mb-5">

          ${cam.name}
        </h3>

<div class="bg-green-900/30 border border-green-600
            text-green-300 rounded-lg p-2 mb-4
            text-sm font-bold text-center">

  ${getCameraBadge(cam)}

</div>



       <div class="grid grid-cols-2 gap-8 text-lg">

          <div><strong>📸 Resolution:</strong> ${cam.effectiveResolution}</div>

          <div><strong>🧠 Processor:</strong> ${cam.processor}</div>

          <div><strong>🎯 Autofocus:</strong> ${cam.af}</div>

          <div><strong>🛡️ IBIS:</strong> ${cam.ibis}</div>

          <div><strong>🎥 Video:</strong> ${cam.video}</div>

          <div><strong>🔋 Battery:</strong> ${cam.batteryLife}</div>

          <div><strong>⚖️ Weight:</strong> ${cam.weight}</div>

          <div><strong>🌦️ Weather Sealed:</strong> ${cam.weatherSealed}</div>

        </div>

      </div>

    `).join('')}

  </div>
`;

      document.getElementById(
        'camera-comparison-container'
      ).style.display = 'block';

      const specGroups = [
        {
          title: '📸 Imaging & Autofocus',
          specs: [
            { label: 'Sensor', key: 'sensor' },
            { label: 'Resolution', key: 'effectiveResolution' },
            { label: 'Sensor Size', key: 'sensorSize' },
            { label: 'Processor', key: 'processor' },
            { label: 'IBIS', key: 'ibis' },
            { label: 'Autofocus', key: 'af' },
            { label: 'Burst Shooting', key: 'burst' }
          ]
        },

        {
          title: '🎥 Video & Recording',
          specs: [
            { label: 'Video', key: 'video' },
            { label: 'RAW Output', key: 'videoRaw' },
            { label: 'Recording Limit', key: 'recordingLimit' }
          ]
        },

        {
          title: '📺 Display',
          specs: [
            { label: 'EVF', key: 'evf' },
            { label: 'LCD Screen', key: 'lcd' },
            { label: 'LCD Resolution', key: 'lcdResolution' }
          ]
        },

        {
          title: '💾 Storage & Connectivity',
          specs: [
            { label: 'Card Slots', key: 'cardSlots' },
            { label: 'USB', key: 'usb' },
            { label: 'HDMI', key: 'hdmi' },
            { label: 'Wi‑Fi', key: 'wifi' },
            { label: 'Bluetooth', key: 'bluetooth' }
          ]
        },

        {
          title: '🔋 Battery & Body',
          specs: [
            { label: 'Battery', key: 'battery' },
            { label: 'Battery Life', key: 'batteryLife' },
            { label: 'Weight', key: 'weight' },
            { label: 'Dimensions', key: 'dimensions' },
            { label: 'Weather Sealing', key: 'weatherSealed' }
          ]
        }
      ];

      wrapper.innerHTML = specGroups.map((group, index) => `
<details
  class="mb-4 bg-slate-950 rounded-xl border border-slate-800">

<summary
  class="cursor-pointer p-5 font-bold text-lg text-blue-400">
      ${group.title}
    </summary>

    <table class="w-full text-left text-lg">

      <thead>
        <tr class="border-b border-slate-800">

      <th class="p-4 text-lg text-slate-300 font-bold">
            Specification
          </th>

${activeCams.map(cam => `
  <th class="p-4 text-lg text-blue-400 font-bold">
    ${cam.name}
  </th>
`).join('')}

        </tr>
      </thead>

      <tbody>

        ${group.specs.map(spec => `
          <tr class="border-b border-slate-900">

          <td class="p-4 text-lg text-slate-300">
              ${spec.label}
            </td>

            ${activeCams.map(cam => `
              <td class="p-4 text-base text-white font-medium">
                ${cam[spec.key] || '-'}
              </td>
            `).join('')}

          </tr>
        `).join('')}

      </tbody>

    </table>

  </details>
`).join('');

function renderCameraAnalysis(activeCams) {

      const container =
        document.getElementById('camera-analysis');

      container.innerHTML = `
  <div class="grid md:grid-cols-4 gap-4">
    ${activeCams.map(cam => {

        const photoScore =
          calculatePhotographyScore(cam);

        const videoScore =
          calculateVideoScore(cam);

        const travelScore =
          calculateTravelScore(cam);

        const overallScore =
          calculateOverallScore(cam);



        const strengths = [];

        const weaknesses = [];

        const useCase =
          document.getElementById(
            'use-case-selector'
          ).value;

        const maxRes = Math.max(
          ...activeCams.map(c =>
            parseFloat(c.effectiveResolution)
          )
        );

        const minWeight = Math.min(
          ...activeCams.map(c =>
            parseInt(c.weight)
          )
        );

        if (
          parseInt(cam.effectiveResolution)
          === maxRes
        ) {
          strengths.push(
            'Highest resolution in comparison'
          );
        }

        if (
          parseInt(cam.weight)
          === minWeight &&
          activeCams.length > 1
        ) {
          strengths.push(
            'Lightest camera selected'
          );
        }

        if (
          cam.video.includes('120')
        ) {
          strengths.push(
            'Best slow-motion video capabilities'
          );
        }

        if (
          cam.ibis !== 'None'
        ) {
          strengths.push(
            'Built-in image stabilization'
          );
        }
        if (
          cam.processor.includes('AI')
        ) {
          strengths.push(
            'AI-powered autofocus tracking'
          );
        }

        if (
          cam.name === 'Sony FX30'
        ) {
          strengths.push(
            'Designed specifically for cinema production'
          );
        }

        /* ---------- Disney Mode ---------- */

        if (useCase === 'disney') {

          if (parseInt(cam.weight) < 550) {
            strengths.push(
              'Comfortable for full-day park visits'
            );
          }

          if (cam.ibis !== 'None') {
            strengths.push(
              'Excellent for nighttime Disney photography'
            );
          }

          if (cam.processor.includes('AI')) {
            strengths.push(
              'Tracks moving characters and parade performers well'
            );
          }

          if (cam.sensor.includes('Full-Frame')) {
            strengths.push(
              'Better low-light image quality for evening shows'
            );
          }

          if (parseInt(cam.weight) > 600) {
            weaknesses.push(
              'May feel heavy after a full day in the parks'
            );
          }

          if (cam.ibis === 'None') {
            weaknesses.push(
              'Harder to shoot handheld after sunset'
            );
          }

        }
        if (
          cam.cardSlots &&
          cam.cardSlots.startsWith('1')
        ) {
          weaknesses.push(
            'Single card slot'
          );
        }

        if (
          cam.evf.includes('2.36')
        ) {
          weaknesses.push(
            'Lower EVF resolution than some competitors'
          );
        }

        if (
          cam.hdmi === 'Micro HDMI'
        ) {
          weaknesses.push(
            'Uses Micro HDMI connection'
          );
        }

        if (
          cam.evf === 'None'
        ) {
          weaknesses.push(
            'No electronic viewfinder'
          );
        }

        const hasFullFrame =
          activeCams.some(c =>
            c.sensor.includes('Full-Frame')
          );

        if (
          hasFullFrame &&
          cam.sensor.includes('APS-C')
        ) {
          weaknesses.push(
            'Smaller sensor than full-frame models'
          );
        } return `
 <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl h-full">

         <h3 class="text-lg font-bold text-blue-400 mb-2">
  ${cam.name}
</h3>

<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">

  <div class="bg-slate-950 rounded-lg p-3 text-center">
    <div class="text-lg text-slate-400">
      📸 Photography
    </div>

    <div class="text-lg font-bold text-green-400">
      ${photoScore}
    </div>
  </div>

  <div class="bg-slate-950 rounded-lg p-3 text-center">
    <div class="text-sm text-slate-400">
      🎥 Video
    </div>

    <div class="text-lg font-bold text-red-400">
      ${videoScore}
    </div>
  </div>

  <div class="bg-slate-950 rounded-lg p-3 text-center">
    <div class="text-sm text-slate-400">
      ✈️ Travel
    </div>

    <div class="text-lg font-bold text-blue-400">
      ${travelScore}
    </div>
  </div>

  <div class="bg-slate-950 rounded-lg p-3 text-center">
    <div class="text-sm text-slate-400">
      🏆 Overall
    </div>

    <div class="text-lg font-bold text-yellow-400">
      ${overallScore}
    </div>
  </div>

</div>         <div class="grid md:grid-cols-2 gap-3">

            <div>
              <h4 class="text-green-400 font-bold text-lg mb-3">
                ✅ Strengths
              </h4>

              <ul class="text-lg space-y-2">
                ${strengths.map(s => `
                  <li>${s}</li>
                `).join('')}
              </ul>
            </div>

            <div>
              <h4 class="text-red-400 font-bold text-lg mb-3">
                ❌ Weaknesses
              </h4>

<ul class="text-lg space-y-2">
  ${weaknesses.map(w => `
    <li>${w}</li>
  `).join('')}
</ul>
            </div>

          </div>

        </div>
      `;

      }).join('')}
  </div>
`;

    }

        function renderRecommendation(activeCams) {

      const container =
        document.getElementById(
          'recommendation-box'
        );

      const useCase =
        document.getElementById(
          'use-case-selector'
        ).value;

      if (
        activeCams.length < 2 ||
        useCase === ''
      ) {
        container.innerHTML = '';
        return;
      }

      let winner;
      let title;
      let reasons = [];

      switch (useCase) {

        case 'travel':

          winner = [...activeCams].sort(
            (a, b) =>
              calculateTravelScore(b) -
              calculateTravelScore(a)
          )[0];

          title = '✈️ Best Travel Choice';

          if (parseInt(winner.weight) < 550) {
            reasons.push(
              'Lightweight body for travelling'
            );
          }

          if (winner.ibis !== 'None') {
            reasons.push(
              'Built-in stabilisation for handheld shooting'
            );
          }

          if (
            winner.sensor.includes('Full-Frame')
          ) {
            reasons.push(
              'Excellent image quality while travelling'
            );
          }

          break;

        case 'video':

          winner = [...activeCams].sort(
            (a, b) =>
              calculateVideoScore(b) -
              calculateVideoScore(a)
          )[0];

          title = '🎥 Best Video Camera';

          if (winner.video.includes('120')) {
            reasons.push(
              '4K 120p slow-motion recording'
            );
          }

          if (
            winner.recordingLimit.includes('Unlimited') ||
            winner.recordingLimit.includes('No limit')
          ) {
            reasons.push(
              'No recording time limits'
            );
          }

          if (winner.ibis !== 'None') {
            reasons.push(
              'Stabilised handheld footage'
            );
          }

          break;

        case 'content':

          winner = [...activeCams].sort(
            (a, b) =>
              calculateOverallScore(b) -
              calculateOverallScore(a)
          )[0];

          title = '📱 Best Content Creator Camera';

          reasons.push(
            'Strong balance of photo and video performance'
          );

          if (
            winner.processor.includes('AI')
          ) {
            reasons.push(
              'Advanced AI subject tracking'
            );
          }

          if (winner.ibis !== 'None') {
            reasons.push(
              'Built-in stabilisation for vlogging'
            );
          }

          break;

        case 'disney':

          winner = [...activeCams].sort(
            (a, b) =>
              calculateDisneyScore(b) -
              calculateDisneyScore(a)
          )[0];

          title = '🏰 Best Disney Camera';

          if (parseInt(winner.weight) < 550) {
            reasons.push(
              'Comfortable to carry all day'
            );
          }

          if (winner.ibis !== 'None') {
            reasons.push(
              'Better for night parades and shows'
            );
          }

          if (
            winner.processor.includes('AI')
          ) {
            reasons.push(
              'Excellent tracking for moving characters'
            );
          }

          if (
            winner.sensor.includes('Full-Frame')
          ) {
            reasons.push(
              'Stronger low-light image quality'
            );
          }

          break;

        default:
          container.innerHTML = '';
          return;
      }

      const otherCam =
        activeCams.length === 2
          ? activeCams.find(
            cam => cam.id !== winner.id
          )
          : null;

      let otherReasons = [];

      if (otherCam) {

        if (otherCam.sensor.includes('Full-Frame')) {
          otherReasons.push(
            'Full-frame image quality and better low-light performance'
          );
        }

        if (
          parseInt(otherCam.effectiveResolution) >
          parseInt(winner.effectiveResolution)
        ) {
          otherReasons.push(
            'Higher resolution for large prints and cropping'
          );
        }

        if (
          otherCam.video.includes('120')
        ) {
          otherReasons.push(
            'Superior slow-motion video capabilities'
          );
        }

        if (
          otherCam.ibis !== 'None'
        ) {
          otherReasons.push(
            'Built-in image stabilization'
          );
        }

        if (
          parseInt(otherCam.weight) <
          parseInt(winner.weight)
        ) {
          otherReasons.push(
            'Lighter body for all-day carry'
          );
        }
      }

      container.innerHTML = `

  <div class="
    bg-gradient-to-r
    from-green-900/30
    to-blue-900/30
    border
    border-green-500
    rounded-xl
    p-5
  ">

    <h3 class="text-xl font-bold text-green-400 mb-3">
      ${title}
    </h3>

<div class="bg-slate-950 border border-slate-700 rounded-xl p-5 mb-5">

  <div class="text-xs font-bold tracking-widest text-green-400 mb-3">
    RECOMMENDED CAMERA
  </div>

  <div class="grid md:grid-cols-[220px_1fr] gap-6 items-start">

    <div class="flex justify-center">

<img
  src="${winner.image}"
  alt="${winner.name}"
  class="w-full max-h-48 object-contain">


    </div>

    <div>

<h3 class="text-3xl font-bold text-white">
  🏆 ${winner.name}
</h3>

<div class="text-slate-400 mt-1 mb-4">
  ${winner.sensor}
</div>

<div class="flex flex-wrap gap-2 mt-4 mb-5">

  <span class="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">
    📸 ${winner.effectiveResolution}
  </span>

  <span class="bg-purple-600 px-3 py-1 rounded-full text-sm text-white">
    🎥 ${winner.video}
  </span>

  <span class="bg-green-600 px-3 py-1 rounded-full text-sm text-white">
    ⚖️ ${winner.weight}
  </span>

</div>

<div class="mt-5">

  <h4 class="text-green-400 font-bold mb-3">
    Why this camera?
  </h4>

  <ul class="space-y-2 text-slate-200">

    ${reasons.map(reason => `
      <li class="flex items-center gap-2">
        <span class="text-green-400">✓</span>
        <span>${reason}</span>
      </li>
    `).join('')}

  </ul>

</div>

  </div>

</div>

  </div>

  ${otherCam ? `


<div class="mt-6 bg-slate-900 border border-yellow-900 rounded-xl p-5">

  <div class="grid md:grid-cols-[220px_1fr] gap-6 items-center">

    <!-- Image Column -->
    <div class="flex justify-center items-center">
      <img
        src="${otherCam.image}"
        alt="${otherCam.name}"
        class="max-h-48 object-contain"
      >
    </div>

    <!-- Text Column -->
    <div>

      <h3 class="text-yellow-400 font-bold text-lg whitespace-nowrap">
        🤔 Why Choose ${otherCam.name} Instead?
      </h3>

      <div class="text-slate-400 mt-1 mb-4">
        ${otherCam.sensor}
      </div>

      <ul class="space-y-2 text-slate-200">
        ${otherReasons.map(reason => `
          <li class="flex items-center gap-2">
            <span class="text-yellow-400">•</span>
            <span>${reason}</span>
          </li>
        `).join('')}
      </ul>

    </div>

  </div>

</div>
    `
          : ''
        }

</div>

`;
    }

        function renderComparisonWinners(activeCams) {

      const winners =
        document.getElementById('comparison-winners');

      const bestPhoto =
        [...activeCams].sort((a, b) =>
          calculatePhotographyScore(b) -
          calculatePhotographyScore(a)
        )[0];

      const bestVideo =
        [...activeCams].sort((a, b) =>
          calculateVideoScore(b) -
          calculateVideoScore(a)
        )[0];

      const bestTravel =
        [...activeCams].sort((a, b) =>
          calculateTravelScore(b) -
          calculateTravelScore(a)
        )[0];
      const overallWinner =
        [...activeCams].sort((a, b) =>
          calculateOverallScore(b) -
          calculateOverallScore(a)
        )[0];

      winners.innerHTML = `
   <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 h-full flex flex-col justify-center">

    <h3 class="text-lg font-bold text-yellow-400 mb-4">
        🏆 Comparison Winners
      </h3>

<div class="space-y-4 text-lg">

        <div>
          📸 Best Photography:
          <span class="text-green-400">
            ${bestPhoto.name}
          </span>
        </div>

        <div>
          🎥 Best Video:
          <span class="text-red-400">
            ${bestVideo.name}
          </span>
        </div>

        <div>
          ✈️ Best Travel:
          <span class="text-blue-400">
            ${bestTravel.name}
          </span>
        </div>
<div>
  🥇 Overall Winner:
  <span class="text-yellow-400 font-bold">
    ${overallWinner.name}
  </span>
</div>

      </div>

    </div>
  `;
    }

    function renderComparisonBasedOn() {

      const useCase =
        document.getElementById(
          'use-case-selector'
        ).value;

      const container =
        document.getElementById(
          'comparison-based-on'
        );

      switch (useCase) {

        case 'travel':

          container.innerHTML = `
        <div class="bg-slate-900 border border-blue-500 rounded-xl p-5">

          <h3 class="text-lg font-bold text-blue-400 mb-4">
            ✈️ Comparison Based On: Travel Photography
          </h3>

          <div class="grid md:grid-cols-2 gap-4 text-lg">

            <div>✅ Weight</div>
            <div>✅ IBIS</div>
            <div>✅ Battery Life</div>
            <div>✅ Autofocus</div>
            <div>✅ Portability</div>
            <div>✅ Weather Sealing</div>

          </div>

        </div>
      `;
          break;

        case 'video':

          container.innerHTML = `
        <div class="bg-slate-900 border border-red-500 rounded-xl p-5">

          <h3 class="text-lg font-bold text-red-400 mb-4">
            🎥 Comparison Based On: Video Production
          </h3>

          <div class="grid md:grid-cols-3 gap-3">

            <div>✅ Frame Rate</div>
            <div>✅ RAW Output</div>
            <div>✅ HDMI</div>
            <div>✅ Recording Limit</div>
            <div>✅ Stabilization</div>
            <div>✅ Video Quality</div>

          </div>

        </div>
      `;
          break;

        case 'content':

          container.innerHTML = `
        <div class="bg-slate-900 border border-green-500 rounded-xl p-5">

          <h3 class="text-lg font-bold text-green-400 mb-4">
            📱 Comparison Based On: Content Creation
          </h3>

          <div class="grid md:grid-cols-3 gap-3">

            <div>✅ Autofocus</div>
            <div>✅ Video Quality</div>
            <div>✅ IBIS</div>
            <div>✅ Screen Articulation</div>
            <div>✅ Weight</div>
            <div>✅ Battery Life</div>

          </div>

        </div>
      `;
          break;

        case 'disney':

          container.innerHTML = `
        <div class="bg-slate-900 border border-purple-500 rounded-xl p-5">

          <h3 class="text-lg font-bold text-purple-400 mb-4">
            🏰 Comparison Based On: Tokyo Disney Resort
          </h3>

          <div class="grid md:grid-cols-3 gap-3">

            <div>✅ Weight</div>
            <div>✅ Low Light Performance</div>
            <div>✅ IBIS</div>
            <div>✅ Autofocus Tracking</div>
            <div>✅ Battery Life</div>
            <div>✅ All-Day Comfort</div>

          </div>

        </div>
      `;
          break;

        default:

          container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700 rounded-xl p-5">

      <h3 class="text-lg font-bold text-slate-300 mb-3">
        🎯 Comparison Based On
      </h3>

      <p class="text-slate-400">
        Select a shooting scenario to see which specifications are being prioritised.
      </p>

    </div>
  `;

          break;
      }

    }

    function renderSensorFormatAnalysis(activeCams) {

      if (activeCams.length !== 2) {
        document.getElementById(
          'sensor-format-analysis'
        ).innerHTML = '';

        return;
      }

      const cam1 = activeCams[0];
      const cam2 = activeCams[1];

      const cam1Full =
        cam1.sensor.includes('Full-Frame');

      const cam2Full =
        cam2.sensor.includes('Full-Frame');

      const container =
        document.getElementById(
          'sensor-format-analysis'
        );

      // APS-C vs Full Frame

      if (cam1Full !== cam2Full) {

        const apsc =
          cam1Full ? cam2 : cam1;

        const fullFrame =
          cam1Full ? cam1 : cam2;

        container.innerHTML = `
      <div class="bg-slate-900 border border-purple-500 rounded-xl p-5">

        <h3 class="text-lg font-bold text-purple-400 mb-4">
          📷 APS-C vs Full Frame
        </h3>

        <div class="grid md:grid-cols-2 gap-4">

          <div>

            <h4 class="text-lg font-bold text-green-400 mb-3">
              Choose ${apsc.name} (APS-C) if:
            </h4>

           <ul class="space-y-3 text-lg">

              <li>✅ Smaller and lighter kit</li>
              <li>✅ Easier travel setup</li>
              <li>✅ Better lens value</li>
              <li>✅ Great for Disney and day-long trips</li>
              <li>✅ More reach for performers and parades</li>

            </ul>

          </div>

          <div>

            <h4 class="text-lg font-bold text-cyan-400 mb-3">
              Choose ${fullFrame.name} (Full Frame) if:
            </h4>

            <ul class="space-y-2 text-lg">

              <li>✅ Better low-light image quality</li>
              <li>✅ Cleaner high ISO photos</li>
              <li>✅ More background blur</li>
              <li>✅ Better dynamic range</li>
              <li>✅ Highest image quality potential</li>

            </ul>

          </div>

        </div>

      </div>
    `;

        return;
      }

      // BOTH FULL FRAME

      if (cam1Full && cam2Full) {

        container.innerHTML = `
      <div class="bg-slate-900 border border-yellow-500 rounded-xl p-5">

        <h3 class="text-lg font-bold text-yellow-400 mb-4">
          🏆 Full Frame Comparison
        </h3>

        <div class="grid md:grid-cols-2 gap-4 text-lg">

          <div>

            <h4 class="text-lg font-bold text-blue-400 mb-3">
              Why Choose ${cam1.name}
            </h4>

            <ul class="space-y-2 text-lg">

              <li>✅ Resolution: ${cam1.effectiveResolution}</li>
              <li>✅ Weight: ${cam1.weight}</li>
              <li>✅ Video: ${cam1.video}</li>

            </ul>

          </div>

          <div>

            <h4 class="text-lg font-bold text-blue-400 mb-3">
              Why Choose ${cam2.name}
            </h4>

            <ul class="space-y-2 text-lg">

              <li>✅ Resolution: ${cam2.effectiveResolution}</li>
              <li>✅ Weight: ${cam2.weight}</li>
              <li>✅ Video: ${cam2.video}</li>

            </ul>

          </div>

        </div>

      </div>
    `;

        return;
      }

      // BOTH APS-C

      container.innerHTML = `
    <div class="bg-slate-900 border border-blue-500 rounded-xl p-5">

      <h3 class="text-lg font-bold text-blue-400 mb-4">
        🎯 APS-C Comparison
      </h3>

      <div class="grid md:grid-cols-2 gap-8">

        <div>

          <h4 class="text-lg font-bold mb-3">
            ${cam1.name}
          </h4>

          <ul class="space-y-2 text-lg">

            <li>✅ Resolution: ${cam1.effectiveResolution}</li>
            <li>✅ Video: ${cam1.video}</li>
            <li>✅ Weight: ${cam1.weight}</li>

          </ul>

        </div>

        <div>

          <h4 class="text-lg font-bold mb-3">
            ${cam2.name}
          </h4>

          <ul class="space-y-2 text-lg">

            <li>✅ Resolution: ${cam2.effectiveResolution}</li>
            <li>✅ Video: ${cam2.video}</li>
            <li>✅ Weight: ${cam2.weight}</li>

          </ul>

        </div>

      </div>

    </div>
  `;
    }



      renderSensorFormatAnalysis(activeCams);

      renderRecommendation(activeCams);

      renderComparisonWinners(activeCams);

      renderCameraAnalysis(activeCams);

    }

    