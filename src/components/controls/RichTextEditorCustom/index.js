import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import { Controller } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { createEditorStateFromHTMLString } from '../../../utils/customData';

const isEditorState = (value) =>
  !!value && typeof value.getCurrentContent === 'function';

const RichTextEditorField = ({
  field,
  fieldState,
  withLinks,
  withImages,
  placeholder,
  minHeight,
}) => {
  const emptyState = React.useMemo(() => EditorState.createEmpty(), []);

  const readFileAsDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  const uploadCallback = React.useCallback(async (file) => {
    const url = await readFileAsDataUrl(file);

    return { data: { link: url } };
  }, []);

  const normalized = React.useMemo(() => {
    if (isEditorState(field.value)) return field.value;

    if (typeof field.value === 'string' && field.value.trim()) {
      try {
        return createEditorStateFromHTMLString(field.value);
      } catch (error) {
        return emptyState;
      }
    }

    return emptyState;
  }, [field.value, emptyState]);

  React.useEffect(() => {
    if (!isEditorState(field.value) && normalized !== field.value) {
      field.onChange(normalized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized]);

  const toolbarOptions = React.useMemo(() => {
    const options = [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
    ];

    if (withLinks) options.push('link');
    if (withImages) options.push('image');

    options.push('embedded', 'emoji', 'remove', 'history');

    return options;
  }, [withLinks, withImages]);

  const toolbarConfig = React.useMemo(() => {
    const config = {
      options: toolbarOptions,
      inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'monospace',
          'superscript',
          'subscript',
        ],
      },
      blockType: {
        inDropdown: true,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: [
          'Normal',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'Blockquote',
          'Code',
        ],
      },
      fontSize: {
        options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
      },
      fontFamily: {
        options: [
          'Arial',
          'Georgia',
          'Impact',
          'Tahoma',
          'Times New Roman',
          'Verdana',
          'Courier New',
        ],
      },
      list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['unordered', 'ordered', 'indent', 'outdent'],
      },
      textAlign: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['left', 'center', 'right', 'justify'],
      },
      colorPicker: {
        popupClassName: undefined,
        colors: [
          'rgb(0, 0, 0)',
          'rgb(68, 29, 160)',
          'rgb(156, 39, 176)',
          'rgb(219, 85, 84)',
          'rgb(255, 151, 75)',
          'rgb(62, 169, 219)',
          'rgb(97, 189, 109)',
          'rgb(255, 193, 7)',
          'rgb(255, 255, 255)',
        ],
      },
      emoji: {
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['EMOJI_SEARCH', 'EMOJI_HISTORY', 'EMOJI_DEFAULT'],
      },
      embedded: {
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        options: ['embedded'],
        defaultSize: {
          height: 'auto',
          width: '100%',
        },
      },
      remove: {
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
      },
      history: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['undo', 'redo'],
      },
    };

    if (withLinks) {
      config.link = {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_blank',
        options: ['link', 'unlink'],
      };
    }

    if (withImages) {
      config.image = {
        icon: undefined,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        uploadCallback,
        previewImage: true,
        alignmentEnabled: true,
        alt: { present: true, mandatory: false },
        defaultSize: {
          height: 'auto',
          width: '100%',
        },
      };
    }

    return config;
  }, [toolbarOptions, withLinks, withImages, uploadCallback]);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: fieldState.invalid ? 'error.main' : 'grey.300',
        borderRadius: 1.5,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:focus-within': {
          borderColor: 'primary.main',
          boxShadow: '0 0 0 3px rgba(68, 29, 160, 0.12)',
        },
        '& .rdw-editor-toolbar': {
          border: 0,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 0,
          background: '#fafafa',
          margin: 0,
          padding: '6px 8px',
          flexWrap: 'wrap',
        },
        '& .rdw-editor-main': {
          minHeight,
          padding: '10px 14px',
          fontSize: 15,
          lineHeight: 1.6,
          color: 'text.primary',
          cursor: 'text',
        },
        '& .rdw-editor-main img': {
          maxWidth: '100%',
          height: 'auto',
        },
        '& .rdw-editor-main a': {
          color: 'primary.main',
        },
        '& .rdw-option-wrapper': {
          minWidth: 26,
          height: 24,
          borderRadius: 4,
        },
        '& .rdw-option-active': {
          boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.2)',
        },
        '& .rdw-dropdown-wrapper': {
          borderRadius: 4,
        },
        '& .rdw-dropdown-selectedtext': {
          color: 'text.primary',
        },
        '& .rdw-image-modal, & .rdw-embedded-modal, & .rdw-link-modal': {
          borderRadius: 8,
          maxWidth: 'calc(100% - 16px)',
        },
      }}
    >
      <Editor
        editorState={normalized}
        onEditorStateChange={field.onChange}
        placeholder={placeholder}
        toolbar={toolbarConfig}
      />
    </Box>
  );
};

const RichTextEditorCustom = ({
  control,
  name,
  title = '',
  showRequired = false,
  withLinks = false,
  withImages = true,
  placeholder = 'Write something...',
  minHeight = 200,
}) => {
  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title}{' '}
          {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={EditorState.createEmpty()}
        render={({ field, fieldState }) => (
          <>
            <RichTextEditorField
              field={field}
              fieldState={fieldState}
              withLinks={withLinks}
              withImages={withImages}
              placeholder={placeholder}
              minHeight={minHeight}
            />
            {fieldState.invalid && (
              <span
                style={{
                  color: 'red',
                  fontSize: 13,
                  marginTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                {fieldState.error?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RichTextEditorCustom;
