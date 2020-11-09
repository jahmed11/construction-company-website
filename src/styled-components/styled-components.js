import styled from "styled-components";

export const StyledContainer = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

export const SignoutButton = styled.button`
  position: absolute;
  right: 19px;
  top: 12px;
`;

export const InputNumberDiv = styled.div`
  margin: 15px auto;
`;
export const InputLabel = styled.label`
  display: block;
`;

export const ColumnDiv = styled.div`
  padding: 0;
`;

export const FormCreate = styled.form`
  width: 450px;
  margin: 0 auto;
`;

export const AllModelsDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-bottom: 80px;
`;

export const ModelInHomeDiv = styled.div`
  border: 1px solid #e3e3e3;
  width: 400px;
`;

export const ShortInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;
export const SpanDiv = styled.div`
  text-align: center;
`;
export const InfoSpan = styled.div`
  display: block;
`;
export const MapWrapper = styled.div`
  width: 1150px;
  height: 500px;
  margin: 25px auto;
  @media (max-width: 770px) {
    width: 730px;
    height: 450px;
  }
  @media (max-width: 430) {
    width: 400px;
    height: 300px;
  }
`;

export const SpinDiv = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`;
