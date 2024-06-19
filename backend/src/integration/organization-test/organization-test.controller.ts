import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationTestService } from './organization-test.service';
import { CreateOrganizationTestDto } from './dto/create-organization-test.dto';
import { UpdateOrganizationTestDto } from './dto/update-organization-test.dto';

@Controller()
export class OrganizationTestController {
  constructor(private readonly organizationTestService: OrganizationTestService) {}

  @Post()
  create(@Body() createOrganizationTestDto: CreateOrganizationTestDto) {
    return this.organizationTestService.create(createOrganizationTestDto);
  }

  @Get()
  findAll() {
    return this.organizationTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationTestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationTestDto: UpdateOrganizationTestDto) {
    return this.organizationTestService.update(id, updateOrganizationTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationTestService.remove(id);
  }
}
