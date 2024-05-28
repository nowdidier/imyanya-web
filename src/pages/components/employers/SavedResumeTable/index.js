import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Button,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { CV_TYPES, ImageSvg12 } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import DataTableCustom from '../../../../components/DataTableCustom';
import { salaryString } from '../../../../utils/customData';
import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';

const SavedResumeTable = (props) => {
  const nav = useNavigate();
  const { rows, isLoading, handleUnsave } = props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard
              title="Nta mukandida wabitse"
              imgComponentSgv={<ImageSvg12 />}
            />
          </TableCell>
        </TableBody>
      ) : (
        rows.map((row, index) => {
          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
                {row?.resume?.type === CV_TYPES.cvWebsite ? (
                  <Tooltip title="Ubushobozi bwo kuri internet" arrow>
                    <FontAwesomeIcon
                      icon={faFile}
                      style={{ marginRight: 1 }}
                      color="#182642"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Ubushobozi bwashyizweho" arrow>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: 1 }}
                      color="red"
                    />
                  </Tooltip>
                )}{' '}
                {row?.resume?.title || (
                  <span
                    style={{
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      fontSize: 13,
                    }}
                  >
                    Ntarashyirwa
                  </span>
                )}{' '}
              </TableCell>
              <TableCell align="left">
                {row?.resume?.userDict?.fullName}
              </TableCell>
              <TableCell align="left">
                {salaryString(
                  row?.resume?.salaryMin,
                  row?.resume?.salaryMax
                ) || (
                  <span
                    style={{
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      fontSize: 13,
                    }}
                  >
                    Ntarashyirwa
                  </span>
                )}
              </TableCell>
              <TableCell align="left">
                {allConfig?.experienceDict[row?.resume?.experience] || (
                  <span
                    style={{
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      fontSize: 13,
                    }}
                  >
                    Ntarashyirwa
                  </span>
                )}
              </TableCell>
              <TableCell align="left">
                {allConfig?.cityDict[row?.resume?.city] || (
                  <span
                    style={{
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      fontSize: 13,
                    }}
                  >
                    Ntarashyirwa
                  </span>
                )}
              </TableCell>
              <TableCell align="left">
                {dayjs(row?.createAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Reba ubushobozi" arrow>
                    <IconButton aria-label="view" size="small">
                      <RemoveRedEyeOutlinedIcon
                        fontSize="small"
                        color="primary"
                        onClick={() =>
                          nav(
                            `/nha-tuyen-dung/chi-tiet-ung-vien/${row?.resume?.slug}`
                          )
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: 'inherit', width: 110 }}
                    startIcon={<FavoriteIcon />}
                    onClick={() => handleUnsave(row?.resume?.slug)}
                  >
                    Gukuraho
                  </Button>
                </Stack>
              </TableCell>
            </TableBody>
          );
        })
      )}
    </DataTableCustom>
  );
};

export default SavedResumeTable;
