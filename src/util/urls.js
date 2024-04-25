export const SERVER_URL = {
    DEV_URL: () => { // 개발용
        return 'http://localhost:3001'
    },
    PORD_URL: () => { // 배포용
        return 'http://13.124.142.216:3001'
    },
}