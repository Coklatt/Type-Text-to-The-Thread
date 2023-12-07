/* eslint-disable no-unused-vars */
class CommentRepository {
    async verifyCommentExist(data) {
        throw new Error('COMMENT_REPOSITORY.VERIFY_COMMENT_EXIST.METHOD_NOT_IMPLEMENTED');
    }

    async addComment(addComment) {
        throw new Error('COMMENT_REPOSITORY.ADD_COMMENT.METHOD_NOT_IMPLEMENTED');
    }

    async getCommentsByThreadId(threadId) {
        throw new Error('COMMENT_REPOSITORY.GET_COMMENTS_BY_THREAD_ID.METHOD_NOT_IMPLEMENTED');
    }

    async deleteCommentById(commentId) {
        throw new Error('COMMENT_REPOSITORY.DElETE_COMMENT.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = CommentRepository;
