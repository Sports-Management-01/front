import { useState, useRef, useEffect } from "react";

const Map = ({ center, zoom, setLat, setLng }) => {
    const mapRef = useRef(null)
    const markers = useRef([])

    const [map, setMap] = useState()

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);

    // useEffect(() => {
    //     console.log(markers)
    //     if (markers.length) {
    //         for (var i = 0; i < markers.length - 1; i++) {
    //             markers[i].setMap(null)
    //         }
    //         // lastMarker.splice(0, 1)
    //         // setMarkers(lastMarker)
    //     }
    // }, [markers])

    const displayMarkers = () => {
        console.log(markers)
        for (var i = 0; i < markers.current.length - 1; i++) {
            markers.current[i].setMap(null)
        }

    }

    useEffect(() => {
        if (map) {
            map.addListener("click", (mapsMouseEvent) => {

                const coordinates = mapsMouseEvent.latLng.toJSON()
                setLat(coordinates.lat)
                setLng(coordinates.lng)
                const pin = new window.google.maps.Marker({
                    position: mapsMouseEvent.latLng,
                    map: map
                });
                // console.log(markers)
                // var currentMarkers = [...markers]
                markers.current.push(pin)
                markers.current.splice(0, 1)
                displayMarkers()
                // setMarkers(currentMarkers)
                map.panTo(mapsMouseEvent.latLng);
            });
        }
    }, [map])
    return (<div ref={mapRef} style={{ height: '400px' }} />)
}

export default Map