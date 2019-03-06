const fs = require('fs')
const http = require('http')
const path = require('path')
const _ = require('lodash')
const watch = require('node-watch')
const util = require('./util')

const webpack = require('./webpack')
const webpackConfig = require('../webpack.config')

// 监听端口号
const port = 3000

const { devServer } = webpackConfig

let hashPath // hash路由地址
let g_content // 全局打包文件字符串

const range = devServer.loop || 10000 // 心跳包间隔

const hot = devServer.hot // 是否需要热更新

// 监听文件夹
const contentDir = devServer.docBase
// 输出文件夹
const distDir = webpackConfig.output.path

const distName = webpackConfig.output.filename
// const contentDir = path.resolve(process.cwd(), './src')
// const distDir = path.resolve(process.cwd(), './dist')

let isChange = false

let changeObj = { }

let building = false


// 监听文件目录
watch(contentDir, 
  { recursive: true}, 
  _.debounce((eventType, filename) => {
    console.log(`${filename}文件有修改`)
    isChange = true
    changeObj = { eventType, filename }
  }, 200)
)

webpack(webpackConfig, (success) => {
  console.log(success ? '打包成功' : '打包失败')
})

const getNewFileString = () => {
  console.log('invoking')
  // const content = fs.readFileSync(changedPath).toString()
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (success, args) => {
      console.log(success ? '更新成功' : '更新失败')
      if (success) {
        const { chunkHash } = args
        let content = ''
        try {
          content = fs.readFileSync(path.join(distDir, util.getOutputNameWithHash(distName, chunkHash)))
        } catch(e) {
          reject(e)
        }

        resolve({ content: content.toString(), chunkHash })
        
        // 读取打包后的文件

      } else {
        reject()
      }

    })
  })
}

// bundle()

http.createServer((req, res) => {
  const url = req.url.split(/(\?|#)/)[0]
  if (url === '/') {
    res.end(fs.readFileSync(path.join(distDir, '/index.html')).toString())
  } else if (hashPath && url === `/${hashPath}`) {
    res.end(g_content)
  } else if (url === '/__hmr__') {
    res.writeHead(200, {
      "Content-Type" : "text/event-stream",
      "Cache-Control" : "no-cache",
      "Connection": "keep-alive",
    })

    let start

    setInterval(() => {
      // 应该有一个队列，否则打包过程中的后面几次修改将被丢弃
      if (isChange && !building) {
        start = +new Date()
        building = true
        getNewFileString(changeObj.filename)
          .then(({ content, chunkHash }) => {
            hashPath = util.getHotUpdateName(chunkHash)
            g_content = content
            console.log(`data: ${JSON.stringify({ hot, hashPath})}\n\n`)
            res.write(`data: ${JSON.stringify({ hot, hashPath})}\n\n`)
            
            isChange = false
            building = false
            changeObj = {}
          }).catch((e) => {
            console.log(e)
            building = true
            isChange = false
          })        
      } 
      else {
        if (!start) {
          start = +new Date()
        }

        if (+new Date() - start > range) {
          res.write('data: \uD83D\uDC93\n\n')
          start = +new Date()
        }
      }
    })
  } else {
    let result
     try {
      result = fs.readFileSync(path.join(distDir, `${url}`))
     } catch(e) {
      res.end('{code: 404}')
      return
     }
     
     res.end(result)
    
  }
}).listen(port)

console.log(`listeninig on port ${port}`)
