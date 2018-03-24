
require('github-markdown-css/github-markdown.css');

const md = require('markdown-it')()
const mk = require('markdown-it-katex')


md.use(mk)

const markedRenderFn = str => md.render(str)

export default markedRenderFn
