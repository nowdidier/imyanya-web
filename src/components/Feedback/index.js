import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import errorHandling from '../../utils/errorHandling';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../loading/BackdropLoading';
import RatingCustom from '../controls/RatingCustom';
import MultilineTextFieldCustom from '../controls/MultilineTextFieldCustom';
import myjobService from '../../services/myjobService';

const Feedback = () => {
  const [open, setOpen] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const schema = yup.object().shape({
    rating: yup.number().required('Gutanga amanota ni itegeko.'),
    content: yup
      .string()
      .required('Ibirimo byo gutanga amanota ni itegeko.')
      .max(500, 'Ibirimo byo gutanga amanota birenze uburebure bwemewe.'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      rating: 5,
      content: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendFeedback = (data) => {
    const sendFeedback = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await myjobService.createFeedback(data);
        handleClose();
        toastMessages.success('Kohereza ibitekerezo byagenze neza.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    sendFeedback(data);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          borderBottomLeftRadius: 0,
          textTransform: 'inherit',
          color: 'white',
          zIndex: 1250,
        }}
        startIcon={<SentimentVerySatisfiedIcon />}
      >
        Ibitekerezo
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Ibitekerezo</Typography>
            <IconButton color="error" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid spacing={1}>
            <Grid item xs={12}>
              <RatingCustom name="rating" control={control} />
            </Grid>
            <Grid item xs={12}>
              <MultilineTextFieldCustom
                name="content"
                placeholder="Andika ibirimo byo gutanga amanota hano"
                control={control}
                minRows={7}
                maxRows={30}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit(handleSendFeedback)}
            color="primary"
            sx={{ margin: '0 auto' }}
          >
            Kohereza
          </Button>
        </DialogActions>
      </Dialog>
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default Feedback;
