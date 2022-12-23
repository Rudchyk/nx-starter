import { Story, Meta } from '@storybook/react';
import UITabsComponent, { UITabsProps } from './UITabs';

const tabs = [
  {
    key: 'first',
    label: 'First title',
    Component: () => <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, corrupti.</div>,
  },
  {
    key: 'second',
    label: 'Second title',
    Component: () => <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus molestias ipsam saepe, excepturi deserunt neque!</div>,
  },
];
const tabsKeys = tabs.map(({ key }) => key);

tabsKeys.push('NotExistedOne');

export default {
  title: 'Components/UI Tabs',
  argTypes: {
    className: {
      type: {
        name: 'string',
      },
      description: `Css class`,
    },
    ariaLabel: {
      type: {
        name: 'string',
      },
      description: `Tabs aria label`,
    },
    activeTab: {
      type: {
        name: 'enum',
        value: tabsKeys,
      },
      defaultValue: tabsKeys[0],
      table: {
        defaultValue: { summary: tabsKeys[0] },
      },
      control: 'radio',
      options: tabsKeys,
      description: `Active Tab`,
    },
    onTabsChange: {
      control: {
        type: null,
      },
      description: `On Tabs Change callback`,
    },
    stretchTab: {
      type: {
        name: 'boolean',
      },
      defaultValue: false,
      description: 'If `true`, tabs will be stretched',
    },
  },
} as Meta;

const Template: Story<UITabsProps> = (args) => <UITabsComponent {...args} />;

export const UITabs = Template.bind({});
UITabs.args = {
  tabs,
};
