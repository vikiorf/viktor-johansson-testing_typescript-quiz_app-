import { Button } from '@douyinfe/semi-ui';
import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type IAdmin = {};
const Admin: FC<IAdmin> = () => {
  const nav = useNavigate();
  console.log('admin rendered...');
  return (
    <div className="wrapper h-screen w-screen text-center p-10">
      <div className="front w-96 mx-auto p-5 rounded border border-gray-300">
        <div className="font-bold text-lg text-gray-700">Admin Page</div>
      </div>

      <div className="router mt-4 flex flex-col space-y-4 w-96 mx-auto p-5 rounded border border-gray-300">
        <Button theme={`solid`} onClick={() => nav('/')}>
          To Front Page
        </Button>
        <Button theme={`solid`} onClick={() => nav('/admin/sub')}>
          To Sub Page
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
