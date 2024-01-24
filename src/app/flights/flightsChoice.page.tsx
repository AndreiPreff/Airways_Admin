import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { selectAvailableTickets } from './store/flights.selectors';
import { fetchAvailableTicketsSortedByPrice, fetchAvailableTicketsSortedByTime, } from './store/flights.actions';
import { SetStateAction, useState } from 'react';
import TicketCard from 'Airways_Common/components/ticketCard';

const FlightChoicePage = () => {
    const dispatch = useDispatch();
    const availableTickets = useSelector(selectAvailableTickets);
    const [sortType, setSortType] = useState('price');
    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSortType(event.target.value);
    };
    const handleSortByPrice = () => {
        if (availableTickets) dispatch<any>(fetchAvailableTicketsSortedByPrice(availableTickets));
    };

    const handleSortByTime = () => {
        if (availableTickets) dispatch<any>(fetchAvailableTicketsSortedByTime(availableTickets));
    };

    return (
        <Grid container spacing={2} sx={{ padding: '10px' }}>
            {availableTickets ? (
                <> <Grid item xs={12}>
                    <InputLabel htmlFor="sort-select">Sort By:</InputLabel>
                    <Select
                        label="Sort By"
                        value={sortType}
                        onChange={handleSortChange}
                        inputProps={{
                            name: 'sort',
                            id: 'sort-select',
                        }}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="price" onClick={handleSortByPrice}>Price</MenuItem>
                        <MenuItem value="time" onClick={handleSortByTime}>Time</MenuItem>
                    </Select>
                </Grid>
                    {availableTickets.there.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                                Available Tickets for there
                            </Typography>
                        </Grid>
                    )}
                    {availableTickets.there.map((ticket, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <TicketCard
                                tickets={[ticket]}
                                ticketType="there"
                                admin={true}
                            />
                        </Grid>
                    ))}
                    {availableTickets.back.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                                Available Tickets for back
                            </Typography>
                        </Grid>
                    )}
                    {availableTickets.back.map((ticket, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <TicketCard
                                tickets={[ticket]}
                                ticketType="back"
                                admin={true}
                            />
                        </Grid>
                    ))}
                </>
            ) : (
                <Grid item xs={12}>
                    <Typography>No available tickets</Typography>
                </Grid>
            )}

        </Grid>
    );
};

export default FlightChoicePage;
