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

export const AllPagesDisplayed = template.bind({});
AllPagesDisplayed.args = {
  totalPages: 9,
  currentPage: 1,
};

export const PagesHiddenAtEnd = template.bind({});
PagesHiddenAtEnd.args = {
  totalPages: 15,
  currentPage: 1,
};

export const PagesHiddenAtStart = template.bind({});
PagesHiddenAtStart.args = {
  totalPages: 15,
  currentPage: 14,
};

export const PagesHiddenAtStartAndEnd = template.bind({});
PagesHiddenAtStartAndEnd.args = {
  totalPages: 15,
  currentPage: 8,
};
