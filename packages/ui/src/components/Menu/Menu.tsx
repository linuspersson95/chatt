import { useState } from 'react';
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui';
import {
  AnimatePresence,
  Button,
  H5,
  SizableText,
  Tabs,
  XStack,
  YStack,
  styled,
} from 'tamagui';
import { useAuthStore } from '@chatt/state';

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,

  animation: '100ms',
  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    direction: {
      ':number': (direction: number) => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

export default function Menu() {
  const logOut = useAuthStore((state) => state.logout);
  const [tabState, setTabState] = useState<{
    currentTab: string;
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null;
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null;
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: 'tab1',
    intentAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) =>
    setTabState({ ...tabState, currentTab });
  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  // 1 = right, 0 = nowhere, -1 = left
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type: string, layout: TabLayout | null) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      padding="$2"
      height={150}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$background"
      borderRadius="$4"
      position="relative"
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              width={intentAt.width}
              height={intentAt.height}
              x={intentAt.x}
              y={intentAt.y}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              theme="accent"
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
        </AnimatePresence>

        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          gap="$2"
          backgroundColor="transparent"
        >
          <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="tab1"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Profile</SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="tab2"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Connections</SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="tab3"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Notifications</SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>

      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content
            value={currentTab}
            forceMount
            flex={1}
            justifyContent="center"
          >
            <Button onPress={logOut}>Logga ut</Button>
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
}
