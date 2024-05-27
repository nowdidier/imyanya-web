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
      .required('Email y’umukiriya ni ngombwa.')
      .email('Email y’umukiriya siyo.')
      .max(100, 'Email y’umukiriya irenze uburebure bwemewe.'),
    fullName: yup
      .string()
      .required('Izina ry’umukiriya.')
      .max(100, 'Izina ry’umukiriya irenze uburebure bwemewe.'),
    title: yup
      .string()
      .required('Umutwe w’email ni ngombwa.')
      .max(200, 'Umutwe w’email urenze uburebure bwemewe.'),
    content: yup
      .mixed()
      .test('content', 'Ibikubiye mu email ni ngombwa.', (value) =>
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
        title="Ohereza email"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        buttonText="Ohereza"
        buttonIcon={<SendIcon />}
      >
        <form id="modal-form" onSubmit={handleSubmit(handleSendEmail)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldCustom
                name="fullName"
                title="Izina ry’umukiriya"
                showRequired={true}
                placeholder="Andika izina ry’umukiriya"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="email"
                title="Email y’umukiriya"
                showRequired={true}
                placeholder="Andika email y’umukiriya"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="title"
                title="Umutwe"
                showRequired={true}
                placeholder="Andika umutwe w’email"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="content"
                control={control}
                title="Ibikubiye mu email"
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxCustom
                name="isSendMe"
                control={control}
                title="Ohereza kopi ku email yanjye."
              />
            </Grid>
          </Grid>
        </form>
      </FormPopup>
    </>
  );
};

export default SendMailCard;
