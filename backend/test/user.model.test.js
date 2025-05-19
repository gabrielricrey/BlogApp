import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from '../models/user.model.js'

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

test('Should hash password when User saved', async () => {
    const userData = {
        username: 'Testing',
        password: 'testing1334',
        email: 'test@gmail.com'
    }

    const createdUser = await User.create(userData)
    console.log(createdUser.password)
    expect(createdUser.password).not.toBe(userData.password)
    expect(createdUser.password).toMatch(/^\$2[aby]\$.{56}$/);
})