import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: {
              xs: '100%',
              sm: `calc(100% - ${collapsed ? 64 : 220}px)`
            },
            transition: 'width 0.2s',
            p: 3
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
