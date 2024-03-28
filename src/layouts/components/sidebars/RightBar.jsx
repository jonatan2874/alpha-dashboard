import React, { useContext } from 'react';
import { AppContext } from '../../../context/app/AppContext';
import { MdClose } from 'react-icons/md';

const RightBar = () => {
  const { right_bar, right_bar_methods } = useContext(AppContext);

  const show = () => {
    right_bar_methods.show();
  };

  return (
    <>
      <div 
        className={`xl:h-[100uv] fixed top-0 right-0 h-full w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto xl:min-w-[20%] bg-secondary-100 p-4 ${right_bar.show ? "right-0" : "translate-x-full"} transition-all`}
      >
        <MdClose className='cursor-pointer text-secondary-50' onClick={show} />
        <>
          {right_bar.content}
        </>
      </div>
    </>
  );
};

export default RightBar;
