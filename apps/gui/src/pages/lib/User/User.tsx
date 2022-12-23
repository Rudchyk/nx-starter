import { Alert, Avatar, Box, Grid } from '@mui/material';
import { getFirstLetter } from '@utils';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import moment from 'moment';
import EventIcon from '@mui/icons-material/Event';
import { InfoGridCopiedElement, InfoGridElement } from '@gui/components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_USER } from '@gui/queries';
import { GlobalLoading } from '@gui/layouts';
import { UserItem } from '@interfaces';
import { getGraphQLErrorData } from '@gui/utils';
import { ErrorTmpl, PageTmpl } from '@gui/templates';

interface FetchUserAPIResponse {
  user: UserItem;
}

const User = () => {
  const params = useParams();
  const { loading, error, data } = useQuery<FetchUserAPIResponse>(FETCH_USER, { variables: { id: params.userId } });

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    const { message, status } = getGraphQLErrorData(error);

    return <ErrorTmpl sx={{ px: 3 }} title={`Submission error! ${message}`} text={status} />;
  }

  if (!data) {
    return null;
  }

  const { id, email, role, createdAt, emailConfirmedAt } = data.user;

  return (
    <PageTmpl title="User" backButton>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ height: 200, dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{ width: 160, height: 160, fontSize: 90 }}>{getFirstLetter(email)}</Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <InfoGridElement xs={12} sm={6} icon={<SupervisorAccountIcon />} title="Role" value={role} />
            <InfoGridElement xs={12} sm={6} icon={<EventIcon />} title="Registration date" value={moment(createdAt).format('DD/MM/yyyy HH:mm:ss')} />
            <InfoGridCopiedElement xs={12} sm={6} fieldKey="ID" label="ID" value={id} />
            <Grid item xs={12} sm={6}></Grid>
            <InfoGridCopiedElement xs={12} sm={6} fieldKey="email" label="Email Address" value={email} />
            <Grid item xs={12} sm={6}>
              <Alert sx={{ width: '100%', height: '100%', alignItems: 'center' }} severity={emailConfirmedAt ? 'success' : 'error'}>
                {emailConfirmedAt ? 'The email is verified' : 'The email is not verified'}
              </Alert>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageTmpl>
  );
};

export default User;
