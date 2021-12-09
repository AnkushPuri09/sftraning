import {Entity, model, property} from '@loopback/repository';

enum userRoll {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  Subscriber = 'Subscriber'
}

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
  })
  phoneno?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(userRoll),
    },
  })
  roll: string;
  userRoll: userRoll;


  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
