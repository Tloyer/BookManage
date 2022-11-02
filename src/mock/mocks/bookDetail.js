import {Mock,MockBaseUrl,regUrl} from "../mockBase"

//查询单个
Mock.mock(regUrl(MockBaseUrl+'/detail'), "get", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": {
			bookId:1,
			bookName: '三体',
			bookAuthor: '刘慈欣',
			publisher: '人民',
			time: '2016',
			image: '/book/books/detail/123.jpg',
			introduction: "这是一3333"
		}
	});
});

//修改单个
Mock.mock(regUrl(MockBaseUrl+'/detail'), "post", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});

//增加单个
Mock.mock(regUrl(MockBaseUrl+'/detail'), "put", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});

//上传图片
Mock.mock(regUrl(MockBaseUrl+'/detail/upload'), (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": '/detail/123.jpg'
	});
});
