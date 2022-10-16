import {Mock,MockBaseUrl,regUrl} from "../mockBase"

//获得书列表
Mock.mock(regUrl(MockBaseUrl+'/book/books/getAll'), (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": {
			"total": 20,
			"pages": 1,
			"records|3-5": [{
				"bookId|+1": 1,
				"bookName": "teatBook",
				"bookAuthor": "testAuthor",
				"ISBN": "123456789",
				"stock": 100
			}]
		}
	});
});

//查询单个
Mock.mock(regUrl(MockBaseUrl+'/book/books'), "get", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": {
			"bookId": 1,
			"bookName": "teatBook",
			"bookAuthor": "testAuthor",
			"ISBN": "123456789",
			"stock": 100
		}
	});
});
//修改单个
Mock.mock(regUrl(MockBaseUrl+'/book/books'), "put", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});
//增加单个
Mock.mock(regUrl(MockBaseUrl+'/book/books'), "post", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});
//删除单个
Mock.mock(regUrl(MockBaseUrl+'/book/books'), "delete", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});

//借书
Mock.mock(regUrl(MockBaseUrl+'/book/users/borrow'), "post", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "库存不足",
		"code": 500,
		"data": null
	});
});