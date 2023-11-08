import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 添加全局前缀
  app.useGlobalInterceptors(new Response()); // 响应拦截器，设置response返回格式
  app.useGlobalFilters(new HttpFilter()); // 异常拦截器
  await app.listen(3000);
}
bootstrap();
