import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PaginationService {
  static readonly LIMIT = 2;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  paginateQuery<T>(key: string, queryBuilder: SelectQueryBuilder<T>) {
    const limit = Number(this.request.query.limit);
    const afterId = Number(this.request.query.after);
    const beforeId = Number(this.request.query.before);

    if (!isNaN(afterId)) {
      queryBuilder = queryBuilder.where(`${key} > :afterId`, { afterId });
    }

    if (!isNaN(beforeId)) {
      queryBuilder = queryBuilder.where(`${key} < :beforeId`, { beforeId });
    }

    queryBuilder.take(isNaN(limit) ? PaginationService.LIMIT : limit);

    return queryBuilder;
  }
}
