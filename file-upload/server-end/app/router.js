'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app

  router.post('/uploadFile', controller.home.uploadFile)
  router.post('/uploadFileChunk', controller.home.uploadFileChunk)
  router.post('/mergeRequest', controller.home.mergeRequest)
  router.post('/checkFile', controller.home.checkFile)
}
