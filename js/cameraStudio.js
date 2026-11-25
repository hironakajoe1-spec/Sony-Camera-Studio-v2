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
