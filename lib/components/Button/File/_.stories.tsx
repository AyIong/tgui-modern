import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { ButtonFile } from '.';

type StoryProps = ComponentProps<typeof ButtonFile>;

export default {
  component: ButtonFile,
  title: 'Components/ButtonFile',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    accept: 'image/*',
    children: 'Upload file',
  },
};
