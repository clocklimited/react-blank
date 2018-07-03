const replace = require('replace')
const prompt = require('prompt')

const generatedReplacements = {
  npmName: replacements => {
    return replacements.name.replace(/[^A-z0-9]/g, '')
  },
  title: replacements => {
    return replacements.title || replacements.name
  }
}

prompt.start()

prompt.get({
  properties: {
    name: {
      required: true,
      message: 'Name of your project'
    },
    title: {
      message: 'Title that should appear to the user. Leave blank to use name.'
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

  Object.keys(generatedReplacements).forEach(key =>
    replacements.push({
      regex: `__${key.toUpperCase()}__`,
      replacement: generatedReplacements[key](results)
    })
  )

  const baseReplacement = {
    paths: [ '.' ],
    recursive: true,
    silent: true,
    exclude: 'node_modules'
  }
  replacements.forEach(replacement => {
    replace({ ...baseReplacement, ...replacement })
  })
})
