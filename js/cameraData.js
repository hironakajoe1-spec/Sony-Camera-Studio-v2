const camerasData = [
{
  id: 'a6400',
  name: 'Sony a6400',
  image: 'images/a6400.avif',

  prices: {
    sony: 139800,
    amazon: 129800,
    used: 95000
  },

  sensor: '24.2 MP APS-C Exmor CMOS',  effectiveResolution: '24.2 MP',
  sensorSize: '23.5 x 15.6 mm',

  processor: 'BIONZ X',
  lensMount: 'Sony E',

  ibis: 'None',
  af: '425 Phase-Detect Points',
  burst: '11 fps',

  iso: '100-32000',
  shutter: '1/4000 - 30 sec',
  buffer: '116 JPEG',

  video: '4K 30p 8-bit',
  videoRaw: 'No',
  recordingLimit: 'Approx. 30 min',

  evf: '2.36M-dot OLED',
  lcd: '3.0-inch Tilting LCD',
  lcdResolution: '921k dots',

  cardSlots: '1 SD UHS-I',
  usb: 'Micro USB',
  hdmi: 'Micro HDMI',
  headphone: 'No',
  microphone: 'Yes',

  wifi: 'Yes',
  bluetooth: 'Yes',

  battery: 'NP-FW50',
  batteryLife: '410 shots',

  dimensions: '120 x 67 x 60 mm',
  weight: '403g',
weatherSealed: 'No'
},
     {
  id: 'a6700',
  name: 'Sony a6700',

image: 'images/a6700.webp',

prices: {
sony: 229900,
amazon: 209800,
used: 175000
},

  sensor: '26.0 MP APS-C BSI CMOS',
  effectiveResolution: '26 MP',
  sensorSize: '23.5 x 15.6 mm',

  processor: 'BIONZ XR + AI Unit',
  lensMount: 'Sony E',

  ibis: '5-Axis (5 stops)',
  af: '759 Phase-Detect Points',
  burst: '11 fps',

  iso: '100-32000',
  shutter: '1/8000 - 30 sec',
  buffer: '1000+ JPEG',

  video: '4K 120p 10-bit 4:2:2',
  videoRaw: '16-bit RAW Output',
  recordingLimit: 'Unlimited',

  evf: '2.36M-dot OLED',
  lcd: '3.0-inch Vari-angle',
  lcdResolution: '1.03M dots',

  cardSlots: '1 SD UHS-II',
  usb: 'USB-C 3.2',
  hdmi: 'Micro HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Yes',
  bluetooth: 'Yes',

  battery: 'NP-FZ100',
  batteryLife: '570 shots',

  dimensions: '122 x 69 x 75 mm',
  weight: '493g',
  weatherSealed: 'Yes'
},
     {
  id: 'fx30',
  name: 'Sony FX30',

  image: 'images/fx30.avif',

  prices: {
    sony: 264900,
    amazon: 249800,
    used: 215000
  },

  sensor: '26.0 MP APS-C BSI CMOS',
  effectiveResolution: '26 MP',
  sensorSize: '23.5 x 15.6 mm',

  processor: 'BIONZ XR',
  lensMount: 'Sony E',

  ibis: '5-Axis Active Stabilization',
  af: '495 Phase-Detect Points',
  burst: '10 fps',

  iso: '100-32000 Dual Base',
  shutter: '1/8000 - 30 sec',
  buffer: 'Large',

  video: '4K 120p 10-bit 4:2:2',
  videoRaw: '16-bit RAW',
  recordingLimit: 'Unlimited',

  evf: 'None',
  lcd: '3.0-inch Vari-angle',
  lcdResolution: '2.36M dots',

  cardSlots: 'Dual CFexpress A / SD',
  usb: 'USB-C 3.2',
  hdmi: 'Full Size HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Yes',
  bluetooth: 'Yes',

  battery: 'NP-FZ100',
  batteryLife: 'Approx. 95 min video',

  dimensions: '130 x 78 x 85 mm',
  weight: '646g',
  weatherSealed: 'Yes'
},
      {
  id: 'a7c2',
  name: 'Sony a7C II',

image: 'images/a7c2.avif',

prices: {
sony: 328900,
amazon: 299800,
used: 259800
},

  sensor: '33.0 MP Full-Frame BSI',
  effectiveResolution: '33 MP',
  sensorSize: '35.9 × 23.9 mm',
  processor: 'BIONZ XR + AI Unit',

  lensMount: 'Sony E',
  ibis: '5-Axis (7.0 stops)',
  af: '759 Phase-Detect Points',
  burst: '10 fps',

  iso: '100-51200',
  shutter: '1/8000 - 30 sec',
  buffer: '1000+ JPEG',

  video: '4K 60p 10-bit 4:2:2',
  videoRaw: '16-bit RAW output',
  recordingLimit: 'No limit',

  evf: '2.36m-dot OLED',
  lcd: '3.0-inch Vari-angle LCD',
  lcdResolution: '1.03m dots',

  cardSlots: '1 SD UHS-II',
  usb: 'USB-C 3.2',
  hdmi: 'Micro HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Wi-Fi 5',
  bluetooth: 'Bluetooth 4.2',

  battery: 'NP-FZ100',
  batteryLife: '540 shots',

  dimensions: '124 x 71 x 63 mm',
  weight: '514g',
  weatherSealed: 'Yes'
},
     {
  id: 'a7m4',
  name: 'Sony a7 IV',

image: 'images/a7m4.avif',

prices: {
  sony: 349900,
  amazon: 319800,
  used: 279800
},

  sensor: '33 MP Full-Frame BSI CMOS',
  effectiveResolution: '33 MP',
  sensorSize: '35.9 x 23.9 mm',

  processor: 'BIONZ XR',
  lensMount: 'Sony E',

  ibis: '5-Axis (5.5 stops)',
  af: '759 Phase-Detect Points',
  burst: '10 fps',

  iso: '100-51200',
  shutter: '1/8000 - 30 sec',
  buffer: '800+ JPEG',

  video: '4K 60p 10-bit 4:2:2',
  videoRaw: '16-bit RAW',
  recordingLimit: 'Unlimited',

  evf: '3.68M-dot OLED',
  lcd: '3.0-inch Vari-angle',
  lcdResolution: '1.03M dots',

  cardSlots: 'Dual SD / CFexpress A',
  usb: 'USB-C 3.2',
  hdmi: 'Full Size HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Yes',
  bluetooth: 'Yes',

  battery: 'NP-FZ100',
  batteryLife: '580 shots',

  dimensions: '131 x 96 x 80 mm',
  weight: '658g',
  weatherSealed: 'Yes'
},

{
  id: 'a7v',
  name: 'Sony a7 V',

  image: 'images/A7v.webp',

  prices: {
    sony: 429900,
    amazon: 399800,
    used: 0
  },

  sensor: '44 MP Full-Frame BSI CMOS',
  effectiveResolution: '44 MP',
  sensorSize: '35.9 x 23.9 mm',

  processor: 'BIONZ XR + AI Unit',
  lensMount: 'Sony E',

  ibis: '5-Axis (8 stops)',
  af: '759 Phase-Detect Points',
  burst: '10 fps',

  iso: '100-51200',
  shutter: '1/8000 - 30 sec',
  buffer: '1000+ JPEG',

  video: '4K 60p 10-bit 4:2:2',
  videoRaw: '16-bit RAW',
  recordingLimit: 'Unlimited',

  evf: '3.68M-dot OLED',
  lcd: '3.2-inch Vari-angle',
  lcdResolution: '2.1M dots',

  cardSlots: 'Dual SD / CFexpress A',
  usb: 'USB-C 3.2',
  hdmi: 'Full Size HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Wi‑Fi 5',
  bluetooth: 'Bluetooth 5.0',

  battery: 'NP-FZ100',
  batteryLife: '610 shots',

  dimensions: '131 x 97 x 82 mm',
  weight: '743g',
  weatherSealed: 'Yes'
},

     {
  id: 'a7cr',
  name: 'Sony a7CR',

image: 'images/a7cr.avif',

prices: {
  sony: 449900,
  amazon: 419800,
  used: 369800
},

  sensor: '61 MP Full-Frame BSI CMOS',
  effectiveResolution: '61 MP',
  sensorSize: '35.9 x 23.9 mm',

  processor: 'BIONZ XR + AI Unit',
  lensMount: 'Sony E',

  ibis: '5-Axis (7 stops)',
  af: '693 Phase-Detect Points',
  burst: '8 fps',

  iso: '100-32000',
  shutter: '1/8000 - 30 sec',
  buffer: '1000+ JPEG',

  video: '4K 60p 10-bit 4:2:2',
  videoRaw: '16-bit RAW',
  recordingLimit: 'Unlimited',

  evf: '2.36M-dot OLED',
  lcd: '3.0-inch Vari-angle',
  lcdResolution: '1.03M dots',

  cardSlots: '1 SD UHS-II',
  usb: 'USB-C 3.2',
  hdmi: 'Micro HDMI',
  headphone: 'Yes',
  microphone: 'Yes',

  wifi: 'Yes',
  bluetooth: 'Yes',

  battery: 'NP-FZ100',
  batteryLife: '530 shots',

  dimensions: '124 x 71 x 63 mm',
  weight: '515g',
  weatherSealed: 'Yes'
}

    ];
