import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import { List, Avatar as AntAvatar } from 'antd';
import { FileOutlined, FilePdfOutlined } from '@ant-design/icons';

import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import { CV_TYPES } from '../../../../configs/constants';

const JobApplicationCard = () => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoading(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(jobSeekerProfileId, params);
        setData(resData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser?.jobSeekerProfileId) {
      getOnlineProfile(currentUser.jobSeekerProfileId);
    }
  }, [currentUser]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Inyandiko y'akazi</Typography>
        <IconButton
          aria-label="ArrowForward"
          size="medium"
          onClick={() => nav('/ung-vien/ho-so')}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Stack>
      <Box sx={{ pt: 2 }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={isLoading}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  item?.type === CV_TYPES.cvWebsite ? (
                    <Tooltip title="Inyandiko yo kuri interineti">
                      <AntAvatar style={{ backgroundColor: '#182642' }} icon={<FileOutlined />} />
                    </Tooltip>
                  ) : item?.type === CV_TYPES.cvUpload ? (
                    <Tooltip title="Inyandiko y'inyongera">
                      <AntAvatar style={{ backgroundColor: '#ff3d00' }} icon={<FilePdfOutlined />} />
                    </Tooltip>
                  ) : (
                    '---'
                  )
                }
                title={item?.title}
                description={
                  <>
                    <Typography variant="caption">
                      Guhindurwa bwa nyuma {dayjs(item?.updateAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography>
                      {item?.isActive ? (
                        <span style={{ color: '#4caf50' }}>Kwemerera gushakisha</span>
                      ) : (
                        <span style={{ color: '#ff3d00' }}>Ntiwemerera gushakisha</span>
                      )}
                    </Typography>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Box>
    </Box>
  );
};

export default JobApplicationCard;
