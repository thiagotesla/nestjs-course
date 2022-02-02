import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Result } from "src/modules/backoffice/models/result.model";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

export class RoleInterceptor implements NestInterceptor{
    constructor(
        public roles: string[],
    ){
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(payload);

        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if(!hasRole){
            throw new HttpException(
                new Result('Não autorizado!', null, false, null),
                HttpStatus.FORBIDDEN);
        }

        return next.handle();   
    }   

}