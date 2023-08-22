const Token = require('../../../models/token');
const db = require('../../../database/connect');
const { v4: uuidv4 } = require("uuid");

describe('Token Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('class', () => {
        it('exists', () => {
            expect(Token).toBeDefined();
        });

        it('should be an instance of a Token', () => {
            const newToken = new Token({ token_id: 1, user_id: 1, token: 'sampletoken' });
            expect(newToken).toBeInstanceOf(Token);
        });
    });

    describe('static methods', () => {
        describe('create', () => {
            it('should create a predefined token for user_id 1', async () => {
                const mockToken = {
                    token_id: 1,
                    user_id: 1,
                    token: 'predefined_admin_token'
                };
                db.query = jest.fn()
                    .mockResolvedValueOnce({ rows: [{ token_id: 1 }] })
                    .mockResolvedValueOnce({ rows: [mockToken] });

                const newToken = await Token.create(1);

                expect(newToken).toBeInstanceOf(Token);
                expect(newToken.token).toEqual('predefined_admin_token');
            });

            it('should create a new random token for other user_ids', async () => {
                const token = uuidv4();
                const mockToken = {
                    token_id: 2,
                    user_id: 2,
                    token: token
                };
                db.query = jest.fn()
                    .mockResolvedValueOnce({ rows: [{ token_id: 2 }] })
                    .mockResolvedValueOnce({ rows: [mockToken] });

                const newToken = await Token.create(2);

                expect(newToken).toBeInstanceOf(Token);
                expect(newToken.token).not.toEqual('predefined_admin_token');
            });
        });

        describe('getOneById', () => {
            it('should retrieve a token by id', async () => {
                const mockToken = {
                    token_id: 2,
                    user_id: 2,
                    token: 'token12345'
                };
                db.query = jest.fn().mockResolvedValue({ rows: [mockToken] });

                const retrievedToken = await Token.getOneById(2);
                expect(retrievedToken).toBeInstanceOf(Token);
                expect(retrievedToken.token).toEqual('token12345');
            });

            it('should throw an error if token not found', async () => {
                db.query = jest.fn().mockResolvedValue({ rows: [] });

                await expect(Token.getOneById(99)).rejects.toThrow('Unable to locate token.');
            });
        });

        describe('getOneByToken', () => {
            it('should retrieve a token by its value', async () => {
                const mockToken = {
                    token_id: 3,
                    user_id: 3,
                    token: 'token67890'
                };
                db.query = jest.fn().mockResolvedValue({ rows: [mockToken] });

                const retrievedToken = await Token.getOneByToken('token67890');
                expect(retrievedToken).toBeInstanceOf(Token);
                expect(retrievedToken.token).toEqual('token67890');
            });

            it('should throw an error if token not found', async () => {
                db.query = jest.fn().mockResolvedValue({ rows: [] });

                await expect(Token.getOneByToken('invalidToken')).rejects.toThrow('Unable to locate token.');
            });
        });
    });
});
