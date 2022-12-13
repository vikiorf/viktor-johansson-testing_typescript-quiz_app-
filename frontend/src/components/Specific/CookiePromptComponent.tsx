import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getStoredCookieConsent, setCookieConsent } from '@/store/modules/user.slice';

import ButtonComponent from '../common/ButtonComponent';
import ModalComponent from '../common/ModalComponent';

type ICookiePromptComponent = {};

const CookiePromptComponent: FC<ICookiePromptComponent> = props => {
  const isCookiesConsentApproved = useAppSelector(getStoredCookieConsent);

  const dispatch = useAppDispatch();
  const acceptCookieClickHandler = () => {
    dispatch(setCookieConsent(true));
  };

  return (
    <>
      <div data-testid="hidden-element" className="opacity-0">
        {isCookiesConsentApproved ? 'Hidden' : 'Showing'}
      </div>
      <ModalComponent>
        <p>We respect your privacy. To use this application cookies are required.</p>
        <ButtonComponent label="Accept" onClick={acceptCookieClickHandler} />
      </ModalComponent>
    </>
  );
};

export default CookiePromptComponent;
