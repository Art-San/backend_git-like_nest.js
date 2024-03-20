// success.response.ts
import { SuccessDto } from './success.dto'

export class SuccessResponse {
	data: SuccessDto
}

// От гпт использование в контроле
// import { Controller, Get, Res } from '@nestjs/common';
// import { Response } from 'express';
// import { SuccessResponse } from './success.response';
// @Controller('example')
// export class ExampleController {
//  @Get()
//  getSuccess(@Res() res: Response) {
// 	const successResponse = new SuccessResponse();
// 	successResponse.data = { message: 'Успешно' };
// 	res.status(200).json(successResponse);
//  }
// }
