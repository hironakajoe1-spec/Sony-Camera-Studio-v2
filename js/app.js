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