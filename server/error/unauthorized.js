/*
* @Author: huanghongqiang
* @Date:   2016-07-12 09:53:33
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 17:14:23
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/error/unauthorized.js
* @File Name: unauthorized.js
* @Descript:
*/

import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
class UnauthorizedError extends AbstractError{
    constructor(msg){

        super();
        this.state=401;
        this.name='UnauthorizedError';
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
    
    }

    getRestResponse(){
      
        return ResponseFactory.makeResponse(this.code,this.name +' '+this.message);
    
    }
}
export default UnauthorizedError;

