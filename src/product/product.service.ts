import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoRepository } from 'src/photo/photo.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Category } from 'src/category/entities/category.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';

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

  findAll() {
    return this.paginationService
      .paginateQuery(
        'product.id',
        this.productsRepository.createQueryBuilder('product'),
      )
      .orderBy('product.created_at', 'DESC')
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
}