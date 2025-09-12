import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 4px;
    cursor: pointer;
    & > *:first-child {
        margin-bottom: 3px;
    }
`;

const SortWrapper = ({ onClick, children }) => {
    return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default SortWrapper;
