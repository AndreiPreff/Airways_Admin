import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography, TextField, Button } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectOrderError, selectOrderPending, selectUserOrders } from './store/manager.selectors';
import { fetchUserOrders } from './store/manager.actions';
import UserOrders from './components/UserOrders';
import { SearchFormValues } from './types/SearcFormValues.type';
import { userSchema } from './validators/userSchema';




const ManagerPage: React.FC = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(selectUserOrders);
    const pending = useSelector(selectOrderPending);
    const error = useSelector(selectOrderError);
    const [showOrders, setShowOrders] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchFormValues>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit: SubmitHandler<SearchFormValues> = ({ userEmail }) => {
        dispatch<any>(fetchUserOrders(userEmail));
        setShowOrders(true);
        setUserEmail(userEmail);
    };

    if (pending) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            {!showOrders ? (
                <>
                    <Typography variant="h4">Enter User Email</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{ padding: '10px' }}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="userEmail"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Enter User Email"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.userEmail}
                                            helperText={errors.userEmail?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Search Orders
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            ) : (
                <UserOrders orders={userOrders} userEmail={userEmail} />
            )}
        </div>
    );
};

export default ManagerPage;
