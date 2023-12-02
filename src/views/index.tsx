import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import authBg from '../assets/auth.svg';

const StyledContainer = styled.div`
  background-image: url(${authBg});
`;
const AuthWrapper = () => {
  return (
    <>
      <div className="w-full flex flex-wrap">
        <StyledContainer className="text-white w-full md:w-1/2 hidden md:block">
          <main className="flex flex-col justify-between min-h-screen max-w-lg mx-auto py-20">
            <p></p>
            <main className=" text-left text-[48px] leading-[48px] lg:leading-[84px] lg:text-[72px] ">
              <main className="px-4">
                <p className="ml-5">Build Wealth.</p>
                <p className="ml-3">
                  <span className="text-primary">Anywhere</span> in the World.
                </p>
              </main>
              <section className="flex w-full justify-end"></section>
            </main>
            <section className="container mx-auto self-start flex flex-wrap items-center gap-x-2">
              <p className="font-bold text-[16px] md:text-[21px]">In Partnership with</p>
            </section>
          </main>
        </StyledContainer>
        <main className="w-full md:w-1/2">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthWrapper;
