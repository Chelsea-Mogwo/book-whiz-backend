const booksController = require('../../../controllers/book');
const Book = require('../../../models/book');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('books controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('index', () => {
    it('returns books with a 200 status code', async () => {
      const testBooks = ['book1', 'book2'];

      // Mock the Book.getAll static method
      jest.spyOn(Book, 'getAll').mockResolvedValue(testBooks);

      await booksController.index(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ "data": testBooks });
    });
  });
});