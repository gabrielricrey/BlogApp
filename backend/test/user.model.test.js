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

describe('User model', () => {

    it('should require username, password and email', async () => {
        const user = new User({});
        let err;

        try{
            await user.validate();
        } catch (e) {
            err = e;
        }

        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.email).toBeDefined();
    })


    it('should hash password when User saved', async () => {
        const userData = {
            username: 'Testing',
            password: 'Testing1334!',
            email: 'test@gmail.com'
        }

        const createdUser = await User.create(userData)
        console.log(createdUser.password)
        expect(createdUser.password).not.toBe(userData.password)
        expect(createdUser.password).toMatch(/^\$2[aby]\$.{56}$/);
    })

    it('should NOT hash password again if not modified', async () => {
        const userData = {
            username: 'Test2',
            password: 'Testing1334!',
            email: 'test2@gmail.com'
        }

        const createdUser = await User.create(userData);
        const hashedPassword = createdUser.password;

        createdUser.username = 'Test3';
        await createdUser.save();

        expect(hashedPassword).toBe(createdUser.password);
    });

    it('should enforce minlength on password', async () => {
        const userData = {
            username: 'Test2',
            password: 'Testi!',
            email: 'test2@gmail.com'
        }

        const createdUser = await new User(userData);
        let err;

        try{
            await createdUser.validate();
        } catch(e) {
            err = e;
        }

        expect(err.errors.password).toBeDefined();
        expect(err.errors.password.kind).toBe('minlength');
    })

    it('should reject password not matching complexity requirements', async () => {
        const userData = {
            username: 'SimpleUser',
            password: 'simplepass',
            email: 'simpleuser@example.com'
        };

        const user = new User(userData);
        let err;

        try {
            await user.validate();
        } catch (e) {
            err = e;
        }

        expect(err.errors.password).toBeDefined();
        expect(err.errors.password.message).toMatch(/Password must be/);
    });

    it('should reject username with invalid characters', async () => {
        const userData = {
            username: 'Invalid*Name!',
            password: 'Validpass1!',
            email: 'invalidname@example.com'
        };

        const user = new User(userData);
        let err;

        try {
            await user.validate();
        } catch (e) {
            err = e;
        }

        expect(err.errors.username).toBeDefined();
        expect(err.errors.username.message).toMatch(/Username can only contain/);
    });

    it('should reject invalid email format', async () => {
        const userData = {
            username: 'ValidName',
            password: 'Validpass1!',
            email: 'not-an-email'
        };

        const user = new User(userData);
        let err;

        try {
            await user.validate();
        } catch (e) {
            err = e;
        }

        expect(err.errors.email).toBeDefined();
        expect(err.errors.email.message).toMatch(/Invalid email address/);
    });

    it('should reject duplicate email', async () => {
        const userData = {
            username: 'UserOne',
            password: 'Validpass1!',
            email: 'duplicate@example.com'
        };

        await User.create(userData);

        const duplicate = new User({
            username: 'UserTwo',
            password: 'Validpass1!',
            email: 'duplicate@example.com'
        });

        let err;
        try {
            await duplicate.save();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
        expect(err.code).toBe(11000);
        expect(err.message).toMatch(/duplicate key error/);
    });

    it('should reject duplicate username', async () => {
        const userData = {
            username: 'SameName',
            password: 'Validpass1!',
            email: 'user1@example.com'
        };

        await User.create(userData);

        const duplicate = new User({
            username: 'SameName',
            password: 'Validpass1!',
            email: 'user2@example.com'
        });

        let err;
        try {
            await duplicate.save();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
        expect(err.code).toBe(11000);
        expect(err.message).toMatch(/duplicate key error/);
    });

})