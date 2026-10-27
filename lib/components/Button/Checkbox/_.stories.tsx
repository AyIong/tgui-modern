import { CSS_COLORS } from '@common/constants';
import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../../Stack';
import { Button } from '..';

type StoryProps = ComponentProps<typeof Button.Checkbox>;

export default {
  component: Button.Checkbox,
  title: 'Components/Button',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Checkbox: Story = {
  args: {
    children: 'Click me',
    fluid: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return <Button.Checkbox checked={checked} onClick={() => setChecked(!checked)} {...args} />;
  },
};

export const CheckboxColors: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Stack g={0} vertical>
        {CSS_COLORS.map((color) => (
          <Button.Checkbox
            key={color}
            color={color}
            checked={checked}
            onClick={() => setChecked(!checked)}
          >
            {color}
          </Button.Checkbox>
        ))}
      </Stack>
    );
  },
};
