const routes = (handler) => [
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThread,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'POST',
        path: '/threads/{threadId}/comments',
        handler: handler.postComment,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'POST',
        path: '/threads/{threadId}/comments/{commentId}/replies',
        handler: handler.postReply,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'GET',
        path: '/threads/{threadId}',
        handler: handler.getThreadById,
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteCommentById,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
        handler: handler.deleteReplyById,
        options: {
            auth: 'forumapi_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/threads/{threadId}/comments/{commentId}/likes',
        handler: handler.like,
        options: {
            auth: 'forumapi_jwt',
        },
    },
];

module.exports = routes;
