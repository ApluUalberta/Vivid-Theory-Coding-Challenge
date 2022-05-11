import { Resolver, Query } from "type-graphql";
import { Reading } from "../readings/reading.entitity
@Resolver()
export class ReadingResolver {
  @Query(() => [Reading])
  reading() {
    return Reading.find;
  }
}