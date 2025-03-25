const options = {
    key: 'CpCi6TjvuhporjSGl4FQzIk0Ou77nEDT', // REPLACE WITH YOUR KEY !!!
//    lat: 14,
//    lon: -29,
//    zoom: 4,
};

// http://localhost:3000/skServer/loginStatus

// http://localhost:3000/signalk/v1/api/vessels/self
/*{
    "mmsi": "368204530",
    "name": "CALYPSO",
    "navigation": {
        "headingTrue": {
            "meta": {
                "units": "rad",
                "description": "The current true north heading of the vessel, equals 'headingMagnetic adjusted for magneticVariation'"
            },
            "value": 5.363396792603197,
            "$source": "vesper.AI",
            "timestamp": "2025-03-24T17:27:15.081Z",
            "sentence": "HDG"
        },
        "position": {
            "meta": {
                "description": "The position of the vessel in 2 or 3 dimensions (WGS84 datum)",
                "properties": {
                    "longitude": {
                        "type": "number",
                        "description": "Longitude",
                        "units": "deg",
                        "example": 4.98765245
                    },
                    "latitude": {
                        "type": "number",
                        "description": "Latitude",
                        "units": "deg",
                        "example": 52.0987654
                    },
                    "altitude": {
                        "type": "number",
                        "description": "Altitude",
                        "units": "m"
                    }
                }
            },
            "value": {
                "longitude": -121.30944516666666,
                "latitude": -11.331393166666667
            },
            "$source": "vesper.GP",
            "timestamp": "2025-03-24T17:27:16.000Z",
            "sentence": "RMC",
            "values": {
                "vesper.GP": {
                    "value": {
                        "longitude": -121.30944516666666,
                        "latitude": -11.331393166666667
                    },
                    "sentence": "RMC",
                    "timestamp": "2025-03-24T17:27:16.000Z"
                },
                "vesper.AI": {
                    "value": {
                        "longitude": -121.30825333333334,
                        "latitude": -11.332083333333333
                    },
                    "timestamp": "2025-03-24T17:26:25.682Z",
                    "sentence": "VDO"
                }
            }
        },
        "courseOverGroundTrue": {
            "meta": {
                "units": "rad",
                "description": "Course over ground (true)"
            },
            "value": 5.245936133917159,
            "$source": "vesper.GP",
            "timestamp": "2025-03-24T17:27:16.000Z",
            "sentence": "RMC",
            "values": {
                "vesper.GP": {
                    "value": 5.245936133917159,
                    "sentence": "RMC",
                    "timestamp": "2025-03-24T17:27:16.000Z"
                },
                "vesper.AI": {
                    "value": 5.338962183069697,
                    "timestamp": "2025-03-24T17:26:25.682Z",
                    "sentence": "VDO"
                }
            }
        },
        "speedOverGround": {
            "meta": {
                "units": "m/s",
                "description": "Vessel speed over ground. If converting from AIS 'HIGH' value, set to 102.2 (Ais max value) and add warning in notifications"
            },
            "value": 3.418998643924101,
            "$source": "vesper.GP",
            "timestamp": "2025-03-24T17:27:16.000Z",
            "sentence": "RMC",
            "values": {
                "vesper.GP": {
                    "value": 3.418998643924101,
                    "sentence": "RMC",
                    "timestamp": "2025-03-24T17:27:16.000Z"
                },
                "vesper.AI": {
                    "value": 3.1895563635765014,
                    "timestamp": "2025-03-24T17:26:25.682Z",
                    "sentence": "VDO"
                }
            }
        },

}*/

ws://localhost:3000/signalk/v1/stream?subscribe=none


// http://localhost:3000/signalk/v1/api/vessels/urn:mrn:imo:mmsi:368204530/name

// http://localhost:3000/signalk/v1/api/vessels/urn:mrn:imo:mmsi:368204530/track
// http://localhost:3000/signalk/v1/api/tracks?radius=10000
// http://localhost:3000/signalk/v2/api/resources/tracks


// http://localhost:3000/signalk/v1/api/vessels/urn:mrn:imo:mmsi:368204530/track

// influx v2 returns plain json - not geojson:
// http://raspberrypi.local/signalk/v1/history/values?from=2025-03-01T00:00:00Z&to=2027-03-25T18:00:00Z&paths=navigation.position&resolution=3600


windyInit(options, windyAPI => {
    const { map } = windyAPI;

    const MARKER = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg width="100%" height="100%" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
        <path d="M4.784,13.635c0,0 -0.106,-2.924 0.006,-4.379c0.115,-1.502 0.318,-3.151 0.686,-4.632c0.163,-0.654 0.45,-1.623 0.755,-2.44c0.202,-0.54 0.407,-1.021 0.554,-1.352c0.038,-0.085 0.122,-0.139 0.215,-0.139c0.092,0 0.176,0.054 0.214,0.139c0.151,0.342 0.361,0.835 0.555,1.352c0.305,0.817 0.592,1.786 0.755,2.44c0.368,1.481 0.571,3.13 0.686,4.632c0.112,1.455 0.006,4.379 0.006,4.379l-4.432,0Z" style="fill:rgb(0,46,252);"/><path d="M5.481,12.731c0,0 -0.073,-3.048 0.003,-4.22c0.06,-0.909 0.886,-3.522 1.293,-4.764c0.03,-0.098 0.121,-0.165 0.223,-0.165c0.103,0 0.193,0.067 0.224,0.164c0.406,1.243 1.232,3.856 1.292,4.765c0.076,1.172 0.003,4.22 0.003,4.22l-3.038,0Z" style="fill:rgb(255,255,255);fill-opacity:0.846008;"/>
    </svg>`);
    const MARKER_ICON_URL = `data:image/svg+xml;utf8,${MARKER}`;

    const BoatIcon = L.icon({
        iconUrl: MARKER_ICON_URL,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
    });

    const markers = [];

    const updateIconStyle = () => {
        for (const marker of markers) {
            const icon = marker._icon;
            if (!icon) {
                continue;
            }
            const heading = icon.getAttribute('data-heading');
            console.log('>>>>>>>>>>>>>>> heading',heading);
            if (icon.style.transform.indexOf('rotateZ') === -1) {
                icon.style.transform = `${
                    icon.style.transform
                } rotateZ(${heading || 0}deg)`;
                icon.style.transformOrigin = 'center';
            }
        }
    };
    
    // http://localhost:3000/signalk/v1/api/vessels/self/navigation/
    // headingTrue.value
    // position.value
    
    // http://localhost:3000/signalk/v1/api/vessels/self
    
    fetch('/signalk/v1/api/vessels/self', { credentials: 'include' })
        .then(r => r.json())
        .then(self => {
            
            console.log('*******************************************************************************************************');
            console.log('******* navigation',self.navigation);
            
            let position = self.navigation.position.value;
            let heading = self.navigation.headingTrue.value * 180/Math.PI;

            console.log('******* position',position);
            console.log('******* heading',heading);

            map.setView([position.latitude,position.longitude],4);

            let hue = 0;
            hue = (hue + 60) % 360;
            
            const marker = L.marker([position.latitude,position.longitude], {
                icon: BoatIcon,
            }).addTo(map);
            
            markers.push(marker);
            marker._icon.setAttribute('data-heading', heading);
            marker.bindPopup(self.name);
            
            updateIconStyle();
            
            // http://raspberrypi.local/signalk/v1/history/values?from=2025-03-01T00:00:00Z&to=2027-03-25T18:00:00Z&paths=navigation.position&resolution=3600
            fetch(`/signalk/v1/history/values?from=2025-03-01T00:00:00Z&to=2027-03-25T18:00:00Z&paths=navigation.position&resolution=3600`, { credentials: 'include' })
            .then(r => r.json())
            .then(json => {
                console.log('json',json);
            });
            
            
/*            
            fetch(`/signalk/v1/api/vessels/urn:mrn:imo:mmsi:${self.mmsi}/track`, { credentials: 'include' })
            .then(r => r.json())
            .then(geojson => {
                    console.log('geojson',geojson);
                    
                    const layer = L.geoJSON(geojson, {
                        color: `hsl(${hue}, 100%, 45%)`,
                        weight: 2,
                    }).addTo(map);

                    layer.on('mouseover', function() {
                        layer.setStyle({
                            weight: 4,
                        });
                    });

                    layer.on('mouseout', function() {
                        layer.setStyle({
                            weight: 2,
                        });
                    });

            });
*/
            
    });
    


/*
    fetch('boats.json')
        .then(response => response.json())
        .then(result => result.result)
        .then(result => {
            try {
                let hue = 0;
                for (const boatName of Object.keys(result)) {
                    hue = (hue + 60) % 360;

                    const boat = result[boatName];

                    const layer = L.polyline(boat.track, {
                        color: `hsl(${hue}, 100%, 45%)`,
                        weight: 2,
                    }).addTo(map);

                    layer.on('mouseover', function() {
                        layer.setStyle({
                            weight: 4,
                        });
                    });

                    layer.on('mouseout', function() {
                        layer.setStyle({
                            weight: 2,
                        });
                    });

                    const marker = L.marker(boat.track[boat.track.length - 1], {
                        icon: BoatIcon,
                    }).addTo(map);

                    markers.push(marker);
                    marker._icon.setAttribute('data-heading', boat.heading);
                    marker.bindPopup(boatName);

                    updateIconStyle();
                }
            } catch (error) {
                console.error(`Error querying boats: ${error.message}`);
            }
        })
        .catch(error => {
            console.error(`Error querying boats: ${error.message}`);
        });
*/
    // Handle some events. We need to update the rotation of icons ideally each time
    // leaflet re-renders. them.
    map.on('zoom', updateIconStyle);
    map.on('zoomend', updateIconStyle);
    map.on('viewreset', updateIconStyle);
});
