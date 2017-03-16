/*
* @Author: huanghongqiang
* @Date:   2016-07-14 11:49:42
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 17:15:18
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/error/abstract.js
* @File Name: abstract.js
* @Descript: 自定义异常基类
*/

import util from 'util';
import * as ResponseCode from '../util/code';
import ResponseFactory from '../util/response';

class AbstractError{
    constructor(msg){

        this.state=500;
        this.name='AbstractError';
        this.code = ResponseCode.FAILURE;
        this.message = msg || 'AbstractError';
        Error.captureStackTrace(this,this);
    
    }

    getRestResponse(){

        return ResponseFactory.makeResponse(this.code,this.name+' '+this.message);
    
    }
}
util.inherits(AbstractError, Error);
export default AbstractError;
