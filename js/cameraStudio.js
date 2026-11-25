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

      renderSensorFormatAnalysis(activeCams);

      renderRecommendation(activeCams);

      renderComparisonWinners(activeCams);

      renderCameraAnalysis(activeCams);

    }