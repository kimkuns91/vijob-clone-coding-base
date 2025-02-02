import type { Meta, StoryObj } from '@storybook/react';
import JobDetail from './JobDetail';

const meta = {
  title: 'Components/JobDetail',
  component: JobDetail,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JobDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 필요한 props 추가
  },
}; 