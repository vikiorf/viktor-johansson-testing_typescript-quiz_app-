import { FC } from 'react';

type IModalComponent = {};

const ModalComponent: FC<IModalComponent> = props => {
  return (
    <>
      <div
        data-testid="modal-backdrop-element"
        className="absolute inset-0 z-10 bg-primary-bg/75"
      ></div>
      <div
        data-testid="modal-content-container-element"
        className="body fixed inset-10 z-10 flex flex-col justify-center"
      >
        <div
          data-testid="modal-content-element"
          className="w-4/5 col-start-2 rounded text-primary-color bg-secondary-bg border-blue-700 grid gap-2 self-center p-4"
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
