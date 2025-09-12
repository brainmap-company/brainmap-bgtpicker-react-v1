import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
    fetchImagePaths, 
    generateS3Urls, 
    validateFormData, 
    getDefaultFormData,
    downloadBgtFilesAsZip
} from './funtion';
import { initializeAuth } from './autoLogin/request';

import Box from '@components/common/Box';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Typo from '@components/common/Typo';
import BrainMapLogo from '@images/brainmap_logo.jpg';

const ImageGrid = ({ children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {children}
    </div>
);

const ImageCard = ({ children, onClick }) => (
    <Box
        onClick={onClick}
        style={{
            border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
    >
        {children}
    </Box>
);

const SearchIcon = styled.div`
    width: 18px; height: 18px; border: 2px solid white; border-radius: 50%; position: relative; margin-right: 12px;
    &::after { content: ''; position: absolute; bottom: -3px; right: -3px; width: 6px; height: 2px; background: white; transform: rotate(45deg); }
`;

const BgtPicker = () => {
    const [bgtFiles, setBgtFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(getDefaultFormData());
    const [validationErrors, setValidationErrors] = useState({});
    const [authInitialized, setAuthInitialized] = useState(false);
    const [currentType, setCurrentType] = useState('BGT');

    useEffect(() => {
        const initAuth = async () => {
            const success = await initializeAuth();
            setAuthInitialized(success);
            if (!success) setError('자동 로그인에 실패했습니다. 페이지를 새로고침해주세요.');
        };
        initAuth();
    }, []);

    const fetchBgtFiles = async () => {
        const validation = validateFormData(formData);
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }
        setLoading(true);
        setError(null);
        setValidationErrors({});
        setCurrentType(formData.type || 'BGT');
        try {
            const response = await fetchImagePaths(formData);
            if (response.isSuccess && response.data.length > 0) {
                if (formData.type === 'PFT') {
                    const textData = response.data.map(item => Array.isArray(item.answer) ? item.answer : []);
                    setBgtFiles(textData);
                } else {
                    setBgtFiles(generateS3Urls(response.data[0].image_path));
                }
            } else {
                setError('BGT 파일을 찾을 수 없습니다.');
            }
        } catch (err) {
            setError('BGT 파일 로딩 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchBgtFiles();
    };

    const handleDownload = async () => {
        if (bgtFiles.length === 0) {
            setError('다운로드할 BGT 파일이 없습니다.');
            return;
        }
        setDownloading(true);
        setError(null);
        try {
            const fileType = currentType === 'PFT' ? 'text' : 'image';
            await downloadBgtFilesAsZip(bgtFiles, `${currentType}_${formData.hospital_id}_${formData.patient_id}_${formData.menuDate}`, fileType);
        } catch (err) {
            setError('다운로드 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setDownloading(false);
        }
    };

    const typeOptions = ['BGT', 'HTP', 'KFD', 'PFT'];

    return (
        <Box padding="20px" width="100%" maxWidth="1200px" margin="0 auto">
            <Box display="flex" alignItems="center" justifyContent="center" margin="0 0 20px 0">
                <img src={BrainMapLogo} alt="BrainMap Logo" style={{ height: '32px', width: 'auto', borderRadius: '4px', marginRight: '55px' }} />
            </Box>
            
            <form onSubmit={handleSubmit} style={{ padding: '20px 40px 20px 20px', margin: '0 auto 0px auto', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd', width: '350px' }}>
                <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    {[
                        { key: 'hospital_id', label: '병원 ID', placeholder: '병원 ID를 입력하세요', type: 'text' },
                        { key: 'patient_id', label: '환자 ID', placeholder: '환자 ID를 입력하세요', type: 'text' },
                        { key: 'menuDate', label: '날짜', type: 'date' }
                    ].map(field => (
                        <Box key={field.key}>
                            <Typo fontSize="14px" fontWeight="bold" margin="0 0 5px 0">{field.label}:</Typo>
                            <Input
                                type={field.type}
                                value={formData[field.key]}
                                setValue={(value) => setFormData(prev => ({ ...prev, [field.key]: value }))}
                                placeholder={field.placeholder}
                                width="100%"
                                height="40px"
                            />
                            {validationErrors[field.key] && (
                                <Typo fontSize="12px" color="#dc3545" margin="4px 0 0 0">{validationErrors[field.key]}</Typo>
                            )}
                        </Box>
                    ))}
                    
                    <Box>
                        <Typo fontSize="14px" fontWeight="bold" margin="0 0 5px 0">타입:</Typo>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            style={{ width: '100%', height: '40px', padding: '8px', border: validationErrors.type ? '1px solid #dc3545' : '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                        >
                            <option value="">타입을 선택하세요</option>
                            {typeOptions.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                        {validationErrors.type && <Typo fontSize="12px" color="#dc3545" margin="4px 0 0 0">{validationErrors.type}</Typo>}
                    </Box>
                </Box>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button
                        type="submit"
                        disabled={loading || !authInitialized}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <SearchIcon />
                        {!authInitialized ? '로그인 중...' : loading ? '로딩 중...' : 'BGT 파일 조회'}
                    </button>
                </div>
            </form>

            {error && (
                <Box padding="15px" backgroundColor="#f8d7da" color="#721c24" border="1px solid #f5c6cb" borderRadius="4px" margin="0 0 20px 0">
                    <Typo color="#721c24">{error}</Typo>
                </Box>
            )}

            {bgtFiles.length > 0 && (
                <Box width="1200px" margin="0 auto">
                    <Box display="flex" justifyContent="space-between" alignItems="center" margin="0 0 15px 0">
                        <Typo fontSize="18px" fontWeight="bold" color="#333">조회된 {currentType} 파일 ({bgtFiles.length}개)</Typo>
                        <Button
                            onClick={handleDownload}
                            disabled={downloading}
                            backgroundColor="#6c757d"
                            color="white"
                            padding="10px 20px"
                            borderRadius="8px"
                            fontSize="14px"
                            fontWeight="600"
                            cursor="pointer"
                        >
                            {downloading ? '압축 중...' : '다운로드'}
                        </Button>
                    </Box>
                    
                    <ImageGrid>
                        {bgtFiles.map((fileData, index) => (
                            <ImageCard key={index} onClick={() => {
                                if (currentType !== 'PFT') window.open(fileData, '_blank');
                            }}>
                                {currentType === 'PFT' ? (
                                    <Box style={{ width: '100%', height: '200px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #dee2e6' }}>
                                        <Typo fontSize="16px" color="#6c757d">📄 텍스트 파일</Typo>
                                    </Box>
                                ) : (
                                    <img
                                        src={fileData}
                                        alt={`${currentType} 파일 ${index + 1}`}
                                        onError={(e) => {
                                            e.target.style.backgroundColor = '#f0f0f0';
                                            e.target.alt = `${currentType} 파일 로드 실패`;
                                        }}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                                    />
                                )}
                                <Box padding="10px">
                                    <Typo fontSize="14px" color="#666">
                                        {currentType === 'PFT' ? `${formData.patient_id}_PFT_text` : `${currentType}_images_${index + 1}`}
                                    </Typo>
                                </Box>
                            </ImageCard>
                        ))}
                    </ImageGrid>
                </Box>
            )}

        </Box>
    );
};

export default BgtPicker;
