import Pagination from '../src/components/Pagination';

const config = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    onChangePage: { action: 'pageChanged' },
    totalPages: { control: { type: 'number', min: 1 } },
  },
};
export default config;

const template = (args) => <Pagination {...args} />;

export const Primary = template.bind({});
Primary.args = {
  totalPages: 3,
  currentPage: 1,
};
