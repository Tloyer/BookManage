import {Mock,MockBaseUrl,regUrl} from "../mockBase"

//获得借书列表
Mock.mock(regUrl(MockBaseUrl+'/book/borrow/list'), (config) => {
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
				"userId": 1,
				"userName": "testUser",
				"borrowTime": 1234567890123,
				"deadline": 100
			}]
		}
	});
});

//还书
Mock.mock(regUrl(MockBaseUrl+'/book/borrow'),"delete", (config) => {
	console.log(config);
	// 返回的数据
	return Mock.mock({
		"msg": "成功",
		"code": 200,
		"data": null
	});
});
