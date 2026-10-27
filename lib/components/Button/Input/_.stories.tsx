import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../../Stack';
import { Button } from '..';

type StoryProps = ComponentProps<typeof Button.Input>;

export default {
  component: Button.Input,
  title: 'Components/Button',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Input: Story = {
  render: () => {
    const [text, setText] = useState('Type something');
    return (
      <Stack>
        <Button.Input value={text} onCommit={(value) => setText(value)} />
      </Stack>
    );
  },
};
