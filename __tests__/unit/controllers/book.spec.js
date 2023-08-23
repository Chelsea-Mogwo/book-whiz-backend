const booksController = require('../../../controllers/book')
const Book = require('../../../models/book')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }


describe('books controller', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('index', () => {
    it('returns books with a 200 status code', async () => {
      const testBooks = ['book1', 'book2']
      jest.spyOn(Book, 'getAll')
        .mockResolvedValue(testBooks)

      await booksController.index(null, mockRes)
      expect(mockStatus).toHaveBeenCalledWith(200) // good
      expect(mockSend).toHaveBeenCalledWith({ "data": testBooks })
    })

    // it('calls Colour.getAll', async () => {
    //   const testColours = { "data": ['c1', 'c2'] }

    //   jest.spyOn(Colour, 'getAll')
    //     .mockResolvedValue(testColours)

    //   await coloursController.index(null, mockRes)
    //   expect(Colour.getAll).toHaveBeenCalledTimes(1)
    // })

    // it('rejects', async () => {
    //   jest.spyOn(coloursController, 'index')
    //     .mockRejectedValue(new Error('Something happened to your db'))

    //   try {
    //     await coloursController.index('', mockRes)
    //   } catch (error) {
    //     expect(error).toBeTruthy()
    //     expect(error.message).toBe('Something happened to your db')
    //   }
    // })
  })
})