import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

function SideLinks({ name, path }) {
  return (
    <li>
      <Link
        to={path}
        className="py-3 flex text-gray-500 no-underline hover:text-white hover:bg-black/[.2] ease-in duration-100 px-4"
      >
        {name}
      </Link>
    </li>
  );
}

SideLinks.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
};

// SideLinks.defaultProps = {
//   name: 'Link',
//   path: '/',
// };

export default SideLinks;
