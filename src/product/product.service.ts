import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoRepository } from 'src/photo/photo.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly productsRepository: ProductRepository,
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
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product ${updateProductDto.toString()}`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
