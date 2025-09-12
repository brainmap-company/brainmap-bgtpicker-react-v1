import styled from 'styled-components';

import Typo from '@components/common/Typo';

const Container = styled.div`
    position: relative;
    padding: 23px 18px 25px 20px;
    width: 100%;
    min-height: ${(props) => (props.minHeight ? props.minHeight : '960px')};
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.BORDER_GRAY_COLOR};
    @media print {
        height: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${(props) => props.marginBottom || '17px'};
`;

const Title = styled(Typo)`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: ${(props) => props.theme.MAIN_THEME_COLOR};
    font-size: 18px;
    font-weight: 600;
    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 3px;
        height: 24px;
        background-color: #78cad2;
    }
`;

export { Container, Header, Title };
