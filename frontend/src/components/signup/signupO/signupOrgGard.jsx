import SignupOrgGardLeft from './signupOrgGardLeft';
import SignupOrgGardRight from './signupOrgGardRight';

const SignupOrgGard = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8F8F6] p-6 pt-24'>
      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[600px]'>
        <SignupOrgGardLeft />
        <SignupOrgGardRight />
      </div>
    </div>
  );
};

export default SignupOrgGard;
