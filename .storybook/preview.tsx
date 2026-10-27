import type { Preview } from '@storybook/react';
import { themes } from '../stories/themes';
import previewTheme from './previewTheme.ts';

// Main styles
import '../styles/main.scss';
// Components styles
import '../lib/components/main.scss';
// Storybook specific
import '../styles/storybook.scss';

import { Controls, Description, Primary, Subtitle } from '@storybook/addon-docs/blocks';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      document.documentElement.className = `
        theme-${context.globals.theme} pref-${context.globals.colorScheme}
      `;
      return <Story />;
    },
  ],
  globalTypes: {
    theme: {
      description: 'Components thematic style',
      toolbar: {
        icon: 'paintbrush',
        items: themes,
        title: 'Theme',
      },
    },
    colorScheme: {
      description: 'Global theme for components',
      toolbar: {
        icon: 'sun',
        items: ['day', 'night'],
        title: 'Color Scheme',
      },
    },
  },
  initialGlobals: {
    theme: 'default',
    colorScheme: 'night',
  },
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        order: [
          'Interfaces',
          'Components',
          ['Button', ['Docs', 'Default', 'Colors', '*']],
          'Hooks',
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      codePanel: true,
      page: () => (
        <>
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
      theme: previewTheme,
      toc: false,
    },
  },
  tags: ['autodocs'],
};

export default preview;
