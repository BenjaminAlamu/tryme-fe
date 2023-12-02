import { useForm } from 'react-hook-form';
import { useState } from 'react';
import InputComponent from '../components/InputComponent';

import { loginUser } from '../types';

const Login = props => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: any) => {
    console.log({ data });
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

          <main className="w-full py-4">
            <ButtonComponent text="Proceed" />
          </main>
        </form>
      </main>
    </div>
  );
};

export default Login;
