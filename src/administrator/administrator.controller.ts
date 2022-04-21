import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { DataParam } from 'src/utils/data-param.decorator';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { AdministratorService } from './administrator.service';
import { AdministratorDto } from './dto/administrator.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { FetchGuard } from './guards/fetch.guard';
import { ReadListPermissionGuard } from './guards/read-list-permission.guard';
import { ReadPermissionGuard } from './guards/read-permission.guard';
import { UpdatePermissionGuard } from './guards/update-permission.guard';

@Controller('administrators')
export class AdministratorController {
  constructor(
    private readonly administratorService: AdministratorService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreatePermissionGuard)
  async create(@Body() createAdministratorDto: CreateAdministratorDto) {
    const administrator = await this.administratorService.create(
      this.modelMapperService.entityToDto(
        Administrator,
        createAdministratorDto,
      ),
    );
    return AppResponseDTO.success(
      'strings.administrator_created',
      this.modelMapperService.entityToDto(AdministratorDto, administrator),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadListPermissionGuard)
  async findAll() {
    const administrators = await this.administratorService.findAll();
    return AppResponseDTO.success(
      'strings.administrators_fetched',
      this.modelMapperService.entityToDto(AdministratorDto, administrators),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, ReadPermissionGuard)
  findOne(@DataParam('administrator') administrator: Administrator) {
    return AppResponseDTO.success(
      'strings.administrator_fetched',
      this.modelMapperService.entityToDto(AdministratorDto, administrator),
    );
  }

  @Patch(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, UpdatePermissionGuard)
  async update(
    @DataParam('administrator') administrator: Administrator,
    @Body() updateAdministratorDto: UpdateAdministratorDto,
  ) {
    const updatedAdministrator = await this.administratorService.update(
      administrator,
      updateAdministratorDto,
    );

    return AppResponseDTO.success(
      'strings.administrator_updated',
      this.modelMapperService.entityToDto(
        AdministratorDto,
        updatedAdministrator,
      ),
    );
  }
}
