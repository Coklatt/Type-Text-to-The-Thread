/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
    async addLike({ id = 'like-321', commentId = 'comment-321321', owner = 'user-123123' }) {
        const query = {
            text: 'INSERT INTO likes(id, comment_id, owner) VALUES($1, $2, $3)',
            values: [id, commentId, owner],
        };

        await pool.query(query);
    },

    async deleteLike({ id = 'like-321' }) {
        const query = {
            text: 'DELETE FROM likes WHERE id = $1',
            values: [id],
        };

        await pool.query(query);
    },

    async findLikeById(id) {
        const query = {
            text: 'SELECT * FROM likes WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async getLikesByCommentId({ commentId = 'comment-321321' }) {
        const query = {
            text: 'SELECT * FROM likes WHERE comment_id = $1',
            values: [commentId],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM likes');
    },
};

module.exports = LikesTableTestHelper;
