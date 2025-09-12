import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function IsChangedRoute() {
    const { pathname } = useLocation();
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        // 페이지 변경 시 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 이전 경로 저장
        sessionStorage.setItem('prevPathname', prevPathRef.current);
        prevPathRef.current = location.pathname;
    }, [pathname]);

    return null;
}
