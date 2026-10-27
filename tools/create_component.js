const fs = require('node:fs');
const path = require('node:path');

const componentName = process.argv[2];
if (!componentName) {
  console.error('Specify a component name: \n bun create-component ComponentName \n');
  process.exit(1);
}

const baseDir = path.join('lib', 'components', componentName);
fs.mkdirSync(baseDir, { recursive: true });

const files = {
  '_index.scss': `.${componentName.toLowerCase()} {
  // Placeholder
}
`,
  'index.tsx': `import { classes } from 'tgui-modern/common/react';
import type { ${componentName}Props } from './types';

export function ${componentName}(props: ${componentName}Props) {
  const { children, className } = props;

  return (
    <div className={classes('${componentName.toLowerCase()}', className)}>
      {children}
    </div>
  );
}
`,

  'types.ts': `import type { ReactNode } from 'react';

export type ${componentName}Props = {
  children?: ReactNode;
  className?: string;
}
`,
};

Object.entries(files).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(baseDir, filename), content);
});

fs.appendFileSync(path.join('lib', 'components', 'main.scss'), `@use "./${componentName}";\n`);

console.log(`Done!`);
