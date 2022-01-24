export class Result{

    constructor(
        public message: string,
        public data: any,
        public sucess: boolean,
        public error: any,
    ) {        
    }
}