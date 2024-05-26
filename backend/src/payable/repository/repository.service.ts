/**
 * The `PayableRepository` class provides methods for managing payable records in the application.
 * It interacts with the Prisma ORM to perform CRUD operations on the `Payable` and `Assignor` entities.
 *
 * The `createOne` method creates a new `Payable` record with the provided data.
 *
 * The `create` method creates a new `Assignor` record if it doesn't exist, and then creates multiple `Payable` records associated with the `Assignor`.
 *
 * The `findAll` method retrieves all `Payable` records.
 *
 * The `findOne` method retrieves a single `Payable` record by its ID.
 *
 * The `update` method updates an existing `Payable` record with the provided data.
 *
 * The `delete` method deletes a `Payable` record by its ID.
 */
/**
 * The `PayableRepository` class provides methods for managing payable records in the application.
 *
 * This repository class interacts with the Prisma ORM to perform CRUD operations on the `Payable` entity.
 * It also handles the creation of `Assignor` entities when creating new payable records.
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Assignor, Payable, Prisma } from '@prisma/client';
import { CreatePayableAssignorDto } from '../payable.dto';



@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createOne(data: Partial<Payable>): Promise<any> {

    const result = await this.prisma.payable.create({
      data: {
        amount: data.amount,
        emissionDate: data.emissionDate,
        assignorId: data.assignorId,
      }
    })

    return result
  }

  async create(data: CreatePayableAssignorDto): Promise<any> {

    let createdAssignor: Assignor;
    if (typeof (data.assignor) == "string") {
      createdAssignor = await this.prisma.assignor.findUnique({
        where: {
          id: data.assignor
        }
      })
    } else {
      createdAssignor = await this.prisma.assignor.create({
        data: {
          name: data.assignor.name,
          document: data.assignor.document,
          email: data.assignor.email,
          phone: data.assignor.phone,
        },
      });
    }

    await this.prisma.payable.createMany({
      data: data.payables.map((el) => ({
        // description: el.description,
        amount: el.amount,
        emissionDate: el.emissionDate,
        assignorId: createdAssignor.id, // Usa o ID gerado para o Assignor
      })),
    });

    const createdPayables = await this.prisma.payable.findMany({
      where: {
        assignorId: createdAssignor.id,
      },
    });

    return {
      assignor: createdAssignor,
      payables: createdPayables,
    };
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }

  async findOne(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.PayableUpdateInput): Promise<Payable> {
    return this.prisma.payable.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Payable> {
    return this.prisma.payable.delete({ where: { id } });
  }
}
