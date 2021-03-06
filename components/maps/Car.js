import { useEffect, useRef, useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import useWindowDimensions from "../../helpers/getWindowDimensions";
import { getKey, iconUrl } from "../../helpers/helpers";
import MenuBottom from "./MenuBottom";

const Car = ({ data, fbData, duration }) => {
  const { heightWithoutNav } = useWindowDimensions();
  const [map, setMap] = useState(null);
  const layersControl = useRef(null);
  const allData = { ...data, ...fbData };

  const changePos = (pos, da) => {
    const popupOptions = { className: "customPopup" };
    const template = `
    <div class="popup-container">
    <div className='popup-first'>
    <p  class="serial"> ${da?.DisplayName}</p>
    <div class='popup-content'>
    <div class='popup-group'>
    <div class='inner'><?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 19.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="20px" height="20px" fill='#246c66' viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve">
    <path d="M46,0C20.6,0,0,20.6,0,46s20.6,46,46,46s46-20.6,46-46S71.4,0,46,0z M46,84C25,84,8,67,8,46S25,8,46,8s38,17,38,38
      S67,84,46,84z M61.3,55.6c1.6,1.6,1.6,4.1,0,5.7c-0.8,0.8-1.8,1.2-2.8,1.2s-2-0.4-2.8-1.2L43.2,48.8C42.4,48.1,42,47.1,42,46V22.2
      c0-2.2,1.8-4,4-4s4,1.8,4,4v22.2L61.3,55.6z"/>
    </svg> <p title='Record Date'>${da?.RecordDateTime.replace(
      "T",
      " "
    )}</p></div>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 512 512"><title>ionicons-v5-q</title><path d="M326.1,231.9l-47.5,75.5a31,31,0,0,1-7,7,30.11,30.11,0,0,1-35-49l75.5-47.5a10.23,10.23,0,0,1,11.7,0A10.06,10.06,0,0,1,326.1,231.9Z"/><path d="M256,64C132.3,64,32,164.2,32,287.9A223.18,223.18,0,0,0,88.3,436.4c1.1,1.2,2.1,2.4,3.2,3.5a25.19,25.19,0,0,0,37.1-.1,173.13,173.13,0,0,1,254.8,0,25.19,25.19,0,0,0,37.1.1l3.2-3.5A223.18,223.18,0,0,0,480,287.9C480,164.2,379.7,64,256,64Z" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="256" y1="128" x2="256" y2="160" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/><line x1="416" y1="288" x2="384" y2="288" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/><line x1="128" y1="288" x2="96" y2="288" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/><line x1="165.49" y1="197.49" x2="142.86" y2="174.86" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/><line x1="346.51" y1="197.49" x2="369.14" y2="174.86" style="fill:none;stroke:#246c66;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg> <p title='Speed'>${
        da?.Speed
      } km/h</p></div>
      </div>
      <hr/>
      <div class='popup-group'>
      <div class='inner'><?xml version="1.0"  encoding="iso-8859-1"?>
      <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="20px" height="20px" fill='#246c66' viewBox="0 0 95.098 95.098" style="enable-background:new 0 0 95.098 95.098;"
         xml:space="preserve">
      <g>
        <g>
          <path d="M47.549,0C21.288,0,0,21.288,0,47.549s21.288,47.549,47.549,47.549c26.262,0,47.549-21.288,47.549-47.549
            S73.811,0,47.549,0z M47.549,85.098C26.844,85.098,10,68.253,10,47.549S26.844,10,47.549,10s37.549,16.845,37.549,37.549
            S68.254,85.098,47.549,85.098z"/>
          <path d="M77.665,29.911c-0.25-0.428-0.755-0.633-1.231-0.503l-33.783,9.213c-0.186,0.052-0.355,0.151-0.492,0.288L17.596,63.865
            c-0.346,0.354-0.414,0.895-0.164,1.32c0.25,0.428,0.755,0.635,1.232,0.504l33.783-9.214c0.093-0.024,0.182-0.062,0.265-0.11
            c0.083-0.049,0.159-0.108,0.228-0.178l24.562-24.957C77.848,30.879,77.915,30.337,77.665,29.911z M26.705,59.756l16.46-16.725
            l6.179,10.551L26.705,59.756z"/>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>
       <p title='Direction'>${da?.Direction}&#176;</p></div>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 512 512"><path d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"/></svg> <p title='Engine Status'>${
        da?.EngineStatus ? "On" : "Off"
      }</p></div>
      </div>
      <hr/>
      <div class='popup-group'>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M9,7 L15,7 C16.1045695,7 17,7.8954305 17,9 L17,15 C17,16.1045695 16.1045695,17 15,17 L9,17 C7.8954305,17 7,16.1045695 7,15 L7,9 C7,7.8954305 7.8954305,7 9,7 Z M9,9 L9,15 L15,15 L15,9 L9,9 Z"/>
    </svg>
     <p title='Vehicle Status'>${getKey(da?.VehicleStatus)}</p></div>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 24 24">
      <polygon fill-rule="evenodd" points="14 5 14 3 21 3 21 10 19 10 19 6.414 6.414 19 10 19 10 21 3 21 3 14 5 14 5 17.586 17.586 5"/>
    </svg> <p title='Mileage'>${da?.Mileage} km</p></div>
      </div>
    <hr/>
    <div class='popup-group'>
    <div class='inner'><?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="20px" height="20px" fill='#246c66' viewBox="0 0 473.068 473.068" style="enable-background:new 0 0 473.068 473.068;"
       xml:space="preserve">
    <g>
      <g id="Layer_2_32_">
        <g>
          <path d="M355.498,181.955c8.8-6.139,29.396-20.519,29.396-55.351v-71.77h9.819c4.492,0,8.171-3.679,8.171-8.169v-38.5
            c0-4.49-3.679-8.165-8.171-8.165H78.348c-4.494,0-8.164,3.675-8.164,8.165v38.5c0,4.491,3.67,8.169,8.164,8.169h9.822v73.071
            c0,34.499,10.506,42.576,29.068,53.89l80.75,49.203v20.984c-20.336,12.23-73.464,44.242-80.429,49.107
            c-8.792,6.135-29.388,20.51-29.388,55.352v61.793h-9.822c-4.494,0-8.164,3.676-8.164,8.166v38.498c0,4.49,3.67,8.17,8.164,8.17
            h316.365c4.492,0,8.171-3.68,8.171-8.17V426.4c0-4.49-3.679-8.166-8.171-8.166h-9.819v-63.104
            c0-34.493-10.506-42.572-29.073-53.885l-80.741-49.202v-20.987C295.41,218.831,348.541,186.822,355.498,181.955z
             M252.725,272.859l87.797,53.5c6.749,4.109,10.342,6.373,12.001,9.002c1.996,3.164,2.962,9.627,2.962,19.768v63.104H117.571
            v-61.793c0-19.507,9.719-26.289,16.816-31.242c5.545-3.865,54.391-33.389,85.873-52.289c4.422-2.658,7.13-7.441,7.13-12.611
            v-37.563c0-5.123-2.667-9.883-7.053-12.55l-87.806-53.504c-6.736-4.105-10.328-6.369-11.991-9.009
            c-2-3.156-2.971-9.626-2.971-19.767V54.835h237.915v71.77c0,19.5-9.719,26.288-16.812,31.235
            c-5.545,3.872-54.387,33.395-85.873,52.295c-4.426,2.658-7.135,7.442-7.135,12.601v37.563
            C245.666,265.431,248.345,270.188,252.725,272.859z"/>
          <path d="M131.553,359.607c-2,1.494-3.099,2.502-3.099,6.07c0,3.574,0,38.018,0,38.018s-0.394,3.707,3.781,3.707
            c2.026,0,52.428,0.055,103.912,0.111c51.482-0.057,101.888-0.111,103.907-0.111c4.171,0,3.777-3.707,3.777-3.707
            s0-34.442,0-38.018c0-3.568-1.102-4.576-3.094-6.07c-14.13-10.562-76.944-60.125-104.591-60.125
            C208.491,299.48,145.674,349.046,131.553,359.607z"/>
        </g>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
     <p title='Vehicle Status'>${da?.VehicleStatus}</p></div>
    <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 496 512"><path d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"/></svg> <p title='Driver Name'>${
      da?.DriverName
    }</p></div>
      </div>
      <hr/>
      <div class='popup-group'>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 640 512"><path d="M544 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-112c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM96 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-112c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm396.4 210.9c-27.5-40.8-80.7-56-127.8-41.7-14.2 4.3-29.1 6.7-44.7 6.7s-30.5-2.4-44.7-6.7c-47.1-14.3-100.3.8-127.8 41.7-12.4 18.4-19.6 40.5-19.6 64.3V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-44.8c.2-23.8-7-45.9-19.4-64.3zM464 432H176v-44.8c0-36.4 29.2-66.2 65.4-67.2 25.5 10.6 51.9 16 78.6 16 26.7 0 53.1-5.4 78.6-16 36.2 1 65.4 30.7 65.4 67.2V432zm92-176h-24c-17.3 0-33.4 5.3-46.8 14.3 13.4 10.1 25.2 22.2 34.4 36.2 3.9-1.4 8-2.5 12.3-2.5h24c19.8 0 36 16.2 36 36 0 13.2 10.8 24 24 24s24-10.8 24-24c.1-46.3-37.6-84-83.9-84zm-236 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm0-176c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM154.8 270.3c-13.4-9-29.5-14.3-46.8-14.3H84c-46.3 0-84 37.7-84 84 0 13.2 10.8 24 24 24s24-10.8 24-24c0-19.8 16.2-36 36-36h24c4.4 0 8.5 1.1 12.3 2.5 9.3-14 21.1-26.1 34.5-36.2z"/></svg><p title='Group Name'> ${
        da?.GroupName
      }</p></div>
      <div class='inner'><?xml version="1.0" encoding="iso-8859-1"?>
      <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
      <g>
        <g>
          <path d="M466.765,122.029H45.235C20.292,122.029,0,142.322,0,167.264v177.474c0,24.943,20.292,45.235,45.235,45.235h421.531
            c24.942,0,45.235-20.292,45.235-45.235V167.264C512,142.322,491.708,122.029,466.765,122.029z M478.609,344.739
            c0,6.53-5.313,11.844-11.844,11.844H45.235c-6.53,0-11.844-5.313-11.844-11.844v-2.477h445.217V344.739z M478.609,308.871H33.391
            V203.132h445.217V308.871z M478.61,169.74H33.391v-2.477c0-6.53,5.313-11.844,11.844-11.844h421.531
            c6.53,0,11.844,5.313,11.844,11.844V169.74z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M115.594,222.468H102.39l-22.146,59.336h17.299l3.511-11.617h15.795l3.593,11.617h17.217L115.594,222.468z
             M103.475,259.324l5.516-19.89l5.265,19.89H103.475z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M181.526,251.385c5.683-2.508,8.525-8.191,8.525-13.706c0-7.522-5.181-15.21-13.539-15.21H142.08v59.336h29.167
            c11.7-0.001,21.31-4.513,21.31-15.211C192.558,258.322,188.296,253.39,181.526,251.385z M158.377,236.341h11.617
            c2.089,0,3.928,1.253,3.928,4.512c0,3.677-2.257,4.597-4.43,4.597h-11.115V236.341z M171.247,268.099h-12.87v-9.945h13.456
            c2.423,0,4.178,2.173,4.178,5.098C176.011,266.345,173.922,268.099,171.247,268.099z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M235.008,260.578c-1.672,5.348-6.351,7.27-10.112,7.27c-7.522,0-11.951-7.437-11.951-15.712
            c0-7.437,3.594-15.545,11.784-15.545c3.677,0,8.608,1.588,10.53,7.355l12.452-8.859c-3.761-7.772-12.118-12.954-22.648-12.954
            c-18.052,0-28.665,15.044-28.665,29.501c-0.001,15.21,11.616,30.671,28.163,30.671c9.444,0,20.392-5.014,23.735-13.789
            L235.008,260.578z"/>
        </g>
      </g>
      <g>
        <g>
          <rect x="253.473" y="251.638" width="26.159" height="24"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M317.316,267.598v-45.547h-16.214c-0.167,0.335-7.772,7.939-13.789,7.939v14.541c4.514,0,11.952-4.596,13.791-7.187
            v30.254h-11.867v14.208h38.694v-14.208H317.316z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M356.591,267.597c0-3.593,5.432-6.268,10.195-9.026c7.438-4.345,11.784-8.525,11.784-17.717
            c0-12.201-7.771-19.054-21.31-19.054c-10.864,0-19.89,4.43-24.32,9.444l9.778,10.614c3.176-3.092,7.939-6.017,12.285-6.017
            c2.842,0,5.432,1.253,5.432,5.265c0.001,6.101-6.016,9.026-12.954,12.285c-12.703,6.017-14.542,13.037-14.542,28.415h45.715
            v-14.208H356.591z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M416.509,250.047c6.269-1.254,10.781-5.683,10.781-12.118c0-9.194-9.193-16.213-21.562-16.213
            c-7.522,0-16.464,2.591-20.893,7.522l10.029,11.784c1.503-1.923,4.679-5.434,10.947-5.434c0.919,0,4.43,0.083,4.43,3.176
            c0,4.178-6.601,5.6-13.956,5.6h-2.675v13.121h2.758c9.862,0,15.377,1.337,15.377,5.683c0,3.511-3.677,4.847-7.437,4.847
            c-7.605,0-9.945-5.516-10.614-6.184l-8.106,11.031c3.844,6.686,10.195,9.695,19.055,9.695c11.115,0,23.651-4.764,23.651-17.215
            C428.292,257.903,423.78,251.217,416.509,250.047z"/>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg> <p title='Plate Number'>${da?.PlateNumber}</p></div>
      </div>
      <hr/>
      <div class='popup-group'>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 448 512"><path d="M384 0H128L0 128v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V147.9L147.9 48H384c8.8 0 16 7.2 16 16v384zM96 384c0 17.7 14.3 32 32 32h32v-64H96v32zm160-224h-64v64h64v-64zm-64 256h64v-64h-64v64zm-32-256h-32c-17.7 0-32 14.3-32 32v32h64v-64zm128 256h32c17.7 0 32-14.3 32-32v-32h-64v64zm32-256h-32v64h64v-32c0-17.7-14.3-32-32-32zM96 320h256v-64H96v64z"/></svg> <p title='Sim SerialNumber'>${
        da?.SimSerialNumber
      }</p></div>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 640 512"><path d="M360 384h48c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8zm96 0h48c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8zm-160 0h16c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8zM592 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm0 464H48V48h544v416zm-456-80h48c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8zm96 0h16c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8z"/></svg> <p title='Serial Number'>${
        da?.SerialNumber
      }</p></div>
      </div>
      <hr/>
      <div class='popup-group'>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 384 512"><path d="M360 144H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h8c0 80.208 59.02 146.628 136 158.208V512h48v-81.792c76.979-11.58 136-78 136-158.208h8c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zm-24 80h-32v48c0 61.898-50.092 112-112 112-61.898 0-112-50.092-112-112v-48H48v-32h288v32zm-72-96V24c0-13.255 10.745-24 24-24s24 10.745 24 24v104h-48zm-192 0V24C72 10.745 82.745 0 96 0s24 10.745 24 24v104H72z"/></svg> <p title='Battery'>${
        da?.Battery1
      }</p></div>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 448 512"><path d="M160 322.9V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v18.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1zM256 112C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.1 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 464c-52.9 0-96-43.1-96-96 0-27 11.7-47.3 21.5-59.5L80 295.4V112c0-35.3 28.7-64 64-64s64 28.7 64 64v183.3l10.5 13.1C228.3 320.7 240 341 240 368c0 52.9-43.1 96-96 96zM368 0c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 112c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg> <p title='Temp'>${
        da?.Temp1
      }&#176;</p></div>
      </div>
      <hr/>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 512 512"><path d="M16 224h336c59.8 0 106.8-54.6 93.8-116.7-7.6-36.3-36.9-65.6-73.2-73.2-55.9-11.7-105.8 25.4-115.1 76.6-1.6 9 5.8 17.2 14.9 17.2h18.4c7.2 0 12.9-5.2 14.7-12.1 6.6-25.2 33.2-42.4 61.7-33.5 14.3 4.4 25.9 16.1 30.4 30.4 10.3 32.9-14.2 63.3-45.6 63.3H16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16zm144 32H16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h144c31.4 0 55.9 30.3 45.6 63.3-4.4 14.3-16.1 25.9-30.4 30.4-28.5 8.9-55.1-8.3-61.7-33.5-1.8-6.9-7.5-12.1-14.7-12.1H80.5c-9.2 0-16.6 8.2-14.9 17.2 9.3 51.2 59.2 88.3 115.1 76.6 36.3-7.6 65.6-36.9 73.2-73.2C266.8 310.6 219.8 256 160 256zm235.3 0H243.8c5.4 4.8 10.9 9.6 15.5 15.3 8.1 9.9 13.9 21.1 18.6 32.7h119.2c33.4 0 63.3 24.4 66.5 57.6 3.7 38.1-26.3 70.4-63.7 70.4-27.7 0-51.1-17.7-60-42.4-1.2-3.3-4.1-5.6-7.6-5.6h-33.1c-5 0-9 4.6-7.9 9.5C302.9 443 347 480 400 480c63 0 113.8-52 111.9-115.4-1.8-61.3-55.3-108.6-116.6-108.6z"/></svg><p title='Humd'> ${
        da?.Hum1
      }</p></div>
      <hr/>
      <div class='inner'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='#246c66' viewBox="0 0 384 512"><path d="M192 0C86.4 0 0 86.4 0 192c0 76.8 25.6 99.2 172.8 310.4 4.8 6.4 12 9.6 19.2 9.6s14.4-3.2 19.2-9.6C358.4 291.2 384 268.8 384 192 384 86.4 297.6 0 192 0zm0 446.09c-14.41-20.56-27.51-39.12-39.41-55.99C58.35 256.48 48 240.2 48 192c0-79.4 64.6-144 144-144s144 64.6 144 144c0 48.2-10.35 64.48-104.59 198.09-11.9 16.87-25 35.44-39.41 56zm99.93-292.32l-23.21-23.4c-3.85-3.88-10.11-3.9-13.98-.06l-87.36 86.66-37.88-38.19c-3.84-3.88-10.11-3.9-13.98-.06l-23.4 23.21c-3.88 3.85-3.9 10.11-.06 13.98l68.05 68.6c3.85 3.88 10.11 3.9 13.98.06l117.78-116.83c3.88-3.84 3.91-10.1.06-13.97z"/></svg><p title='Address'> ${
        da?.Address ? da?.Address : "You are here"
      }</p></div>
      </div>
      
      </div>
      
      </div>
      `;

    var marker = L.marker(pos, {
      icon: L.divIcon({
        html: `<img src=${iconUrl(
          da?.VehicleStatus
        )} style="width :15px ; height: 35px; -webkit-transform: rotate(${
          allData.Direction
        }deg); -moz-transform:rotate(${allData.Direction}deg);" />`,
      }),
    });
    map?.addLayer(marker);

    if (map) {
      setTimeout((_) => {
        map.flyTo(pos, 15);

        marker.bindPopup(template, popupOptions).openPopup();
      });
    }
    setTimeout(() => {
      map?.removeLayer(marker);
    }, 14800);
  };

  useEffect(() => {
    //console.log(allData, "all Data");
    if (fbData) {
      changePos([allData?.Latitude, allData?.Longitude], allData);
    } else {
      null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbData]);

  return (
    <>
      <MapContainer
        whenCreated={(map) => setMap(map)}
        center={[
          fbData?.Latitude ? fbData?.Latitude : 24.726875,
          fbData?.Longitude ? fbData?.Longitude : 46.710461,
        ]}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: heightWithoutNav, minWidth: "100%" }}
      >
        <LayersControl position="bottomleft" ref={layersControl}>
          <LayersControl.BaseLayer checked name="Google roadmap">
            <ReactLeafletGoogleLayer
              apiKey="AIzaSyA6MAm8eIW4N0WKJ6yco_pUuO0qiWvqj-Y"
              type={"roadmap"}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google hybrid">
            <ReactLeafletGoogleLayer
              apiKey="AIzaSyA6MAm8eIW4N0WKJ6yco_pUuO0qiWvqj-Y"
              type={"hybrid"}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google terrain">
            <ReactLeafletGoogleLayer
              apiKey="AIzaSyA6MAm8eIW4N0WKJ6yco_pUuO0qiWvqj-Y"
              type={"terrain"}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Saferoad">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Saferoad</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
      <MenuBottom duration={duration} />
    </>
  );
};
export default Car;
