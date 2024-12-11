import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDto } from 'src/users/dto/user.dto';
import { CompanyDto } from './dto/company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(
    createCompanyDto: CompanyDto,
    user: UserDto,
  ): Promise<CompanyDto> {
    const response = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: user,
    });

    return response;
  }

  async findAll() {
    const response = await this.companyModel.find();

    return response;
  }

  async findOne(_id: string) {
    const response = await this.companyModel.find({ _id });

    return response;
  }

  async update(_id: string, updateCompanyDto: UpdateCompanyDto, user: UserDto) {
    const response = await this.companyModel.findOneAndUpdate(
      { _id },
      { ...updateCompanyDto, updatedBy: user },
      { upsert: true, returnOriginal: false },
    );

    return response;
  }

  async remove(_id: string, user: UserDto) {
    await this.companyModel.updateOne({ _id }, { deletedBy: user });
    const response = await this.companyModel.softDelete({ _id });

    return response;
  }
}
