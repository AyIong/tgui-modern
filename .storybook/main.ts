import type { StorybookConfig } from 'storybook-react-rsbuild';
import { booleanStyleMap, eventHandlers, stringStyleMap } from '../lib/common/ui.ts';
import type { BoxInternalProps } from '../lib/components/Box/types';

const boxInternalProps: Array<keyof BoxInternalProps<HTMLDivElement>> = [
  'as',
  'children',
  'className',
  'id',
  'style',
  'tw',
  'ref',
];

const boxProps = [
  ...Object.keys(stringStyleMap),
  ...Object.keys(booleanStyleMap),
  ...boxInternalProps,
  ...eventHandlers,
] as const;

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  features: { backgrounds: false, interactions: false },
  framework: {
    name: 'storybook-react-rsbuild',
    options: { strictMode: false },
  },
  stories: ['../lib/components/**/*.stories.tsx', '../stories/**/*.stories.tsx'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (props, component) => {
        if (component.name === 'Box') {
          return true;
        }

        return !boxProps.includes(props.name);
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  rsbuildFinal: (config) => {
    // Customize the final Rsbuild config here
    if (process.env.PAGES_URL !== undefined) {
      config.output ??= {};
      config.output.assetPrefix = process.env.PAGES_URL;
    }

    return config;
  },
};

export default config;
