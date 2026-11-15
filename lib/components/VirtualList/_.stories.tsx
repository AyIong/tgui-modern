import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../Stack';
import { VirtualList } from '.';

type StoryProps = ComponentProps<typeof VirtualList>;

export default {
  component: VirtualList,
  title: 'Components/VirtualList',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render() {
    return (
      <Stack fill vertical>
        <VirtualList>
          {Array.from({ length: 10000 }).map((_, i) => (
            <Stack.Item
              key={i}
              style={{
                height: '20px',
                borderBottom: '1px solid gray',
              }}
            >
              {i}
            </Stack.Item>
          ))}
        </VirtualList>
      </Stack>
    );
  },
};
