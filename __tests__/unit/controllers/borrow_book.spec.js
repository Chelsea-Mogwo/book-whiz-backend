const borrowed_BookController = require('../../../controllers/borrowed_book');
const Borrowed_Book = require('../../../models/borrowed_book');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('borrowed_book controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('index', () => {
    it('returns a 200 status code', async () => {
      const testBooks = ['book1', 'book2'];

      jest.spyOn(Borrowed_Book, 'getAll').mockResolvedValue(testBooks);

      await borrowed_BookController.index(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testBooks);
    });

    it('calls Borrowed_Book.getAll', async () => {
        const testBooks = ['book1', 'book2'];
  
        jest.spyOn(Borrowed_Book, 'getAll')
          .mockResolvedValue(testBooks)
  
        await borrowed_BookController.index(null, mockRes)
        expect(Borrowed_Book.getAll).toHaveBeenCalledTimes(1)
    })
    
    it('rejects', async () => {
      jest.spyOn(borrowed_BookController, 'index')
        .mockRejectedValue(new Error('Something happened to your db'))

      try {
        await borrowed_BookController.index('', mockRes)
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Something happened to your db')
      }
    })


  });
});