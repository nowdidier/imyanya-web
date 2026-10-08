import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import { HOST_NAME, ROUTES } from "../../configs/constants";
import { buildURL } from "../../utils/funcUtils";

// Builds the employer sign-up URL with the organisation's name and map
// address prefilled (?orgName=&orgAddress=&orgLat=&orgLng=), so an owner
// can create the missing Imyanya profile in one click.
export const buildClaimUrl = ({ companyName, address, lat, lng } = {}) => {
  try {
    const base = `${buildURL(HOST_NAME.EMPLOYER_MYJOB)}/${ROUTES.AUTH.REGISTER}`;
    const params = new URLSearchParams();
    if (companyName) params.set("orgName", companyName);
    if (address) params.set("orgAddress", address);
    if (lat !== null && lat !== undefined && lat !== "" && Number.isFinite(Number(lat))) {
      params.set("orgLat", String(lat));
    }
    if (lng !== null && lng !== undefined && lng !== "" && Number.isFinite(Number(lng))) {
      params.set("orgLng", String(lng));
    }
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  } catch (error) {
    return "/dang-ky";
  }
};

// Lets anyone looking at an organisation without an Imyanya profile
// start one there: opens company sign-up with the organisation's name
// and map address already filled in the profile settings.
const ClaimOrganisationButton = ({
  companyName,
  address,
  lat,
  lng,
  variant = "outlined",
  size = "small",
  fullWidth = false,
  showHint = true,
}) => {
  const url = React.useMemo(
    () => buildClaimUrl({ companyName, address, lat, lng }),
    [companyName, address, lat, lng]
  );

  return (
    <Stack spacing={0.5} sx={{ width: fullWidth ? "100%" : "auto" }}>
      {showHint && (
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          No Imyanya profile yet. If you own this place or work here, click to create it.
        </Typography>
      )}
      <Button
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        startIcon={<AddBusinessIcon />}
        sx={{ textTransform: "none", fontWeight: 700 }}
      >
        {companyName ? `Create ${companyName} profile` : "Create organisation profile"}
      </Button>
    </Stack>
  );
};

export default ClaimOrganisationButton;
