/*
	发送http请求
	参数：   url  	String类型   请求地址
			method 	String类型    请求方式       GET或POST
			data    Object类型    提交的数据     {username:'张三',age:21}
	
*/

// const baseUrl="http://localhost:3000";
import {
	baseUrl
} from "./config.js"

function http({
	url,
	method = "GET",
	data = {},
	token
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data,
			header: {
				authorization: token,
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})

}

export {
	http
}
