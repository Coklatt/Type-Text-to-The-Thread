const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/threads endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadTableTestHelper.cleanTable();
    });

    describe('when POST /threads', () => {
        it('should response 400 when request payload not contain needed property', async () => {
            // Arrange
            const requestPayload = {
                title: 'Di atas Awan',
            };
            const accessToken = await ServerTestHelper.getAccessToken();

            const server = await createServer(container);

            // Action

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual(
                'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak lengkap'
            );
        });

        it('should response 400 when request payload not meet data type specification', async () => {
            // Arrange
            const requestPayload = {
                title: 123,
                body: true,
            };
            const accessToken = await ServerTestHelper.getAccessToken();

            const server = await createServer(container);

            // Action

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual(
                'tidak dapat membuat thread baru karena tipe data tidak sesuai'
            );
        });

        it('should response 401 when no access token given', async () => {
            // Arrange
            const requestPayload = {
                title: 'Di atas Awan',
                body: 'Ku ingin terbang',
            };

            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.error).toEqual('Unauthorized');
        });

        it('should response 201 and persisted user', async () => {
            // Arrange
            const requestPayload = {
                title: 'Di atas Awan',
                body: 'Ku ingin terbang',
            };
            const accessToken = await ServerTestHelper.getAccessToken();

            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();
            expect(responseJson.data.addedThread).toHaveProperty('id');
            expect(responseJson.data.addedThread).toHaveProperty('title');
            expect(responseJson.data.addedThread).toHaveProperty('owner');
        });
    });
});