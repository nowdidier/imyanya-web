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
                onClick={() => nav('/ve-chung-toi')}
                primary="About IMYANYA"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/lien-he')}
                primary="Contact"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/hoi-dap')}
                primary="FAQ"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/thoa-thuan-su-dung')}
                primary="Terms of Use"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/quy-dinh-bao-mat')}
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
                primary="Post a Job"
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
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung')}
                primary="Employer Management"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/tro-chuyen')}
                primary="Messages"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/thong-bao')}
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
                primary="Candidate Management"
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
                Mobile App
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
                    src={require('../../../../assets/images/certification-logo.png')}
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
                Connect with IMYANYA
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={1}>
                <Link href={LINKS.FACEBOOK_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.FACEBOOK} alt="" />
                </Link>
                <Link href={LINKS.FACEBOOK_MESSENGER_LINK} target="_blank">
                  <img
                    height="40"
                    width="40"
                    src={ICONS.FACEBOOK_MESSENGER}
                    alt=""
                  />
                </Link>
                <Link href={LINKS.INSTAGRAM_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.INSTAGRAM} alt="" />
                </Link>
                <Link href={LINKS.LINKEDIN_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.LINKEDIN} alt="" />
                </Link>
                <Link href={LINKS.YOUTUBE_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.YOUTUBE} alt="" />
                </Link>
                <Link href={LINKS.TWITTER_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.TWITTER} alt="" />
                </Link>
              </Stack>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
