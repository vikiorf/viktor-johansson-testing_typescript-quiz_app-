import { Button, Input } from '@douyinfe/semi-ui';
import React, { FC } from 'react';
import { AiFillAliwangwang, AiFillAmazonSquare } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { increment } from '@/store/modules/couter.slice';
import { setToken } from '@/store/modules/user.slice';

type IFront = {};
const Front: FC<IFront> = () => {
  console.log('admin rendered...');
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  return (
    <div className="wrapper h-screen w-screen text-center p-10">
      <div className="front w-96 mx-auto p-5 rounded border border-gray-300">
        <div className="font-bold text-lg text-gray-700">Front Page</div>
      </div>

      <div className="box mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
        <div className="title font-bold text-left mb-3">Redux/toolkit:</div>
        <p className={`space-x-3`}>
          <Button theme={`solid`} onClick={() => dispatch(increment(1))}>
            +1
          </Button>
          <Button theme={`solid`} onClick={() => dispatch(increment(10))}>
            +10
          </Button>
        </p>
        <p className="mt-5">{counter.count}</p>
        <Input
          className={`mt-3`}
          placeholder={`Change Token`}
          value={user.token}
          onChange={(val) => dispatch(setToken(val))}
        />
        <p>Token: {user.token}</p>
      </div>

      <div className="icons mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
        <div className="title font-bold text-left mb-3">React Icons:</div>
        <p className="text-center flex space-x-1">
          <AiFillAliwangwang />
          <AiFillAmazonSquare />
        </p>
      </div>

      <div className="flex flex-col router mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
        <Button theme={`solid`} onClick={() => nav('/admin')}>
          To Admin Page
        </Button>
      </div>
    </div>
  );
};

export default Front;
