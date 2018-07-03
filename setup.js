const replace = require('replace')
const prompt = require('prompt')

prompt.start()

prompt.get({
  properties: {
    name: {
      required: true,
      message: 'Name of your project'
    },
    description: {
      message: 'Short description of your project',
      required: true
    },
    org: {
      required: true,
      default: 'Clock Limited'
    },
    author: {
      required: true
    },
    platform: {
      default: '{org}-{name}'
    }
  }
}, (error, results) => {
  if (error) return console.error(error)
  console.log(results)
  const replacements = Object.keys(results).map(key => ({
    regex: `__${key.toUpperCase()}__`,
    replacement: results[key]
  }))
  const baseReplacement = {
    paths: [ '.' ],
    recursive: true,
    silent: true
  }
  replacements.forEach(replacement => {
    replace({ ...baseReplacement, ...replacement })
  })
})
