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
                primary="Ku bijyanye n' IMYANYA"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/lien-he')}
                primary="Kuganira"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/hoi-dap')}
                primary="Ibibazo n'ibisubizo"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/thoa-thuan-su-dung')}
                primary="Amasezerano yo Gukoreshwa"
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
                Ku bakoresha
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/tin-tuyen-dung')}
                primary="Gushyira Ahagaragara Umwanya w'Akazi"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/danh-sach-ung-vien')}
                primary="Gushaka Inzandiko z'Ubushake"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung')}
                primary="Kugenzura Umukoresha"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/tro-chuyen')}
                primary="Ubutumwa"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/thong-bao')}
                primary="Ubutumwa"
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
                Ku bashakisha akazi
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/viec-lam')}
                primary="Imirimo"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/cong-ty')}
                primary="Ibigo"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien')}
                primary="Kugenzura Umushakisha w'Akazi"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/tin-nhan')}
                primary="Ubutumwa"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/thong-bao')}
                primary="Ubutumwa"
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
                Porogaramu ya Telefoni Igendanwa
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
                Cyemejwe na
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
                Kunganira na IMYANYA
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
