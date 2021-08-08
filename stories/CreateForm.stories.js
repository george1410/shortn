import CreateForm from '../src/components/CreateForm';

const config = {
  title: 'Components/CreateForm',
  component: CreateForm,
  argTypes: {},
};
export default config;

const template = (args) => <CreateForm {...args} />;

export const Default = template.bind({});
