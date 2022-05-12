import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  alignitems: center;
  padding-top: 4rem;
  // position: fixed;
`;

const Input = styled.input`
  padding-left: 1rem;
  width: 15rem;
  line-height: 2rem;
  border-radius: 0.2cm;
  border-width: 0.3mm;
  // position: fixed;
`;

const ListContainer = styled.div`
  margin-top: 0.6rem;
  //
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 5rem;
  margin-left: 18rem;
`;

export { SearchContainer, Input, ListContainer, AddButton };
