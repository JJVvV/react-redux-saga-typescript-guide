let path = require("path")
let fs = require("fs")
var loopSrc = require('./loopSrc')
function mock(app, from){
  loopSrc(from, undefined, (src) => {
    var text = fs.readFileSync(src)
    var data = JSON.parse(text)
    handleMock(app, data)
  })
}

/**
 * 
 * @param {Object} app - 服务器
 * @param {Object} data - json数据
 */
function handleMock(app, data){
  if(Array.isArray(data)){
    data.forEach((item) => {
      handleMock(app, item)
    })
  }else{
    const {method, url, res, response, code=200} = data
    console.log('\br handleMock', data)
    app[method || 'get'](url, function(req, resp){
      // console.log(res || response)
      resp.status(code)
      resp.json(res || response)
    })
  }
}


module.exports = mock
