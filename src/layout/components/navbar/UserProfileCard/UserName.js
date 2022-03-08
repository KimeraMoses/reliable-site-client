import { useSelector } from 'react-redux';

const UserName = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  let userName = '';
  if (isLoggedIn) {
    userName = user.fullName.charAt(0);
    // userName = user.firstName.charAt(0) + user.lastName.charAt(0);
  }
  return userName.toUpperCase();
};
export default UserName;
