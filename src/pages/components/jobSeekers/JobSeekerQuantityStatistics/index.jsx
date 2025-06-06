

import React from 'react';
import {
  SolutionOutlined,
  BookOutlined,
  EyeOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Statistic } from 'antd';
import defaultTheme from '../../../../themeConfigs/defaultTheme';
import statisticService from '../../../../services/statisticService';

const JobSeekerQuantityStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerGeneralStatistics();

        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: 12,
            boxShadow: defaultTheme.customShadows.small,
            height: '100%',
            background: `linear-gradient(135deg, ${defaultTheme.palette.success.background} 0%, rgba(46, 125, 50, 0.1) 100%)`
          }}
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '1rem',
                color: defaultTheme.palette.grey[700],
                marginBottom: '8px',
                display: 'block'
              }}>
                Jobs applied
              </span>
            }
            value={data?.totalApply}
            precision={0}
            valueStyle={{ 
              color: defaultTheme.palette.success.main,
              fontSize: '2rem',
              fontWeight: '700'
            }}
            prefix={<SolutionOutlined style={{ fontSize: '1.5rem' }} />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: 12,
            boxShadow: defaultTheme.customShadows.small,
            height: '100%',
            background: `linear-gradient(135deg, ${defaultTheme.palette.primary.background} 0%, ${defaultTheme.palette.primary.background} 100%)`
          }}
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '1rem',
                color: defaultTheme.palette.grey[700],
                marginBottom: '8px',
                display: 'block'
              }}>
                Saved jobs
              </span>
            }
            value={data?.totalSave}
            precision={0}
            valueStyle={{ 
              color: defaultTheme.palette.primary.main,
              fontSize: '2rem',
              fontWeight: '700'
            }}
            prefix={<BookOutlined style={{ fontSize: '1.5rem' }} />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: 12,
            boxShadow: defaultTheme.customShadows.small,
            height: '100%',
            background: `linear-gradient(135deg, ${defaultTheme.palette.info.background} 0%, ${defaultTheme.palette.info.background} 100%)`
          }}
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '1rem',
                color: defaultTheme.palette.grey[700],
                marginBottom: '8px',
                display: 'block'
              }}>
                Employers viewed profile
              </span>
            }
            value={data?.totalView}
            precision={0}
            valueStyle={{ 
              color: defaultTheme.palette.info.main,
              fontSize: '2rem',
              fontWeight: '700'
            }}
            prefix={<EyeOutlined style={{ fontSize: '1.5rem' }} />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: 12,
            boxShadow: defaultTheme.customShadows.small,
            height: '100%',
            background: `linear-gradient(135deg, ${defaultTheme.palette.hot.background} 0%, ${defaultTheme.palette.hot.background} 100%)`
          }}
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '1rem',
                color: defaultTheme.palette.grey[700],
                marginBottom: '8px',
                display: 'block'
              }}>
                Employers are following
              </span>
            }
            value={data?.totalFollow}
            precision={0}
            valueStyle={{ 
              color: defaultTheme.palette.hot.main,
              fontSize: '2rem',
              fontWeight: '700'
            }}
            prefix={<HeartOutlined style={{ fontSize: '1.5rem' }} />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default JobSeekerQuantityStatistics;
