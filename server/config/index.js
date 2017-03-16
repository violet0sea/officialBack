/*
* @Author: huanghongqiang
* @Date:   2016-07-14 11:50:23
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-11-17 09:47:37
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/config/index.js
* @File Name: index.js
* @Descript: 配置文件，根据启动模式读取不同的配置
*/

import development from './development';
import production from './production';

let config = {};
const env = process.env.NODE_ENV  ;

if('development' == env){
    config = Object.assign(config, development || {});
}else if('production' == env){
    config = Object.assign(config, production || {});
}

export default config ;