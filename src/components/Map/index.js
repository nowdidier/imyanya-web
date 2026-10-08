import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import * as React from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Paper, Typography } from '@mui/material';

import { ICONS } from '../../configs/constants';
import { getRwandaCoords } from '../../data/rwandaDistricts';
import { geocodeAddress } from '../../utils/geocodeAddress';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: ICONS.LOCATION_MARKER,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [56, 56],
  iconAnchor: [28, 60],
  popupAnchor: [0, -60],
  shadowSize: [41, 41],
});

const DEFAULT_CENTER = [-1.9441, 30.0619];

const normalizeCoordinate = (value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const MapViewController = ({ latitude, longitude, zoom }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView([latitude, longitude], zoom, { animate: true });
  }, [latitude, longitude, map, zoom]);

  return null;
};

const MapClickHandler = ({ onLocationChange }) => {
  useMapEvents({
    click: (event) => {
      onLocationChange?.({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
};

const Map = ({
  title,
  subTitle,
  latitude,
  longitude,
  // Free-text fallback (address / city / district) resolved offline against
  // Rwanda district centers, so an address without pinned coordinates still
  // renders an area-level map instead of the empty state.
  fallbackQuery = '',
  // When set (non-editable mode only), the address is forward-geocoded into
  // an exact rooftop pin; the district fallback only shows while resolving.
  addressForGeocode = '',
  editable = false,
  onLocationChange,
  height = 250,
  zoom = 15,
  fallbackZoom = 12,
  defaultCenter = DEFAULT_CENTER,
  emptyStateMessage = 'Unable to determine location on map',
}) => {
  const normalizedLatitude = normalizeCoordinate(latitude);
  const normalizedLongitude = normalizeCoordinate(longitude);
  const hasCoordinates =
    normalizedLatitude !== null && normalizedLongitude !== null;

  const fallbackCoords = !hasCoordinates
    ? getRwandaCoords(fallbackQuery)
    : null;

  // Rooftop pin resolved from the written address (cached — quota-safe).
  const geocodeTarget =
    !editable && !hasCoordinates ? String(addressForGeocode || "") : "";
  const [geocoded, setGeocoded] = React.useState(null);
  React.useEffect(() => {
    let active = true;
    setGeocoded(null);
    if (geocodeTarget.trim().length < 6) return undefined;
    geocodeAddress(geocodeTarget).then((point) => {
      if (active && point) setGeocoded(point);
    });
    return () => {
      active = false;
    };
  }, [geocodeTarget]);

  const effectiveLatitude = hasCoordinates
    ? normalizedLatitude
    : geocoded?.lat ?? fallbackCoords?.lat ?? null;
  const effectiveLongitude = hasCoordinates
    ? normalizedLongitude
    : geocoded?.lng ?? fallbackCoords?.lng ?? null;
  const hasPosition =
    effectiveLatitude !== null && effectiveLongitude !== null;
  const usedGeocoded = !hasCoordinates && geocoded !== null;

  if (!editable && !hasPosition) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height,
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          border: '1px dashed #ced4da',
        }}
      >
        <Typography
          sx={{
            color: '#9e9e9e',
            fontStyle: 'italic',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LocationOnIcon fontSize="small" />
          {emptyStateMessage}
        </Typography>
      </Box>
    );
  }

  const viewLatitude = hasPosition ? effectiveLatitude : defaultCenter[0];
  const viewLongitude = hasPosition ? effectiveLongitude : defaultCenter[1];
  const markerPosition = hasPosition
    ? [effectiveLatitude, effectiveLongitude]
    : null;
  // Area-level fallback zooms out so the marker reads as approximate;
  // geocoded rooftop pins zoom like exact ones.
  const mapZoom = hasCoordinates || usedGeocoded ? zoom : fallbackZoom;

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: 'hidden',
        height,
        borderRadius: 2,
      }}
    >
      <MapContainer
        center={[viewLatitude, viewLongitude]}
        zoom={mapZoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <MapViewController
          latitude={viewLatitude}
          longitude={viewLongitude}
          zoom={mapZoom}
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {editable && <MapClickHandler onLocationChange={onLocationChange} />}
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={editable}
            eventHandlers={
              editable
                ? {
                    dragend: (event) => {
                      const marker = event.target;
                      const { lat, lng } = marker.getLatLng();

                      onLocationChange?.({
                        lat,
                        lng,
                      });
                    },
                  }
                : undefined
            }
          >
            {(title || subTitle) && (
              <Popup>
                {title && (
                  <Typography variant="subtitle2" fontWeight="bold">
                    {title}
                  </Typography>
                )}
                {subTitle && (
                  <Typography variant="body2">{subTitle}</Typography>
                )}
                {!hasCoordinates && !usedGeocoded && fallbackCoords && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 0.5, color: "#5f6368", fontStyle: "italic" }}
                  >
                    Approximate area — exact pin not set
                  </Typography>
                )}
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>
    </Paper>
  );
};

export default Map;
