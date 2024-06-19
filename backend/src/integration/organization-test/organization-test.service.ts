import { Injectable } from '@nestjs/common';
import { CreateOrganizationTestDto } from './dto/create-organization-test.dto';
import { UpdateOrganizationTestDto } from './dto/update-organization-test.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class OrganizationTestService {
  prismaService: PrismaService;

  constructor(prisma : PrismaService) {
    this.prismaService = prisma
  }

  create(createOrganizationTestDto: CreateOrganizationTestDto) {
    return this.prismaService.test.create({ data: createOrganizationTestDto });
  }

  findAll() {
    return this.prismaService.test.findMany();
  }

  findOne(id: string) {
    return this.prismaService.test.findUnique({ where: { id }})
  }

  update(id: string, updateOrganizationTestDto: UpdateOrganizationTestDto) {
    return this.prismaService.test.update({
      where: { id },
      data: updateOrganizationTestDto,
    });
  }

  remove(id: string) {
    return this.prismaService.test.delete({ where: { id } });
  }
}
