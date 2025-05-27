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
      .required('Recipient email is required.')
      .email('Invalid recipient email.')
      .max(100, 'Recipient email exceeds maximum length.'),
    fullName: yup
      .string()
      .required('Recipient name is required.')
      .max(100, 'Recipient name exceeds maximum length.'),
    title: yup
      .string()
      .required('Email title is required.')
      .max(200, 'Email title exceeds maximum length.'),
    content: yup
      .mixed()
      .test('content', 'Email content is required.', (value) =>
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
        title="Send mail"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        buttonText="Send"
        buttonIcon={<SendIcon />}
      >
        <form id="modal-form" onSubmit={handleSubmit(handleSendEmail)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldCustom
                name="fullName"
                title="Recipient Name"
                showRequired={true}
                placeholder="Enter recipient name"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="email"
                title="Recipient Email"
                showRequired={true}
                placeholder="Enter recipient email"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="title"
                title="Title"
                showRequired={true}
                placeholder="Enter email title"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="content"
                control={control}
                title="Email Content"
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxCustom
                name="isSendMe"
                control={control}
                title="Send a copy to my employer email address."
              />
            </Grid>
          </Grid>
        </form>
      </FormPopup>
    </>
  );
};

export default SendMailCard;
