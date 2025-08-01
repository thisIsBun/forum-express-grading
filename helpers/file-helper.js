const fs = require('fs')

const localFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) resolve(null)
    const fileName = `upload/${file.originalname}`
    return fs.promises.readFile(file.path)
      .then(data => {
        return fs.promises.writeFile(fileName, data)
      })
      .then(() => resolve(`/${fileName}`))
      .catch(error => reject(error))
  })
}

module.exports = {
  localFileHandler
}
