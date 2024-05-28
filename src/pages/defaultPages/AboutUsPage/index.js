import React from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AppIntroductionCard from '../../../components/AppIntroductionCard';
import MuiImageCustom from '../../../components/MuiImageCustom';
import { ABOUT_IMAGES } from '../../../configs/constants';


const AboutUsPage = () => {
  TabTitle('Twebwe - Sisitemu yo kumenyekanisha akazi IMYANYA');

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Twebwe
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography>
              IMYANYA- Urubuga rw'amakuru y'akazi n'uburyo bwo gushaka akazi ku bigo byose n'abashaka akazi. Twizeye ko tuzazana "ICYIZERE" ku bigo bishaka abakozi b'impano no ku bashaka akazi bashaka amahirwe y'umwuga. Dufite sisitemu ebyiri: Urubuga rwagenewe Abakoresha n'Ubusabe (Application) bwagenewe Abashaka Akazi, IMYANYAizatanga ubunararibonye bushya, bushimishije; ihuza inzozi zo gutsinda mu kazi kwa buri mpano yose kandi ifasha ibigo kubaka ikipe y'abakozi ikomeye.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Urubuga
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Urubuga rufasha Abakoresha gushakisha abakozi, gucunga akazi, abashaka akazi, no kubaka ububiko bw'amakuru yagutse.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Mobile
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Ubusabe bwo gushakisha akazi bufasha Abashaka Akazi kubona akazi kabakwiye aho ari hose n'igihe cyose.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Icyerekezo cy'Inganda
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Dufite ubumenyi bwimbitse mu bijyanye no gushakisha akazi n'akazi mu nzego eshatu: Ikoranabuhanga ry'amakuru, Kwamamaza kuri internet, PR - Marketing, Abashaka Akazi cyangwa Abakoresha bazahuza neza n'ababagana, bijyanye n'ibyo bakeneye.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Kuzigama Amafaranga
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Kuzigama amafaranga, igihe, kugera ku musaruro, no kuzuza ibyo buri wese akeneye mu gushaka akazi no gushakisha abakozi b'impano.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Porogaramu ya Mobile IMYANYA
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box width="100%">
                <Box sx={{ height: 600 }}>
                  {/* Assuming MuiImageCustom is a component that renders an image */}
                  <MuiImageCustom src={ABOUT_IMAGES.JOB_POST} />
                </Box>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Hitamo akazi k'ukuri - Ujye mu cyerekezo gikwiye
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    Guhuza ubunararibonye bwo gushakisha akazi n'ibyifuzo by'abashaka akazi birimo ibiranga Gushakisha akazi gukwiye, Gushakisha akazi, Gushakisha ibigo na Chatbot ifasha mu gushakisha akazi byihuse.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Kora CV & Profile
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    CV kuri internet kandi ushobora gushyiraho CV y'inyongera. Byoroshye, byihuse, by'umwuga kandi bitandukanye. Byongera amahirwe yo gusaba akazi ku kigero cya 80%.
                  </Typography>
                </Stack>
              </Box>
              <Box width="100%">
                <Box sx={{ height: 600 }}>
                  {/* Assuming MuiImageCustom is a component that renders an image */}
                  <MuiImageCustom src={ABOUT_IMAGES.PROFILE} />
                </Box>
              </Box>
            </Stack>
          </Card>
        </Box>
        
<Box sx={{ mt: 5 }}>
  <Card sx={{ p: 5 }}>
    <Stack
      direction={{
        xs: 'column',
        sm: 'column',
        md: 'row',
        lg: 'row',
        xl: 'row',
      }}
      spacing={2}
    >
      <Box width="100%">
        <Box sx={{ height: 600 }}>
          {/* Assuming MuiImageCustom is a component that renders an image */}
          <MuiImageCustom src={ABOUT_IMAGES.AROUND_JOB_POST} />
        </Box>
      </Box>
      <Box>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            style={{ color: '#fca34d', fontSize: 30 }}
          >
            Akazi kari hafi yawe
          </Typography>
          <Typography textAlign="justify" color="#6D7681">
            Ibiranga AKAZI KARI HAFI YAWE kuri app IMYANYA. Iki gice gifasha abashaka akazi kubona byoroshye akazi kabakwiye, kandi kikabaha amahirwe yo gukora hafi y'aho batuye, bikaborohereza mu ngendo zabo za buri munsi nta kintu kindi bisaba mu gushakisha mu matangazo y'akazi menshi.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Card>
</Box>
<Box sx={{ mt: 5 }}>
  <Card sx={{ p: 5 }}>
    <Stack
      direction={{
        xs: 'column-reverse',
        sm: 'column-reverse',
        md: 'row',
        lg: 'row',
        xl: 'row',
      }}
      spacing={2}
    >
      <Box>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            style={{ color: '#fca34d', fontSize: 30 }}
          >
            Itangazo ry'akazi igihe cyose
          </Typography>
          <Typography textAlign="justify" color="#6D7681">
            Tanga itangazo ry'akazi kugira ngo akazi kabashe kukugeraho. Akazi gashya kava mu bakoresha bakomeye kazajya koherezwa kuri email yawe buri cyumweru.
          </Typography>
        </Stack>
      </Box>
      <Box width="100%">
        <Box sx={{ height: 600 }}>
          {/* Assuming MuiImageCustom is a component that renders an image */}
          <MuiImageCustom src={ABOUT_IMAGES.JOB_POST_NOTIFICATION} />
        </Box>
      </Box>
    </Stack>
  </Card>
</Box>
<Box sx={{ mt: 5 }}>
  {/* Start: AppIntroductionCard */}
  <AppIntroductionCard />
  {/* End: AppIntroductionCard */}
</Box>
</Box>
    </>
  );
};

export default AboutUsPage;