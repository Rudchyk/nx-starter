import { Story, Meta } from '@storybook/react';
import UILinkComponent, { UILinkProps } from './UILink';

export default {
  component: UILinkComponent,
  title: 'Components/UI Link',
} as Meta;

const Template: Story<UILinkProps> = (args) => <UILinkComponent {...args} />;

export const UILink = Template.bind({});
UILink.args = {
  children: 'link',
};
