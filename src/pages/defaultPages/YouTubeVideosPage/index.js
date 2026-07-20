import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, LINKS, WHATSAPP_CONFIG } from "../../../configs/constants";
import YouTubeVideoSection from "../../../components/YouTubeVideoSection";

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_CONFIG.PHONE}?text=${encodeURIComponent(message)}`;

const commissionHighlights = [
  {
    title: "Seller commission",
    body: "List a plot, house, commercial space, or land opportunity with a short video. Commission is discussed and agreed before promotion starts.",
  },
  {
    title: "Buyer introduction",
    body: "Buyers can request owner contact, site visits, price confirmation, and supporting details through Imyanya before moving forward.",
  },
  {
    title: "Professional presentation",
    body: "Each opportunity is supported by video, social links, and direct contact so the page looks useful for visitors and stronger for advertising review.",
  },
];

const buyerChecklist = [
  "Location and access road",
  "Asking price and payment terms",
  "Land size or house details",
  "Ownership and document status",
  "Viewing appointment availability",
  "Commission agreement before introduction",
];

const CommissionTab = () => (
  <Stack spacing={4} sx={{ py: { xs: 4, md: 6 } }}>
    <Grid container spacing={3}>
      {commissionHighlights.map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <Card variant="outlined" sx={{ height: "100%", borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                {item.title}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item.body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Card
      variant="outlined"
      sx={{
        borderRadius: 1,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
              <VerifiedOutlinedIcon color="primary" />
              <Typography variant="h5" fontWeight={900}>
                What buyers should confirm
              </Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 2.5 }}>
              A serious property video should help buyers understand the place before
              calling. Keep each listing clear, specific, and connected to a real
              contact path.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {buyerChecklist.map((item) => (
                <Chip key={item} label={item} variant="outlined" />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 1,
                bgcolor: "grey.50",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Request commission details
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                  Send the property type, location, price, and owner contact. Imyanya
                  can agree the commission structure before the video is promoted.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    href={buildWhatsAppUrl(
                      "Hello Imyanya, I want commission details for a plot/place for sale."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                  >
                    WhatsApp Imyanya
                  </Button>
                  <Button
                    href={LINKS.YOUTUBE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                  >
                    View Channel
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Stack>
);

const YouTubeVideosPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  TabTitle(`Places and Plots for Sale in Rwanda | ${APP_NAME}`);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          pt: { xs: 3, md: 5 },
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <HomeWorkOutlinedIcon color="primary" />
            <Typography variant="h3" component="h1" fontWeight={900}>
              Places and plots for sale
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ lineHeight: 1.65, maxWidth: 850 }}
          >
            Watch current property videos from Imyanya, contact us directly for
            details, and share listings through social media when a place fits a
            buyer.
          </Typography>
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{ minHeight: 44 }}
          >
            <Tab
              icon={<HomeWorkOutlinedIcon />}
              iconPosition="start"
              label="Listings"
              sx={{ minHeight: 44 }}
            />
            <Tab
              icon={<HandshakeOutlinedIcon />}
              iconPosition="start"
              label="Commission"
              sx={{ minHeight: 44 }}
            />
          </Tabs>
        </Stack>
      </Box>

      {activeTab === 0 && (
        <YouTubeVideoSection
          title="Latest property videos"
          subtitle="New videos from the Imyanya YouTube channel appear here as public listing cards with contact, sharing, and social links."
          maxVideos={15}
          showContainer={false}
          contactLabel="Ask about this place"
          contactMessagePrefix="Hello Imyanya, I am interested in this plot/place for sale."
          tagLabel="Place for sale"
        />
      )}

      {activeTab === 1 && <CommissionTab />}
    </Container>
  );
};

export default YouTubeVideosPage;
