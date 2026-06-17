import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';

export default function NotificationList({ notifications, viewedIds, markAsRead }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {notifications.map((item) => {
        const isRead = viewedIds.has(item.ID);
        return (
          <Card 
            key={item.ID} 
            variant="outlined"
            sx={{ 
              borderLeft: isRead ? '4px solid #b0bec5' : '4px solid #1976d2',
              backgroundColor: isRead ? '#fafafa' : '#fff',
              transition: '0.2s',
              '&:hover': { boxShadow: 2 }
            }}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Chip 
                    label={item.Type} 
                    size="small" 
                    color={item.Type === 'Placement' ? 'primary' : item.Type === 'Result' ? 'success' : 'warning'} 
                  />
                  {!isRead && <Chip label="New" size="small" color="secondary" variant="outlined" />}
                </Box>
                <Typography variant="body1" fontWeight={isRead ? 'normal' : 'bold'}>
                  {item.Message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(item.Timestamp).toLocaleString()}
                </Typography>
              </Box>
              {!isRead && (
                <Button size="small" variant="contained" onClick={() => markAsRead(item.ID)}>
                  Mark Read
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}