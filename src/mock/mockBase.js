import Mock from 'mockjs';
import MockBaseUrlFile from '../../public/api.config.json';
//获取基础路径
const MockBaseUrl=MockBaseUrlFile.BASE_URL;

//构造正则，主要用于匹配get的路径参数和rest风格中/数字样式
function regUrl(url){
	return RegExp(url+"(/[0-9]*)?(\\?.+)?$");
}

export {Mock, MockBaseUrl, regUrl};