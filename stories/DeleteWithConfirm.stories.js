import DeleteWithConfirm from '../src/components/DeleteWithConfirm';

const config = {
  title: 'Components/DeleteWithConfirm',
  component: DeleteWithConfirm,
  argTypes: {
    onConfirm: { action: 'confirmed' },
    shortUrl: { control: { type: 'text' } },
    tooltipText: { control: { type: 'text' } },
    isLoading: { control: { type: 'boolean' } },
  },
};
export default config;

const template = (args) => <DeleteWithConfirm {...args} />;

export const Default = template.bind({});
Default.args = {
  isLoading: false,
  tooltipText: 'Delete Item',
  shortUrl: 'blog',
};

export const Loading = template.bind({});
Loading.args = {
  isLoading: true,
  tooltipText: 'Delete Item',
  shortUrl: 'blog',
};
