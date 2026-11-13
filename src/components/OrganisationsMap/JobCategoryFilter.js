import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { JOB_CATEGORIES } from "./categoryFilterUtils";

const JobCategoryFilter = ({
  selectedCategories = [],
  onToggleCategory,
  onClear,
  counts = {},
}) => {
  const selectedSet = React.useMemo(
    () => new Set(selectedCategories),
    [selectedCategories]
  );

  return (
    <Box
      component="fieldset"
      data-testid="map-job-category-filter"
      sx={{
        border: 0,
        p: 0,
        m: 0,
        minWidth: 0,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 0.75, flexWrap: "wrap", rowGap: 0.5 }}
      >
        <Typography
          component="legend"
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          sx={{
            fontSize: 11,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            px: 0,
          }}
        >
          Job categories
        </Typography>
        {selectedCategories.length > 0 && (
          <Button
            type="button"
            size="small"
            variant="text"
            onClick={onClear}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: 12,
              minHeight: 24,
              py: 0,
              px: 1,
              color: "#441da0",
            }}
          >
            Clear categories ({selectedCategories.length})
          </Button>
        )}
      </Stack>

      <FormGroup
        row
        sx={{
          gap: 0.75,
          "& .MuiFormControlLabel-root": {
            m: 0,
          },
        }}
      >
        {JOB_CATEGORIES.map((category) => {
          const checked = selectedSet.has(category.id);
          const count = counts[category.id] ?? 0;

          return (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={() => onToggleCategory?.(category.id)}
                  inputProps={{ "aria-label": category.label }}
                  sx={{
                    p: 0.5,
                    color: "rgba(68, 29, 160, 0.45)",
                    "&.Mui-checked": {
                      color: category.color,
                    },
                  }}
                />
              }
              label={
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      fontSize: 13,
                      fontWeight: checked ? 700 : 500,
                      color: checked ? "#1a1a2e" : "text.primary",
                      lineHeight: 1.2,
                    }}
                  >
                    {category.label}
                  </Typography>
                  {count > 0 && (
                    <Typography
                      component="span"
                      aria-hidden="true"
                      variant="caption"
                      sx={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: checked ? category.color : "text.secondary",
                        opacity: checked ? 1 : 0.75,
                      }}
                    >
                      ({count})
                    </Typography>
                  )}
                </Stack>
              }
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: checked
                  ? `${category.color}66`
                  : "rgba(68, 29, 160, 0.14)",
                bgcolor: checked ? `${category.color}12` : "#ffffff",
                transition:
                  "background-color 0.15s ease, border-color 0.15s ease",
                "&:hover": {
                  borderColor: `${category.color}88`,
                  bgcolor: checked
                    ? `${category.color}1a`
                    : "rgba(109, 40, 217, 0.04)",
                },
              }}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

export default JobCategoryFilter;
