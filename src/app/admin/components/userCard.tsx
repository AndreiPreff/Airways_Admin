import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Adminschema } from '../validators/adminSchemas';

interface UserCardProps {
  user: any;
  onUpdateUser: (userId: string, formData: FieldValues) => void;
  onDeleteUser: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUpdateUser, onDeleteUser }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      email: user.email,
      last_name: user.last_name,
      role: user.role,
    },
    resolver: yupResolver(Adminschema),
  });

  const handleUpdateUser: SubmitHandler<FieldValues> = async (data) => {
    onUpdateUser(user.id, data);
  };

  const handleDeleteUser = () => {
    onDeleteUser(user.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">User ID: {user.id}</Typography>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.first_name && (
                  <Typography color="error.main" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                      {errors.first_name.message as React.ReactNode}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.last_name && (
                  <Typography color="error.main" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                    {errors.last_name.message as React.ReactNode}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.email && (
                  <Typography color="error.main" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                    {errors.email.message as React.ReactNode}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
      
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.role && (
                  <Typography color="error.main" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                    {errors.role.message as React.ReactNode}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Update
          </Button>
        </form>
        <Button onClick={handleDeleteUser} variant="contained" color="secondary" sx={{ marginTop: 2 }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
