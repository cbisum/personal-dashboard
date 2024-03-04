
interface WidgetIconProps {
  icon: React.ReactNode;
  title:String
}

const WidgetIcon: React.FC<WidgetIconProps> = ({ icon, title }) => {
  return (
    <div className="cursor-pointer flex space-x-8  p-5 bg-gray-200 rounded-md" >
      
      <div>
      {icon}
      </div>
      
      <div>
            {title}
      </div>
    </div>
  );
};

export default WidgetIcon;