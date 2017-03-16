/*
* @Author: huanghongqiang
* @Date:   2016-07-15 16:04:39
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 17:18:16
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/error/db.js
* @File Name: db.js
* @Descript:
*/
import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
class DataBaseError extends AbstractError{
    constructor(msg){
        super();
        this.state=500;
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
        this.name='DataBaseError';
    }

    getRestResponse(){
        let msg = this.message;
        switch(this.message){
        case 'SequelizeConnectionRefusedError':
            msg = '无法连接到数据库';
            break ; 
        }
        return ResponseFactory.makeResponse(this.code,this.name+' '+msg);
    }
}
export default DataBaseError;

