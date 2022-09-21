/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-console */
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { dataByPage } from './api/constants/const';
import { BASE_URL, client } from './api/fetch';
import './App.scss';
import { InputArea } from './components/InputArea';
import { TableData } from './components/table';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const addUser = useCallback((user: User) => {
    setUsers(prevUsers => [...prevUsers, user]);
  }, []);

  const loadMoreUsers = () => {
    client.get<User[]>(`?_page=${page + 1}&_limit=${dataByPage}`)
      .then(res => {
        setUsers(prevList => [...prevList, ...res]);
      })
      .catch(e => setError(e))
      .finally(() => setPage(prev => prev + 1));
  };

  useEffect(() => {
    fetch(`${BASE_URL}?_page=${1}&_limit=${dataByPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`error with db ${response.statusText}`);
        }

        const total = Number(response.headers.get('X-Total-Count'));

        setHasMore(total > page * dataByPage);
      })
      .catch(e => setError(e));
  }, [page]);

  return (
    <main className="section">
      <InputArea addUser={addUser} />
      {error === ''
        ? (
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMoreUsers}
            hasMore={hasMore}
            loader={(
              <Box
                sx={{
                  display: 'flex',
                  margin: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={`${page * dataByPage}`}
              >
                <CircularProgress />
              </Box>
            )}
          >
            <Typography variant="h6" gutterBottom>
              All our fake users:
            </Typography>
            <TableData users={users} />
          </InfiniteScroll>
        )
        : (
          <Typography variant="h5" gutterBottom>
            Error:
            { error}
          </Typography>
        )}
    </main>
  );
};
