import { Body, Controller, Delete, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { CreateBidDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from 'src/app.validator';

const MAX_IMAGE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024; // 2 MB
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

@Controller('bid-item')
export class BidItemController {
	constructor (private bidItemService: BidItemService) {}

	@Post('create')
	@UseInterceptors(FileInterceptor('file'))
	createBid (
		@Body() dto: CreateBidDTO,
		@UploadedFile(
			new ParseFilePipeBuilder()
			.addValidator(
				new CustomUploadFileTypeValidator({
				  fileType: VALID_UPLOADS_MIME_TYPES,
				}),
			  )
			  .addFileTypeValidator({ fileType: 'image/jpeg' })
			  .addMaxSizeValidator({ maxSize: MAX_IMAGE_PICTURE_SIZE_IN_BYTES })
			  .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
		  )
		  file,
	) {
		return file
		return this.bidItemService.createBid(dto);
	}

	@Delete('delete')
	deleteBid () {
		return this.bidItemService.deleteBid();
	}
}
