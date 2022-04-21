import { Expose } from 'class-transformer';

export class PhotoDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  size: number;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose({ name: 'mime_type' })
  mimeType: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;
}
