import { DynamicModule, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { RequestExceptionFilter } from "./request.exception.filter";
import { RequestLoggerInterceptor } from "./request.logger.interceptor";

@Module({
    providers: [
        { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
        { provide: APP_FILTER, useClass: RequestExceptionFilter },
    ],
})
export class LoggerModule {
    static register(autoRegister: boolean): DynamicModule {
        return {
            module: LoggerModule,
            providers: autoRegister
                ? [
                      { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
                      { provide: APP_FILTER, useClass: RequestExceptionFilter },
                  ]
                : [],
            exports: [],
        };
    }
}
