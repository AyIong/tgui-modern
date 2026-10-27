import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../../Stack';
import { Button } from '..';

type StoryProps = ComponentProps<typeof Button.Confirm>;

export default {
  component: Button.Confirm,
  title: 'Components/Button',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Confirm: Story = {
  args: {
    children: 'Hold me',
    fluid: false,
    disabled: false,
  },
  render: (args) => {
    const [confirmed, setConfirmed] = useState(false);
    return (
      <Stack>
        <Stack.Item grow>
          <Button.Confirm onClick={() => setConfirmed(!confirmed)} {...args} />
        </Stack.Item>
        <Stack.Item>{confirmed ? 'Confirmed' : 'Confirm'}</Stack.Item>
      </Stack>
    );
  },
};
