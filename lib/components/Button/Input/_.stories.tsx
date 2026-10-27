import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../../Stack';
import { ButtonInput } from '.';

type StoryProps = ComponentProps<typeof ButtonInput>;

export default {
  component: ButtonInput,
  title: 'Components/ButtonInput',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [text, setText] = useState('Type something');
    return (
      <Stack>
        <ButtonInput value={text} onCommit={(value) => setText(value)} />
      </Stack>
    );
  },
};
