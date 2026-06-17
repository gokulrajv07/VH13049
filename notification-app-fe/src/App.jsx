import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationFilter from './components/NotificationFilter';
import NotificationList from './components/NotificationList';

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState('All');
  const [viewedIds, setViewedIds] = useState(new Set());

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Calling your own local proxy microservice endpoint instead of direct IP
        let url = `http://localhost:3000/api/priority-notifications?limit=${limit}`;
        if (filterType !== 'All') {
          url += `&notification_type=${filterType}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        // Since your index.js returns { success: true, data: [...] }
        setNotifications(data.data || []);
      } catch (err) {
        console.error("API Error Matrix:", err);
      }
    };
    fetchNotifications();
  }, [limit, filterType]);
  const markAsRead = (id) => {
    setViewedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Campus Notifications
        </Typography>
        <Badge badgeContent={notifications.length - viewedIds.size} color="error">
          <NotificationsIcon color="action" fontSize="large" />
        </Badge>
      </Box>

      {/* Reusable Filters */}
      <NotificationFilter 
        limit={limit} 
        setLimit={setLimit} 
        filterType={filterType} 
        setFilterType={setFilterType} 
      />

      {/* Dynamic List Execution */}
      <NotificationList 
        notifications={notifications} 
        viewedIds={viewedIds} 
        markAsRead={markAsRead} 
      />
    </Container>
  );
}