const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const Handler = require('../Handler');
const GetThreadDetailUseCase = require('../../../../Applications/use_case/GetThreadDetailUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const LikeUseCase = require('../../../../Applications/use_case/LikeUseCase');

class ThreadsHandler extends Handler {
    async postThread(request, h) {
        const { id: owner } = request.auth.credentials;

        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
        const addedThread = await addThreadUseCase.execute({
            ...request.payload,
            owner,
        });

        const response = h.response({
            status: 'success',
            message: 'berhasil menambahkan thread',
            data: {
                addedThread,
            },
        });

        response.code(201);
        return response;
    }

    async postComment(request, h) {
        const { content } = request.payload;
        const { id: owner } = request.auth.credentials;
        const { threadId } = request.params;

        const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
        const addedComment = await addCommentUseCase.execute({
            content,
            owner,
            threadId,
        });

        const response = h.response({
            status: 'success',
            message: 'berhasil menambahkan komentar',
            data: {
                addedComment,
            },
        });

        response.code(201);
        return response;
    }

    async postReply(request, h) {
        const { content } = request.payload;
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId } = request.params;

        const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
        const addedReply = await addReplyUseCase.execute({
            content,
            owner,
            threadId,
            commentId,
        });

        const response = h.response({
            status: 'success',
            message: 'berhasil menambahkan balasan',
            data: {
                addedReply,
            },
        });

        response.code(201);
        return response;
    }

    async getThreadById(requet, h) {
        const { threadId } = requet.params;
        const getThreadDetailsUseCase = this._container.getInstance(GetThreadDetailUseCase.name);
        const thread = await getThreadDetailsUseCase.execute({ threadId });

        const response = h.response({
            status: 'success',
            message: 'berhasil mendapatkan rincian thread',
            data: {
                thread,
            },
        });

        response.code(200);
        return response;
    }

    async deleteCommentById(request, h) {
        const { threadId, commentId } = request.params;
        const { id: owner } = request.auth.credentials;

        const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
        await deleteCommentUseCase.execute({ threadId, commentId, owner });

        const response = h.response({
            status: 'success',
            message: 'berhasil menghapus komentar',
        });

        response.code(200);
        return response;
    }

    async deleteReplyById(request, h) {
        const { threadId, commentId, replyId } = request.params;
        const { id: owner } = request.auth.credentials;

        const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
        await deleteReplyUseCase.execute({
            threadId,
            commentId,
            replyId,
            owner,
        });

        const response = h.response({
            status: 'success',
            message: 'berhasil menghapus balasan',
        });

        response.code(200);
        return response;
    }

    async like(request, h) {
        const { id: owner } = request.auth.credentials;

        const likeUseCase = this._container.getInstance(LikeUseCase.name);
        await likeUseCase.execute({ ...request.params, owner });

        const response = h.response({
            status: 'success',
        });

        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;
