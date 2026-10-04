import React from 'react';
import { useWatch } from 'react-hook-form';
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import RichTextEditorCustom from '../RichTextEditorCustom';
import RichHtmlContent from '../RichHtmlContent';
import { convertEditorStateToHTMLString } from '../../../utils/customData';

const toHtmlString = (value) => {
  if (typeof value === 'string') return value;

  if (value && typeof value.getCurrentContent === 'function') {
    return convertEditorStateToHTMLString(value);
  }

  return '';
};

const RichTextEditorWithPreview = ({
  control,
  name,
  title = '',
  showRequired = false,
  ...editorProps
}) => {
  const [view, setView] = React.useState('edit');
  const value = useWatch({ control, name });
  const html = React.useMemo(
    () => (view === 'preview' ? toHtmlString(value) : ''),
    [view, value]
  );
  const hasContent =
    html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length > 0;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 0.5 }}
      >
        <Typography variant="subtitle2">
          {title}{' '}
          {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={view}
          onChange={(event, nextView) => {
            if (nextView) setView(nextView);
          }}
        >
          <ToggleButton type="button" value="edit" aria-label="Edit content">
            <EditIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Edit
          </ToggleButton>
          <ToggleButton
            type="button"
            value="preview"
            aria-label="Preview content"
          >
            <VisibilityIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Preview
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* The editor stays mounted so the form never loses its value while
          switching between edit and preview. */}
      <Box sx={{ display: view === 'edit' ? 'block' : 'none' }}>
        <RichTextEditorCustom
          control={control}
          name={name}
          title=""
          {...editorProps}
        />
      </Box>

      {view === 'preview' && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1.5,
            minHeight: 200,
            p: 2,
            bgcolor: 'grey.50',
            overflow: 'hidden',
          }}
        >
          {hasContent ? (
            <RichHtmlContent html={html} />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              Nothing to preview yet. Write your content (including linked
              images) in the editor first.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RichTextEditorWithPreview;
