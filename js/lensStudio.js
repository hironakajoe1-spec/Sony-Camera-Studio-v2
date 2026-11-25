function initLensStudio() {

      const grid =
        document.getElementById(
          'lens-card-grid'
        );

      const lensType =
        document.getElementById(
          'lens-type-selector'
        )?.value || '';

      const lensFormat =
        document.getElementById(
          'lens-format-selector'
        )?.value || '';

      const lensUseCase =
        document.getElementById(
          'lens-usecase-selector'
        )?.value || '';

      const priceSource =
        document.getElementById(
          'lens-price-source'
        )?.value || '';

      let filteredLenses = lensesData;

      if (lensType === 'wide') {
        filteredLenses = filteredLenses.filter(
          lens => lens.type === 'Wide Angle Zoom'
        );
      }

      if (lensType === 'standard') {
        filteredLenses = filteredLenses.filter(
          lens => lens.type === 'Standard Zoom'
        );
      }

      if (lensType === 'travelzoom') {
        filteredLenses = filteredLenses.filter(
          lens => lens.type === 'Travel Zoom'
        );
      }

      if (lensType === 'telephoto') {
        filteredLenses = filteredLenses.filter(
          lens => lens.type.includes('Telephoto')
        );
      }

      if (lensFormat === 'apsc') {
        filteredLenses = filteredLenses.filter(
          lens => lens.format === 'APS-C'
        );
      }

      if (lensFormat === 'fullframe') {
        filteredLenses = filteredLenses.filter(
          lens => lens.format === 'Full Frame'
        );
      }

      // =========================
      // USE CASE FILTER
      // =========================

      if (lensUseCase === 'travel') {
        filteredLenses = filteredLenses.filter(
          lens => ['20-70g', '18-135'].includes(lens.id)
        );
      }

      if (lensUseCase === 'landscape') {
        filteredLenses = filteredLenses.filter(
          lens => ['16-35gm2', '20-70g'].includes(lens.id)
        );
      }

      if (lensUseCase === 'sports') {
        filteredLenses = filteredLenses.filter(
          lens => ['70-200gm2', '70-350g'].includes(lens.id)
        );
      }

      if (lensUseCase === 'wildlife') {
        filteredLenses = filteredLenses.filter(
          lens => ['70-350g', '70-200gm2'].includes(lens.id)
        );
      }

      if (lensUseCase === 'disney') {
        filteredLenses = filteredLenses.filter(
          lens => ['20-70g', '18-135', '70-350g'].includes(lens.id)
        );
      }

      if (lensUseCase === 'family') {
        filteredLenses = filteredLenses.filter(
          lens => ['24-70gm2', '20-70g', '18-135'].includes(lens.id)
        );
      }

      grid.innerHTML = filteredLenses.map(lens => `

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

<img
  src="${lens.image}"
  alt="${lens.name}"
  class="w-full h-40 object-contain mb-3"
>

<h3 class="text-lg font-bold text-white">
  ${lens.name}
</h3>

<div class="mt-1 flex justify-between items-center text-slate-300">

  <span>
    📷 ${lens.type}
  </span>

  ${priceSource
          ? `
      <span class="text-green-400 font-bold">
        ¥${lens.prices[priceSource].toLocaleString()}
      </span>
      `
          : ''
        }

</div>

  <div class="
    mt-3
    flex
    gap-5
    text-base
    text-slate-200
    font-medium
  ">
    <span>🔍 ${lens.focalLength}</span>
    <span>🌙 ${lens.aperture}</span>
    <span>⚖️ ${lens.weight}</span>
  </div>

  <div class="flex flex-wrap gap-1 mt-3">
    ${getLensFeatureBadges(lens.features)}
  </div>

  <button
    onclick="toggleLens('${lens.id}')"
    class="
      mt-4
      w-full
      py-2
      rounded-lg
      text-white
      ${selectedLenses.includes(lens.id)
          ? 'bg-red-600'
          : 'bg-blue-600'
        }
    "
  >
    ${selectedLenses.includes(lens.id)
          ? 'Remove'
          : 'Compare'
        }
  </button>

</div>

`).join('');

      renderLensComparison();

    }

     function toggleLens(id) {

      const previousCount =
        selectedLenses.length;
      if (
        !selectedLenses.includes(id) &&
        selectedLenses.length >= MAX_LENSES
      ) {
        alert(
          'You can compare up to 4 lenses at once.'
        );
        return;
      }

      if (selectedLenses.includes(id)) {

        selectedLenses =
          selectedLenses.filter(
            lensId => lensId !== id
          );

      } else {

        selectedLenses.push(id);

      }

      initLensStudio();

      renderLensComparison();

      if (
        selectedLenses.length >= 2 &&
        selectedLenses.length > previousCount
      ) {

        setTimeout(() => {

          document
            .getElementById(
              'lens-comparison-container'
            )
            .scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

        }, 100);

      }

    }

     function renderLensComparison() {

      const container =
        document.getElementById(
          'lens-comparison-container'
        );

      if (selectedLenses.length === 0) {

        container.innerHTML = '';

        document.getElementById(
          'lens-analysis'
        ).innerHTML = '';

        document.getElementById(
          'lens-feature-matrix'
        ).innerHTML = '';

        return;

      }

      const activeLenses =
        lensesData.filter(
          lens =>
            selectedLenses.includes(lens.id)
        );

      container.innerHTML = `

<div class="mb-4">

  <h2 class="text-xl font-bold text-white">
    🔭 Lens Comparison
  </h2>

  <p class="text-slate-400 mt-1">
    Side-by-side comparison of core lens specifications to help identify differences in range, speed, portability and system compatibility.
  </p>

</div>
<div class="
  bg-slate-900
  border
  border-slate-800
  rounded-xl
  p-4
  min-h-[260px]
  overflow-x-auto
">

      <table class="w-full text-left">

        <thead>

          <tr>

            <th class="p-2 text-slate-300">
              Specification
            </th>

            ${activeLenses.map(lens => `
              <th class="p-2 text-blue-400">
                ${lens.name}
              </th>
            `).join('')}

          </tr>

        </thead>

        <tbody>

          <tr>
            <td class="p-2">Focal Length</td>

            ${activeLenses.map(lens => `
              <td class="p-2">
                ${lens.focalLength}
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-2">Aperture</td>

            ${activeLenses.map(lens => `
              <td class="p-2">
                ${lens.aperture}
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-2">Weight</td>

            ${activeLenses.map(lens => `
              <td class="p-2">
                ${lens.weight}
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-2">Format</td>

            ${activeLenses.map(lens => `
              <td class="p-2">
                ${lens.format}
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-2">Weather Sealed</td>

            ${activeLenses.map(lens => `
              <td class="p-2">
                ${lens.weatherSealed}
              </td>
            `).join('')}
          </tr>

        </tbody>

      </table>

    </div>

  `;

      renderLensAnalysis(activeLenses);

      renderLensFeatureCards(activeLenses);

    }

    const featureImpacts = {

      'GM':
        'Sony premium optical design for maximum sharpness and image quality.',

      'G':
        'High optical quality with strong sharpness and colour reproduction.',

      'XA':
        'Improves edge-to-edge sharpness, reduces distortion and produces smoother bokeh.',

      'ED':
        'Reduces chromatic aberration and colour fringing.',

      'Super ED':
        'Further suppresses colour fringing in high contrast scenes.',

      'Aspherical':
        'Helps reduce distortion and improves corner sharpness.',

      'Nano AR II':
        'Improves flare resistance and contrast when shooting into bright light.',

      'IF':
        'Improves autofocus speed but has little direct effect on image quality.',

      'OSS':
        'Helps keep images sharper when shooting handheld at slower shutter speeds.',

      'I/A Ring':
        'No image quality improvement. Improves aperture control.',

      'I/A Lock':
        'No image quality improvement. Prevents accidental aperture changes.'

    };

      function renderLensAnalysis(activeLenses) {

      const container =
        document.getElementById(
          'lens-analysis'
        );

      container.innerHTML = `

<div class="mb-4">

  <h2 class="text-xl font-bold text-white">
    🔬 Optical Comparison
  </h2>

  <p class="text-slate-400 mt-1">
    Optical strengths and real-world considerations of each lens.
  </p>

</div>

<div class="grid md:grid-cols-2 gap-4">

${activeLenses.map(lens => {

        const strengths = [];
        const considerations = [];

        if (lens.features.includes('GM')) {
          strengths.push(
            'Premium G Master optical design'
          );
        }

        if (lens.features.includes('XA')) {
          strengths.push(
            'XA elements improve sharpness and bokeh quality'
          );
        }

        if (
          lens.features.includes('ED') ||
          lens.features.includes('Super ED')
        ) {
          strengths.push(
            'Advanced ED glass reduces chromatic aberration'
          );
        }

        if (lens.features.includes('Nano AR II')) {
          strengths.push(
            'Excellent flare and ghosting resistance'
          );
        }

        if (lens.aperture === 'F2.8') {
          strengths.push(
            'Constant F2.8 aperture for low-light shooting'
          );
        }

        if (lens.features.includes('OSS')) {
          strengths.push(
            'Optical image stabilisation for handheld shooting'
          );
        }

        switch (lens.id) {

          case '16-35gm2':
            considerations.push(
              'Ultra-wide perspective may require distortion correction'
            );
            considerations.push(
              'Less subject compression than telephoto lenses'
            );
            break;

          case '24-70gm2':
            considerations.push(
              'Less reach than telephoto zoom lenses'
            );
            break;

          case '20-70g':
            considerations.push(
              'F4 aperture gathers less light than F2.8 alternatives'
            );
            break;

          case '70-200gm2':
            considerations.push(
              'Largest and heaviest lens in the lineup'
            );
            break;

          case '70-350g':
            considerations.push(
              'APS-C only lens'
            );
            considerations.push(
              'Variable aperture limits low-light performance'
            );
            break;

          case '18-135':
            considerations.push(
              'Designed for versatility over maximum optical performance'
            );
            considerations.push(
              'Variable aperture limits low-light performance'
            );
            break;
        }

        return `

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

  <h3 class="
    text-lg
    font-bold
    text-blue-400
    mb-3
  ">
    ${lens.name}
  </h3>

  <div class="grid md:grid-cols-2 gap-4">

    <div>

      <h4 class="text-green-400 font-bold mb-2">
        ✅ Strengths
      </h4>

      <ul class="space-y-2">
        ${strengths.map(item => `
          <li>${item}</li>
        `).join('')}
      </ul>

    </div>

    <div>

<h4 class="text-yellow-400 font-bold mb-2">
  ⚠️ Optical Considerations
</h4>

      <ul class="space-y-2">
       ${considerations.map(item => `
          <li>${item}</li>
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

    function renderLensFeatureCards(activeLenses) {

      const container =
        document.getElementById(
          'lens-feature-matrix'
        );

      const categories = {

        optics: [
          'GM',
          'G',
          'XA',
          'ED',
          'Super ED',
          'Aspherical'
        ],

        coatings: [
          'Nano AR II',
          'F Coating'
        ],

        mechanics: [
          'IF',
          'LR MF',
          'Floating F',
          'XD LM',
          'LM'
        ],

        controls: [
          'I/A Ring',
          'I/A Click',
          'I/A Lock'
        ],

        stabilization: [
          'OSS',
          'OSS Mode'
        ]

      };

      container.innerHTML = `

    <div class="mb-4">

      <h2 class="text-xl font-bold text-white">
        🔬 Feature Breakdown
      </h2>

      <p class="text-slate-400 mt-1">
        Easier-to-read grouped lens features.
      </p>

    </div>

    <div class="grid lg:grid-cols-2 gap-4">

      ${activeLenses.map(lens => `

        <div class="
          bg-slate-900
          border border-slate-800
          rounded-xl
          p-5
        ">

          <h3 class="
            text-lg
            font-bold
            text-blue-400
            mb-4
          ">
            ${lens.name}
          </h3>

          <div class="space-y-4">

            <div>
              <h4 class="text-yellow-400 font-bold mb-2">
                🏆 Optical Quality
              </h4>

              <ul class="space-y-1">
                ${categories.optics
          .filter(feature =>
            lens.features.includes(feature)
          )
          .map(feature => `
                      <li>✅ ${feature}</li>
                    `)
          .join('')
        }
              </ul>
            </div>

            <div>
              <h4 class="text-purple-400 font-bold mb-2">
                🎨 Coatings
              </h4>

              <ul class="space-y-1">
                ${categories.coatings
          .filter(feature =>
            lens.features.includes(feature)
          )
          .map(feature => `
                      <li>✅ ${feature}</li>
                    `)
          .join('')
        }
              </ul>
            </div>

            <div>
              <h4 class="text-cyan-400 font-bold mb-2">
                ⚙️ Autofocus & Mechanics
              </h4>

              <ul class="space-y-1">
                ${categories.mechanics
          .filter(feature =>
            lens.features.includes(feature)
          )
          .map(feature => `
                      <li>✅ ${feature}</li>
                    `)
          .join('')
        }
              </ul>
            </div>

            <div>
              <h4 class="text-green-400 font-bold mb-2">
                🎛 Controls
              </h4>

              <ul class="space-y-1">
                ${categories.controls
          .filter(feature =>
            lens.features.includes(feature)
          )
          .map(feature => `
                      <li>✅ ${feature}</li>
                    `)
          .join('')
        }
              </ul>
            </div>

            <div>
              <h4 class="text-orange-400 font-bold mb-2">
                🛡 Stabilization
              </h4>

              <ul class="space-y-1">
                ${categories.stabilization
          .filter(feature =>
            lens.features.includes(feature)
          )
          .map(feature => `
                      <li>✅ ${feature}</li>
                    `)
          .join('')
        }

                ${!categories.stabilization.some(feature =>
          lens.features.includes(feature)
        )
          ? '<li>❌ No OSS</li>'
          : ''
        }

              </ul>
            </div>

          </div>

        </div>

      `).join('')}

    </div>
  `;
    }

     function getLensFeatureBadges(features = []) {

      const colors = {

        // =========================
        // Lens Families
        // =========================

        'GM': 'bg-[#d46a1f]',       // Orange
        'G': 'bg-[#d2a018]',        // Gold

        // =========================
        // Optical Elements (Blue)
        // =========================

        'Super ED': 'bg-[#1d56a8]',
        'ED': 'bg-[#1d56a8]',
        'ED Asph.': 'bg-[#1d56a8]',
        'Aspherical': 'bg-[#1d56a8]',
        'AA': 'bg-[#1d56a8]',
        'XA': 'bg-[#1d56a8]',

        // =========================
        // Coatings (Purple)
        // =========================

        'Nano AR II': 'bg-[#6d38d4]',
        'F Coating': 'bg-[#7c5aa7]',

        // =========================
        // Internal Focus (Brown)
        // =========================

        'IF': 'bg-[#bb856f]',
        'LR MF': 'bg-[#bb856f]',
        'Floating F': 'bg-[#bb856f]',
        'IZ': 'bg-[#bb856f]',

        // =========================
        // Motors (Olive)
        // =========================

        'XD LM': 'bg-[#9b8c58]',
        'LM': 'bg-[#9b8c58]',

        // =========================
        // Stabilization (Teal)
        // =========================

        'OSS': 'bg-[#4d91a5]',
        'OSS Mode': 'bg-[#4d91a5]',

        // =========================
        // Controls (Green)
        // =========================

        'FHB': 'bg-[#6c9d68]',
        'FRL': 'bg-[#6c9d68]',
        'I/A Ring': 'bg-[#5f9355]',
        'I/A Click': 'bg-[#5f9355]',
        'I/A Lock': 'bg-[#5f9355]',
        'Zoom smth.': 'bg-[#6c9d68]',

        // =========================
        // Body Features (Gray)
        // =========================

        'DMR': 'bg-[#7b8798]',
        'Circular': 'bg-[#8d97a6]'

      };

      return features.map(feature => `
<span
  class="
    ${colors[feature] || 'bg-slate-700'}
    text-white
    text-[11px]
    font-medium
    px-3
    py-[2px]
    rounded-none
  "
>
  ${feature}
</span>
`).join('');
    }
