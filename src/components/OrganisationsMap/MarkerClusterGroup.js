import {
  createElementObject,
  createLayerComponent,
  extendContext,
} from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster";

import {
  CLUSTER_ANIMATION_OPTIONS,
  buildClusterIconHtml,
  getClusterIconSize,
  summarizeClusterMarkers,
  triggerClusterRipple,
} from "./clusterUtils";

const defaultIconCreateFunction = (cluster) => {
  const markers = cluster.getAllChildMarkers();
  const summary = summarizeClusterMarkers(markers);
  const iconSize = getClusterIconSize(summary.tier);

  return L.divIcon({
    html: buildClusterIconHtml(summary),
    className: `org-cluster-pin org-cluster-tier-${summary.tier}`,
    iconSize: L.point(iconSize[0], iconSize[1]),
  });
};

const MarkerClusterGroup = createLayerComponent(
  function createMarkerClusterGroup(props, ctx) {
    const options = { ...props };
    delete options.children;
    const clusterProps = {
      ...CLUSTER_ANIMATION_OPTIONS,
      iconCreateFunction: defaultIconCreateFunction,
      ...options,
    };

    const instance = L.markerClusterGroup(clusterProps);
    instance.on("clusterclick", (event) => {
      const clusterEl = event?.layer?.getElement?.();
      triggerClusterRipple(clusterEl);
    });

    return createElementObject(
      instance,
      extendContext(ctx, {
        layerContainer: instance,
      })
    );
  }
);

export default MarkerClusterGroup;
