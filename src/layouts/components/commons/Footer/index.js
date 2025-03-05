import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ICONS, IMAGES, LINKS } from '../../../../configs/constants';
import MuiImageCustom from '../../../../components/MuiImageCustom';
// Import certification logo
import certificationLogo from '../../../../assets/images/certification-logo.png';

const Footer = () => {
  const nav = useNavigate();

  return (
    <Box>
      <Grid container>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <MuiImageCustom
                width={150}
                src={IMAGES.getTextLogo('light')}
                sx={{ mr: 1, mb: 1, display: { xs: 'none', md: 'flex' } }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/about-us')}
                primary="About imyanya"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/contact')}
                primary="Contact"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/faq')}
                primary="FAQ"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/terms-of-use')}
                primary="Terms of Use"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/privacy-policy')}
                primary="Privacy Policy"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                For Employers
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/tin-tuyen-dung')}
                primary="Post Jobs"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/danh-sach-ung-vien')}
                primary="Search Resumes"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Employer Dashboard"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Messages"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Notifications"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                For Job Seekers
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/viec-lam')}
                primary="Jobs"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/cong-ty')}
                primary="Companies"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien')}
                primary="Candidate Dashboard"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/tin-nhan')}
                primary="Messages"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/thong-bao')}
                primary="Notifications"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Mobile Apps
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2}>
                <Link href={LINKS.CHPLAY_LINK} target="_blank">
                  <MuiImageCustom width={160} src={IMAGES.chPlayDownload} />
                </Link>
                <Link href={LINKS.APPSTORE_LINK} target="_blank">
                  <MuiImageCustom width={160} src={IMAGES.appStoreDownload} />
                </Link>
              </Stack>
            </ListItem>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Certified by
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2}>
                <Link href={LINKS.CERTIFICATE_LINK} target="_blank">
                  <MuiImageCustom
                    width={140}
                    src={certificationLogo}
                    alt="Certification Logo"
                  />
                </Link>
              </Stack>
            </ListItem>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Connect with imyanya
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={1}>
                {Object.entries({
                  FACEBOOK: LINKS.FACEBOOK_LINK,
                  FACEBOOK_MESSENGER: LINKS.FACEBOOK_MESSENGER_LINK,
                  INSTAGRAM: LINKS.INSTAGRAM_LINK,
                  LINKEDIN: LINKS.LINKEDIN_LINK,
                  YOUTUBE: LINKS.YOUTUBE_LINK,
                  TWITTER: LINKS.TWITTER_LINK
                }).map(([key, link]) => (
                  <Link key={key} href={link} target="_blank">
                    <img 
                      height="40" 
                      width="40" 
                      src={ICONS[key]} 
                      alt={key.toLowerCase()} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'fallback-icon.png';
                      }}
                    />
                  </Link>
                ))}
              </Stack>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
