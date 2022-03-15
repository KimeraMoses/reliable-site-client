import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { messageNotifications } from 'store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signup } from 'store/Actions/AuthActions';
import Data from '../../db.json';
// import {Link} from 'react-router-dom'

const initialValues = {
  companyName: '',
  fullName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
  address1: '',
  address2: '',
  city: '',
  stateProv: '',
  zipCode: '',
  ipAddress: '',
};

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required!'),
  fullName: Yup.string().required('Full Name is required!'),
  emailAddress: Yup.string()
    .required('Email is required!')
    .email('Please enter a valid Email!'),
  password: Yup.string()
    .required('password is required.')
    .min(6, 'Password must be atleast 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .min(6, 'Password must be atleast 6 characters')
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm Password must matches with Password'
    ),
  address1: Yup.string().required('Address is required!'),
  city: Yup.string().required('City is required!'),
  stateProv: Yup.string().required('State is required!'),
  country: Yup.string().required('Country is required!'),
  zipCode: Yup.number().required('Zip code is required!'),
  ipAddress: Yup.number().required('IP Address is required!'),
});

const fields = [
  { name: 'fullName', label: 'Full Name', placeholder: 'Paul' },
  {
    name: 'emailAddress',
    label: 'Email Address',
    placeholder: 'paul@fakemail.com',
  },
  { name: 'password', label: 'Password', placeholder: '******' },
  { name: 'confirmPassword', label: 'Confirm Password', placeholder: '******' },
  { name: 'companyName', label: 'Company Name', placeholder: 'PE Inc.' },
  {
    name: 'address1',
    label: 'Address 1',
    placeholder: '6546 West Philmont Rd',
  },
  {
    name: 'address2',
    label: 'Address 2',
    placeholder: 'Brooklyn',
  },
  {
    twoFields: [
      { name: 'city', label: 'City', placeholder: 'New York' },
      { name: 'stateProv', label: 'State', placeholder: 'NY' },
    ],
  },
  {
    twoFields: [
      { name: 'country', label: 'Country', placeholder: 'USA' },
      { name: 'zipCode', label: 'ZIP Code', placeholder: '11216' },
    ],
  }
];

function SignUp() {
  const isLoading = useSelector((state) => state.reg.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState("")
  //creating function to load ip address from the API
  const getData = async () => {
    try {
      const res = await fetch(`https://api.ipify.org?format=json`, {
        method: "GET",
      });
      const data = await res.json();
      setIpAddress(data.ip);
      console.log("ip", data);
    } catch (error) {
      console.log("Recap Error", error);
    }
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const brandId = query.get('brandId');

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: '536px' }}>
      <div className="col mx-4 md:mx-auto mb-5">
        <img src="/icon/logo.svg" className="h-20 w-20 mx-auto" alt="" />
      </div>
      <div className=" bg-custom-secondary rounded-lg p-4 md:p-5 ">
        <div className="text-center">
          <h2 className="text-md text-2xl text-white font-normal">
            Create An Account
          </h2>
          <p className="custom-text-light mb-4">
            Fill The Form Below In Order To Create Your Account
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await dispatch(
                signup(
                  values.fullName,
                  values.emailAddress,
                  values.emailAddress,
                  values.password,
                  values.confirmPassword,
                  values.companyName,
                  values.address1,
                  values.address2,
                  values.city,
                  values.stateProv,
                  values.zipCode,
                  values.country,
                  brandId,
                  ipAddress,
                  '0'
                )
              );
              navigate('/client/sign-in');
              toast.success(
                'Account Created Successfully, Check your email to verify account',
                {
                  ...messageNotifications,
                }
              );
            } catch (error) {
              toast.error('Failed to create account', {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                {fields.map((field) => {
                  return (
                    <div>
                      {field?.twoFields ? (
                        <div className="flex justify-between mb-8">
                          {field?.twoFields?.map((halfField, idx) => {
                            return (
                              <div className={idx === 0 ? 'mr-2' : 'ml-2'}>
                                <label
                                  htmlFor={halfField?.name}
                                  className="form-label text-white font-light text-sm"
                                >
                                  {halfField?.label}
                                </label>
                                <Field
                                  type={
                                    halfField?.name === 'password' ||
                                    halfField?.name === 'confirmPassword'
                                      ? 'password'
                                      : 'text'
                                  }
                                  className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
                                  id={halfField?.name}
                                  placeholder={halfField?.placeholder}
                                  name={halfField?.name}
                                />
                                {errors[halfField?.name] &&
                                  touched[halfField?.name] && (
                                    <span className="text-red-600 text-sm">
                                      {errors[halfField?.name]}
                                    </span>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-4 mb-3">
                          <label
                            htmlFor={field?.name}
                            className="form-label text-white font-light text-sm"
                          >
                            {field?.label}
                          </label>
                          <Field
                            type={
                              field?.name === 'password' ||
                              field?.name === 'confirmPassword'
                                ? 'password'
                                : 'text'
                            }
                            className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
                            id={field?.name}
                            placeholder={field?.placeholder}
                            name={field?.name}
                          />
                          {errors[field?.name] && touched[field?.name] && (
                            <span className="text-red-600 text-sm">
                              {errors[field?.name]}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <button
                  type="submit"
                  className="mt-3 bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                >
                  {isLoading
                    ? 'Creating account...'
                    : Data.pages.register.createAccountBtn}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
