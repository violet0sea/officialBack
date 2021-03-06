/*
* @Author: huanghongqiang
* @Date:   2016-07-12 09:53:33
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 17:18:16
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/error/forbidden.js
* @File Name: forbidden.js
* @Descript:
*/
import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
class ForbiddenError extends AbstractError{
    constructor(msg){
        super();
        this.state=403;
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
        this.name='ForbiddenError';
    }

    getRestResponse(){
        return ResponseFactory.makeResponse(this.code,this.name+ ' '+ this.message);
    }
}
export default ForbiddenError;
