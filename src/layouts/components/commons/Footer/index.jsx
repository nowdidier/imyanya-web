
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
  Container,
  Divider,
} from '@mui/material';
import { ICONS, IMAGES, LINKS, ROUTES, APP_NAME } from '../../../../configs/constants';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const Footer = () => {
  const nav = useNavigate();

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem sx={{ pb: 2 }}>
                <MuiImageCustom
                  width={150}
                  src={IMAGES.getTextLogo('light')}
                  sx={{ display: 'block' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.ABOUT_US}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/lien-he')}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/hoi-dap')}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/thoa-thuan-su-dung')}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/quy-dinh-bao-mat')}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.JOB_POST}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.PROFILE}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.DASHBOARD}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.CHAT}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.NOTIFICATION}`)}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.CHAT}`)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.NOTIFICATION}`)}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
              </ListItem>
              <ListItem>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Link href={LINKS.CHPLAY_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.chPlayDownload}
                      sx={{ 
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                  <Link href={LINKS.APPSTORE_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.appStoreDownload}
                      sx={{ 
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                </Stack>
              </ListItem>
              
              <ListItem sx={{ mt: 3 }}>
              </ListItem>
              <ListItem>
                <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                  {[
                    { icon: ICONS.FACEBOOK, link: LINKS.FACEBOOK_LINK },
                    { icon: ICONS.FACEBOOK_MESSENGER, link: LINKS.FACEBOOK_MESSENGER_LINK },
                    { icon: ICONS.INSTAGRAM, link: LINKS.INSTAGRAM_LINK },
                    { icon: ICONS.LINKEDIN, link: LINKS.LINKEDIN_LINK },
                    { icon: ICONS.YOUTUBE, link: LINKS.YOUTUBE_LINK },
                    { icon: ICONS.TWITTER, link: LINKS.TWITTER_LINK },
                  ].map((social, index) => (
                    <Link 
                      key={index} 
                      href={social.link} 
                      target="_blank"
                      sx={{
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    >
                      <img height="35" width="35" src={social.icon} alt="" />
                    </Link>
                  ))}
                </Stack>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
      </Container>
    </Box>
  );
};

export default Footer;
