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
      .email('Recipient email is invalid.')
      .max(100, 'Recipient email exceeds the maximum length.'),
    fullName: yup
      .string()
      .required('Recipient Name.')
      .max(100, 'Recipient Name exceeds the maximum length.'),
    title: yup
      .string()
      .required('Email subject is required.')
      .max(200, 'Email subject exceeds the maximum length.'),
    content: yup
      .mixed()
      .test('content', 'Email content is required.', (value) => {
        if (value && typeof value.getCurrentContent === 'function') {
          return value.getCurrentContent().hasText();
        }

        if (typeof value === 'string') {
          return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length > 0;
        }

        return false;
      }),
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
                title="Subject"
                showRequired={true}
                placeholder="Enter email subject"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="content"
                control={control}
                title="Email Content"
                showRequired={true}
                withLinks
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
