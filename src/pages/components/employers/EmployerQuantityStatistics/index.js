import React from 'react';
import {
  CopyFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  ContactsFilled,
} from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Statistic } from 'antd';

import statisticService from '../../../../services/statisticService';

const EmployerQuantityStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.employerGeneralStatistics();
        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>
                Ibyangombwa byose by'akazi
              </span>
            }
            value={data?.totalJobPost}
            precision={0}
            valueStyle={{ color: '#3f8600', borderRadius: 1 }}
            prefix={<CopyFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>
                Itangazo ry'akazi ritegereje kwemezwa
              </span>
            }
            value={data?.totalJobPostingPendingApproval}
            precision={0}
            valueStyle={{ color: '#ff9800' }}
            prefix={<ClockCircleFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>
                Itangazo ry'akazi ryarangiye
              </span>
            }
            value={data?.totalJobPostExpired}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<CloseCircleFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>Abakandida basabye akazi</span>
            }
            value={data?.totalApply}
            precision={0}
            valueStyle={{ color: '#00b0ff' }}
            prefix={<ContactsFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployerQuantityStatistics;
