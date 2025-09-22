import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Config from '@app/config';

const API_BASE_URL = `${Config.REQUEST[0].url}/bgt/data`;
const S3_BASE_URL = 'https://brainmap.s3.ap-northeast-2.amazonaws.com/';

export const fetchImagePaths = async (params) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(params)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
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
            const allAnswers = bgtUrls.flat();
            const combinedText = allAnswers.map((answer, index) => 
                `${index + 1}. ${answer}`
            ).join('\n\n');
            
            zip.file(`${filename}.txt`, combinedText);
        } else {
            const promises = bgtUrls.map(async (bgtUrl, index) => {
                try {
                    const fileResponse = await fetch(`${Config.REQUEST[0].url}/bgt/download?url=${encodeURIComponent(bgtUrl)}`, {
                        credentials: 'include'
                    });
                    if (!fileResponse.ok) {
                        throw new Error(`HTTP error! status: ${fileResponse.status}`);
                    }
                    
                    const fileBlob = await fileResponse.blob();
                    const contentType = fileResponse.headers.get('content-type');
                    
                    let fileExtension = 'png';
                    if (contentType?.includes('jpeg') || contentType?.includes('jpg')) {
                        fileExtension = 'jpg';
                    } else if (contentType?.includes('png')) {
                        fileExtension = 'png';
                    } else if (bgtUrl.includes('.')) {
                        fileExtension = bgtUrl.split('.').pop();
                    }
                    
                    zip.file(`${filename}_${index + 1}.${fileExtension}`, fileBlob);
                } catch (error) {
                    console.warn(`Failed to fetch ${bgtUrl}:`, error);
                }
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
