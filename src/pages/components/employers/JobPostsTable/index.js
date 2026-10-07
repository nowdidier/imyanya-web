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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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
          const daysLeft =
            row?.deadline && dayjs(row.deadline).isValid()
              ? dayjs(row.deadline).endOf('day').diff(dayjs().startOf('day'), 'day')
              : null;
          const expired = Boolean(row?.isExpired) || (daysLeft !== null && daysLeft < 0);

          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {(row.imageUrl || row.companyDict?.companyImageUrl) && (
                    <MuiImageCustom
                      width={48}
                      height={48}
                      src={row.imageUrl || row.companyDict?.companyImageUrl}
                      sx={{
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: '#dadce0',
                        bgcolor: 'white',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, lineHeight: 1.35, color: '#202124' }}
                    >
                      {row.jobName}
                    </Typography>
                    <Stack direction="row" spacing={0.75} sx={{ mt: 0.5, flexWrap: 'wrap', rowGap: 0.5 }}>
                      {row.isUrgent && (
                        <Chip
                          label="Urgent Hiring"
                          color="error"
                          variant="outlined"
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }}
                        />
                      )}
                      {expired && (
                        <Chip
                          label="Expired"
                          color="default"
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }}
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight={500}>
                  {dayjs(row.createAt).format('DD/MM/YYYY')}
                </Typography>
              </TableCell>
              <TableCell align="left">
                {expired ? (
                  <>
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#d32f2f' }}>
                      {dayjs(row.deadline).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant="caption" display="block" color="error">
                      Expired — update the deadline to relist
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#1a73e8' }}>
                      {dayjs(row.deadline).format('DD/MM/YYYY')}
                    </Typography>
                    {daysLeft !== null && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        {daysLeft === 0
                          ? 'Closes today'
                          : `in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`}
                      </Typography>
                    )}
                  </>
                )}
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight={700}>
                  {row.appliedNumber ?? '—'}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight={500} color="text.secondary">
                  {row.views ?? '—'}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Chip
                  label={allConfig?.jobPostStatusDict[row?.status] || '---'}
                  color={JOB_POST_STATUS_BG_COLOR[row?.status] || 'default'}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell align="right">
                {row.slug && (
                  <Tooltip title="View public post" arrow>
                    <IconButton
                      aria-label="view public post"
                      component="a"
                      href={`/viec-lam/${row.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#1a73e8' }}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Update" arrow>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleUpdate(row.id)}
                    sx={{ color: '#1a73e8' }}
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
