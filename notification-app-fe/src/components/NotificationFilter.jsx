import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function NotificationFilter({ limit, setLimit, filterType, setFilterType }) {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {/* Limit Dropdown Selection */}
      <Grid item xs={6} sm={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Top "n" Count</InputLabel>
          <Select 
            value={limit} 
            label='Top "n" Count' 
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Category Type Dropdown Filter */}
      <Grid item xs={6} sm={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Filter Type</InputLabel>
          <Select 
            value={filterType} 
            label="Filter Type" 
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}