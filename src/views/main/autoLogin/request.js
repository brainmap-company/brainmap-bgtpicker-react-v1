import Config from '@app/config';

const LOGIN_API_URL = `${Config.REQUEST[0].url}/account/login`;

export const autoLogin = async (credentials = Config.AUTO_LOGIN) => {
    try {
        const response = await fetch(LOGIN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data?.isOK === true && data?.result) {
            
            return { 
                success: true, 
                message: '자동 로그인 성공'
            };
        }
        
        if (data?.isOK === false) {
            return { 
                success: false, 
                error: `로그인 실패: ${data.message || '알 수 없는 오류'}` 
            };
        }
        
        return { success: false, error: '로그인 응답 형식이 올바르지 않습니다.' };
    } catch (error) {
        return { success: false, error: `자동 로그인 실패: ${error.message}` };
    }
};


export const initializeAuth = async () => {
    const result = await autoLogin();
    return result.success;
};
