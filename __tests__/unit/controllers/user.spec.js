const userController = require('../../../controllers/user');
const User = require('../../../models/user');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('user controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('returns a 201 status code', async () => {
      const result = ['Registration success!'];

      jest.spyOn(User, 'create').mockResolvedValue(result);

      await userController.register(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(result);
    });




  });
});