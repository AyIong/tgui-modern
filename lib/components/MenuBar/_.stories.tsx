import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Divider } from '../Divider';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { MenuBar } from '.';

type StoryProps = ComponentProps<typeof MenuBar.Dropdown>;

export default {
  component: MenuBar.Dropdown,
  decorators: (Story) => (
    <Stack vertical>
      <Stack.Item>
        <Story />
      </Stack.Item>
      <Stack.Item>
        <Section title="Foo">Bar</Section>
      </Stack.Item>
    </Stack>
  ),
  subcomponents: {
    Menubar: MenuBar,
    'MenuBar.Dropdown': MenuBar.Dropdown,
    'MenuBar.Item': MenuBar.Item,
  },
  title: 'Components/MenuBar',
} satisfies Meta<StoryProps>;

export const Default: StoryObj<StoryProps> = {
  args: {
    openWidth: 17.5,
  },
  render: (args) => {
    const { openWidth } = args;
    const [checkbox, setCheckbox] = useState(false);

    return (
      <MenuBar>
        <MenuBar.Dropdown display="File" openWidth={openWidth}>
          <MenuBar.Item>Open File</MenuBar.Item>
          <MenuBar.Dropdown display="Open Recent" openWidth={openWidth}>
            <MenuBar.Item>/foo.js</MenuBar.Item>
            <MenuBar.Item>/bar.ts</MenuBar.Item>
            <MenuBar.Item>/baz.ts</MenuBar.Item>
            <Divider />
            <MenuBar.Item>Clear Recently Opened</MenuBar.Item>
          </MenuBar.Dropdown>
          <MenuBar.Item>Save</MenuBar.Item>
          <MenuBar.Item>Save Ass</MenuBar.Item>
          <Divider />
          <MenuBar.Item>Exit</MenuBar.Item>
        </MenuBar.Dropdown>
        <MenuBar.Dropdown display="Settings" openWidth={openWidth}>
          <MenuBar.Item>User Settings</MenuBar.Item>
          <MenuBar.Item checked={checkbox} onClick={() => setCheckbox(!checkbox)}>
            Save on file edit
          </MenuBar.Item>
        </MenuBar.Dropdown>
        <MenuBar.Dropdown display="Help" openWidth={openWidth}>
          <MenuBar.Item>More Info</MenuBar.Item>
        </MenuBar.Dropdown>
      </MenuBar>
    );
  },
};
