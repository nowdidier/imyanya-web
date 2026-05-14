import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const convertEditorStateToHTMLString = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  return markup;
};

const createEditorStateFromHTMLString = (htmlString) => {
  const blocksFromHTML = convertFromHTML(htmlString);

  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(content);
};

const convertMoney = n => {
  if (n >= 1000000000) {
    return `${Math.trunc(n / 1000000000)}B`;
  } else if (n >= 1000000) {
    return `${Math.trunc(n / 1000000)}M`;
  } else {
    return `${Math.trunc(n)}`;
  }
};

const salaryString = (salaryFrom, salaryTo) => {
  if (!salaryFrom && !salaryTo) return '---';
  else
    return `${!salaryFrom ? '?' : convertMoney(salaryFrom)} - ${
      !salaryTo ? '?' : convertMoney(salaryTo)
    }`;
};

const toSlug = (str) => {
  str = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u0111/g, 'd');

  str = str.replace(/([^0-9a-z-\s])/g, '');

  str = str.replace(/(\s+)/g, '-');

  str = str.replace(/^-+/g, '');

  str = str.replace(/-+$/g, '');

  return str;
};

export default toSlug;

export {
  convertEditorStateToHTMLString,
  createEditorStateFromHTMLString,
  convertMoney,
  salaryString,
  toSlug,
};
