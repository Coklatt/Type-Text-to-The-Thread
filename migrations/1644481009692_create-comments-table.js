exports.up = (pgm) => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        content: {
            type: 'VARCHAR(512)',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        date: {
            type: 'TIMESTAMP',
            notNull: true,
        },
        is_deleted: {
            type: 'INTEGER',
            default: 0,
        },
    });

    pgm.addConstraint(
        'comments',
        'fk_comments.thread_id_threads.id',
        'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE',
    );
    pgm.addConstraint(
        'comments',
        'fk_comments.user_id_users.id',
        'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
    );
};

exports.down = (pgm) => {
    pgm.dropTable('comments');
};
