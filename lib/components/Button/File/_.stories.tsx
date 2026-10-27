import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '..';

type StoryProps = ComponentProps<typeof Button.File>;

export default {
  component: Button.File,
  title: 'Components/Button',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const File: Story = {
  args: {
    accept: 'image/*',
    children: 'Upload file',
  },
};
