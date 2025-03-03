import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, Grid } from '@mui/material';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';

import {
  resetSearchJobPostFilter,
  searchJobPost,
} from '../../../../redux/filterSlice';

const HomeSearch = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      kw: '',
      cityId: '',
      careerId: '',
    },
  });

  React.useEffect(() => {
    dispatch(resetSearchJobPostFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveKeyworLocalStorage = (kw) => {
    try {
      if (kw) {
        const keywordListStr = localStorage.getItem('imyanya_search_history');

        if (
          keywordListStr !== null &&
          keywordListStr !== undefined &&
          keywordListStr !== ''
        ) {
          const keywordList = JSON.parse(keywordListStr);

          if (!keywordList.includes(kw)) {
            if (keywordList.length >= 5) {
              localStorage.setItem(
                'imyanya_search_history',
                JSON.stringify([
                  kw,
                  ...keywordList.slice(0, keywordList.length - 1),
                ])
              );
            } else {
              localStorage.setItem(
                'imyanya_search_history',
                JSON.stringify([kw, ...keywordList])
              );
            }
          }
        } else {
          localStorage.setItem('imyanya_search_history', JSON.stringify([kw]));
        }
      }
    } catch (error) {
      console.error('Error setting kw to local storage: ', error);
    }
  };

  const handleFilter = (data) => {
    handleSaveKeyworLocalStorage(data?.kw);

    dispatch(searchJobPost(data));
    nav('/viec-lam');
  };

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(0,0,0,.35)',
        borderRadius: 3.5,
        p: 4,
        pt: 5,
      }}
    >
      <form onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputBaseSearchHomeCustom
              name="kw"
              control={control}
              placeholder="Search job opportunities"
              showSubmitButton={true}
              location='HOME'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <SingleSelectSearchCustom
              name="careerId"
              placeholder="All career fields"
              control={control}
              options={allConfig?.careerOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <SingleSelectSearchCustom
              name="cityId"
              placeholder="All locations"
              control={control}
              options={allConfig?.cityOptions || []}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default HomeSearch;
