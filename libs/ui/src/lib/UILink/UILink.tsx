import { Link as RouteLink } from 'react-router-dom';
import { Link, LinkProps } from '@mui/material';

export interface UILinkProps extends LinkProps {
  to?: string;
}

export const UILink = ({ to, ...other }: UILinkProps) => {
  const props: any = { ...other };

  if (to) {
    props.component = RouteLink;
    props.to = to;
  }

  return <Link {...props} />;
};

export default UILink;
