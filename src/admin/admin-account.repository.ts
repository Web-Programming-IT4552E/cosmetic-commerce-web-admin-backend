import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @Inject(Admin)
    private readonly adminModel: ReturnModelType<typeof Admin>,
  ) {}

  async getAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).lean().exec();
  }

  async getAdminByEmailAlongWithPassword(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).select({
      _id: 1,
      email: 1,
      hashed_password: 1,
      type: 1,
      status: 1,
    });
  }

  async findOneAdmin(query: FilterQuery<Admin>) {
    return this.adminModel.findOne(query).lean();
  }

  async findOneAdminWithPassword(query: FilterQuery<Admin>) {
    return this.adminModel
      .findOne(query)
      .select({
        _id: 1,
        email: 1,
        hashed_password: 1,
        type: 1,
        status: 1,
      })
      .lean();
  }

  async findOneAdminAndUpdate(
    query: FilterQuery<Admin>,
    updateOptions: UpdateQuery<Admin>,
  ) {
    return this.adminModel
      .findOneAndUpdate(query, updateOptions, { new: true })
      .lean();
  }

  async createUser(createAdminDto: any) {
    return this.adminModel.create({ ...createAdminDto });
  }
}
