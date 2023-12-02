import { useForm } from 'react-hook-form';
import { useState } from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { newUser } from '../types';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

const Signup = props => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: newUser) => {
    mutate(payload);
  };

  const { mutate } = useMutation((payload: newUser) => loginUser(payload), {
    onError: error => {
      toast.error(error.response.data.message);
      setLoading(false);
    },
    onSuccess: () => {
      toast.success('Registration Successful');
      navigate('/list');
      setLoading(false);
    }
  });

  const loginUser = async data => {
    try {
      setLoading(true);
      return api.post('/user/register', data);
    } catch (e) {
      return e;
    }
  };

  const [payload, setPayload] = useState<newUser>({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload((prev: newUser) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center min-h-screen text-center bg-primary">
      <main className="w-full md:w-1/3 shadow-lg rounded bg-white mx-6 md:mx-auto p-4">
        <p className="text-2xl">Create Account</p>
        <p>Join the trend, track your tasks</p>

        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="my-4">
          <section className="my-4">
            <InputComponent
              id="email"
              value={payload.email}
              name="email"
              labelText="Email Address"
              register={register}
              placeholder="e.g benjamin@try.me"
              handleChange={handleChange}
              errorMessage="Email is compulsory and must be valid"
              error={!!errors.email}
              validation={{
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }
              }}
            />
          </section>

          <section className="my-4">
            <InputComponent
              id="name"
              value={payload.name}
              name="name"
              labelText="Full Name"
              register={register}
              placeholder="e.g Benjamin Alamu"
              handleChange={handleChange}
              errorMessage="Please enter your full name"
              error={!!errors.name}
              validation={{
                required: true
              }}
            />
          </section>

          <section className="my-4">
            <InputComponent
              id="password"
              value={payload.password}
              name="password"
              type="password"
              labelText="Password"
              register={register}
              placeholder="e.g *****"
              handleChange={handleChange}
              errorMessage="Please enter your password"
              error={!!errors.password}
              validation={{
                required: true
              }}
            />
          </section>

          <p className="text-right">
            Already have an account?{' '}
            <NavLink className="text-blue-400 text-underline" to="/">
              Login
            </NavLink>
          </p>

          <main className="w-full py-4">
            <ButtonComponent isDisabled={loading} isLoading={loading} text="Continue" />
          </main>
        </form>
      </main>
    </div>
  );
};

export default Signup;
