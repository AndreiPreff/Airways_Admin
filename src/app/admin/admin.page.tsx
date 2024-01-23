import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { selectAdminUsers, selectAdminError, selectAdminPending } from './store/admin.selectors';
import { fetchAllUsers, updateUserInfo, deleteUser } from './store/admin.actions';
import UserCard from './components/userCard';


const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAdminUsers);
  const pending = useSelector(selectAdminPending);
  const error = useSelector(selectAdminError);

  useEffect(() => {
    dispatch<any>(fetchAllUsers());
  }, [dispatch]);

  const handleUpdateUser = (userId: string, formData: any) => {
    dispatch<any>(updateUserInfo({ userId, formData }));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch<any>(deleteUser(userId));
  };

  if (pending) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Admin Panel</Typography>
      <Grid container spacing={2} sx={{ padding: '10px' }}>
        {users && users.length > 0 ? (
          users.map((user: any, userIndex: number) => (
            <Grid key={userIndex} item xs={12}>
              <UserCard user={user} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
            </Grid>
          ))
        ) : (
          <Typography>No users found</Typography>
        )}
      </Grid>
    </div>
  );
};

export default AdminPage;
