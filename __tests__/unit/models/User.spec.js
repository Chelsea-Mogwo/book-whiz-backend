const User = require('../../../models/user');
const db = require('../../../database/connect');

describe('User Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('class', () => {
        it('exists', () => {
            expect(User).toBeDefined();
        });

        it('should be an instance of a User', () => {
            const newUser = new User({
                user_id: 2,
                username: 'Ollie',
                password: 'password123',
                is_admin: false
            });
            expect(newUser).toBeInstanceOf(User);
        });
    });

    describe('static methods', () => {
        describe('getOneById', () => {
            it('should retrieve a user by id', async () => {
                const mockUser = {
                    user_id: 2,
                    username: 'Ollie',
                    password: 'password123',
                    is_admin: false
                };
                db.query = jest.fn().mockResolvedValue({ rows: [mockUser] });

                const retrievedUser = await User.getOneById(2);
                expect(retrievedUser).toBeInstanceOf(User);
                expect(retrievedUser.username).toEqual('Ollie');
            });

            it('should throw an error if user not found', async () => {
                db.query = jest.fn().mockResolvedValue({ rows: [] });

                await expect(User.getOneById(99)).rejects.toThrow('Unable to locate user.');
            });
        });

        describe('getOneByUsername', () => {
            it('should retrieve a user by username', async () => {
                const mockUser = {
                    user_id: 3,
                    username: 'John',
                    password: 'johnpassword',
                    is_admin: true
                };
                db.query = jest.fn().mockResolvedValue({ rows: [mockUser] });

                const retrievedUser = await User.getOneByUsername('John');
                expect(retrievedUser).toBeInstanceOf(User);
                expect(retrievedUser.username).toEqual('John');
            });

            it('should throw an error if user not found', async () => {
                db.query = jest.fn().mockResolvedValue({ rows: [] });

                await expect(User.getOneByUsername('Doe')).rejects.toThrow('Unable to locate user.');
            });
        });

        describe('create', () => {
            it('should create a new user and return it', async () => {
                const mockUser = {
                    user_id: 4,
                    username: 'Doe',
                    password: 'doepassword',
                    is_admin: false
                };
                db.query = jest.fn()
                    .mockResolvedValueOnce({ rows: [{ user_id: 4 }] })
                    .mockResolvedValueOnce({ rows: [mockUser] });

                const newUser = await User.create({
                    username: 'Doe',
                    password: 'doepassword',
                    isAdmin: false
                });

                expect(newUser).toBeInstanceOf(User);
                expect(newUser.username).toEqual('Doe');
            });
        });
    });
});
