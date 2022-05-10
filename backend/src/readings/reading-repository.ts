import { EntityRepository, Repository } from "typeorm";
import { Reading } from "./reading.entitity";

@EntityRepository(Reading)
export class ReadingRepository extends Repository<Reading> {
  findBySerialNumber(Serial_Number: string) {
    return this.createQueryBuilder("public.readings")
      .where("reading.serial_number = :serial_number", { Serial_Number })
      .getMany();
  }
}