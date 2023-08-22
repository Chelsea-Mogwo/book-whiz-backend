const Book = require('../../../models/Book')

const db = require('../../../database/connect')


describe('Book', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('class', () => {
        it('exists', () => {
            expect(Book).toBeDefined()
        })

    })
})
