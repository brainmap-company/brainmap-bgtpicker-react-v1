import Request from '../../../lib/hib/request';

const LOGIN_API_URL = '/account/login';

export const autoLogin = async (credentials = { id: 'brainmap', pw: 'brain123!@#' }) => {
    try {
        const response = await Request.post(LOGIN_API_URL, credentials);
        const data = response.data;
        
        if (data?.error) {
            return { success: false, error: `로그인 실패: ${data.error.message || '알 수 없는 오류'}` };
        }
        
        if (data?.token) {
            const tokenData = {
                data: data.token,
                type: "string",
                encrypted: true,
                expiredTime: null
            };
            localStorage.setItem('access_token', JSON.stringify(tokenData));
            return { success: true, token: data.token };
        }
        
        if (data?.id) {
            return { success: true, token: 'existing_session' };
        }
        
        return { success: false, error: '로그인 응답에서 토큰을 찾을 수 없습니다.' };
    } catch (error) {
        return { success: false, error: `자동 로그인 실패: ${error.message}` };
    }
};

export const initializeAuth = async () => {
    if (localStorage.getItem('access_token')) {
        return true;
    }
    
    const result = await autoLogin();
    return result.success;
};
