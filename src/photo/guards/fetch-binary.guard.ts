import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { PhotoRepository } from '../photo.repository';

@Injectable()
export class FetchBinaryGuard implements CanActivate {
  constructor(private photoRepository: PhotoRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const photoName = req.params.name;

    if (!photoName)
      throw new NotFoundException(
        'errors.field_invalid',
        ErrorCode.FIELD_INVALID,
      );

    const photo = await this.photoRepository.findOneByName(photoName);

    if (!photo)
      throw new NotFoundException(
        'errors.photo_do_not_exist',
        ErrorCode.PHOTO_DO_NOT_EXIST,
      );

    req.data ? (req.data.photo = photo) : (req.data = { photo });

    return true;
  }
}
