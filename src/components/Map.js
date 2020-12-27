import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const getColor = (data, isInstall) => {
  var matchColor = ['match', ['get', 'POA_CODE16']];
  const maxVal = isInstall ? 15000 : 75000;
  Object.keys(data).forEach((postcode) => {
    const lum = 255 - data[postcode] / maxVal * 255;
    const color = isInstall ? `rgb(${lum}, 255, ${lum})` : `rgb(${lum}, ${lum}, 255)`;
    matchColor.push(postcode, color);
  })
  matchColor.push('rgba(0, 0, 0, 0)');
  return matchColor
};

export default class Map extends React.Component {
  static defaultProps = {
    lng: 133.5,
    lat: -28.5,
    zoom: 3.5,
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false
    })

    // Customize controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    this.map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    this.map.on('load', () => {
      this.map.addSource('post', {
        type: 'vector',
        url: 'mapbox://hengwang322.6jeoj18j'
      });

      this.map.addLayer(
        {
          'id': 'post_AU',
          'source': 'post',
          'source-layer': 'POA_2016_AUST_35p-8s0mmc',
          'type': 'fill',
          "paint": {
            "fill-color": getColor(this.props.data, this.props.isInstall),
            "fill-opacity": 0.5,
            "fill-outline-color": "grey"
          }
        },
      );
    });

    this.map.on('click', (e) => {
      const postArea = this.map.queryRenderedFeatures(e.point)
      const postcode = postArea[0] ? postArea[0].properties.POA_CODE16 : undefined
      this.props.onClick(postcode)
    });
  }

  componentDidUpdate(props) {
    if (this.props.data !== props.data) {
      this.map.setPaintProperty("post_AU", 'fill-color', getColor(this.props.data, this.props.isInstall));
    }
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>

    )
  }
};