import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { CSS_COLORS } from 'tgui-modern/common/constants';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { Tabs } from '.';

type StoryProps = ComponentProps<typeof Tabs>;

export default {
  component: Tabs,
  title: 'Components/Tabs',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [vertical, setVertical] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [tab, setTab] = useState('');

    return (
      <Stack fill height={40} vertical={!vertical} wrap>
        <Stack.Item>
          <Tabs fill vertical={vertical}>
            {[...CSS_COLORS].map((color) => (
              <Tabs.Tab
                key={color}
                color={color}
                selected={selectAll || tab === color}
                onClick={() => setTab(color)}
              >
                {color || 'Default'}
              </Tabs.Tab>
            ))}
          </Tabs>
        </Stack.Item>
        <Stack.Item grow>
          <Section
            fill
            buttons={
              <>
                <Button.Checkbox checked={selectAll} onClick={() => setSelectAll(!selectAll)}>
                  Select all
                </Button.Checkbox>
                <Button.Checkbox checked={vertical} onClick={() => setVertical(!vertical)}>
                  Vertical
                </Button.Checkbox>
              </>
            }
            title={`Vertical Tabs - Tab ${tab}`}
          >
            Selected tab: {tab}
          </Section>
        </Stack.Item>
      </Stack>
    );
  },
};
