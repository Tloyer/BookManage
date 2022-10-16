import {Mock,MockBaseUrl,regUrl} from "../mockBase"

//查询单个
Mock.mock(regUrl(MockBaseUrl+'/book/books/detail'), "get", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": {
			bookId:1,
			name: '三体',
			author: '刘慈欣',
			publisher: '人民',
			time: '2016',
			image: '/book/books/detail/123.jpg',
			introduction: "这是一3333"
		}
	});
});

//修改单个
Mock.mock(regUrl(MockBaseUrl+'/book/books/detail'), "post", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});

//增加单个
Mock.mock(regUrl(MockBaseUrl+'/book/books/detail'), "put", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});

//上传图片
Mock.mock(regUrl(MockBaseUrl+'/book/books/detail/upload'), (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": '/book/books/detail/123.jpg'
	});
});
