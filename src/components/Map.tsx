import React from "react";
import ReactMapGL, { ViewState } from "react-map-gl";
import { AutoSizer } from "react-virtualized";

export const Map = () => {
  const [viewport, setViewport] = React.useState<ViewState>({
    longitude: -79.36912,
    latitude: 43.65016,
    zoom: 12,
    bearing: -15,
  });

  return (
    <AutoSizer>
      {({ width, height }) => (
        <ReactMapGL
          mapStyle="mapbox://styles/mapbox/light-v10"
          {...viewport}
          width={width}
          height={height}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          onViewportChange={setViewport}
          mapOptions={{
            hash: true,
          }}
        />
      )}
    </AutoSizer>
  );
};
