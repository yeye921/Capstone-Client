import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  alignItems: center;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding-left: 1rem;
  width: 15rem;
  line-height: 2rem;
  border-radius: 0.2cm;
  border-width: 0.3mm;
`;

const ListContainer = styled.div`
  margin-top: 1rem;
`;

const AddButton = styled.div`
  position:fixed;
  bottom: 0;
  margin-bottom: 5rem;
  margin-left: 18rem;
`;

export { SearchContainer, Input, ListContainer, AddButton };