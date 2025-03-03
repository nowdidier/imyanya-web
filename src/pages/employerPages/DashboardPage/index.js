import React from 'react';
import { Grid } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import EmployerQuantityStatistics from '../../components/employers/EmployerQuantityStatistics';
import RecruitmentChart from '../../components/employers/charts/RecruitmentChart';
import CandidateChart from '../../components/employers/charts/CandidateChart';
import ApplicationChart from '../../components/employers/charts/ApplicationChart';
import HiringAcademicChart from '../../components/employers/charts/HiringAcademicChart';

const DashboardPage = () => {
  TabTitle("Employer Dashboard")

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
          <RecruitmentChart title="RECRUITMENT CHART" />
          {/* End: RecruitmentChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: CandidateChart */}
          <CandidateChart title="CANDIDATE CHART" />
          {/* End: CandidateChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: ApplicationChart */}
          <ApplicationChart title="RECRUITMENT & APPLICATION CHART" />
          {/* End: ApplicationChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: HiringAcademicChart */}
          <HiringAcademicChart title="RECRUITMENT BY LEVEL CHART" />
          {/* End: HiringAcademicChart */}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
