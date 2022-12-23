import { ErrorTmpl } from '@gui/templates';
import { Default } from '@gui/layouts';

export const NoMatch = () => {
  return (
    <Default>
      <ErrorTmpl title="Nothing to see here!" text={404} />
    </Default>
  );
};

export default NoMatch;
