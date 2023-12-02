import { useForm } from 'react-hook-form';
import { useState } from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

import { loginUser } from '../types';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: loginUser) => {
    mutate(payload);
  };

  const { mutate } = useMutation((payload: loginUser) => loginUser(payload), {
    onError: error => {
      toast.error(error.response.data.message);
      setLoading(false);
    },
    onSuccess: res => {
      toast.success('Login Successful');
      localStorage.setItem('try-me-token', res.data.data.token);
      navigate('/list');
      setLoading(false);
    }
  });

  const loginUser = async data => {
    try {
      setLoading(true);
      return api.post('/user/login', data);
    } catch (e) {
      return e;
    }
  };

  const [payload, setPayload] = useState<loginUser>({
    email: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload((prev: loginUser) => ({
      ...prev,
      [name]: value
    }));
    setValue(name, value);
  };

  return (
    <div className="flex items-center min-h-screen text-center bg-primary">
      <main className="w-full md:w-1/3 shadow-lg rounded bg-white mx-6 md:mx-auto p-4">
        <p className="text-2xl">Login</p>
        <p>Login to track you tasks</p>

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
            Don't have an account?{' '}
            <NavLink className="text-blue-400 text-underline" to="/register">
              Create one
            </NavLink>
          </p>

          <main className="w-full py-4">
            <ButtonComponent isDisabled={loading} isLoading={loading} text="Proceed" />
          </main>
        </form>
      </main>
    </div>
  );
};

export default Login;
