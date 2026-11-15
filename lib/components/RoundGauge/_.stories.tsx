import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { LabeledControls } from '../LabeledControls';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { RoundGauge } from '.';

type StoryProps = ComponentProps<typeof RoundGauge>;
export default {
  component: RoundGauge,
  title: 'Components/RoundGauge',
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100, step: 1 } },
    minValue: { control: { type: 'number' } },
    maxValue: { control: { type: 'number' } },
    alertAfter: { control: { type: 'number' } },
    alertBefore: { control: { type: 'number' } },
    size: { control: { type: 'number', min: 0.5, max: 5, step: 0.1 } },
    draggable: { control: { type: 'boolean' } },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

type PreviewProps = {
  ranges?: Record<string, [number, number]>;
} & PropsWithChildren;

function RoundGaugePreview(props: PreviewProps) {
  const [value, setValue] = useState(50);
  const { ranges } = props;

  return (
    <Stack.Item>
      <Section>
        <LabeledControls>
          <LabeledControls.Item label="Min">
            <Button
              variant="transparent"
              fontSize={1.5}
              startIcon="angles-left"
              onClick={() => setValue(0)}
            />
          </LabeledControls.Item>
          <LabeledControls.Item label="-10">
            <Button
              variant="transparent"
              fontSize={1.5}
              startIcon="angle-left"
              onClick={() => setValue(value - 10)}
            />
          </LabeledControls.Item>
          <RoundGauge
            alertAfter={75}
            maxValue={100}
            minValue={0}
            ranges={
              ranges || {
                primary: [0, 25],
                good: [25, 50],
                average: [50, 75],
                bad: [75, 100],
              }
            }
            size={2.5}
            value={value}
          />
          <LabeledControls.Item label="+10">
            <Button
              variant="transparent"
              fontSize={1.5}
              startIcon="angle-right"
              onClick={() => setValue(value + 10)}
            />
          </LabeledControls.Item>
          <LabeledControls.Item label="Max">
            <Button
              variant="transparent"
              fontSize={1.5}
              startIcon="angles-right"
              onClick={() => setValue(100)}
            />
          </LabeledControls.Item>
        </LabeledControls>
      </Section>
    </Stack.Item>
  );
}

export const Default = {
  render: () => {
    return (
      <Stack fill justify="center">
        <RoundGaugePreview />
      </Stack>
    );
  },
};

// Simple story that allows Storybook controls
export const Playground: Story = {
  args: {
    value: 50,
    minValue: 0,
    maxValue: 100,
    alertAfter: 75,
    size: 2.5,
    ranges: { primary: [0, 100] },
  },
  render: (args) => (
    <Stack fill justify="center">
      <RoundGauge {...args} />
    </Stack>
  ),
};

// With pre-defined ranges
export const WithRanges: Story = {
  args: {
    value: 50,
    minValue: 0,
    maxValue: 100,
    alertAfter: 75,
    size: 2.5,
    ranges: {
      good: [0, 50],
      average: [50, 75],
      bad: [75, 100],
    },
  },
  render: (args) => (
    <Stack fill justify="center">
      <RoundGauge {...args} />
    </Stack>
  ),
};
