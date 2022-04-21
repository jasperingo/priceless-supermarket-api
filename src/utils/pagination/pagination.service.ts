import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PaginationService {
  static readonly LIMIT = 2;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  paginateQuery<T>(
    key: string,
    queryBuilder: SelectQueryBuilder<T>,
    startWhereClause = true,
  ) {
    const { afterId, beforeId, hasAfterId, hasBeforeId, limit } =
      this.getParams();

    if (hasAfterId) {
      startWhereClause
        ? queryBuilder.where(`${key} > :afterId`, { afterId })
        : queryBuilder.andWhere(`${key} > :afterId`, { afterId });
    }

    if (hasBeforeId) {
      !hasAfterId && startWhereClause
        ? queryBuilder.where(`${key} < :beforeId`, { beforeId })
        : queryBuilder.andWhere(`${key} < :beforeId`, { beforeId });
    }

    queryBuilder.take(limit);

    return queryBuilder;
  }

  getParams() {
    const limit = Number(this.request.query.limit);
    const afterId = Number(this.request.query.after);
    const beforeId = Number(this.request.query.before);

    return {
      afterId,
      beforeId,
      hasAfterId: !isNaN(afterId),
      hasBeforeId: !isNaN(beforeId),
      limit: isNaN(limit) ? PaginationService.LIMIT : limit,
    };
  }
}
