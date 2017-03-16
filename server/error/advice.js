import AbstractError from './abstract';
import {UnauthorizedError,InvalidParametersError,ConflictError} from './index';
export default function*(next){

    try{

        yield next;
    
    }catch (err) {

        if (err instanceof UnauthorizedError) {

            this.status = err.state;
            this.body = err.getRestResponse();
        
        } else if (err instanceof AbstractError){

            this.status  = err.state;
            this.body = err.getRestResponse();
        
        } else{

            this.status  = 500;
            this.body = {code:-1,message:'服务器异常'};
        
        }
        this.app.emit('error', err, this);
    
    }

}