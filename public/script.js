// signalk-windy-plugin
// MIT License
// Copyright (c) 2025 Jeremy Waters <jaffadog@gmail.com>"

const BUNDLED_WINDY_COM_KEY = 'CpCi6TjvuhporjSGl4FQzIk0Ou77nEDT';
const DEFAULT_MAP_ZOOM = 6;

var response = await fetch('/plugins/signalk-windy-plugin/key', { credentials: 'include' });
const key = await response.text();

response = await fetch('/signalk/v1/api/vessels/self', { credentials: 'include' });
const self = await response.json();

let position = self.navigation.position.value;

var vesselId;

if (self.mmsi) {
    vesselId = `urn:mrn:imo:mmsi:${self.mmsi}`;
} else {
    vesselId = `${self.uuid}`;
}

let cog = self.navigation.courseOverGroundTrue.value * 180 / Math.PI;

const options = {
    key: key ? key : BUNDLED_WINDY_COM_KEY,
    lat: position.latitude,
    lon: position.longitude,
    zoom: DEFAULT_MAP_ZOOM,
};

windyInit(options, windyAPI => {
    const { map } = windyAPI;

    map.options.minZoom = 4;
    map.options.maxZoom = 17;

    var topLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
    topLayer.setOpacity('0');

    map.on('zoomend', function () {
        if (map.getZoom() >= 12) {
            topLayer.setOpacity('0.5');
        } else {
            topLayer.setOpacity('0');
        }
    });

    const SVGIcon = `
        <svg width="150px" height="50px" viewBox="-50 -50 325 100" pointerEvents="none">
            <g transform="rotate(${cog || 0})" >
                <polygon
                    points="0 -50, 20 30, -20 30"
                    fill="yellow"
                    stroke-width="2"
                    stroke="black"
                    pointer-events="all"
                />
                <circle r=6 stroke="black" />
            </g>
        </svg>
        `;

    const BoatIcon = L.divIcon({
        className: "mymarker",
        html: SVGIcon,
        iconAnchor: [25, 25],
    });

    const marker = L.marker([position.latitude, position.longitude], {
        icon: BoatIcon,
    }).addTo(map);

    marker.bindPopup(self.name);



    fetch(`/signalk/v1/api/vessels/${vesselId}/track`, { credentials: 'include' })
        .then(r => {
            if (!r.ok) {
                throw new Error(r.status);
            }
            return r.json();
        })
        .then(geojson => {
            const layer = L.geoJSON(geojson, {
                color: 'hsl(60, 100%, 45%)',
                weight: 2,
            }).addTo(map);

            layer.on('mouseover', function () {
                layer.setStyle({
                    weight: 4,
                });
            });

            layer.on('mouseout', function () {
                layer.setStyle({
                    weight: 2,
                });
            });
        }).catch(function (err) {
            console.error('error getting track', err);
        });
});

