# Food Delivery API

## Setup

For your convience the api is hosted [here](https://food-delivery-be-np84.onrender.com/api) but to run and setup locally,

```bash
yarn install
yarn start:dev
```

The server will be running at http://localhost:3000

## Endpoints

The endpoints can be found in the `/api` path eg `http://localhost:3000/api` using the OpenApi spec via swagger

example

GET http://localhost:3000/comms/your-next-delivery/567e7bb1-5f69-4b5d-a82f-7edec41bb081

```json
{
  "title": "Your next delivery for Cullen and Serena",
  "message": "Hey Samanta! In two days' time, we'll be charging you for your next order for Cullen and Serena's fresh food.",
  "totalPrice": "124.50",
  "freeGift": true
}
```

## Testing

To run the unit tests

```bash
yarn test
```

## Improvements

- A more persistent storage in ideally a relational database like postgres utilising typeORM
- Add logging for every request
- Implement JWT authentication
- Make cat image dynamic: potentially storing avata/profile images for a user in s3
- More exhaustive tests eg for controllers and user service
