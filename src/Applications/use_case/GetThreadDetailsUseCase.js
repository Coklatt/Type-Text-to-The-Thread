/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const CommentDetail = require('../../Domains/threads/comment/entities/CommentDetail');
const ReplyDetail = require('../../Domains/threads/reply/entities/ReplyDetail');
const GetThreadDetails = require('../../Domains/threads/thread/entities/GetThreadDetails');
const ThreadDetails = require('../../Domains/threads/thread/entities/ThreadDetails');

class GetThreadDetailsUseCase {
    constructor({ threadRepository, commentRepository, replyRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
        this._replyRepository = replyRepository;
    }

    async execute(useCasePayload) {
        const getThreadDetails = new GetThreadDetails(useCasePayload);

        await this._threadRepository.verifyThreadExist(useCasePayload.threadId);

        const threadDetails = await this._threadRepository.getThreadDetailsById(
            getThreadDetails,
        );
        const threadComments =
            await this._commentRepository.getCommentsByThreadId(
                getThreadDetails,
            );
        const threadReplies = await this._replyRepository.getRepliesByThreadId(
            getThreadDetails,
        );

        threadDetails.comments = this._getCommentAndReplies(
            threadComments,
            threadReplies,
        );

        return new ThreadDetails(threadDetails);
    }

    _getCommentAndReplies(comments, replies) {
        return comments.map((comment) => {
            comment.replies = replies
                .filter((reply) => reply.comment_id === comment.id)
                .map(
                    (reply) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        new ReplyDetail({
                            ...reply,
                            date: reply.date.toString(),
                        }),
                );

            return new CommentDetail({
                ...comment,
                date: comment.date.toString(),
            });
        });
    }
}

module.exports = GetThreadDetailsUseCase;
