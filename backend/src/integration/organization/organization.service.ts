import { Injectable, Logger } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class OrganizationService {
  private readonly logger = new Logger(OrganizationService.name);
  prismaService: PrismaService;
  
  constructor(prisma : PrismaService) {
    this.prismaService = prisma
  }

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.prismaService.organization.create({ data: createOrganizationDto });
  }

  findAll() {
    return this.prismaService.organization.findMany();
  }

  findOne(id: string) {
    return this.prismaService.organization.findUnique({ where: { id } });
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.prismaService.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  remove(id: string) {
    return this.prismaService.organization.delete({ where: { id } });
  }
}
