import React from 'react';

import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import PersonalInfoCard from '../../components/jobSeekers/PersonalInfoCard';
import GeneralInfoCard from '../../components/jobSeekers/GeneralInfoCard';
import CVCard from '../../components/jobSeekers/CVCard';

const items = [
  { id: 0, value: 'Personal Information', icon: <PersonPinOutlinedIcon /> },
  { id: 1, value: 'General Information', icon: <WorkOutlineOutlinedIcon /> },
  { id: 2, value: 'Upload Attached CV', icon: <UploadFileOutlinedIcon /> },
];

const AttachedProfilePage = () => {
  TabTitle("Update Attached Profile")
  const refs = React.useRef([]);

  const handleClickScroll = (index) => {
    refs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={7} lg={9} xl={9} item>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[0] = el)}>
              {/* Start: Personal info */}
              <PersonalInfoCard title="Personal Information" />
              {/* End: Personal info  */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[1] = el)}>
              {/* Start: General info */}
              <GeneralInfoCard title="General Information" />
              {/* End: General info */}
            </Card> 
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[1] = el)}>
              {/* Start: Cv card */}
              <CVCard title="Upload Attached CV" />
              {/* End: Cv card */}
            </Card>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={5}
          lg={3}
          xl={3}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
          item
        >
          <Stack spacing={2}>
            <Card sx={{ p: 2 }}>
              <Stack>
                <Box>
                  <Typography variant="h6">Your Attached Profile</Typography>
                </Box>
                <Box>
                  <List
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                    }}
                    aria-label="contacts"
                  >
                    {items.map((item) => (
                      <ListItem
                        key={item.id}
                        disablePadding
                        onClick={() => handleClickScroll(item.id)}
                      >
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.value} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttachedProfilePage;
