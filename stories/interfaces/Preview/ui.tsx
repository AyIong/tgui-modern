import { Window } from '@stories/window';
import { useState } from 'react';
import { Button } from 'tgui-modern/components/Button/index';
import { Chart } from 'tgui-modern/components/Chart/index';
import { Collapsible } from 'tgui-modern/components/Collapsible/index';
import { Dropdown } from 'tgui-modern/components/Dropdown/index';
import { FitText } from 'tgui-modern/components/FitText/index';
import { Icon } from 'tgui-modern/components/Icon/index';
import { Input } from 'tgui-modern/components/Input/index';
import { Modal } from 'tgui-modern/components/Modal/index';
import { NoticeBox } from 'tgui-modern/components/NoticeBox/index';
import { Section } from 'tgui-modern/components/Section/index';
import { Stack } from 'tgui-modern/components/Stack/index';
import { toast } from 'tgui-modern/components/Toast/index';

export function Preview() {
  return (
    <Window>
      <NoticeBox info>Some things can be done, if you do them</NoticeBox>
      <Window.Content>
        <Content />
      </Window.Content>
    </Window>
  );
}

const defaultItems: any[] = [];
for (let i = 0; i < 500; i++) {
  defaultItems.push({
    displayText: `Item ${i}`,
    value: `item-${i}`,
  });
}

function Content() {
  const [selected, setSelected] = useState(false);
  const [isScrollable, setScrollable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState<string>();
  const displayText = dropdownSelected
    ? defaultItems.find((item) => item.value === dropdownSelected)?.displayText
    : 'Dropdown';

  return (
    <Stack fill vertical>
      <Section
        fill
        scrollable
        title="Section title"
        buttons={
          <>
            <Modal title="Test Modal" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              Poor Content
            </Modal>
            <Button
              startIcon={{ animation: 'fade', name: 'gamepad' }}
              tooltip={{ content: 'This is a tooltip' }}
              onClick={() => setModalOpen(true)}
            >
              Button
            </Button>
            <Input placeholder="Search..." />
          </>
        }
      >
        <Stack fill vertical>
          <Stack.Item>
            <FitText>That text will be fitted. Used default values</FitText>
          </Stack.Item>
          <Stack.Item grow>
            {selected &&
              Array.from({ length: 10 }, (_, i) => <div key={i}>Section content 1234567890</div>)}
            <Icon.Stack>
              <Icon name="circle-o" size={2} />
              <Icon name="book" />
            </Icon.Stack>
          </Stack.Item>
          <Stack.Item>
            <Chart height="64px">
              <Chart.Line
                data={[
                  [0, 50],
                  [10, 55],
                  [20, 48],
                  [30, 60],
                  [40, 52],
                  [50, 65],
                  [60, 58],
                  [70, 70],
                  [80, 62],
                  [90, 75],
                  [100, 68],
                ]}
              />
              <Chart.Line
                color="red"
                data={[
                  [0, 68],
                  [10, 75],
                  [20, 62],
                  [30, 70],
                  [40, 58],
                  [50, 65],
                  [60, 52],
                  [70, 60],
                  [80, 48],
                  [90, 55],
                  [100, 50],
                ]}
              />
            </Chart>
          </Stack.Item>
        </Stack>
        <Section title="Second section">See? No additional padding</Section>
      </Section>
      <Section
        scrollable={isScrollable}
        title="Section title"
        buttons={
          <>
            <Button selected={selected} onClick={() => setSelected(!selected)}>
              Primary
            </Button>
            <Button color="secondary" onClick={() => setScrollable(!isScrollable)}>
              Secondary
            </Button>
          </>
        }
      >
        Section content
        <Collapsible
          title="Collapsible"
          buttons={
            <>
              <Button
                onClick={() =>
                  toast({
                    title: 'Unexpected',
                    content: 'Well, actually, this button creates a toast.',
                    icon: { name: 'question' },
                  })
                }
              >
                Do nothing
              </Button>
              <Button
                startIcon={{ name: 'times' }}
                tooltip={{ content: 'This button do nothing.' }}
              />
            </>
          }
        >
          <Dropdown
            buttons
            options={defaultItems}
            displayText={displayText}
            selected={dropdownSelected}
            onSelected={setDropdownSelected}
          />
          Interactive story playground Controls give you an easy to use interface to test your
          components. Set your story args and you'll see controls appearing here automatically.
        </Collapsible>
      </Section>
    </Stack>
  );
}
