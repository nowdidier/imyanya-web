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
import { ICONS, IMAGES, LINKS, ROUTES, APP_NAME, HOST_NAME } from '../../../../configs/constants';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const Footer = () => {
  const nav = useNavigate();
  const employerOrigin = `https://${HOST_NAME.EMPLOYER_MYJOB}`;
  const ticketsUrl = `https://tickets.${HOST_NAME.MYJOB}`;

  return (
    <Box>
      <Box
        sx={{
          height: 4,
          background:
            'linear-gradient(90deg, #441da0 0%, #6d28d9 40%, #ff9800 75%, #ffb74d 100%)',
        }}
      />
      <Container maxWidth="lg" sx={{ pt: 5 }}>
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
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.ABOUT_US_EN}`)}
                  primary={`About ${APP_NAME}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`)}
                  primary="Rwanda Career Guide"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`)}
                  primary="Career Advice Articles"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.CONTACT}`)}
                  primary="Contact"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.FAQ}`)}
                  primary="FAQ"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.EDITORIAL_POLICY}`)}
                  primary="Editorial Policy"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.CORRECTION_POLICY}`)}
                  primary="Correction Policy"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.VERIFICATION_POLICY}`)}
                  primary="Verification Policy"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  primary={
                    <Link
                      href={`/${ROUTES.JOB_SEEKER.TERMS_OF_USE_EN}`}
                      color="inherit"
                      underline="hover"
                    >
                      Terms of Use
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  primary={
                    <Link
                      href={`/${ROUTES.JOB_SEEKER.PRIVACY_POLICY_EN}`}
                      color="inherit"
                      underline="hover"
                    >
                      Privacy Policy
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: '0.01em',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 36,
                      height: 3,
                      mt: 0.75,
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, #6d28d9 0%, #ff9800 100%)',
                    },
                  }}
                >
                  For Employers
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      href={`${employerOrigin}/${ROUTES.EMPLOYER.JOB_POST}`}
                      color="inherit"
                      underline="hover"
                    >
                      Post a Job
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      href={`${employerOrigin}/${ROUTES.EMPLOYER.PROFILE}`}
                      color="inherit"
                      underline="hover"
                    >
                      Search Resumes
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link href={employerOrigin} color="inherit" underline="hover">
                      Employer Management
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      href={`${employerOrigin}/${ROUTES.EMPLOYER.CHAT}`}
                      color="inherit"
                      underline="hover"
                    >
                      Messages
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      href={`${employerOrigin}/${ROUTES.EMPLOYER.NOTIFICATION}`}
                      color="inherit"
                      underline="hover"
                    >
                      Notifications
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: '0.01em',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 36,
                      height: 3,
                      mt: 0.75,
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, #6d28d9 0%, #ff9800 100%)',
                    },
                  }}
                >
                  For Job Seekers
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`)}
                  primary="Jobs"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY_EN}`)}
                  primary="Company"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      href={ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                      underline="hover"
                    >
                      Events &amp; Tickets
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}`)}
                  primary="Candidate Management"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.CHAT}`)}
                  primary="Messages"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.NOTIFICATION}`)}
                  primary="Notifications"
                />
              </ListItem>
              <ListItem sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: '0.01em',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 36,
                      height: 3,
                      mt: 0.75,
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, #6d28d9 0%, #ff9800 100%)',
                    },
                  }}
                >
                  Popular Searches
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}`)}
                  primary="Jobs by Location"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_BY_TYPE_EN}`)}
                  primary="Jobs by Employment Type"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}`)}
                  primary="Jobs by Career"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: '0.01em',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 36,
                      height: 3,
                      mt: 0.75,
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, #6d28d9 0%, #ff9800 100%)',
                    },
                  }}
                >
                  Mobile App
                </Typography>
              </ListItem>
              <ListItem>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Link href={LINKS.CHPLAY_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.chPlayDownload}
                      sx={{ 
                       transition: 'transform 0.2s',
                        '&:hover': {transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                  <Link href={LINKS.APPSTORE_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.appStoreDownload}
                      sx={{ 
                       transition: 'transform 0.2s',
                        '&:hover': {transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                </Stack>
              </ListItem>
              
              <ListItem sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: '0.01em',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 36,
                      height: 3,
                      mt: 0.75,
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, #6d28d9 0%, #ff9800 100%)',
                    },
                  }}
                >
                  Connect with {APP_NAME}
                </Typography>
              </ListItem>
              <ListItem sx={{ pt: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  Follow us for daily jobs, CV tips, and interview advice — and
                  tell a friend: good jobs deserve good sharing.
                </Typography>
              </ListItem>
              <ListItem>
                <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                  {[
                    { name: 'Facebook', icon: ICONS.FACEBOOK, link: LINKS.FACEBOOK_LINK },
                    { name: 'Facebook Messenger', icon: ICONS.FACEBOOK_MESSENGER, link: LINKS.FACEBOOK_MESSENGER_LINK },
                    { name: 'Instagram', icon: ICONS.INSTAGRAM, link: LINKS.INSTAGRAM_LINK },
                    { name: 'LinkedIn', icon: ICONS.LINKEDIN, link: LINKS.LINKEDIN_LINK },
                    { name: 'YouTube', icon: ICONS.YOUTUBE, link: LINKS.YOUTUBE_LINK },
                    { name: 'Twitter', icon: ICONS.TWITTER, link: LINKS.TWITTER_LINK },
                  ].map((social) => (
                    <Link 
                      key={social.link} 
                      href={social.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      sx={{
                        borderRadius: '50%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'scale(1.12)',
                          boxShadow: '0 6px 18px -4px rgba(109, 40, 217, 0.55)',
                        }
                      }}
                    >
                      <img height="35" width="35" src={social.icon} alt="" loading="lazy" />
                    </Link>
                  ))}
                </Stack>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Typography 
          variant="body2" 
          color="grey.400" 
          align="center"
          sx={{ pt: 2 }}
        >
          Copyright {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
