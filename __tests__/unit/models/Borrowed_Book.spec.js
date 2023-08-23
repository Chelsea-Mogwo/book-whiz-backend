const Borrowed_Book = require('../../../models/borrowed_book')

const db = require('../../../database/connect')


describe('Borrowed Book', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('class', () => {
        it('exists', () => {
            expect(Borrowed_Book).toBeDefined()
        })

        it('should be an instance of a Borrowed Book', () => {
            const newBorrowedBook = new Borrowed_Book(2)
            expect(newBorrowedBook).toBeInstanceOf(Borrowed_Book)
        })
    })

    describe('getAll', () => {
        it('Sends all borrowed books information when successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ id: 1 }, { id: 2 }, { id: 3 }]
                })

            const borrowedBooks = await Borrowed_Book.getAll()
            expect(borrowedBooks).toHaveLength(3)
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Failed to retreive borrowed books'))
      
            try {
              await Borrowed_Book.getAll()
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe('Failed to retreive borrowed books')
            }
        })
    })


    describe('getOneById', () => {
        it('resolves with borrowed book on successful db query', async () => {
          let borrowedBookData = { book_id: 1, user_id: 4 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [borrowedBookData] })
    
          const result = await Borrowed_Book.getOneById(1)
          expect(result).toBeInstanceOf(Borrowed_Book)
          expect(result.book_id).toBe(1)
          expect(result.user_id).toBe(4)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue(new Error("Unable to locate book by id."))
    
          try {
            await Borrowed_Book.getOneById(7)
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe("Unable to locate book by id.")
          }
        })
      })


      describe('create', () => {
        it('resolves with book on successful db query', async () => {
          let borrowedBookData = { book_id: 1, user_id: 4, overdue: false }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...borrowedBookData, book_id: 1, user_id: 4, overdue: false }] });
    
          const result = await Borrowed_Book.create(borrowedBookData);
          expect(result).toHaveProperty('book_id')
          expect(result).toHaveProperty('user_id')
          expect(result).toHaveProperty('overdue')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue(new Error('Error: id missing'))
    
          try {
            await Borrowed_Book.create({})
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('Error: id missing')
          }
        })
      })

      describe('update', () => {
        it('updates the borrowed book on successful db query', async () => {
            const borrowedBookData = { book_id: 1, user_id: 4, due_date: new Date(), overdue: true };
    
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [borrowedBookData] });
    
            const borrowedBook = new Borrowed_Book({ book_id: 1 });
            const updatedBorrowedBook = await borrowedBook.update(borrowedBookData);
    
            expect(updatedBorrowedBook).toBeInstanceOf(Borrowed_Book);
            expect(updatedBorrowedBook.user_id).toBe(4);
            expect(updatedBorrowedBook.due_date).toEqual(borrowedBookData.due_date);
            expect(updatedBorrowedBook.overdue).toBe(true);
        });
    
        it('should throw an Error on db query error during update', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to update borrowed book.'));
    
            const borrowedBook = new Borrowed_Book({ book_id: 1 });
            try {
                await borrowedBook.update({});
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('Unable to update borrowed book.');
            }
        });
    });
    
    describe('deleteById', () => {
        it('deletes the borrowed book on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] });
    
            const borrowedBook = new Borrowed_Book({ book_id: 1 });
            const response = await borrowedBook.deleteById();
    
            expect(response.success).toBe(true);
            expect(response.message).toBe('borrowed book deleted successfully.');
        });
    
        it('should throw an Error on db query error during delete', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('This id does not match an entry'));
    
            const borrowedBook = new Borrowed_Book({ book_id: 1 });
            try {
                await borrowedBook.deleteById();
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('This id does not match an entry');
            }
        });
    });
    
    
})
