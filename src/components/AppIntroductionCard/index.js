import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { IMAGES, LINKS } from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import imyanyaService from '../../services/imyanyaService';
import BackdropLoading from '../loading/BackdropLoading';

const AppIntroductionCard = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleSendSMS = (event) => {
    event.preventDefault();
    
    const sendSMS = async (data) => {
      setIsFullScreenLoading(true);

      try {
        await imyanyaService.sendSMSDownloadApp(data);

        toastMessages.success('Sent successfully. Please check your messages');
        setValue('');
      } catch (error) {
        console.log(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if (value !== '')
      if (
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
          value
        )
      ) {
        sendSMS({ phone: value });
      } else {
        toastMessages.error('Invalid phone number!');
      }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="center">
          <Box>
            <Typography variant="h5">Download Free App</Typography>
          </Box>
          <Box>
            <Typography>
              Find jobs effectively by downloading imyanya to your mobile device and be
              ready to get hired today!
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSendSMS}>
            <Paper
              sx={{
                boxShadow: 0,
                p: '3.5px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: 1,
                borderColor: 'GrayText',
                borderRadius: 10,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter phone number"
              />
              <Button
                variant="contained"
                color="warning"
                style={{ borderRadius: 20, color: 'white' }}
                type="submit"
              >
                send
              </Button>
            </Paper>
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <Link href={LINKS.CHPLAY_LINK} target="_blank">
                <CardMedia
                  height="50"
                  width="150"
                  component="img"
                  image={IMAGES.chPlayDownload}
                  alt="Paella dish"
                />
              </Link>
              <Link href={LINKS.APPSTORE_LINK} target="_blank">
                <CardMedia
                  height="50"
                  width="150"
                  component="img"
                  image={IMAGES.appStoreDownload}
                  alt="Paella dish"
                />
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Card>
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default AppIntroductionCard;
