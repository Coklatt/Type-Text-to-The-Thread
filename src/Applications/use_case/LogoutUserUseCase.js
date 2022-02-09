class LogoutUserUseCase {
    constructor(authenticationRepository) {
        this._authenticationRepository = authenticationRepository;
    }

    async execute(useCasePayload) {
        this._validatePayload(useCasePayload);

        const { refreshToken } = useCasePayload;

        await this._authenticationRepository.checkAvailabilityToken(refreshToken);
        await this._authenticationRepository.deleteToken(refreshToken);
    }

    _validatePayload({ refreshToken }) {
        if (!refreshToken) {
            throw new Error('LOGOUT_USER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
        }

        if (typeof refreshToken !== 'string') {
            throw new Error('LOGOUT_USER_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = LogoutUserUseCase;
