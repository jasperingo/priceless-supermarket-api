import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { PhotoRepository } from '../photo.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private photoRepository: PhotoRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const photoId = Number(req.params.id);

    if (isNaN(photoId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const photo = await this.photoRepository.findOne(photoId);

    if (!photo)
      throw new NotFoundException(
        'errors.photo_do_not_exist',
        ErrorCode.PHOTO_DO_NOT_EXIST,
      );

    req.data ? (req.data.photo = photo) : (req.data = { photo });

    return true;
  }
}
