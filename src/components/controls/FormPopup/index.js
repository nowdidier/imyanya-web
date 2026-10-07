import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

const Popup = ({
  title,
  openPopup,
  setOpenPopup,
  showDialogAction =true,
  buttonText = 'Save',
  buttonIcon = <SaveIcon />,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '16px',
            boxShadow: theme.customShadows.card,
            border: `1px solid ${theme.palette.grey[100]}`,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            p: 2.5,
            background: theme.palette.grey[50]
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography 
              variant="h5"
              sx={{
                color: theme.palette.grey[900],
                fontWeight: 600
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={() => setOpenPopup(false)}
              aria-label="Close dialog"
              sx={{
                color: theme.palette.grey[500],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100]
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 3 }}>
          {children}
        </DialogContent>

        {showDialogAction && (
          <DialogActions
            sx={{
              py: 2,
              px: 3,
              background: 'white',
              borderTop: '1px solid #dadce0',
              boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
              gap: 1.5,
              flexWrap: 'wrap',
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
            }}
          >
            <LoadingButton
              variant="outlined"
              size="large"
              onClick={() => setOpenPopup(false)}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                px: 3,
                fontWeight: 600,
                borderColor: '#dadce0',
                color: '#3c4043',
                '&:hover': { borderColor: '#1a73e8', backgroundColor: '#f6fafe' },
                flex: { xs: 1, sm: 'none' },
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={false}
              loadingPosition="start"
              startIcon={buttonIcon}
              variant="contained"
              size="large"
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                px: 4,
                minWidth: 160,
                fontWeight: 700,
                backgroundColor: '#1a73e8',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#1b66c9',
                  boxShadow: 'none',
                },
                flex: { xs: 2, sm: 'none' },
              }}
              type="submit"
              form="modal-form"
            >
              {buttonText}
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default React.memo(Popup);
