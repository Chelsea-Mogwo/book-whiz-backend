const Book = require('../../../models/book')

const db = require('../../../database/connect')


describe('Book', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('class', () => {
        it('exists', () => {
            expect(Book).toBeDefined()
        })

        it('should be an instance of a Book', () => {
            const newBook = new Book('Ressurection')
            expect(newBook).toBeInstanceOf(Book)
        })
    })

    describe('getAll', () => {
        it('sends all books when successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ name: 'Great Expectations' }, { name: 'Don Quixote' }, { name: 'Sons and Lovers' }]
                })

            const books = await Book.getAll()
            expect(books).toHaveLength(3)
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Failed to retreive books'))
      
            try {
              await Book.getAll()
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe('Failed to retreive books')
            }
        })
    })

    describe('getOneById', () => {
        it('resolves with book on successful db query', async () => {
          let bookData = { book_id: 1, book_name: 'Great Expectations' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [bookData] })
    
          const result = await Book.getOneById(1)
          expect(result).toBeInstanceOf(Book)
          expect(result.name).toBe('Great Expectations')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue(new Error("Unable to locate book."))
    
          try {
            await Book.getOneById(7)
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe("Unable to locate book.")
          }
        })
      })



      describe('create', () => {
        it('resolves with book on successful db query', async () => {
          let bookData = { book_name: 'Great Expectations' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...bookData, id: 1 }] });
    
          const result = await Book.create(bookData);
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue(new Error('Error: name missing'))
    
          try {
            await Book.create({})
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('Error: name missing')
          }
        })
      })



      describe('update', () => {
        it('updates the book on successful db query', async () => {
            const mockBook = new Book({ book_id: 1, book_name: 'Old Name' });
            const newData = { book_name: 'Updated Name', author: 'Updated Author', year: 2000, genre: 'Updated Genre', description: 'Updated Description' };
    
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ ...newData, book_id: 1 }] });
    
            const updatedBook = await mockBook.update(newData);
    
            expect(updatedBook).toBeInstanceOf(Book);
            expect(updatedBook.name).toBe('Updated Name');
        });
    
        it('should throw an Error on db query error', async () => {
            const mockBook = new Book({ book_id: 1, book_name: 'Old Name' });
            
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Failed to update book'));
    
            try {
                await mockBook.update({});
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('Failed to update book');
            }
        });
    });
    

    describe('deleteById', () => {
        it('deletes the book successfully', async () => {
            const mockBook = new Book({ book_id: 1, book_name: 'To Delete' });
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({});
    
            const response = await mockBook.deleteById();
    
            expect(response).toEqual({ success: true, message: 'book deleted successfully.' });
        });
    
        it('should throw an Error on db query error', async () => {
            const mockBook = new Book({ book_id: 1, book_name: 'To Delete' });
            
            jest.spyOn(db, 'query').mockRejectedValue(new Error('This id does not match an entry.'));
    
            try {
                await mockBook.deleteById();
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('This id does not match an entry.');
            }
        });
    });
    


    describe('getByGenre', () => {
        it('returns books by genre on successful db query', async () => {
            const genre = 'Fiction';
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ book_name: 'Book 1' }, { book_name: 'Book 2' }] });
    
            const books = await Book.getByGenre(genre);
            expect(books).toHaveLength(2);
            expect(books[0]).toBeInstanceOf(Book);
        });
    
        it('should throw an Error when no books found for a genre', async () => {
            const genre = 'Non-Existent Genre';
    
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
    
            try {
                await Book.getByGenre(genre);
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('No books found with that genre.');
            }
        });
    });
    

    describe('getByTitleOrAuthor', () => {
        it('returns books by title or author on successful db query', async () => {
            const keyword = 'Great';
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ book_name: 'Great Expectations' }, { book_author: 'Great Writer' }] });
    
            const books = await Book.getByTitleOrAuthor(keyword);
            expect(books).toHaveLength(2);
            expect(books[0]).toBeInstanceOf(Book);
        });
    
        it('should throw an Error when no books found for a title or author', async () => {
            const keyword = 'Non-Existent';
    
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
    
            try {
                await Book.getByTitleOrAuthor(keyword);
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('No books found with that title or author.');
            }
        });
    });

})

