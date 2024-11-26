

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url
   // console.log(args)
  },
  success(args) {
    // 请求成功后，修改code值为1
	// console.log(args)
  },
  fail(err) {
    console.log('interceptor-fail',err)
  },
  complete(res) {
    // console.log('interceptor-complete',res)
  }
})

// uni.addInterceptor({
//   returnValue(args) {
//     return args
//   }
// })

export * from './common.js'