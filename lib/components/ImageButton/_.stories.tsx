/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Fuck off> */
import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { CSS_COLORS } from 'tgui-modern/common/constants';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { ImageButton } from '.';

const soulFish = <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>SoulFish</span>;
const soulFishImage =
  'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEXAwMAAAP8AAMwAZv9mMwCZZjMAAAD/mTP/zGb/ADMHBwd3bPqIAAAAAXRSTlMAQObYZgAAAI5JREFUKJFjYBhkQAiNz2iEJiAMEmBxQBIAaXENQOgwBgqwhEJVsKWlJRkbCsAF2NLKy9OSjQ0FVWEC5Rlt5cnGxsKmIVADKjo62oWBAoYwMyo6Z6AKlHd0lAMFlK1cYXrKywuNgQIL4AIMDEpAFauA9iIcthjkMgYXuACTlLKhAornFFctQvUtkyLDgAIAaJcdwdTNoTsAAAAASUVORK5CYII=';

type StoryProps = ComponentProps<typeof ImageButton>;
export default {
  component: ImageButton,
  title: 'Components/ImageButton',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: 'ImageButton',
  },
};

export const DefaultFluid: Story = {
  args: {
    fluid: true,
    children: 'ImageButton',
    description: 'It will take up the entire available width',
  },
};

export const FilledDefault: Story = {
  render: (args) => {
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(false);

    return (
      <ImageButton
        {...args}
        base64={soulFishImage}
        buttons={
          <Button
            variant="transparent"
            color={disabled && 'bad'}
            startIcon={'power-off'}
            onClick={() => setDisabled(!disabled)}
          />
        }
        buttonsAlt={soulFish}
        disabled={disabled}
        onClick={() => setSelected(!selected)}
        onRightClick={() => setDisabled(!disabled)}
        selected={selected}
        tooltip={{ content: 'Also, you can Right Click on it', position: 'bottom' }}
      >
        Hover me
      </ImageButton>
    );
  },
};

export const FilledFluid: Story = {
  args: {
    fluid: true,
    children: 'ImageButton',
    base64: soulFishImage,
    tooltip: { content: 'Also, you can Right Click on it', position: 'bottom' },
  },

  render: (args) => {
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(false);
    const buttons = (
      <Button
        color={disabled && 'bad'}
        variant="transparent"
        onClick={() => setDisabled(!disabled)}
      >
        <Icon mb={1} name={'power-off'} size={1.66} />
        <br />
        {disabled ? 'Enable' : 'Disable'}
      </Button>
    );

    return (
      <>
        <ImageButton
          {...args}
          mb={0.5}
          selected={selected}
          disabled={disabled}
          description="Fluid with buttonsAlt prop. buttonsAlt container has a fixed width that depends on the size of the image"
          buttonsAlt={buttons}
          onClick={() => setSelected(!selected)}
          onRightClick={() => setDisabled(!disabled)}
        />
        <ImageButton
          {...args}
          buttons={buttons}
          disabled={disabled}
          description="Fluid with buttons prop. buttons container can have custom width. Here is auto width"
          onClick={() => setSelected(!selected)}
          onRightClick={() => setDisabled(!disabled)}
          selected={selected}
        />
      </>
    );
  },
};

export const Mixed: Story = {
  render: (args) => {
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(false);
    const [compact, setCompact] = useState(false);

    const info = (
      <>
        You can mix layouts without making new constants for each one.
        <br />
        If you are MAD enough.
      </>
    );

    const controls = (
      <>
        <Button
          variant="transparent"
          color={disabled && 'bad'}
          startIcon={'power-off'}
          onClick={() => setDisabled(!disabled)}
        />
        <Button
          variant="transparent"
          startIcon={compact ? 'expand' : 'minimize'}
          onClick={() => setCompact(!compact)}
        />
      </>
    );

    return (
      <ImageButton
        {...args}
        base64={soulFishImage}
        buttons={compact && controls}
        buttonsAlt={compact ? soulFish : controls}
        disabled={disabled}
        fluid={!compact}
        imageSize={compact ? 96 : 64}
        onClick={() => setSelected(!selected)}
        onRightClick={() => setDisabled(!disabled)}
        selected={selected}
        description={info}
        tooltip={{ content: compact && info, position: 'bottom' }}
      >
        {'ImageButton'}
      </ImageButton>
    );
  },
};

export const Colors: Story = {
  render: (args) => {
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(false);
    const [compact, setCompact] = useState(true);

    const controls = (
      <>
        <Button
          color={disabled && 'bad'}
          startIcon={'power-off'}
          onClick={() => setDisabled(!disabled)}
        />
        <Button
          variant="transparent"
          startIcon={compact ? 'expand' : 'minimize'}
          onClick={() => setCompact(!compact)}
        />
      </>
    );

    return (
      <>
        {[...CSS_COLORS].map((color) => (
          <ImageButton
            {...args}
            key={color}
            fluid={!compact}
            base64={soulFishImage}
            buttons={compact && controls}
            buttonsAlt={compact ? soulFish : controls}
            color={color}
            selected={selected}
            disabled={disabled}
            imageSize={compact ? 96 : 48}
            onClick={() => setSelected(!selected)}
            onRightClick={() => setDisabled(!disabled)}
          >
            {color}
          </ImageButton>
        ))}
      </>
    );
  },
};

// If that will not render, you have real problems
export const StressTest: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);

    return (
      <Stack wrap>
        {Array.from({ length: 1000 }, (_, i) => (
          <ImageButton
            key={i}
            selected={selected}
            description="There is too many buttons..."
            base64={soulFishImage}
            onClick={() => setSelected(!selected)}
          >
            Stress test {`${i + 1}`}
          </ImageButton>
        ))}
      </Stack>
    );
  },
};
