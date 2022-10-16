import {Mock,MockBaseUrl,regUrl} from "../mockBase"

let adminuser = true;
//登录请求
Mock.mock(MockBaseUrl+'/book/user/login', 'post', (config) => {
	console.log(config);
	let body=JSON.parse(config.body);
	if(body.username=="admin"){
		adminuser=true;
		return {
			msg: "登录成功",
			code: 200,
			data: {
				userId: "1",
				userName: "admin",
				roleId: "1",
				roleName: "admin",
				privileges: [
					{
						privilegeId: 1,
						privilegeName: "p1"
					},
					{
						privilegeId: 2,
						privilegeName: "p2"
					}
				]
			}
		};
	}else{
		adminuser=false;
		return {
			msg: "登录成功",
			code: 200,
			data: {
				userId: "2",
				userName: "123",
				roleId: "2",
				roleName: "12345",
				privileges: []
			}
		};
	}
});

//登录状态查询
Mock.mock(MockBaseUrl+'/book/user/login/check', (config) => {
	console.log(config);
	// 返回的数据
	if(adminuser){
		return {
			msg: "登录成功",
			code: 200,
			data: {
				userId: "1",
				userName: "admin",
				roleId: "1",
				roleName: "admin",
				privileges: [
					{
						privilegeId: 1,
						privilegeName: "p1"
					},
					{
						privilegeId: 2,
						privilegeName: "p2"
					}
				]
			}
		};
	}else{
		return {
			msg: "登录成功",
			code: 200,
			data: {
				userId: "2",
				userName: "123",
				roleId: "2",
				roleName: "12345",
				privileges: []
			}
		};
	}
	
});

//登录状态查询
Mock.mock(MockBaseUrl+'/book/user/logout', (config) => {
	console.log(config);
	// 返回的数据
	return {
		msg: "退出成功",
		code: 200,
		data: null
	};
});