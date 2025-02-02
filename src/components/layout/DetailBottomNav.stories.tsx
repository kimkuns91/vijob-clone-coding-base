import type { Meta, StoryObj } from '@storybook/react';
import DetailBottomNav from './DetailBottmNav';

const meta = {
  title: 'Layout/DetailBottomNav',
  component: DetailBottomNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailBottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 필요한 props 추가
  },
}; 