import React from 'react';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const QuantityStatistics = () => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Applications"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600', borderRadius: 1 }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Saved Jobs"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Following Companies"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
    // <Box>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
    //       <NumberCard
    //         color="#f44336"
    //         backgroundColor="rgba(244, 67, 54, 0.1)"
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
    //       <NumberCard
    //         color="#29b6f6"
    //         backgroundColor="rgba(41, 182, 246, 0.1)"
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
    //       <NumberCard
    //         color="#FCA34D"
    //         backgroundColor="rgba(252, 163, 77, 0.1)"
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
    //       <NumberCard
    //         color="#66BB6A"
    //         backgroundColor="rgba(102, 187, 106, 0.1)"
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default QuantityStatistics;
