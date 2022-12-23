import { Story, Meta } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter } from 'react-router-dom';
import UIButton, { UIButtonProps } from './UIButton';

export default {
  title: 'Components/UI Button',
  argTypes: {
    to: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<UIButtonProps> = (args) => <UIButton {...args} />;

const RouteButtonTemplate: Story<UIButtonProps> = (args) => (
  <BrowserRouter>
    <UIButton {...args} />
  </BrowserRouter>
);

export const IconButton = Template.bind({});
IconButton.args = {
  icon: true,
  children: <DeleteIcon fontSize="inherit" />,
  onClick: () => alert('IconButton Click'),
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  loading: true,
  variant: 'outlined',
  children: 'Submit',
};

export const SimpleButton = Template.bind({});
SimpleButton.args = {
  children: 'Click me!',
  variant: 'outlined',
  onClick: () => alert('Button Click'),
};

export const RouteButton = RouteButtonTemplate.bind({});
RouteButton.args = {
  children: 'Go!',
  variant: 'outlined',
  to: '/',
};
