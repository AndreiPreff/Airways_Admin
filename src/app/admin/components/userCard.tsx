import React from 'react';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';
import { useForm, SubmitHandler, FieldValues, UseFormHandleSubmit, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface UserCardProps {
    user: any;
    onUpdateUser: (userId: string, formData: FieldValues) => void;
    onDeleteUser: (userId: string) => void;
}

const schema = yup.object().shape({
    first_name: yup.string().required('First Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    last_name: yup.string().required('Last Name is required'),
    role: yup.string().required('Role is required'),
});

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
        resolver: yupResolver(schema),
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
                    {errors.first_name && typeof errors.first_name.message === 'string' && (
                        <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                            {errors.first_name.message}
                        </Typography>
                    )}
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="first_name">First Name</label>
                                <TextField {...field} />


                            </div>
                        )}
                    />
                    {errors.email && typeof errors.email.message === 'string' && (
                        <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                            {errors.email.message}
                        </Typography>
                    )}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="email">Email</label>
                                <TextField {...field} />

                            </div>
                        )}
                    />
                    {errors.last_name && typeof errors.last_name.message === 'string' && (
                        <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                            {errors.last_name.message}
                        </Typography>
                    )}
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="last_name">Last Name</label>
                                <TextField {...field} />

                            </div>
                        )}
                    />
                    {errors.role && typeof errors.role.message === 'string' && (
                        <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                            {errors.role.message}
                        </Typography>
                    )}
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="role">Role</label>
                                <TextField {...field} />

                            </div>
                        )}
                    />

                    {/* Add other form fields and validation messages as needed */}
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </form>
                <Button onClick={handleDeleteUser} variant="contained" color="secondary">
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default UserCard;
