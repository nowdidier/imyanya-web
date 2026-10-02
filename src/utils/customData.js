import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const convertEditorStateToHTMLString = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  return markup;
};

const createEditorStateFromHTMLString = (htmlString) => {
  // html-to-draftjs preserves <img>, <video> and <iframe> embeds as atomic
  // blocks, whereas plain draft-js convertFromHTML silently drops them.
  const blocksFromHTML = htmlToDraft(htmlString);

  if (blocksFromHTML && blocksFromHTML.contentBlocks?.length) {
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(content);
  }

  const blocksFromLegacyHTML = convertFromHTML(htmlString);

  const content = ContentState.createFromBlockArray(
    blocksFromLegacyHTML.contentBlocks,
    blocksFromLegacyHTML.entityMap
  );

  return EditorState.createWithContent(content);
};

const convertMoney = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return null;

  const abs = Math.abs(n);

  if (abs >= 1000000000) {
    return `${parseFloat((n / 1000000000).toFixed(1))}B`;
  } else if (abs >= 1000000) {
    return `${parseFloat((n / 1000000).toFixed(1))}M`;
  } else if (abs >= 1000) {
    return `${parseFloat((n / 1000).toFixed(1))}K`;
  } else {
    return `${n}`;
  }
};

const salaryString = (salaryFrom, salaryTo) => {
  if (!salaryFrom && !salaryTo) return '---';
  else
    return `${!salaryFrom ? '?' : convertMoney(salaryFrom)} - ${
      !salaryTo ? '?' : convertMoney(salaryTo)
    } RWF`;
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
