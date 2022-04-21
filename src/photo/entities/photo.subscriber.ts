import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { PhotoLocationService } from '../photo-location.service';
import { Photo } from './photo.entity';

@EventSubscriber()
export class PhotoSubscriber implements EntitySubscriberInterface<Photo> {
  constructor(
    connection: Connection,
    private readonly photoLocation: PhotoLocationService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Photo;
  }

  afterLoad(entity: Photo): void | Promise<any> {
    entity.url = this.photoLocation.url(entity);
  }
}
