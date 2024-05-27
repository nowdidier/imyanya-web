import React from 'react';
import { Grid } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import EmployerQuantityStatistics from '../../components/employers/EmployerQuantityStatistics';
import RecruitmentChart from '../../components/employers/charts/RecruitmentChart';
import CandidateChart from '../../components/employers/charts/CandidateChart';
import ApplicationChart from '../../components/employers/charts/ApplicationChart';
import HiringAcademicChart from '../../components/employers/charts/HiringAcademicChart';

const DashboardPage = () => {
  TabTitle("Ipaji y'ibaruramari - Umukoresha")

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Start: EmployerQuantityStatistics */}
          <EmployerQuantityStatistics />
          {/* End: EmployerQuantityStatistics */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: RecruitmentChart */}
          <RecruitmentChart title="IGISHUSHANYO MBONERA CY'AKAZI" />
          {/* End: RecruitmentChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: CandidateChart */}
          <CandidateChart title="IGISHUSHANYO MBONERA CY'ABAKANDIDA" />
          {/* End: CandidateChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: ApplicationChart */}
          <ApplicationChart title="IGISHUSHANYO MBONERA CY'AKAZI & GUSABA" />
          {/* End: ApplicationChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: HiringAcademicChart */}
          <HiringAcademicChart title="IGISHUSHANYO MBONERA CY'AKAZI KU RWEGO RW'AMASHURI" />
          {/* End: HiringAcademicChart */}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
