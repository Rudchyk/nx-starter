import { useAuth } from '@gui/hooks';
import { Default, Simple } from '@gui/layouts';
import { PageTmpl } from '@gui/templates';
import { UIButton } from '@ui';
import { GuiRoutesEnum } from '@constants';

export const Home = () => {
  const { isAuthorized } = useAuth();
  return (
    <Simple>
      <PageTmpl title="Home">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas perspiciatis tenetur beatae rem mollitia dolorum doloremque itaque! Amet, minus
        aspernatur consequuntur laborum nihil natus quasi commodi alias architecto excepturi hic.
      </PageTmpl>
    </Simple>
  );
};

export default Home;
