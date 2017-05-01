// In - {a: {b: 'c'} }, 'a.b'
// Out - bool(true)
HasProp = function (obj, path) {
  // Break apart the path
  const parts = path.split('.')
  // Clone the passed in object
  var tempObj = Object.create(obj)
  for (let i = 0; i < parts.length; i++) {
    // If this part exists on our object
    if (tempObj === null) { return false }
    if (tempObj.hasOwnProperty(parts[i])) {
      // Prepare to check the next part
      tempObj = tempObj[parts[i]]
    } else { return false }
  }
  return true
}

// In - {a: {b: 'c'} }, 'a.b', 'c'
// Out - bool(true)
HasPropEq = function (obj, path, value) {
  // Break apart the path
  const parts = path.split('.')
  // Last part
  const lastPart = parts[parts.length-1]
  // Clone the passed in object
  var tempObj = Object.assign({}, obj)
  for (let i = 0; i < parts.length; i++) {
    // If this part exists on our object
    if (tempObj === null) { return false }
    if (tempObj.hasOwnProperty(parts[i])) {
      // Prepare to check the next part
      tempObj = tempObj[parts[i]]
    } else { return false }
  }
  // If the value at the final position is equal
  return tempObj === value ? true : false
}

module.exports = { HasProp, HasPropEq }
