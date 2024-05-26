import React from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AppIntroductionCard from '../../../components/AppIntroductionCard';
import MuiImageCustom from '../../../components/MuiImageCustom';
import { ABOUT_IMAGES } from '../../../configs/constants';


const AboutUsPage = () => {
  TabTitle('Irinamiro - Uburyo bwo Gusobanura Akazi MyJob');

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Irinamiro
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography>
              MyJob - Inzira y'amakuru yo kwakira no gushyirwa mu kazi bigenewe
              ibigo byose n'abashakisha akazi. Duhweze ko bizazana "IBYIRINGIRO"
              ku Bigo bishaka impuguke n'Abashakisha akazi bashaka amahirwe yo
              gushyirwa mu kazi. Bifite imikorere ibiri: Urubuga rw'Abakoresha
              n'Ikoranabuhanga ryo kwakira Abashakisha akazi, MyJob bizazana
              ibyikorwa bishya, byishimye; bizahuza indangagaciro yo gushyikirana
              ku kazi kw'impuguke zose kandi bizafasha ibigo kubaka ikigo
              cy'abakozi bikomeze.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Urubuga rw'ikoranabuhanga
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Urubuga rw'ikoranabuhanga rufasha Abakoresha gushaka abakozi,
                    kugenzura imirimo, abashaka akazi, no kubaka imbonerahamwe
                    y'amakuru ayibunda.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Ikoranabuhanga ya telefone igendanwa
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Ikoranabuhanga yo gushakisha akazi yita ku bashakisha akazi
                    kugera ku mirimo yose ibahuye, ahantu hose no mu gihe icyo
                    ari cyo cyose
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Ibyiciro by'ingenzi
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Kubera kwitanga mu kwakira no gushakisha akazi mu byiciro
                    bitatu: Ikoranabuhanga ry'Amakuru, Gutangaza ku mbuga za
                    Interineti, PR - Gucunga Amasoko, Abashakisha akazi Cyangwa
                    Abakoresha bazahuza n'ibyabahuye, binyuze ku byifuzo byabo.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Kugabanya amafaranga
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Kugabanya amafaranga, igihe, kugera ku musaruro, gushyikirana
                    ku byifuzo byose byo gushakisha akazi no gushaka impuguke.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Porogaramu ya MyJob ku Telefoni Igendanwa
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
                  <MuiImageCustom src={ABOUT_IMAGES.JOB_POST} />
                </Box>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Guhitamo akazi gahuje - Kugenda mu nzira yahuje
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    Gukoresha buri wese mu gushakisha akazi nk'uko byifuzwa
                    n'umushakisha akazi, harimo ibyikorwa byo gutanga inama ku
                    makazi ahuje, Gushakisha akazi, Gushakisha ibigo no gufatanya
                    na Chatbot mu gushakisha akazi vuba.
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
                    Gushyiraho CV & Umwimerere
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    CV ku mbuga y'interineti kandi ushobora kwoherereza CV
                    yaguhuye. Byoroheye, byihuse, bya gahunda kandi bihambaye.
                    Kongerera kuba 80% bigateza ubushobozi bwo kwemererwa akazi.
                  </Typography>
                </Stack>
              </Box>
              <Box width="100%">
                <Box sx={{ height: 600 }}>
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
             Ingingo zikurikira zivannye mu cyongereza ca Kinyarvanda:

<Box width="100%"> 
<Box sx={{ height: 600 }}>
<MuiImageCustom src={ABOUT_IMAGES.AROUND_JOB_POST} />
</Box>
</Box>
<Box>
<Stack spacing={2}>
<Typography variant="h4" style={{ color: '#fca34d', fontSize: 30 }}>
Umwuga ukurikiranye nawe
</Typography>
<Typography textAlign="justify" color="#6D7681">
Ibyiciro AROUND JOB IBIRI ku ruribo rwa MyJob. Ibi byiciro bituma abasaba ngo babone umurimo ushyizeho kuri iyo ngingo, kandi byiteze ko bakwiye kuburizwamo mu baturage babo, bikoresheje umurimo ukwiye.
</Typography>
</Stack>
</Box>
</Stack>
</Card>
</Box>
<Box sx={{ mt: 5 }}>
<Card sx={{ p: 5 }}>
<Stack direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row', lg: 'row', xl: 'row', }} spacing={2}>
<Box>
<Stack spacing={2}>
<Typography variant="h4" style={{ color: '#fca34d', fontSize: 30 }}>
Ibyiciro ku Kazi Igihe Cyose
</Typography>
<Typography textAlign="justify" color="#6D7681">
Gushyiraho ibyiciro ku Kazi ngo iyo myuga ikubwire. Imirimo mishya ikomeye yabashyitsi bo muri ico gihe izohindurwa ku ikarita yawe ya e-mail.
</Typography>
</Stack>
</Box>
<Box width="100%">
<Box sx={{ height: 600 }}>
<MuiImageCustom src={ABOUT_IMAGES.JOB_POST_NOTIFICATION} />
</Box>
</Box>
</Stack>
</Card>
</Box>
<Box sx={{ mt: 5 }}>
{/* Gutangira: AppIntroductionCard */}
<AppIntroductionCard />
{/* Guhera: AppIntroductionCard */}
</Box>
</Box>
</>
);
}; 
export default AboutUsPage;