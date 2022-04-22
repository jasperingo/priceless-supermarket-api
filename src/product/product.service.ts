import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoRepository } from 'src/photo/photo.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Category } from 'src/category/entities/category.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SearchProductDto } from './dto/search-product.dto';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly productsRepository: ProductRepository,
    private readonly paginationService: PaginationService,
  ) {}

  create(createProduct: Product, photoId: number, categoryId: number) {
    return this.dbConnection.transaction(async (manger) => {
      const photoRepo = manger.getCustomRepository(PhotoRepository);
      const productRepo = manger.getCustomRepository(ProductRepository);

      createProduct.category = new Category();
      createProduct.category.id = categoryId;

      const product = await productRepo.save(createProduct);

      const photo = new Photo();
      photo.id = photoId;
      photo.product = product;

      await photoRepo.save(photo);

      return productRepo.findOne(product.id);
    });
  }

  findAll(user: Customer | Administrator) {
    let startWhereClause = true;
    const qb = this.productsRepository.getQueryBuilder();

    if (!user || user instanceof Customer) {
      startWhereClause = false;
      qb.where('NOT product.available = :available', { available: false });
    }

    return this.paginationService
      .paginateQuery('product.id', qb, startWhereClause)
      .orderBy('product.createdAt', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.productsRepository.findOne(id);
  }

  update(product: Product, updateProductDto: UpdateProductDto) {
    Object.keys(updateProductDto).forEach(
      (prop) => (product[prop] = updateProductDto[prop] ?? product[prop]),
    );

    return this.productsRepository.save(product);
  }

  search(search: SearchProductDto, user: Customer | Administrator) {
    const qb = this.productsRepository.getQueryBuilder();

    if (search.q) {
      qb.where('product.name LIKE :q', { q: `%${search.q}%` });
    }

    if (search.categoryId) {
      const categoryParam = { categoryId: search.categoryId };
      search.q
        ? qb.andWhere('category.id = :categoryId', categoryParam)
        : qb.where('category.id = :categoryId', categoryParam);
    }

    if (!user || user instanceof Customer) {
      qb.andWhere('NOT product.available = :available', { available: false });
    }

    this.paginationService.paginateQuery('product.id', qb, false);

    return qb.orderBy('product.createdAt', 'DESC').getMany();
  }
}
