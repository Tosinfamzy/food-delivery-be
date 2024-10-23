import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';

describe('CommsService', () => {
  let service: CommsService;

  const mockData = [
    {
      id: 'ff535484-6880-4653-b06e-89983ecf4ed5',
      firstName: 'Kayleigh',
      lastName: 'Wilderman',
      email: 'Kayleigh_Wilderman@hotmail.com',
      cats: [
        {
          name: 'Dorian',
          subscriptionActive: true,
          breed: 'Thai',
          pouchSize: 'C',
        },
        {
          name: 'Ocie',
          subscriptionActive: true,
          breed: 'Somali',
          pouchSize: 'F',
        },
        {
          name: 'Eldridge',
          subscriptionActive: false,
          breed: 'Himalayan',
          pouchSize: 'A',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = module.get<CommsService>(CommsService);

    // Mock the readUserData method to return the mock data
    jest
      .spyOn(service as any, 'readUserData')
      .mockImplementation(() => mockData);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct delivery data for a valid user', () => {
    const result = service.nextDelivery('ff535484-6880-4653-b06e-89983ecf4ed5');

    expect(result).toEqual({
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: '134.00',
      freeGift: true,
    });
  });

  it('should throw an error if the user does not exist', () => {
    expect(() => service.nextDelivery('non-existent-id')).toThrow(
      'User not found',
    );
  });

  it('should throw an error if no active subscriptions are found', () => {
    const noActiveSubscriptionsData = [
      {
        id: 'inactive-user-id',
        firstName: 'John',
        cats: [
          { name: 'Cat1', subscriptionActive: false, pouchSize: 'A' },
          { name: 'Cat2', subscriptionActive: false, pouchSize: 'B' },
        ],
      },
    ];

    jest
      .spyOn(service as any, 'readUserData')
      .mockImplementation(() => noActiveSubscriptionsData);

    expect(() => service.nextDelivery('inactive-user-id')).toThrow(
      'No active subscriptions for this user',
    );
  });

  it('should calculate the total price correctly', () => {
    const result = service.nextDelivery('ff535484-6880-4653-b06e-89983ecf4ed5');
    expect(result.totalPrice).toBe('134.00');
  });

  it('should set freeGift to false if total price is less than 120', () => {
    const below120Data = [
      {
        id: 'user-below-120',
        firstName: 'John',
        cats: [
          { name: 'Cat1', subscriptionActive: true, pouchSize: 'A' },
          { name: 'Cat2', subscriptionActive: true, pouchSize: 'A' },
        ],
      },
    ];

    jest
      .spyOn(service as any, 'readUserData')
      .mockImplementation(() => below120Data);

    const result = service.nextDelivery('user-below-120');
    expect(result.freeGift).toBe(false);
    expect(result.totalPrice).toBe('111.00');
  });

  it('should format cat names correctly', () => {
    const result = service.nextDelivery('ff535484-6880-4653-b06e-89983ecf4ed5');
    expect(result.title).toBe('Your next delivery for Dorian and Ocie');
  });
});
