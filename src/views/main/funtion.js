import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const API_BASE_URL = 'http://localhost:4000/api/brainmap/bgt/images';
const S3_BASE_URL = 'https://brainmap.s3.ap-northeast-2.amazonaws.com/';

export const fetchImagePaths = async (params) => {
    try {
        const tokenData = localStorage.getItem('access_token');
        let token = null;
        
        if (tokenData) {
            try {
                const parsed = JSON.parse(tokenData);
                token = parsed.data;
            } catch {
                token = tokenData;
            }
        }
        
        const authHeaders = { 'Content-Type': 'application/json' };
        if (token) authHeaders['brainmap-hospital-token'] = token;
        
        const response = await axios.post(API_BASE_URL, params, { headers: authHeaders });
        return response.data;
    } catch (error) {
        return { success: false, error: `API 요청 실패: ${error.message}` };
    }
};

export const generateS3Urls = (bgtPaths) => {
    return bgtPaths.map(path => S3_BASE_URL + path);
};

export const checkBgtFileLoad = (bgtUrl) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = bgtUrl;
});

export const validateFormData = (formData) => {
    const errors = {};
    const validations = [
        { key: 'hospital_id', message: '병원 ID를 입력해주세요.' },
        { key: 'patient_id', message: '환자 ID를 입력해주세요.' },
        { key: 'menuDate', message: '날짜를 선택해주세요.' },
        { key: 'type', message: '타입을 선택해주세요.' }
    ];
    
    validations.forEach(({ key, message }) => {
        if (!formData[key]?.trim()) errors[key] = message;
    });
    
    return { isValid: Object.keys(errors).length === 0, errors };
};

export const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

export const getDefaultFormData = () => ({
    hospital_id: '',
    patient_id: '',
    menuDate: new Date().toISOString().split('T')[0],
    type: 'HTP'
});

export const downloadBgtFilesAsZip = async (bgtUrls, filename = 'bgt_files', fileType = 'image') => {
    try {
        const zip = new JSZip();
        
        if (fileType === 'text') {
            bgtUrls.forEach((textData, index) => {
                const textContent = JSON.stringify(textData, null, 2);
                zip.file(`${filename}_${index + 1}.txt`, textContent);
            });
        } else {
            const promises = bgtUrls.map(async (bgtUrl, index) => {
                try {
                    const response = await fetch(bgtUrl);
                    if (!response.ok) return;
                    
                    const blob = await response.blob();
                    const fileExtension = bgtUrl.split('.').pop() || 'jpg';
                    zip.file(`${filename}_${index + 1}.${fileExtension}`, blob);
                } catch {}
            });
            await Promise.all(promises);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const finalFilename = `${filename}_${new Date().toISOString().split('T')[0]}.zip`;
        saveAs(zipBlob, finalFilename);
        
        return { success: true, filename: finalFilename };
    } catch (error) {
        return { success: false, error: `압축 다운로드 실패: ${error.message}` };
    }
};
