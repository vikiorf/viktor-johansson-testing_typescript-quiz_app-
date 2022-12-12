import { IconLoading } from '@douyinfe/semi-icons';
import { Spin } from '@douyinfe/semi-ui';
import React from 'react';

const PageLoading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <Spin indicator={<IconLoading />} size={`large`} wrapperClassName={`text-center`} />
    </div>
  );
};

export default PageLoading;
