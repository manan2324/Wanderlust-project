mapboxgl.accessToken = mapToken;
let coordinates = listing.geometry.coordinates;
const description = `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});


// const marker1 = new mapboxgl.Marker({ color: "red" })
//     .setLngLat(coordinates)
//     // .setPopup(
//     //     new mapboxgl.Popup({ offset: 25 })
//     //     .setHTML(description))
//     .addTo(map);

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// Add hover effect
map.on('load', () => {
    // Load the custom image for the marker
    map.loadImage(
        'https://cdn-icons-png.flaticon.com/128/795/795653.png', // Custom image URL
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style
            map.addImage('custom-icon', image);

            // Create a geojson source with the point where the icon should appear
            map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates  // Set coordinates of the custom marker
                        },
                        'properties': {
                            'title': listing.title
                        }
                    }]
                }
            });

            // Add the custom icon layer
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point',
                'layout': {
                    'icon-image': 'custom-icon', // Reference the custom icon
                    'icon-size': 0.25 // Set size of the custom icon
                }
            });

            // Attach the popup to the point layer
            // new mapboxgl.Popup({ offset: 25 })
            //     .setLngLat(coordinates)
            //     .setHTML(description)
            //     .addTo(map);
        })

    // Optionally, add a hover effect on a dummy circle layer (if you still need it)
    map.addLayer({
        id: 'places',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    },
                    properties: {
                        title: listing.title
                    }
                }]
            }
        },
        paint: {
            'circle-radius': 8,
            'circle-color': '#FFFFFF'
        }
    });

    // Hover effect on circle markers
    map.on('mouseenter', 'places', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.lngLat; // Dynamic coordinates
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    // Remove popup on mouse leave
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});