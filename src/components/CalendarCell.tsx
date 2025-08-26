import { Notifications } from '@mui/icons-material';
import { Box, Stack, TableCell, Typography } from '@mui/material';

import type { Event } from '../types';
import { getEventsForDay } from '../utils/dateUtils';

interface Props {
  events: Event[];
  notifiedEvents: string[];
  day: number | null;
  holiday?: string;
}

export function CalendarCell({ events, notifiedEvents, day, holiday }: Props) {
  return (
    <TableCell
      key={day}
      sx={{
        height: '120px',
        verticalAlign: 'top',
        width: '14.28%',
        padding: 1,
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {day && (
        <>
          <Typography variant="body2" fontWeight="bold">
            {day}
          </Typography>
          {holiday && (
            <Typography variant="body2" color="error">
              {holiday}
            </Typography>
          )}
          {getEventsForDay(events, day).map((event) => {
            const isNotified = notifiedEvents.includes(event.id);
            return (
              <Box
                key={event.id}
                sx={{
                  p: 0.5,
                  my: 0.5,
                  backgroundColor: isNotified ? '#ffebee' : '#f5f5f5',
                  borderRadius: 1,
                  fontWeight: isNotified ? 'bold' : 'normal',
                  color: isNotified ? '#d32f2f' : 'inherit',
                  minHeight: '18px',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {isNotified && <Notifications fontSize="small" />}
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}
                  >
                    {event.title}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </>
      )}
    </TableCell>
  );
}
