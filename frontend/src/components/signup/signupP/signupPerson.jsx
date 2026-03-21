import SignupPersonLeft from './signupPersonLeft';
import SignupPersonRight from './signupPersonRight';

const SignupPerson = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8F8F6] p-6'>
      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[600px]'>
        <SignupPersonLeft />
        <SignupPersonRight />
      </div>
    </div>
  );
};

export default SignupPerson;
