<!-- Please remove this file from your project -->
<template>
  <div>
    <input type="file" name="file" @change="handleFileChange" />
    <div ref="drag" class="drag" draggable="true">
      <button @click="uploadFile">上传文件</button>
    </div>
    <div>
      <span>上传 进度</span>
      <el-progress
        :stroke-width="40"
        :percentage="uploadProgress"
        :text-inside="true"
      ></el-progress>
    </div>
    <div>
      <span>计算 hash 进度</span>
      <el-progress
        :stroke-width="40"
        :percentage="hashProgress"
        :text-inside="true"
      ></el-progress>
    </div>
    <div class="cube-container" :style="{ width: cubeWidth + 'px' }">
      <div v-for="chunk in chunks" :key="chunk.name" class="cube">
        <div
          :class="{
            uploading: chunk.progress > 0 && chunk.progress < 100,
            success: chunk.progress === 100,
            error: chunk.progress < 0,
          }"
          :style="{ height: chunk.progress + '%' }"
        >
          <b v-if="chunk.progress > 0 && chunk.progress < 100">L..</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sparkMD5 from 'spark-md5'

const CHUNK_SIZE = 0.1 * 1024 * 1024

export default {
  name: 'NuxtTutorial',
  data() {
    return {
      file: null,
      // uploadProgress: 0,
      hashProgress: 0,
      chunks: [],
    }
  },
  computed: {
    cubeWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 64
    },
    uploadProgress() {
      if (!this.file || this.chunks.length) {
        return 0
      }
      const loaded = this.chunks
        .map((item) => item.chunk.size * item.progress)
        .reduce((acc, cur) => acc + cur, 0)

      return Number(((loaded * 100) / this.file.size).toFixed(2))
    },
  },
  mounted() {
    this.bindEvents()
  },
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return
      this.file = file
    },
    blobToString(blob) {
      // 十六进制转化
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function () {
          const ret = reader.result
            .split('')
            .map((v) => v.charCodeAt())
            .map((v) => v.toString(16).toUpperCase())
            .map((v) => v.padStart(2, '0'))
            .join(' ')
          resolve(ret)
        }
        reader.readAsBinaryString(blob)
      })
    },
    async isGif(file) {
      // 47 49 46 38 39 61 => GIF89a
      // 47 49 46 38 37 61 => GIF87a
      const ret = await this.blobToString(file.slice(0, 6))
      const isGif = ret === '47 49 46 38 39 61' || ret === '47 49 46 38 37 61'
      return isGif
    },
    async isPng(file) {
      const ret = await this.blobToString(file.slice(0, 8))
      return ret === '89 50 4E 47 0D 0A 1A 0A'
    },
    async isJpg(file) {
      const ret1 = await this.blobToString(file.slice(0, 2))
      const ret2 = await this.blobToString(file.slice(-2, file.size))
      return ret1 === 'FF D8' && ret2 === 'FF D9'
    },
    // 通过文件流来判定
    async isImage(file) {
      return (
        (await this.isGif(file)) ||
        (await this.isPng(file)) ||
        (await this.isJpg(file))
      )
    },
    createFileChunk(file, size = CHUNK_SIZE) {
      const chunks = []
      let current = 0
      while (current < file.size) {
        chunks.push({
          index: current,
          file: file.slice(current, current + size),
        })
        current += size
      }
      return chunks
    },
    calculateHashWorker() {
      return new Promise((resolve) => {
        this.worker = new Worker('/hash.js')
        this.worker.postMessage({ chunks: this.chunks })
        this.worker.onmessage = (e) => {
          const { progress, hash } = e.data
          this.hashProgress = Number(progress.toFixed(2))
          if (hash) {
            resolve(hash)
          }
        }
      })
    },
    calculateHashIdle() {
      const chunks = this.chunks
      return new Promise((resolve) => {
        const spark = new sparkMD5.ArrayBuffer()
        let count = 0

        const appendToSpark = (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
              spark.append(e.target.result)
              resolve()
            }
          })
        }

        const workLoop = async (deadline) => {
          while (count < chunks.length && deadline.timeRemaining() > 1) {
            // 空闲时间 且有任务
            await appendToSpark(chunks[count].file)
            count++
          }
          if (count < chunks.length) {
            this.hashProgress = Number(
              ((100 * count) / chunks.length).toFixed(2)
            )
          } else {
            this.hashProgress = 100
            resolve(spark.end())
          }
          window.requestIdleCallback(workLoop)
        }
        window.requestIdleCallback(workLoop)
      })
    },
    async uploadFile() {
      // if (!(await this.isImage(this.file))) return
      if (!this.file) return
      // 计算文件切片
      const chunks = (this.chunks = this.createFileChunk(this.file))
      const hash = (this.hash = await this.calculateHashWorker())
      // const hash = (this.hash = await this.calculateHashIdle())

      // 问一下后端 文件是否上传过 是否存在已经上传的切片
      const {
        data: { uploaded, uploadedList },
      } = await axios.post('http://localhost:7001/checkFile', {
        hash: this.hash,
        ext: this.file.name.split('.').pop(),
      })

      if (uploaded) {
        return alert('秒传成功')
      }
      this.chunks = chunks.map((chunk, index) => {
        const name = hash + '-' + index
        return {
          hash, // 文件的 hahs
          name, // 切片的名称
          index,
          chunk: chunk.file, // 文件内容
          progress: uploadedList.includes(name) ? 100 : 0,
        }
      })

      await this.uploadChunks(uploadedList)

      // const form = new FormData()
      // form.append('name', 'file')
      // form.append('file', this.file)
      // await axios.post('http://localhost:7001/uploadFile', form, {
      //   onUploadProgress: (progress) => {
      //     this.uploadProgress = Number((progress.loaded / progress.total) * 100)
      //   },
      // })
    },
    async uploadChunks(uploadedList) {
      const requests = this.chunks
        .filter((chunk) => !uploadedList.includes(chunk.name))
        .map((chunk, index) => {
          const form = new FormData()
          form.append('chunk', chunk.chunk)
          form.append('hash', chunk.hash)
          form.append('name', chunk.name)
          // form.append('index', chunk.index)
          return { form, index: chunk.index, error: 0 }
        })
      // .map(({ form, index }) => {
      //   return axios.post('http://localhost:7001/uploadFileChunk', form, {
      //     onUploadProgress: (progress) => {
      //       this.chunks[index].progress = Number(
      //         (progress.loaded / progress.total) * 100
      //       )
      //     },
      //   })
      // })
      // await Promise.all(requests)
      await this.sendRequest(requests)
      // 发起合并请求
      await this.mergeRequest()
    },
    sendRequest(chunks, limit = 4) {
      return new Promise((resolve, reject) => {
        const len = chunks.length
        let count = 0
        let isStop = false
        const start = async () => {
          if (isStop) {
            return
          }

          const task = chunks.shift()
          if (task) {
            const { form, index } = task
            try {
              await axios.post('http://localhost:7001/uploadFileChunk', form, {
                onUploadProgress: (progress) => {
                  this.chunks[index].progress = Number(
                    (progress.loaded / progress.total) * 100
                  )
                },
              })
              if (count === len - 1) {
                // 最后一个任务
                resolve()
              } else {
                count++
                // 启动下一个任务
                start()
              }
            } catch (error) {
              this.chunks[index].progress = -1

              if (task.error < 3) {
                task.error++
                chunks.unshift(task)
                start()
              } else {
                isStop = true
              }
            }
          }
        }
        while (limit > 0) {
          start()
          limit -= 1
        }
      })
    },
    async mergeRequest() {
      await axios.post('http://localhost:7001/mergeRequest', {
        ext: this.file.name.split('.').pop(),
        size: CHUNK_SIZE,
        hash: this.hash,
      })
    },
    bindEvents() {
      const dragRef = this.$refs.drag

      dragRef.addEventListener('dragover', (e) => {
        dragRef.style.borderColor = '#f00'
        e.preventDefault()
      })
      dragRef.addEventListener('dragleave', (e) => {
        dragRef.style.borderColor = '#ccc'
        e.preventDefault()
      })
      dragRef.addEventListener('drop', (e) => {
        const fileList = e.dataTransfer.files
        this.file = fileList[0]
        e.preventDefault()
      })
    },
  },
}
</script>
<style>
.drag {
  width: 400px;
  height: 200px;
  line-height: 200px;
  border: 1px dashed #ccc;
  text-align: center;
}

.cube {
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  line-height: 64px;
  border: 1px solid #ccc;
  background: #333;
  float: left;
  color: #fff;
}
.cube .success {
  background-color: green;
}
.cube .uploading {
  background-color: blue;
}
.cube .error {
  background-color: red;
}
</style>
