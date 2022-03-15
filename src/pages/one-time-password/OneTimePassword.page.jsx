import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { messageNotifications } from 'store';
import { confirmOtp, loginbyOtp } from 'store/Actions/AuthActions';
import Data from '../../db.json';

const initialValues = {
  otp: '',
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required('Pleasee enter OTP recieved on your email.'),
});

function OneTimePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <Link to="/">
            <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
          </Link>
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.otp.header}
            </h2>
            <p className="custom-text-light">{Data.pages.otp.subTitle}</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const userId = localStorage.getItem('userId__client');
              const userEmail = localStorage.getItem('userEmail_client');
              setIsLoading(true);
              try {
                await dispatch(confirmOtp(userId, values?.otp));
                toast.success('Otp verified Successfully', {
                  ...messageNotifications,
                });
                setIsLoading(false);
                dispatch(loginbyOtp(userEmail, userEmail, values?.otp));
              } catch (err) {
                toast.error('Failed to Verify OTP', {
                  ...messageNotifications,
                });
                setIsLoading(false);
              }
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className="mt-4 md:mb-8">
                    <label
                      htmlFor="otp"
                      className="form-label text-white font-light text-sm"
                    >
                      {Data.pages.otp.header}
                    </label>
                    <Field
                      type="text"
                      name="otp"
                      id="otp"
                      className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3  placeholder:font-light focus:outline-none "
                      placeholder={Data.pages.otp.placeholder}
                    />
                    {errors.otp && touched.otp ? (
                      <div className="text-red-600 text-sm">{errors.otp}</div>
                    ) : null}
                  </div>
                  <div className="flex mt-4 md:mt-5">
                    <button
                      type="button"
                      onClick={() => navigate('/client/sign-in')}
                      className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                    >
                      {Data.pages.otp.cancelButton}
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
                    >
                      {isLoading ? 'Verifying...' : Data.pages.otp.submitButton}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default OneTimePassword;
