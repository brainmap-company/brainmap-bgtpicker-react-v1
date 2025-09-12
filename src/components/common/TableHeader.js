import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'space-between')};
    align-items: center;
    width: 100%;
    height: 58px;
    padding: ${(props) => (props.padding ? props.padding : '20px 29px')};
    border-top: 2px solid ${(props) => props.theme.BORDER_GRAY_V2_COLOR};
    border-bottom: 2px solid ${(props) => props.theme.BORDER_GRAY_V2_COLOR};
`;

const TableHeader = ({ padding, justifyContent, children }) => {
    return (
        <Container padding={padding} justifyContent={justifyContent}>
            {children}
        </Container>
    );
};

export default TableHeader;
