import { Toast } from '@douyinfe/semi-ui';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  console.log('NotFound render...');
  Toast.warning('页面未找到，为您跳转首页');
  const nav = useNavigate();
  useEffect(() => {
    nav('/');
  }, []);
  return <div className="font-bold flex justify-center h-40 text-center">Not Found</div>;
};

export default NotFound;
