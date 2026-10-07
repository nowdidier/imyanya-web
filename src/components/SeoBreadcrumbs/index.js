import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const SITE_ORIGIN = "https://imyanya.rw";

const upsertSchema = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const removeSchema = (id) => {
  document.getElementById(id)?.remove();
};

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD so Google
// understands the hierarchy of job listing/category pages.
// items: [{ label: "Home", href: "/" }, { label: "Jobs in Rwanda" }]
const SeoBreadcrumbs = ({ items = [], schemaId = "imyanya-list-breadcrumb-schema" }) => {
  // Items are usually inline literals; stringify so the effect only
  // re-runs when the trail actually changes.
  const itemsKey = JSON.stringify(items);

  React.useEffect(() => {
    const parsed = JSON.parse(itemsKey);
    if (parsed.length === 0) return undefined;

    upsertSchema(schemaId, {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: parsed.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href
          ? { item: `${SITE_ORIGIN}${item.href}` }
          : {}),
      })),
    });

    return () => {
      removeSchema(schemaId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, schemaId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ mb: 1.5, fontSize: 13, color: "#5f6368" }}
    >
      {items.map((item, index) =>
        item.href && index < items.length - 1 ? (
          <Typography
            key={index}
            component={RouterLink}
            to={item.href}
            sx={{ color: "#1a73e8", textDecoration: "none", fontSize: 13 }}
          >
            {item.label}
          </Typography>
        ) : (
          <Typography
            key={index}
            sx={{ fontSize: 13, color: "#5f6368" }}
            noWrap={index === items.length - 1}
          >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default SeoBreadcrumbs;
