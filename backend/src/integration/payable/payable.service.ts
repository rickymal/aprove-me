import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Pagination } from '../../types/Pagination';
import type { CreatePayableDto } from './dto/create-payable.dto';
import type { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from '@database/prisma.service';
// import { PrismaService } from '@database/prisma.service';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);

  constructor(private prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    try {
      return await this.prisma.payable.create({ data: createPayableDto });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(params: Pagination) {
    return this.prisma.payable.findMany(params);
  }

  findOne(id: string) {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    try {
      return await this.prisma.payable.update({
        where: { id },
        data: updatePayableDto,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: string) {
    return this.prisma.payable.delete({ where: { id } });
  }
}
