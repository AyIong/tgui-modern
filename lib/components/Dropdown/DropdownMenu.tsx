import { osOptions } from '@common/constants';
import { isEnter, KEY } from '@common/keys';
import { unit } from '@common/ui';
import {
  OverlayScrollbarsComponent,
  type OverlayScrollbarsComponentRef,
} from 'overlayscrollbars-react';
import { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { useButton } from 'tgui-modern/hooks/useButton';
import { useFuzzySearch } from 'tgui-modern/hooks/useFuzzySearch';
import { Input } from '../Input';
import {
  entryClassName,
  getMaxHeight,
  getOptionDisplayText,
  getOptionIndex,
  getOptionValue,
  maxItemsDefault,
  maxItemsLimit,
  scrollToElement,
} from './helpers';
import type { DropdownMenuEntryProps, DropdownMenuProps } from './types';

export function DropdownMenu(props: DropdownMenuProps) {
  const { ref, color, options, maxItems, selected, onSelected } = props;

  const selectedIndex = getOptionIndex(options, selected);
  const [entryHeight, setEntryHeight] = useState<number>(20); // 20 is fallback
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex);
  const { query, setQuery, results } = useFuzzySearch({
    searchArray: options,
    getSearchString: (option) => getOptionDisplayText(option),
  });

  const isEmpty = options.length === 0;
  const displayOptions = query ? results : options;

  function handleKeyDown(event) {
    if (isEmpty) {
      return;
    }

    if (event.key === KEY.Up) {
      event.preventDefault();
      setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
    }

    if (event.key === KEY.Down) {
      event.preventDefault();
      setHighlightedIndex(Math.min(highlightedIndex + 1, displayOptions.length - 1));
    }

    if (isEnter(event.key)) {
      const option = displayOptions[highlightedIndex];
      if (option) {
        onSelected?.(getOptionValue(option));
      }
    }
  }

  // OverlayScrollbars ref, which contains 2 functions. See OS docs
  const osRef = useRef<OverlayScrollbarsComponentRef>(null);
  function getViewport(): HTMLElement | null {
    return osRef.current?.osInstance()?.elements().viewport || null;
  }

  // Replace default ref, which contains element link
  // With scrollToElement functions, allow buttons to call it
  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex(index: number) {
        const scrollable = getViewport();
        if (scrollable) {
          scrollToElement(scrollable, index);
        }
      },
    }),
    [],
  );

  // Calculate entry height, to use it for maxHeight
  useLayoutEffect(() => {
    const hostElement = osRef.current?.getElement();
    if (!hostElement) {
      return;
    }

    const entryElement = hostElement.querySelector(`.${entryClassName}`);
    const entrySize = entryElement?.getBoundingClientRect().height;
    if (entrySize) {
      setEntryHeight(entrySize);
    }
  }, []);

  // Reset highlightedIndex on search
  // and sync with selected if no query
  useEffect(() => {
    if (query) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(selectedIndex);
    }
  }, [query]);

  // Scroll to selected element, if we have one
  useEffect(() => {
    const viewport = getViewport();
    if (viewport) {
      scrollToElement(viewport, highlightedIndex);
    }
  }, [highlightedIndex]);

  return (
    <div className={classes('dropdown-menu', colorClassName(color))}>
      {options.length > (maxItems || maxItemsDefault) && (
        <div className="dropdown-menu-input">
          <Input
            autoFocus
            fluid
            placeholder="Search..."
            value={query}
            onChange={setQuery}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
      <div className="dropdown-menu-entries">
        <OverlayScrollbarsComponent
          ref={osRef}
          style={{
            maxHeight: unit(`${getMaxHeight(maxItems, entryHeight)}px`),
          }}
          {...osOptions}
        >
          {isEmpty || (query && results.length === 0) ? (
            <div className={entryClassName}>No options</div>
          ) : (
            displayOptions.map((option, index) => {
              const value = getOptionValue(option);
              const relativeIndex = Math.min(Math.abs(index - selectedIndex), maxItemsLimit);

              return (
                <DropdownMenuEntry
                  key={value}
                  index={relativeIndex}
                  option={option}
                  selected={selected}
                  highlighted={index === highlightedIndex}
                  onSelected={onSelected}
                />
              );
            })
          )}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}

function DropdownMenuEntry(props: DropdownMenuEntryProps & { highlighted?: boolean }) {
  const { index, option, selected, highlighted, onSelected } = props;
  const value = getOptionValue(option);
  const interactions = useButton({
    captureKeys: true,
    onClick: () => onSelected?.(value),
  });

  return (
    <div
      className={classes(
        'dropdown-menu-entry',
        selected === value && 'selected',
        highlighted && 'highlighted',
      )}
      style={{ '--index': index }}
      {...interactions}
    >
      {getOptionDisplayText(option)}
    </div>
  );
}
