import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { geocodeRwandaLocation } from "./mapGeocodeUtils";

const MapLocationSearchOverlay = ({ activeLocation, onLocate, onClear }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const abortRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setIsSearching(true);
    setErrorMsg("");

    const result = await geocodeRwandaLocation(inputValue, {
      signal: controller.signal,
    });

    if (controller.signal.aborted) return;

    setIsSearching(false);

    if (!result.ok) {
      if (result.code !== "ABORTED") {
        setErrorMsg(result.message || "Unable to find that location in Rwanda.");
      }
      return;
    }

    onLocate?.({
      lat: result.lat,
      lng: result.lng,
      viewport: result.viewport,
      zoom: result.zoom,
      formattedAddress: result.formattedAddress,
      placeId: result.placeId,
      source: result.source,
      ts: Date.now(),
    });
  };

  const handleClear = () => {
    if (abortRef.current) abortRef.current.abort();
    setInputValue("");
    setErrorMsg("");
    setIsSearching(false);
    onClear?.();
  };

  const showClear = Boolean(inputValue.trim() || activeLocation || errorMsg);

  return (
    <Box
      data-testid="map-location-search-overlay"
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        left: { xs: 56, sm: "auto" },
        width: { sm: 360 },
        maxWidth: { sm: "calc(100% - 72px)" },
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <Paper
        component="form"
        role="search"
        aria-label="Center map on a city or district in Rwanda"
        onSubmit={handleSubmit}
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          p: "4px 6px 4px 10px",
          borderRadius: 2.5,
          bgcolor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(109, 40, 217, 0.28)",
          boxShadow: "0 8px 24px -6px rgba(34, 15, 92, 0.28)",
        }}
      >
        <TravelExploreIcon
          sx={{ fontSize: 19, color: "#441da0", flexShrink: 0 }}
          aria-hidden="true"
        />
        <InputBase
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          placeholder="Go to city or district (e.g. Musanze)…"
          inputProps={{
            "aria-label": "Search city or district in Rwanda",
            "data-testid": "map-location-search-input",
          }}
          sx={{
            flex: 1,
            fontSize: 13.5,
            fontWeight: 500,
            color: "#1a1a2e",
            minWidth: 0,
            "& input::placeholder": {
              color: "#5f6368",
              opacity: 1,
            },
          }}
        />
        {showClear && (
          <IconButton
            type="button"
            size="small"
            onClick={handleClear}
            aria-label="Clear searched location"
            sx={{ color: "#5f6368", p: 0.5 }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
        <Button
          type="submit"
          size="small"
          variant="contained"
          disabled={isSearching}
          aria-label="Center map on location"
          data-testid="map-location-search-submit"
          sx={{
            minWidth: 64,
            height: 32,
            px: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13,
            background: "#441da0",
            backgroundImage: "none",
            color: "#ffffff",
            boxShadow: "none",
            flexShrink: 0,
            "&:hover": {
              background: "#351680",
              backgroundImage: "none",
              boxShadow: "none",
            },
          }}
        >
          {isSearching ? (
            <CircularProgress size={15} color="inherit" aria-label="Searching location" />
          ) : (
            "Go"
          )}
        </Button>
      </Paper>

      {(errorMsg || activeLocation) && (
        <Paper
          role="status"
          aria-live="polite"
          elevation={2}
          data-testid="map-location-search-status"
          sx={{
            mt: 0.75,
            px: 1.25,
            py: 0.65,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            bgcolor: errorMsg ? "#fef2f2" : "rgba(255, 255, 255, 0.96)",
            border: errorMsg
              ? "1px solid #fecaca"
              : "1px solid rgba(19, 115, 51, 0.3)",
            boxShadow: "0 4px 14px -4px rgba(20, 10, 60, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            {errorMsg ? (
              <ErrorOutlineIcon sx={{ fontSize: 16, color: "#b91c1c", flexShrink: 0 }} />
            ) : (
              <CheckCircleOutlineIcon
                sx={{ fontSize: 16, color: "#137333", flexShrink: 0 }}
              />
            )}
            <Typography
              variant="caption"
              sx={{
                color: errorMsg ? "#991b1b" : "#1f2937",
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              {errorMsg || `Centered on ${activeLocation.formattedAddress}`}
            </Typography>
          </Box>
          {activeLocation && !errorMsg && (
            <Button
              type="button"
              size="small"
              onClick={handleClear}
              sx={{
                minWidth: "auto",
                px: 0.75,
                py: 0.2,
                fontSize: 11.5,
                fontWeight: 700,
                textTransform: "none",
                color: "#441da0",
                flexShrink: 0,
              }}
            >
              Reset
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default MapLocationSearchOverlay;
