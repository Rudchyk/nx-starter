import { Story, Meta } from '@storybook/react';
import { UIFormNumberField, UIFormTextField, UIFormDateTimePickerField, UIFormPasswordField } from '../../';
import UIInputCopyeditor, { UIInputCopyeditorProps } from './UIInputCopyeditor';

export default {
  component: UIInputCopyeditor,
  title: 'Components/UI Input Copyeditor',
} as Meta;

const Template: Story<UIInputCopyeditorProps> = (args) => <UIInputCopyeditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <UIFormTextField fieldKey="text" />,
};

export const Filled = Template.bind({});
Filled.args = {
  children: <UIFormNumberField fieldKey="number" defaultValue="3" />,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
  children: <UIFormDateTimePickerField fieldKey="date" />,
};

export const ButtonOutside = Template.bind({});
ButtonOutside.args = {
  children: <UIFormPasswordField fieldKey="pass" defaultValue="3333333" />,
  isCopyOutside: true,
};
