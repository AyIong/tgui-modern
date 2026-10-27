import { type ChangeEvent, useRef } from 'react';
import { Button } from '..';
import type { ButtonFileProps } from './types';

export function ButtonFile(props: ButtonFileProps) {
  const { accept, multiple, onSelectFiles, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  async function read(files: FileList): Promise<string[]> {
    const promises = Array.from(files).map((file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(file);
      });
    });
    return await Promise.all(promises);
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = event.target.files;
    if (files?.length) {
      const readFiles = await read(files);
      onSelectFiles(multiple ? readFiles : readFiles[0]);
    }
  }

  return (
    <>
      <Button onClick={() => inputRef.current?.click()} {...rest} />
      <input
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        type="file"
        style={{ display: 'none' }}
      />
    </>
  );
}
