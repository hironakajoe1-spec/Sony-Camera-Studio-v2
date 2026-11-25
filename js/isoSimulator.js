let isoImage = new Image();

function populateIsoSelectors() {

  const cameraSelector =
    document.getElementById(
      "iso-camera-selector"
    );

  const lensSelector =
    document.getElementById(
      "iso-lens-selector"
    );

  cameraSelector.innerHTML =
    camerasData.map(camera => `
      <option value="${camera.id}">
        ${camera.name}
      </option>
    `).join("");

  lensSelector.innerHTML =
    lensesData.map(lens => `
      <option value="${lens.id}">
        ${lens.name}
      </option>
    `).join("");

}

function getSensorFactor(camera) {

  if (
    camera &&
    camera.sensor.includes(
      "Full-Frame"
    )
  ) {
    return 0.65;
  }

  return 1.0;
}

function getLensFactor(lens) {

  if (!lens) return 1;

  const match =
    lens.aperture.match(
      /(\d+(\.\d+)?)/
    );

  if (!match) return 1;

  return Number(match[1]) / 2.8;
}

function initIsoSimulator() {


  const canvas =
    document.getElementById("isoCanvas");

  if (!canvas) return;

  populateIsoSelectors();

  isoImage.src = "images/a6700.webp";

  isoImage.onload = () => {

    console.log("Image loaded");

    renderISO(100);

  };

  isoImage.onerror = () => {

    console.error("Image failed to load");

  };

  document
    .getElementById("isoSlider")
    .addEventListener("input", (e) => {

      const iso =
        Number(e.target.value);

      document
        .getElementById("isoValue")
        .textContent = iso;

      renderISO(iso);

    });

    document
  .getElementById(
    "iso-camera-selector"
  )
  .addEventListener(
    "change",
    () =>
      renderISO(
        Number(
          document.getElementById(
            "isoSlider"
          ).value
        )
      )
  );

document
  .getElementById(
    "iso-lens-selector"
  )
  .addEventListener(
    "change",
    () =>
      renderISO(
        Number(
          document.getElementById(
            "isoSlider"
          ).value
        )
      )
  );

}

function renderISO(iso) {

  const canvas =
    document.getElementById("isoCanvas");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(
    isoImage,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imageData =
    ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

  const data =
    imageData.data;

const selectedCameraId =
  document.getElementById(
    "iso-camera-selector"
  ).value;

const selectedLensId =
  document.getElementById(
    "iso-lens-selector"
  ).value;

const camera =
  camerasData.find(
    c => c.id === selectedCameraId
  );

const lens =
  lensesData.find(
    l => l.id === selectedLensId
  );

const sensorFactor =
  getSensorFactor(camera);

const lensFactor =
  getLensFactor(lens);

const effectiveISO =
  iso *
  sensorFactor *
  lensFactor;

const noiseAmount =
  Math.min(
    effectiveISO / 150,
    255
  );

  for (
    let i = 0;
    i < data.length;
    i += 4
  ) {

    const noise =
      (Math.random() - 0.5)
      * noiseAmount;

    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;

  }

  ctx.putImageData(
    imageData,
    0,
    0
  );

}