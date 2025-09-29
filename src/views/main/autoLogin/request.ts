import Config from '@src/config/secret';

const LOGIN_API_URL = `${Config.REQUEST[0].url}/account/login`;

interface LoginCredentials {
    id?: string;
    pwd?: string;
}

interface LoginResult {
    success: boolean;
    message?: string;
    error?: string;
}

export const autoLogin = async (credentials: LoginCredentials = Config.AUTO_LOGIN): Promise<LoginResult> => {
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
    } catch (error: any) {
        return { success: false, error: `자동 로그인 실패: ${error.message}` };
    }
};

export const initializeAuth = async (): Promise<boolean> => {
    const result = await autoLogin();
    return result.success;
};




