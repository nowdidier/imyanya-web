import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DataTableCustom from '../../../../components/DataTableCustom';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import NoDataCard from '../../../../components/NoDataCard';
import { JOB_POST_STATUS_BG_COLOR } from '../../../../configs/constants';

const JobPostsTable = (props) => {
  const { rows, isLoading, handleDelete, handleUpdate } = props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard title="You have no job postings yet" />
          </TableCell>
        </TableBody>
      ) : (
        rows.map((row) => {
          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {(row.imageUrl || row.companyDict?.companyImageUrl) && (
                    <MuiImageCustom
                      width={44}
                      height={44}
                      src={row.imageUrl || row.companyDict?.companyImageUrl}
                      sx={{
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {row.jobName}
                    </Typography>
                    {row.isUrgent && (
                      <Chip
                        label="Urgent Hiring"
                        color="error"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left">
                {dayjs(row.createAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">
                {row?.isExpired ? (
                  <span style={{ color: 'red' }}>
                    {dayjs(row.deadline).format('DD/MM/YYYY')}
                  </span>
                ) : (
                  <span style={{ color: '#2a3eb1' }}>
                    {dayjs(row.deadline).format('DD/MM/YYYY')}
                  </span>
                )}
              </TableCell>
              <TableCell align="left">{row.appliedNumber}</TableCell>
              <TableCell align="left">{row.views}</TableCell>
              <TableCell align="left">
                <Chip
                  label={allConfig?.jobPostStatusDict[row?.status] || '---'}
                  color={JOB_POST_STATUS_BG_COLOR[row?.status] || 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Update" arrow>
                  <IconButton
                    color="secondary"
                    aria-label="edit"
                    onClick={() => handleUpdate(row.id)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableBody>
          );
        })
      )}
    </DataTableCustom>
  );
};

export default JobPostsTable;
