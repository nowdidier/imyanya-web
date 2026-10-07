import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { getWhatsAppContactUrl } from '../../../../configs/constants';

import {
  convertEditorStateToHTMLString,
  createEditorStateFromHTMLString,
} from '../../../../utils/customData';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import { confirmModal } from '../../../../utils/sweetalert2Modal';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import xlsxUtils from '../../../../utils/xlsxUtils';
import FormPopup from '../../../../components/controls/FormPopup';
import JobPostFilterForm from '../JobPostFilterForm';
import JobPostForm from '../JobPostForm';

import jobService from '../../../../services/jobService';
import JobPostsTable from '../JobPostsTable';

const headCells = [
  {
    id: 'jobName',
    showOrder:true,
    numeric: false,
    disablePadding:true,
    label: 'Job Post Title',
  },
  {
    id: 'createAt',
    showOrder:true,
    numeric: false,
    disablePadding: false,
    label: 'Posted Date',
  },
  {
    id: 'deadline',
    showOrder:true,
    numeric: false,
    disablePadding: false,
    label: 'Application Deadline',
  },
  {
    id: 'appliedTotal',
    showOrder:true,
    numeric: false,
    disablePadding: false,
    label: 'Applications',
  },
  {
    id: 'viewedTotal',
    showOrder:true,
    numeric: false,
    disablePadding: false,
    label: 'Views',
  },
  {
    id: 'isVerify',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    showOrder: false,
    numeric:true,
    disablePadding: false,
    label: 'Actions',
  },
];

const pageSize = 5;

const JobPostCard = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('createAt');
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const [filterData, setFilterData] = React.useState({
    kw: '',
    isUrgent: '',
  });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingJobPost, setIsLoadingJobPost] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [JobPosts, setJobPosts] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const loadJobPosts = async (params) => {
      setIsLoadingJobPost(true);

     try {
        const resData = await jobService.getEmployerJobPost(params);

        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingJobPost(false);
      }
    };

    loadJobPosts({
      page: page + 1,
      pageSize: rowsPerPage,
      ordering: `${order === 'desc' ? '-' : ''}${orderBy}`,
      ...filterData,
    });
  }, [isSuccess, page, rowsPerPage, order, orderBy, filterData]);

  const handleShowUpdate = (id) => {
    const loadJobPostDetailById = async (jobPostId) => {
      setIsFullScreenLoading(true);
     try {
        const resData = await jobService.getEmployerJobPostDetailById(
          jobPostId
        );

        var data = resData.data;
        data = {
          ...data,
          jobDescription: createEditorStateFromHTMLString(
            data?.jobDescription || ''
          ),
          jobRequirement: createEditorStateFromHTMLString(
            data?.jobRequirement || ''
          ),
          benefitsEnjoyed: createEditorStateFromHTMLString(
            data?.benefitsEnjoyed || ''
          ),
        };

        setEditData(data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadJobPostDetailById(id);
  };

  const handleShowAdd = () => {
    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const toHtml = (value) =>
      typeof value === 'string' ? value : convertEditorStateToHTMLString(value);

    const dataCustom = {
      ...data,
      jobDescription: toHtml(data.jobDescription),
      jobRequirement: toHtml(data.jobRequirement),
      benefitsEnjoyed: toHtml(data.benefitsEnjoyed),
    };

    const create = async (data) => {
      setIsFullScreenLoading(true);
     try {
        await jobService.addJobPost(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Job post added successfully.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
     try {
        await jobService.updateJobPostById(data.id, data);
        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Job post updated successfully.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if ('id' in data) {
      // update
      update(dataCustom);
    } else {
      // create
      create(dataCustom);
    }
  };

  const handleDeleteJobPost = (id) => {
    const del = async (id) => {
     try {
        await jobService.deleteJobPostById(id);
        setIsSuccess(!isSuccess);
        toastMessages.success('Job post deleted successfully.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Delete Job Post',
      'This Job Posts will be permanently deleted and cannot be recovered. Are you sure?',
      'warning'
    );
  };

  const handleFilter = (data) => {
    setFilterData({
      ...data,
      isUrgent: data.isUrgent === 1 ?true : data.isUrgent === 2 ? false : '',
      pageSize: pageSize,
    });
    setPage(0);
  };

  const handleExport = () => {
    const exportJobPosts = async (params) => {
      setIsFullScreenLoading(true);

     try {
        const resData = await jobService.exportEmployerJobPosts(params);
        const data = resData.data;

        // export
        xlsxUtils.exportToXLSX(data, 'JobList');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    exportJobPosts({
      page: page + 1,
      pageSize: rowsPerPage,
      ordering: `${order === 'desc' ? '-' : ''}${orderBy}`,
      ...filterData,
    });
  };

  const supportWhatsAppUrl = getWhatsAppContactUrl();

  return (
    <Box sx={{
      p: { xs: 2, md: 3 },
      backgroundColor: 'background.paper',
      border: '1px solid #dadce0',
      borderRadius: 3,
      boxShadow: 'none',
    }}>
      {/* Header Section - Responsive */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={{ xs: 2, sm: 0 }}
        mb={1}
      >
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                color: '#202124',
                fontSize: { xs: '1.35rem', sm: '1.6rem' },
              }}
            >
              Manage Job Postings
            </Typography>
            <Chip
              size="small"
              label={`${count} post${count === 1 ? '' : 's'}`}
              sx={{ bgcolor: '#e8f0fe', color: '#1a73e8', fontWeight: 700 }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Create postings, track review status and deadlines, and follow applications.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleExport}
            fullWidth={false}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '20px',
              px: 3,
              borderColor: '#dadce0',
              color: '#3c4043',
              '&:hover': {
                borderColor: '#1a73e8',
                backgroundColor: '#f6fafe',
              },
            }}
          >
            Export List
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleShowAdd}
            fullWidth={false}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '20px',
              px: 3,
              backgroundColor: '#1a73e8',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#1b66c9',
                boxShadow: 'none',
              },
            }}
          >
            Create New Posting
          </Button>
        </Stack>
      </Stack>

      {/* Payment + review reminder, right where employers land */}
      <Alert severity="warning" sx={{ borderRadius: 2, mt: 2 }}>
        <AlertTitle>Payment and review notice</AlertTitle>
        New or updated postings return to <strong>pending review</strong>. Pay
        with the same phone number you enter as <strong>Phone Number contact
        person</strong> so admin matches your payment and approves faster. Need
        help?{' '}
        <Link
          href={supportWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: 700 }}
        >
          Join our WhatsApp group
        </Link>
        .
      </Alert>

      {/* Filter Section - Responsive */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ mb: 3 }}
        spacing={2}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 600,
              mb: { xs: 1, md: 0 }
            }}
          >
            Filters:
          </Typography>
        </Box>
        <Box flex={1} width="100%">
          <JobPostFilterForm handleFilter={handleFilter} />
        </Box>
      </Stack>

      {/* Loading Progress */}
      {isLoadingJobPost ? (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            color="primary"
            sx={{
              height: { xs: 4, sm: 6 },
              borderRadius: 3,
              backgroundColor: 'primary.background'
            }}
          />
        </Box>
      ) : (
        <Divider sx={{ mb: 2 }} />
      )}

      {/* Table Section */}
      <Box sx={{
        backgroundColor: 'background.paper',
        border: '1px solid #dadce0',
        borderRadius: 3,
        boxShadow: 'none',
        overflow: 'hidden',
        width: '100%',
        '& .MuiTableContainer-root': {
          overflowX: 'auto'
        }
      }}>
        <JobPostsTable
          headCells={headCells}
          rows={JobPosts}
          isLoading={isLoadingJobPost}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          count={count}
          handleRequestSort={handleRequestSort}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleDelete={handleDeleteJobPost}
          handleUpdate={handleShowUpdate}
        />
      </Box>

      <FormPopup
        title={editData ? 'Update Job Post' : 'Create Job Post'}
        buttonText={editData ? 'Update' : 'Submit for Review'}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <JobPostForm
          handleAddOrUpdate={handleAddOrUpdate}
          editData={editData}
          serverErrors={serverErrors}
        />
      </FormPopup>

      {isFullScreenLoading && <BackdropLoading />}
    </Box>
  );
};

export default JobPostCard;
