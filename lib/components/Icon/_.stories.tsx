/**
 * Used AI during creation of this story
 * I don't want to waste much time for icons preview/stress-test
 */
import { type ComponentProps, type ReactNode, useMemo, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { Tooltip } from '../Tooltip';
import { Icon } from '.';
import {
  ANIMATION_NAMES,
  type AnimationName,
  CUSTOM_ICON_NAMES,
  REGULAR_ICON_NAMES,
  SOLID_ICON_NAMES,
} from './icons';

type StoryProps = ComponentProps<typeof Icon>;
type AnyIconName = StoryProps['name'];

export default {
  component: Icon,
  title: 'Components/Icon',
} satisfies Meta<StoryProps>;

const fasNames: readonly AnyIconName[] = SOLID_ICON_NAMES;
const farNames: readonly AnyIconName[] = REGULAR_ICON_NAMES;
const tgNames: readonly AnyIconName[] = CUSTOM_ICON_NAMES;
const animationNames: readonly AnimationName[] = ANIMATION_NAMES;

function useRandomItems<T>(source: readonly T[], count = 5) {
  const [refresh, setRefresh] = useState(0);
  const items = useMemo(
    () => [...source].sort(() => Math.random() - 0.5).slice(0, count),
    [source, refresh, count],
  );
  return { items, refresh: () => setRefresh((refresh) => refresh + 1) };
}

function RandomIcons({ icons }: { icons: readonly AnyIconName[] }) {
  return (
    <Stack p={0.5}>
      {icons.map((name) => (
        <Tooltip key={name} content={name}>
          <Icon name={name} size={1.5} />
        </Tooltip>
      ))}
    </Stack>
  );
}

function RandomAnimations({
  icons,
  animations,
}: {
  icons: readonly AnyIconName[];
  animations: readonly AnimationName[];
}) {
  return (
    <Stack p={1}>
      {animations.map((animation, index) => (
        <Tooltip key={animation} content={animation}>
          <Icon name={icons[index]} animation={animation} size={1.5} />
        </Tooltip>
      ))}
    </Stack>
  );
}

type Story = StoryObj<StoryProps>;
export const Default: Story = {
  render: () => {
    const fas = useRandomItems(fasNames);
    const far = useRandomItems(farNames);
    const tg = useRandomItems(tgNames);
    const animationIcons = useRandomItems(fasNames);
    const animations = useRandomItems(animationNames);

    const sections: {
      title: string;
      refresh: () => void;
      content: ReactNode;
    }[] = [
      {
        title: 'FA Solid',
        refresh: fas.refresh,
        content: <RandomIcons icons={fas.items} />,
      },
      {
        title: 'FA Regular',
        refresh: far.refresh,
        content: <RandomIcons icons={far.items} />,
      },
      {
        title: 'TGUI Font',
        refresh: tg.refresh,
        content: <RandomIcons icons={tg.items} />,
      },
      {
        title: 'Animations',
        refresh: () => {
          animationIcons.refresh();
          animations.refresh();
        },
        content: <RandomAnimations icons={animationIcons.items} animations={animations.items} />,
      },
    ];

    return (
      <Stack>
        {sections.map(({ title, refresh, content }) => (
          <Section
            key={title}
            title={title}
            buttons={
              <Button
                tooltip={{ content: 'Refresh', position: 'top' }}
                startIcon={{ name: 'arrows-rotate' }}
                onClick={refresh}
              />
            }
          >
            {content}
          </Section>
        ))}
      </Stack>
    );
  },
};

function AllIcons({ names }: { names: readonly AnyIconName[] }) {
  return (
    <Stack wrap>
      {names.map((name) => (
        <Tooltip key={name} content={name}>
          <Icon key={name} name={name} />
        </Tooltip>
      ))}
    </Stack>
  );
}

function AnimatedIcons() {
  const icons = useRandomItems(fasNames, animationNames.length);
  return (
    <Stack wrap g={2}>
      {animationNames.map((animation, index) => (
        <Tooltip key={animation} content={animation}>
          <Icon name={icons.items[index]} animation={animation} size={2} />
        </Tooltip>
      ))}
    </Stack>
  );
}

export const SolidIcons: Story = {
  render: () => <AllIcons names={fasNames} />,
};

export const RegularIcons: Story = {
  render: () => <AllIcons names={farNames} />,
};

export const CustomIcons: Story = {
  render: () => <AllIcons names={tgNames} />,
};

export const Animations: Story = {
  render: () => <AnimatedIcons />,
};
