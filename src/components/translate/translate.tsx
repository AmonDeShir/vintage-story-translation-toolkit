import { Button } from "../button/button";
import { Container } from "../container/container";
import { Buttons } from "../layout/layout";
import { MultilineTextbox } from "../textbox/textbox";
import { Title } from "../title/title";
import { Size, Text, Translation } from "./translate.styles";

export const Translate = () => {
  return (
    <Size>
      <Container>
        <Title>Translate</Title>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus mauris, varius tempus accumsan at, tincidunt sit amet tellus. Aliquam blandit commodo tortor efficitur egestas. Mauris vulputate ante vel libero tincidunt, maximus consequat purus malesuada. Cras efficitur erat magna, quis pulvinar neque accumsan sit amet. Pellentesque viverra felis nec nunc pretium auctor. Vivamus sit amet ligula sollicitudin, vulputate massa in, posuere odio. Nam eu enim sollicitudin, varius quam a, blandit lorem. 
        </Text>

        <Translation>
          <MultilineTextbox
            placeholder="Translation"
          />
        </Translation>

        <Buttons>
          <Button text="Prev" />
          <Button text="Next" />
        </Buttons>
      </Container>
    </Size>
  );
}