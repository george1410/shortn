import { Table } from '@chakra-ui/react';
import TableRow from '../src/components/TableRow';

const config = {
  title: 'Components/TableRow',
  component: TableRow,
  argTypes: {
    loading: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <Table width='900px'>
        <Story />
      </Table>
    ),
  ],
};
export default config;

const template = (args) => <TableRow {...args} />;

export const Default = template.bind({});
Default.args = {
  loading: false,
  url: {
    shortUrl: 'blog',
    originalUrl: 'https://georgemccarron.com/blog/posts/hello-world',
    clicks: 10,
  },
};

export const Loading = template.bind({});
Loading.args = {
  loading: true,
  url: {
    shortUrl: 'blog',
    originalUrl: 'https://georgemccarron.com/blog/posts/hello-world',
    clicks: 10,
  },
};
