const fs            = require('fs')
const { normalize } = require('path')
const stylus        = require('stylus')
const rupture       = require('rupture')
const jeet          = require('jeet')
const { HasPropEq } = require('./HasProp')

ImportDeclaration = function (t, path, state) {
  // Take the node off the path
  const node = path.node

  // Check if there is a value at 'source.type' on 'node'
  if ( HasPropEq(node, 'source.type', 'StringLiteral') ) {

    // Check that the imported file is a stylus file
    if ( node.source.value.endsWith('.styl') ) {

      // Get the filename
      const file = node.source.value

      // Since this file is installed in node_modules
      var pathToFile = normalize(`${__dirname}/../../../${file}`)

      // If test option set then use plugin test folder
      if ( HasPropEq(state, 'opts.test', true) ) {
        pathToFile = normalize(`${__dirname}/../test/${file}`)
      }

      // Read the data
      const data = fs.readFileSync(pathToFile, 'utf8')

      // Convert the contents
      const css  = stylus(data)
        .use( jeet() )
        .use( rupture() )
        .render()

      // Variable name for assignment
      const vId  = node.specifiers[0].local.name

      const vDeclaration = t.variableDeclaration
      const vDeclarator  = t.variableDeclarator
      const iden = t.identifier
      const sLit = t.stringLiteral

      // Inline the results
      path.replaceWith(
        vDeclaration('var', [ vDeclarator( iden(vId), sLit(css) ) ])
      )
    }
  }
}

VariableDeclaration = function (t, path, state) {
  // Take the node off the path
  const node = path.node

  // Check if there is a value at 'source.type' on 'node'
  if ( HasPropEq(node, 'declarations.0.init.type', 'StringLiteral') ) {

    // Check that the imported file is a stylus file
    if ( node.declarations[0].init.value.endsWith('.styl') ) {

      // Get the filename
      const file = node.declarations[0].init.value

      // Since this file is installed in node_modules
      var pathToFile = normalize(`${__dirname}/../../../${file}`)

      // If test option set then use plugin test folder
      if ( HasPropEq(state, 'opts.test', true) ) {
        pathToFile = normalize(`${__dirname}/../test/${file}`)
      }

      // Read the data
      const data = fs.readFileSync(pathToFile, 'utf8')

      // Convert the contents
      const css  = stylus(data)
        .use( jeet() )
        .use( rupture() )
        .render()

      // Variable name for assignment
      const vId  = node.declarations[0].id.name

      const vDeclaration = t.variableDeclaration
      const vDeclarator  = t.variableDeclarator
      const iden = t.identifier
      const sLit = t.stringLiteral

      // Inline the results
      path.replaceWith(
        vDeclaration('var', [ vDeclarator( iden(vId), sLit(css) ) ])
      )
    }
  }
}

module.exports = function({types: t}) {
  return {
    visitor: { VariableDeclaration: VariableDeclaration.bind(null, t) }
  }
}
