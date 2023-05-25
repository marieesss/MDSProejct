import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body><div></div></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.body= window.body
global.navigator = {
  userAgent: 'node.js',
};
