import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { requestLogger } from "./common.logger";

@Catch()
export class RequestExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        logger.error(exception);
        const status = exception.getStatus ? exception.getStatus() : 500;

        requestLogger.error(`|-------------------------------------`);
        requestLogger.error(`|- ${request.method} ${request.url} ${status}`);
        requestLogger.error(`|- [HEADS] ${JSON.stringify(request.headers)}`);
        if (request.method === "POST") {
            requestLogger.error(`|- [BODY] ${JSON.stringify(request.body)}`);
        }

        let message = exception.message ?? exception.response?.message ?? exception.response ?? "Unknown Error";

        const ret = {
            code: exception.code ?? -1,
            message,
        };

        requestLogger.error(`|- (${ret.code}) ${ret.message}`);

        return response.status(status).json(ret);
    }
}

const logger = new Logger(RequestExceptionFilter.name);
