import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
 // 异常接口拦截
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // 返回异常数据
    response.status(status).json({
      success: false,
      message: exception.message,
      code: status,
      path: request.url, // 报错url
      time: new Date().toISOString(), // 当前时间
    });
  }
}
