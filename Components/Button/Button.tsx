import React from 'react';
import { FiX, FiHome, FiSettings, FiUser } from 'react-icons/fi';
import IconButton from '../IconButton/IconButton';
import { WiDayHail } from "react-icons/wi";
import { FaRegNewspaper } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import Link from 'next/link';
//<WiDayHail />, <FaRegNewspaper />, <LuListTodo />

const icons = [
    {
        icon: <WiDayHail size={30} />,
        link:'weather',
        title: 'Weather'
    },
    {
        icon: <FaRegNewspaper size={30} />,
        link:'news',
        title: 'News'
    },
    {
        icon: <LuListTodo size={30} />,
        link:'todo',
        title: 'Todo'
    }
];

const Button: React.FC = () => {



  return (
    <div className="flex space-x-4">
      {icons.map((item, index) => (
        <Link href={`/service/${item.link}`} key={index}>
            <IconButton  icon={item.icon} title={item.title}  />
        </Link>
      ))}
    </div>
  );
};

export default Button;