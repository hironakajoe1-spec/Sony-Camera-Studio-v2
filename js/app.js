function showTab(tab) {

  const cameraSection = document.getElementById('view-camera');
  const lensSection = document.getElementById('view-lens');
  const savingsSection = document.getElementById('view-savings');
  const plannerSection = document.getElementById('view-planner');
  const isoSection = document.getElementById('view-iso');

  const cameraTab = document.getElementById('camera-tab');
  const lensTab = document.getElementById('lens-tab');
  const savingsTab = document.getElementById('savings-tab');
  const plannerTab = document.getElementById('planner-tab');
  const isoTab = document.getElementById('iso-tab');

  // Hide all sections
  cameraSection.style.display = 'none';
  lensSection.style.display = 'none';
  savingsSection.style.display = 'none';
  plannerSection.style.display = 'none';
  isoSection.style.display = 'none';

  // Reset all tabs
  cameraTab.className = 'px-4 py-2 rounded-lg bg-slate-800 text-white font-medium';
  lensTab.className = 'px-4 py-2 rounded-lg bg-slate-800 text-white font-medium';
  savingsTab.className = 'px-4 py-2 rounded-lg bg-slate-800 text-white font-medium';
  plannerTab.className = 'px-4 py-2 rounded-lg bg-slate-800 text-white font-medium';
  isoTab.className = 'px-4 py-2 rounded-lg bg-slate-800 text-white font-medium';

  // Activate selected tab
  if (tab === 'camera') {
    cameraSection.style.display = 'block';
    cameraTab.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-medium';
  }

  if (tab === 'lens') {
    lensSection.style.display = 'block';
    lensTab.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-medium';
  }

  if (tab === 'savings') {
    savingsSection.style.display = 'block';
    savingsTab.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-medium';
  }

  if (tab === 'planner') {
    plannerSection.style.display = 'block';
    plannerTab.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-medium';
  }

  if (tab === 'iso') {
    isoSection.style.display = 'block';
    isoTab.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-medium';
  }

}

 function scrollToTop() {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

    function getCameraBadge(cam) {

      switch (cam.id) {

        case 'a6400':
          return '🪶 Lightest Camera';

        case 'a6700':
          return '🏆 Best APS-C All-Rounder';

        case 'fx30':
          return '🎬 Best Video Camera';

        case 'a7c2':
          return '✈️ Best Travel Full-Frame';

        case 'a7m4':
          return '⚖️ Best All-Rounder';

        case 'a7v':
          return 'Latest Hybrid Camera';

        case 'a7cr':
          return '📸 Highest Resolution';

        default:
          return '';
      }
    }

 window.addEventListener(
      'DOMContentLoaded',
      () => {

        document
          .getElementById('csv-upload')
          .addEventListener(
            'change',
            handleCSVUpload
          );

        document
          .getElementById('camera-price-source')
          .addEventListener('change', () => {
            initCameraStudio();
          });

        document
          .getElementById('gear-goal')
          .addEventListener('input', () => {

            calculateSavings();
            saveSavingsData();

          });

        document
          .getElementById('monthly-spending')
          .addEventListener('input', () => {

            calculateSavings();
            saveSavingsData();

          });

        document
          .getElementById('current-savings')
          .addEventListener('input', () => {

            calculateSavings();
            saveSavingsData();

          });

        document
          .getElementById('monthly-savings')
          .addEventListener('input', () => {

            calculateSavings();
            saveSavingsData();

          });

        initCameraStudio();
        initLensStudio();
        initGearSavings();

        loadSavingsData();

        calculateSavings();

        initIsoSimulator();

        // Lens filter
        document
          .getElementById('lens-type-selector')
          .addEventListener('change', () => {
            selectedLenses = [];
            initLensStudio();
          });

        document
          .getElementById('lens-format-selector')
          .addEventListener('change', () => {
            selectedLenses = [];
            initLensStudio();
          });

        document
          .getElementById('lens-usecase-selector')
          .addEventListener('change', () => {
            selectedLenses = [];
            initLensStudio();
          });

        document
          .getElementById('lens-price-source')
          .addEventListener('change', () => {
            initLensStudio();
          });

        document
          .getElementById('use-case-selector')
          .addEventListener('change', () => {

            renderCameraComparison();

            const useCase =
              document.getElementById(
                'use-case-selector'
              ).value;

            if (useCase !== '') {

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

          });

      }
    );