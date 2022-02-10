const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const Handler = require('../Handler');
const GetThreadDetailsUseCase = require('../../../../Applications/use_case/GetThreadDetailsUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');

class ThreadsHandler extends Handler {
    async postThreadHandler(request, h) {
        const { id: owner } = request.auth.credentials;

        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
        const addedThread = await addThreadUseCase.execute({ ...request.payload, owner });

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

    async postCommentHandler(request, h) {
        const { content } = request.payload;
        const { id: owner } = request.auth.credentials;
        const { threadId } = request.params;

        const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
        const addedComment = await addCommentUseCase.execute({ content, owner, threadId });

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

    async postReplyHandler(request, h) {
        const { content } = request.payload;
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId } = request.params;

        const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
        const addedReply = await addReplyUseCase.execute({ content, owner, threadId, commentId });

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

    async getThreadByIdHandler(requet, h) {
        const { threadId } = requet.params;
        const getThreadDetailsUseCase = this._container.getInstance(GetThreadDetailsUseCase.name);
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

    async deleteCommentByIdHandler(request, h) {
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

    async deleteReplyByIdHandler(request, h) {
        const { threadId, commentId, replyId } = request.params;
        const { id: owner } = request.auth.credentials;

        const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
        await deleteReplyUseCase.execute({ threadId, commentId, replyId, owner });

        const response = h.response({
            status: 'success',
            message: 'berhasil menghapus balasan',
        });

        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;
