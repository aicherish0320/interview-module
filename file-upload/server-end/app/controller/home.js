'use strict'

const Controller = require('egg').Controller
const fse = require('fs-extra')
const path = require('path')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
  async uploadFile() {
    const { ctx } = this
    const file = ctx.request.files[0]

    await fse.move(
      file.filepath,
      this.config.UPLOAD_DIR + '/' + file.filename,
      {
        overwrite: true
      }
    )

    ctx.body = 'success'
  }
  async uploadFileChunk() {
    if (Math.random() > 0.3) {
      return (this.ctx.status = 500)
    }
    const { ctx } = this
    const file = ctx.request.files[0]
    const { hash, name } = ctx.request.body

    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)

    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }

    await fse.move(file.filepath, `${chunkPath}/${name}`)

    ctx.body = 'success'
  }
  async mergeRequest() {
    const { ctx } = this
    const { ext, size, hash } = ctx.request.body

    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)

    this.mergeFile(filePath, hash, size)

    ctx.body = 'success'
  }
  async mergeFile(filePath, hash, size) {
    const chunkDir = path.resolve(this.config.UPLOAD_DIR, hash)
    let chunks = await fse.readdir(chunkDir)
    chunks.sort((a, b) => a.split('-'[1]) - b.split('-'[1]))
    chunks = chunks.map((c) => path.resolve(chunkDir, c))
    await this.mergeChunks(chunks, filePath, size)
  }
  async mergeChunks(filePaths, dest, size) {
    const pipeStream = (filePath, writeStream) =>
      new Promise((resolve) => {
        const readStream = fse.createReadStream(filePath)
        readStream.on('end', () => {
          fse.unlinkSync(filePath)
          resolve()
        })
        readStream.pipe(writeStream)
      })

    await Promise.all(
      filePaths.map((filePath, index) => {
        pipeStream(
          filePath,
          fse.createWriteStream(dest, {
            start: index * size,
            end: (index + 1) * size
          })
        )
      })
    )
  }
  async checkFile() {
    const { ctx } = this
    const { ext, hash } = ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)

    let uploaded = false
    let uploadedList = []
    if (fse.existsSync(filePath)) {
      uploaded = true
    } else {
      uploadedList = await this.getUploadedList(
        path.resolve(this.config.UPLOAD_DIR, hash)
      )
    }
    ctx.body = {
      uploaded,
      uploadedList
    }
  }
  async getUploadedList(dirPath) {
    return fse.existsSync(dirPath)
      ? (await fse.readdir(dirPath)).filter((name) => name[0] !== '.')
      : []
  }
}

module.exports = HomeController
