
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import FormPopup from '../../../../components/controls/FormPopup';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';

const SendMailCard = ({
  openPopup,
  setOpenPopup,
  sendMailData,
  handleSendEmail,
}) => {
  const schema = yup.object().shape({
    email: yup
      .string()
     
    fullName: yup
      .string()
      
    title: yup
      .string()
     
    content: yup
      .mixed()
        value.getCurrentContent().hasText()
      ),
    isSendMe: yup.boolean().default(false),
  });

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (openPopup) {
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopup]);

  React.useEffect(() => {
    if (sendMailData) {
      reset((formValues) => ({
        ...formValues,
        ...sendMailData,
      }));
    } else {
      reset();
    }
  }, [sendMailData, reset]);

  return (
    <>
      <FormPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        buttonIcon={<SendIcon />}
      >
        <form id="modal-form" onSubmit={handleSubmit(handleSendEmail)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldCustom
                name="fullName"
                showRequired={true}
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="email"
                showRequired={true}
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="title"
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="content"
                control={control}
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxCustom
                name="isSendMe"
                control={control}
              />
            </Grid>
          </Grid>
        </form>
      </FormPopup>
    </>
  );
};

export default SendMailCard;
