/*
* @Author: huanghongqiang
* @Date:   2016-07-15 16:15:13
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 17:18:17
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/error/parameters.js
* @File Name: parameters.js
* @Descript:
*/
import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
class InvalidParametersError extends AbstractError{
    constructor(msg){
        super();
        this.state=412;
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
        this.name='InvalidParametersError';
    }

    getRestResponse(){
        return ResponseFactory.makeResponse(this.code,this.name+' '+this.message);
    }
}
export default InvalidParametersError;

