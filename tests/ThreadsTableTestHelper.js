/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
    async addThread({
        id = 'thread-123',
        title = 'Di atas Awan',
        body = 'Ku ingin terbang',
        owner = 'user-123',
    }) {
        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, title, body, owner],
        };

        const results = await pool.query(query);
        return results.rows[0].id;
    },

    async findThreadById(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async findCommentById(id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads');
    },
};

module.exports = ThreadsTableTestHelper;
