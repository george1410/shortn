import { Flex } from '@chakra-ui/layout';
import Header from '../src/components/Header';

const config = {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
  decorators: [
    (Story) => (
      <Flex width={900}>
        <Story />
      </Flex>
    ),
  ],
};
export default config;

const template = (args) => <Header {...args} />;

export const Default = template.bind({});
