/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, ListItemButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import { GiftOutlined } from '@ant-design/icons';
import { getTimeAgo } from 'utils/getTimeAgo';
import moment from 'moment';

const NotificationItem = ({ history }) => {
  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar
          sx={{
            color: 'success.main',
            bgcolor: 'success.lighter'
          }}
        >
          <GiftOutlined />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6">
            It&apos;s{' '}
            <Typography component="span" variant="subtitle1">
              Cristina danny&apos;s
            </Typography>{' '}
            birthday today.
          </Typography>
        }
        secondary={getTimeAgo(history?.updatedTime)}
      />
      <ListItemSecondaryAction>
        <Typography variant="caption" noWrap>
          {moment(history?.updatedTime).format('LT')}
        </Typography>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

export default NotificationItem;
