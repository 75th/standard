const test = require('ava')
const rewire = require('rewire')
const htmlStandardsRewired = rewire('..')
const htmlStandards = require('..')

test('options passed correctly', (t) => {
  htmlStandardsRewired.__set__('content', (opts) => {
    t.truthy(opts.md === 'test')
  })
  htmlStandardsRewired.__set__('include', (opts) => {
    t.truthy(opts.root === 'test')
    t.truthy(opts.addDependencyTo === 'test')
  })
  htmlStandardsRewired.__set__('layouts', (opts) => {
    t.truthy(opts.root === 'test')
    t.truthy(opts.addDependencyTo === 'test')
  })
  htmlStandardsRewired.__set__('expressions', (opts) => {
    t.truthy(opts.delimiters === 'test')
    t.truthy(opts.unescapeDelimiters === 'test')
  })
  htmlStandardsRewired.__set__('retext', (opts) => {
    t.truthy(opts.length === 3)
  })

  const out1 = htmlStandardsRewired({
    sugarml: true,
    root: 'test',
    webpack: { resourcePath: 'test', addDependencyTo: 'test' },
    delimiters: 'test',
    locals: 'true',
    unescapeDelimiters: 'test',
    content: { md: 'test' },
    retext: [1, 2, 3]
  })

  const out2 = htmlStandards({
    addDependencyTo: { addDependency: (x) => x },
    locals: 'true',
    content: { md: 'test' }
  })

  t.truthy(out1.parser)
  t.truthy(out1.locals)
  t.truthy(out1.filename === 'test')
  t.truthy(out1.plugins.length === 5)
  t.falsy(out2.parser)
})
