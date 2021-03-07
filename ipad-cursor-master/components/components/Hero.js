import styled from 'styled-components';

import TextArea from './TextArea';

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 24px;
`;

const Hero = () => {
    return (
        <Container>
            <TextArea
                style={{ fontSize: '64px' }}
                defaultValue="Hover over this text to see the cursor change size."
                focus
                placeholder="Header"
            />
            <TextArea
                defaultValue="Different sized text will change the cursor size appropriately."
                placeholder="Subheader"
            />
            <TextArea
                style={{ fontSize: '14px' }}
                defaultValue="Even teeny tiny text works."
                placeholder="Small text"
            />
        </Container>
    )
}

export default Hero;