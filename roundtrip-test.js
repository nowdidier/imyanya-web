const dom = new (require('jsdom').JSDOM)('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

const { ContentState, convertFromHTML, convertToRaw } = require('draft-js');
const draftToHtml = require('draftjs-to-html');

const html =
  '<p>Hello</p>\n<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==" alt="undefined" style="height: auto;width: 100%"/>';

const blocksFromHTML = convertFromHTML(html);
const content = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
);
const raw = convertToRaw(content);
console.log('ENTITIES:', JSON.stringify(raw.entityMap));
console.log(
  'BLOCKS:',
  JSON.stringify(
    raw.blocks.map((b) => ({ type: b.type, text: b.text, ranges: b.entityRanges }))
  )
);
console.log('OUTPUT HTML:', draftToHtml(raw));
